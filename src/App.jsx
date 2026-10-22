import React, { useState, useEffect } from 'react';
import AuthModal from './components/Auth/AuthModal';
import Workbench from './components/Dashboard/Workbench';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("zhice-current-user");
      if (raw) {
        const parsed = JSON.parse(raw);
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

  // 鉴权通过，放行进入工作台
  return <Workbench user={currentUser} onLogout={handleLogout} />;
}
