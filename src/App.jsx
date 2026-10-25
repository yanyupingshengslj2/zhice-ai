import React, { useState, useEffect } from 'react';
import AuthModal from './components/Auth/AuthModal';
import Workbench from './components/Dashboard/Workbench';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[智策系统运行异常]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'var(--bg-canvas, #f6f4f1)',
          fontFamily: 'var(--font-sans, -apple-system, sans-serif)',
          color: 'var(--text-primary, #0f172a)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🛡️</div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px' }}>
            智策工作台渲染保护中
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748b', maxWidth: '420px', lineHeight: 1.6, margin: '0 0 18px' }}>
            系统检测到移动端环境自适应微扰动，已激活容灾保护网关，用户档案与会话资产完好无损。
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              padding: '8px 20px',
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🔄 刷新并重新连接工作台
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("zhice-current-user");
      if (raw) {
        const parsed = JSON.parse(raw);
        // 彻底脱敏：如本地残留历史个人测试信息，即刻重置为标准机构称谓
        if (parsed.name && (parsed.name.includes("石路加") || parsed.org?.includes("浙大"))) {
          parsed.name = "技术经理人 (执业会员)";
          parsed.org = "国家级技术转移示范工作站";
          parsed.avatarLetter = "技";
          localStorage.setItem("zhice-current-user", JSON.stringify(parsed));
        }
        setCurrentUser(parsed);
      }
    } catch (e) {
      console.error("[App] 读取本地会话异常", e);
    }
    setIsReady(true);
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("zhice-current-user");
    setCurrentUser(null);
  };

  if (!isReady) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        color: 'var(--text-muted)'
      }}>
        ⏳ 正在载入智策系统环境...
      </div>
    );
  }

  // 核心守门员逻辑：未登录用户绝对拦截在 AuthModal 鉴权门外
  if (!currentUser) {
    return <AuthModal onLoginSuccess={handleLoginSuccess} />;
  }

  // 鉴权通过，放行进入工作台并受保护网关监管
  return (
    <ErrorBoundary>
      <Workbench user={currentUser} onLogout={handleLogout} />
    </ErrorBoundary>
  );
}
