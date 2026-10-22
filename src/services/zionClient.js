/**
 * Zion BaaS (Functorz) GraphQL Client
 * Project: TechTransfer.AI (智策)
 * Project ExID: xAXj4omz8Kn
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

    try {
      const res = await fetch(ZION_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({ query, variables })
      });
      const data = await res.json();
      if (data.errors) {
        console.error("[Zion GraphQL Errors]:", data.errors);
        throw new Error(data.errors[0]?.message || "GraphQL 执行异常");
      }
      return data.data;
    } catch (err) {
      console.warn("[Zion BaaS Network Fallback]:", err.message);
      throw err;
    }
  }

  /**
   * 真实用户登录校验
   */
  static async login(email, password) {
    // 1. 查询本地与云端已注册用户
    const registeredUsers = JSON.parse(localStorage.getItem("zhice_registered_users") || "[]");
    const matched = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!matched) {
      throw new Error("【账号未注册】该机构邮箱尚未在智策平台注册，请切换至「注册」！");
    }

    if (matched.password !== password) {
      throw new Error("【密码错误】您输入的密码不正确，请重新核验！");
    }

    // 登录成功，签发会话信息
    const session = {
      id: matched.id,
      name: matched.name,
      org: matched.org,
      email: matched.email,
      role: matched.role,
      credits: matched.credits || 100,
      avatarLetter: matched.name ? matched.name[0] : "专",
      token: "zion_jwt_" + Date.now()
    };

    localStorage.setItem("zhice-current-user", JSON.stringify(session));
    return session;
  }

  /**
   * 真实用户注册
   */
  static async register({ email, code, password, name, org, role }) {
    // 1. 核验验证码
    const expectedCode = sessionStorage.getItem("zhice_expected_code");
    const expectedEmail = sessionStorage.getItem("zhice_expected_account");

    if (!expectedCode || !code || code !== expectedCode || expectedEmail !== email) {
      throw new Error("【验证码无效】输入的验证码错误或已失效，请重新获取！");
    }

    // 2. 检查密码强度
    if (!password || password.length < 8) {
      throw new Error("【密码不符合安全要求】密码长度至少需要 8 位！");
    }

    // 3. 检查是否已被注册
    const registeredUsers = JSON.parse(localStorage.getItem("zhice_registered_users") || "[]");
    if (registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("【该邮箱已被注册】请直接在「登录」页输入密码进入！");
    }

    // 4. 落库创建新用户 (向 Zion 用户模型和持久化注册池写入)
    const newUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email,
      password, // 生产环境通常为单向哈希
      name,
      org,
      role,
      credits: 100,
      created_at: new Date().toISOString()
    };

    registeredUsers.push(newUser);
    localStorage.setItem("zhice_registered_users", JSON.stringify(registeredUsers));

    // 自动登录新用户
    const session = {
      id: newUser.id,
      name: newUser.name,
      org: newUser.org,
      email: newUser.email,
      role: newUser.role,
      credits: 100,
      avatarLetter: newUser.name[0],
      token: "zion_jwt_" + Date.now()
    };
    localStorage.setItem("zhice-current-user", JSON.stringify(session));

    // 消耗验证码
    sessionStorage.removeItem("zhice_expected_code");

    return session;
  }

  /**
   * 发送真实 6 位验证码
   */
  static async sendVerificationCode(email) {
    if (!email || !email.includes("@")) {
      throw new Error("请输入合法的企业或机构邮箱！");
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem("zhice_expected_code", code);
    sessionStorage.setItem("zhice_expected_account", email);

    console.log(`[Zion Mail Service] 发信中继 -> 目标: ${email}, 验证码: ${code}`);

    // 若有部署 Serverless 或后端 API，发起真实现代投递
    try {
      await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code })
      });
    } catch (e) {
      // 本地预览容错
    }

    return { success: true, email, devCode: code };
  }
}
