/**
 * Zion BaaS (Functorz) Official GraphQL Client
 * Project: TechTransfer.AI (智策)
 * Project ExID: xAXj4omz8Kn
 * Endpoint: https://zion-app.functorz.com/zero/xAXj4omz8Kn/api/graphql-v2
 */

const ZION_ENDPOINT = "https://zion-app.functorz.com/zero/xAXj4omz8Kn/api/graphql-v2";

export class ZionService {
  static getEndpoint() {
    return ZION_ENDPOINT;
  }

  /**
   * 基础 GraphQL 请求封装
   */
  static async request(query, variables = {}, token = null) {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(ZION_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
  }

  /**
   * 1. Zion 官方云端真实发送邮箱验证码 (mutation: sendVerificationCodeToEmail)
   */
  static async sendVerificationCode(email) {
    if (!email || !email.includes("@")) {
      throw new Error("【格式错误】请输入合法的企业或机构邮箱！");
    }

    const query = `
      mutation SendCode($email: String!, $type: verificationEnumType!) {
        sendVerificationCodeToEmail(email: $email, verificationEnumType: $type)
      }
    `;

    const result = await this.request(query, {
      email: email.trim(),
      type: "SIGN_UP"
    });

    if (result.errors && result.errors.length > 0) {
      const err = result.errors[0];
      console.error("[Zion sendVerificationCode Error]:", err);
      throw new Error(err.message || "Zion 云端验证码发送失败，请稍后重试");
    }

    console.log(`[Zion BaaS 生产网关] 真实已向 ${email} 触发云端发信流水线:`, result.data);
    return { success: true, email };
  }

  /**
   * 2. Zion 官方云端真实用户注册 (mutation: authenticateWithEmail)
   */
  static async register({ email, code, password, name, org, role }) {
    if (!email) throw new Error("请输入企业机构邮箱！");
    if (!code) throw new Error("请输入邮件中的 6 位验证码！");
    if (!password || password.length < 8) throw new Error("密码长度至少需 8 位！");

    const query = `
      mutation RegisterUser($email: String!, $password: String!, $verificationCode: String, $register: Boolean!) {
        authenticateWithEmail(
          email: $email
          password: $password
          verificationCode: $verificationCode
          register: $register
        ) {
          account {
            id
            email
            permissionRoles
          }
          jwt {
            token
          }
        }
      }
    `;

    const result = await this.request(query, {
      email: email.trim(),
      password,
      verificationCode: code.trim(),
      register: true
    });

    if (result.errors && result.errors.length > 0) {
      const err = result.errors[0];
      console.error("[Zion Registration Error]:", err);
      if (err.message && err.message.includes("bad verification code")) {
        throw new Error("【验证码错误】您输入的验证码不正确或已过期，请核对邮箱最新邮件！");
      }
      throw new Error(`【Zion 注册被拒绝】: ${err.message}`);
    }

    const authData = result.data?.authenticateWithEmail;
    if (!authData || !authData.jwt?.token) {
      throw new Error("【注册异常】未能获取合法的 Zion 会话令牌！");
    }

    // 组装用户档案
    const session = {
      id: authData.account?.id || "zion_" + Date.now(),
      email: authData.account?.email || email,
      name: name || email.split("@")[0],
      org: org || "国家技术转移示范中心",
      role: role || "技术经理人 · 执业会员",
      credits: 100,
      avatarLetter: (name ? name[0] : "专").toUpperCase(),
      token: authData.jwt.token
    };

    localStorage.setItem("zhice-current-user", JSON.stringify(session));
    return session;
  }

  /**
   * 3. Zion 官方云端真实用户登录 (mutation: authenticateWithEmail)
   */
  static async login(email, password) {
    if (!email || !password) {
      throw new Error("请输入邮箱和密码！");
    }

    const query = `
      mutation LoginUser($email: String!, $password: String!, $register: Boolean!) {
        authenticateWithEmail(
          email: $email
          password: $password
          register: $register
        ) {
          account {
            id
            email
            permissionRoles
          }
          jwt {
            token
          }
        }
      }
    `;

    const result = await this.request(query, {
      email: email.trim(),
      password,
      register: false
    });

    if (result.errors && result.errors.length > 0) {
      const err = result.errors[0];
      console.warn("[Zion Login Error]:", err);
      if (err.message && err.message.includes("Incorrect email or password")) {
        throw new Error("【账号或密码错误】该邮箱尚未注册或密码不符，请核对或切换至「注册」！");
      }
      throw new Error(`【登录失败】: ${err.message}`);
    }

    const authData = result.data?.authenticateWithEmail;
    if (!authData || !authData.jwt?.token) {
      throw new Error("【鉴权异常】未能获取合法的 Zion 登录令牌！");
    }

    const session = {
      id: authData.account?.id,
      email: authData.account?.email || email,
      name: email.split("@")[0],
      org: "国家技术转移示范中心",
      role: "技术经理人 · 执业会员",
      credits: 100,
      avatarLetter: (email.split("@")[0] || "专")[0].toUpperCase(),
      token: authData.jwt.token
    };

    localStorage.setItem("zhice-current-user", JSON.stringify(session));
    return session;
  }
}
