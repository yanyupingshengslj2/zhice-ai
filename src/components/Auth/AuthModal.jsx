import React, { useState, useEffect } from 'react';
import { ZionService } from '../../services/zionClient';

export default function AuthModal({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register Form State
  const [regEmail, setRegEmail] = useState('');
  const [regCode, setRegCode] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regRole, setRegRole] = useState({
    role: 'manager',
    title: '技术经理人 (执业会员)',
    badge: '技'
  });
  
  const [codeCountdown, setCodeCountdown] = useState(0);
  const [codeNotice, setCodeNotice] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // 倒计时计时器
  useEffect(() => {
    let timer = null;
    if (codeCountdown > 0) {
      timer = setInterval(() => {
        setCodeCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [codeCountdown]);

  // 处理获取验证码
  const handleGetCode = async () => {
    if (!regEmail || !regEmail.includes('@')) {
      setRegError('【请输入合规邮箱】请先填写您的企业或机构邮箱！');
      return;
    }
    setRegError('');
    try {
      const res = await ZionService.sendVerificationCode(regEmail);
      setCodeCountdown(60);
      setCodeNotice(`✉️ 验证码已下发至 ${regEmail}，请查收邮件 (有效时间 5 分钟)`);
    } catch (err) {
      setRegError(err.message);
    }
  };

  // 处理登录提交 (严格校验，杜绝随便输入)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginPassword) {
      setLoginError('请完整输入邮箱和密码！');
      return;
    }

    setLoginLoading(true);
    try {
      const session = await ZionService.login(loginEmail, loginPassword);
      setLoginLoading(false);
      onLoginSuccess(session);
    } catch (err) {
      setLoginLoading(false);
      setLoginError(err.message);
    }
  };

  // 处理注册提交 (全要素严格核验)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');

    if (!regEmail) {
      setRegError('【必填项缺失】请输入机构邮箱！');
      return;
    }
    if (!regCode) {
      setRegError('【必填项缺失】请点击「获取验证码」并输入邮件中的验证码！');
      return;
    }
    if (!regPassword || regPassword.length < 8) {
      setRegError('【安全要求】密码长度至少需要 8 位！');
      return;
    }
    if (!regName) {
      setRegError('【必填项缺失】请填写真实姓名或专家称谓！');
      return;
    }
    if (!regOrg) {
      setRegError('【必填项缺失】请填写所属高校成果转化处或创投机构全称！');
      return;
    }

    setRegLoading(true);
    try {
      const session = await ZionService.register({
        email: regEmail,
        code: regCode,
        password: regPassword,
        name: regName,
        org: regOrg,
        role: `${regRole.title} · 实名认证`
      });
      setRegLoading(false);
      alert(`🎉 注册成功！欢迎入驻智策平台，${regName} (${regOrg})。\n已为您配置 100 Credits 投研算力！`);
      onLoginSuccess(session);
    } catch (err) {
      setRegLoading(false);
      setRegError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-canvas)',
      backgroundImage: 'linear-gradient(to right, var(--bg-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--bg-grid-line) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)'
    }}>
      {/* 顶部精简导航 */}
      <header style={{
        height: '56px',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-hairline)',
        background: 'rgba(235, 231, 223, 0.7)',
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-navy)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '15px'
          }}>⚡</div>
          <div style={{ fontSize: '15px', fontWeight: 700 }}>
            TechTransfer.AI <span style={{ fontWeight: 400, opacity: 0.6 }}>(智策)</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔒 企业级统一鉴权网关</span>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            padding: '3px 8px',
            border: '1px solid var(--border-hairline)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-card)'
          }}>
            🟢 Zion BaaS 生产节点就绪
          </div>
        </div>
      </header>

      {/* 主卡片 */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '920px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-hairline)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-elevated)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          overflow: 'hidden'
        }}>
          {/* 左侧：品牌展示与权益 */}
          <section style={{
            background: 'var(--bg-sidebar)',
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--border-hairline)'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                background: 'var(--arti-gold-gradient)',
                border: '1px solid var(--arti-gold-border)',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--arti-gold-text)',
                marginBottom: '18px'
              }}>
                ✨ 注册即送 100 Credits 深度尽调算力
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 800,
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                marginBottom: '12px'
              }}>
                机构级科技成果转化<br />让技术判断开始复利
              </h2>
              <p style={{
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                打破传统大模型模糊泛泛的黑盒评估。依托国家“十五五”战略性支柱与未来产业图谱，以白盒 DCF 估值、FTO 侵权穿透与人机对抗复盘赋能科技投研。
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.7)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-lg)', padding: '10px 14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🤖</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>4 大 Agent 并行拆解</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>技术、法律、成熟度与财务多专家辩论推理</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.7)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-lg)', padding: '10px 14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>国家十五五战略产业图谱</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>覆盖集成电路、双抗ADC、量子计算与具身智能</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.7)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-lg)', padding: '10px 14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📊</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>白盒财务量化估值</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>DCF 自由现金流折现与蒙特卡洛敏感性概率</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid var(--border-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: '12px 16px',
              fontSize: '12px',
              marginTop: '20px'
            }}>
              <div style={{ color: '#d97706', fontSize: '12px', marginBottom: '2px' }}>★★★★★</div>
              <div style={{ fontWeight: 600 }}>“判断不再散落在会议纪要里，而是被记录、验证，沉淀为资产。”</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>国家级技术转移示范机构 · 执业专家</div>
            </div>
          </section>

          {/* 右侧：表单区 (Chestnut 1:1 标准) */}
          <section style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              display: 'flex',
              borderBottom: '2px solid var(--border-hairline)',
              marginBottom: '24px',
              gap: '28px'
            }}>
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setLoginError(''); }}
                style={{
                  padding: '10px 0',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: activeTab === 'login' ? 'var(--color-navy)' : 'var(--text-muted)',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'login' ? '2px solid var(--color-navy)' : '2px solid transparent',
                  marginBottom: '-2px'
                }}
              >
                登录
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setRegError(''); }}
                style={{
                  padding: '10px 0',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: activeTab === 'register' ? 'var(--color-navy)' : 'var(--text-muted)',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'register' ? '2px solid var(--color-navy)' : '2px solid transparent',
                  marginBottom: '-2px'
                }}
              >
                注册
              </button>
            </div>

            {/* 登录视图 */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit}>
                {loginError && (
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    fontSize: '12.5px',
                    marginBottom: '14px'
                  }}>
                    ⚠️ {loginError}
                  </div>
                )}

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    邮箱 / 账号 <span style={{ color: 'var(--signal-red)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="请输入你的机构邮箱 (如 user@institute.org)"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--bg-canvas-subtle)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    密码 <span style={{ color: 'var(--signal-red)' }}>*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="请输入登录密码"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--bg-canvas-subtle)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-navy)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: loginLoading ? 'not-allowed' : 'pointer',
                    marginTop: '12px',
                    boxShadow: '0 2px 8px rgba(29, 78, 216, 0.25)'
                  }}
                >
                  {loginLoading ? '⏳ 正在严格核验证件...' : '进入投研工作台 →'}
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '12.5px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>忘记密码？</span>
                  <a
                    href="javascript:void(0)"
                    onClick={() => setActiveTab('register')}
                    style={{ color: 'var(--color-navy)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    还没有账号？立即注册 →
                  </a>
                </div>
              </form>
            )}

            {/* 注册视图 */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit}>
                {regError && (
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    fontSize: '12.5px',
                    marginBottom: '14px'
                  }}>
                    ⚠️ {regError}
                  </div>
                )}

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    企业 / 机构邮箱 <span style={{ color: 'var(--signal-red)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="请输入你的企业/高校机构邮箱"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--bg-canvas-subtle)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* 邮箱验证码 */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    邮箱验证码 <span style={{ color: 'var(--signal-red)' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      required
                      value={regCode}
                      onChange={(e) => setRegCode(e.target.value)}
                      placeholder="输入邮件中的 6 位验证码"
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        background: 'var(--bg-canvas-subtle)',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      disabled={codeCountdown > 0}
                      onClick={handleGetCode}
                      style={{
                        padding: '0 16px',
                        background: codeCountdown > 0 ? 'var(--bg-canvas-subtle)' : '#ffffff',
                        border: '1.5px solid var(--border-hairline)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: codeCountdown > 0 ? 'var(--text-muted)' : 'var(--color-navy)',
                        cursor: codeCountdown > 0 ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {codeCountdown > 0 ? `${codeCountdown}s 后重发` : '获取验证码'}
                    </button>
                  </div>
                  {codeNotice && (
                    <div style={{ fontSize: '11px', color: '#1e40af', background: '#eff6ff', padding: '6px 10px', borderRadius: 'var(--radius-sm)', marginTop: '6px' }}>
                      {codeNotice}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    设置密码 (至少 8 位) <span style={{ color: 'var(--signal-red)' }}>*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="至少 8 位，包含字母和数字"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'var(--bg-canvas-subtle)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '13.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      真实姓名 / 称谓 <span style={{ color: 'var(--signal-red)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="如：张投资总监"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'var(--bg-canvas-subtle)',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      所属机构全称 <span style={{ color: 'var(--signal-red)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regOrg}
                      onChange={(e) => setRegOrg(e.target.value)}
                      placeholder="如：国家技术转移示范中心"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'var(--bg-canvas-subtle)',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-navy)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: regLoading ? 'not-allowed' : 'pointer',
                    marginTop: '6px',
                    boxShadow: '0 2px 8px rgba(29, 78, 216, 0.25)'
                  }}
                >
                  {regLoading ? '⏳ 正在注册并配置算力...' : '注册并进入投研工作台 →'}
                </button>
              </form>
            )}

            <div style={{ marginTop: '20px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
              登录即代表您同意 <a href="#" style={{ color: 'var(--color-navy)' }}>服务条款</a> 与 <a href="#" style={{ color: 'var(--color-navy)' }}>隐私保护政策</a><br />
              所有交底书严格运行于 E2B 隔离沙箱
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
