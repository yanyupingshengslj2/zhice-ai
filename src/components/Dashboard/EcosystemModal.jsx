import React, { useState } from 'react';

export default function EcosystemModal({ isOpen, onClose, initialTab = 'api' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const apiKey = "zc_live_9f8a8e1b4c7d2e6f9a0b1c2d3e4f";

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #cbd5e1',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 22px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔌</span> 智策 (TechTransfer.AI) 开放生态与多渠道接入中枢
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
              支持企业级 API、办公协同机器人 (飞书/企微/钉钉)、浏览器扩展及科研处专网
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Bar */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '0 16px' }}>
          <button
            onClick={() => setActiveTab('api')}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderBottom: activeTab === 'api' ? '2px solid var(--color-navy)' : '2px solid transparent',
              background: 'transparent',
              fontWeight: activeTab === 'api' ? 700 : 500,
              fontSize: '12.5px',
              color: activeTab === 'api' ? 'var(--color-navy)' : '#64748b',
              cursor: 'pointer'
            }}
          >
            🔌 OpenAPI 接口
          </button>
          <button
            onClick={() => setActiveTab('bot')}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderBottom: activeTab === 'bot' ? '2px solid var(--color-navy)' : '2px solid transparent',
              background: 'transparent',
              fontWeight: activeTab === 'bot' ? 700 : 500,
              fontSize: '12.5px',
              color: activeTab === 'bot' ? 'var(--color-navy)' : '#64748b',
              cursor: 'pointer'
            }}
          >
            🤖 飞书 / 企微 / 钉钉
          </button>
          <button
            onClick={() => setActiveTab('extension')}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderBottom: activeTab === 'extension' ? '2px solid var(--color-navy)' : '2px solid transparent',
              background: 'transparent',
              fontWeight: activeTab === 'extension' ? 700 : 500,
              fontSize: '12.5px',
              color: activeTab === 'extension' ? 'var(--color-navy)' : '#64748b',
              cursor: 'pointer'
            }}
          >
            🧩 浏览器插件
          </button>
          <button
            onClick={() => setActiveTab('sso')}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderBottom: activeTab === 'sso' ? '2px solid var(--color-navy)' : '2px solid transparent',
              background: 'transparent',
              fontWeight: activeTab === 'sso' ? 700 : 500,
              fontSize: '12.5px',
              color: activeTab === 'sso' ? 'var(--color-navy)' : '#64748b',
              cursor: 'pointer'
            }}
          >
            🏛️ 高校科研专线
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '22px', flex: 1, overflowY: 'auto' }}>
          {activeTab === 'api' && (
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                🔑 生产环境 API 密钥 (API Key)
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#334155'
                  }}
                />
                <button
                  onClick={() => handleCopy(apiKey)}
                  style={{
                    padding: '8px 16px',
                    background: 'var(--color-navy)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {copied ? '✓ 已复制' : '复制密钥'}
                </button>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                💻 Python SDK 快速接入示例
              </div>
              <pre style={{
                background: '#0f172a',
                color: '#f8fafc',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontFamily: 'monospace',
                lineHeight: 1.6,
                overflowX: 'auto',
                margin: '0 0 16px'
              }}>
{`import requests

url = "https://api.zhice-ai.com/v1/valuation/evaluate"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}
payload = {
    "patent_no": "CN202410882319.4",
    "valuation_method": "DCF_ROYALTY_RELIEF",
    "wacc": 0.125,
    "royalty_rate": 0.142
}

response = requests.post(url, json=payload, headers=headers)
print("成果估值报告:", response.json())`}
              </pre>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11.5px', color: '#64748b' }}>
                💡 开放协议支持：RESTful API、GraphQL 及 MCP (Model Context Protocol) 投研插件协议。
              </div>
            </div>
          )}

          {activeTab === 'bot' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '14px', textAlign: 'center', background: '#f8fafc' }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>🦅</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>飞书组织机器人</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>支持飞书群聊 @智策 快速查专利</div>
                  <button
                    onClick={() => alert("飞书应用已生成 Webhook：https://open.feishu.cn/open-apis/bot/v2/hook/zhice-prod-2026")}
                    style={{ marginTop: '10px', padding: '4px 10px', fontSize: '11px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    配置 Webhook
                  </button>
                </div>

                <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '14px', textAlign: 'center', background: '#f8fafc' }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>💼</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>企业微信专线</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>投资经理审批流实时推送卡片</div>
                  <button
                    onClick={() => alert("企业微信机器人已就绪：已挂载至产投投委会群组")}
                    style={{ marginTop: '10px', padding: '4px 10px', fontSize: '11px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    一键添加群聊
                  </button>
                </div>

                <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '14px', textAlign: 'center', background: '#f8fafc' }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>💬</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>钉钉投研小助手</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>重点高精尖标的早报推演推送</div>
                  <button
                    onClick={() => alert("钉钉机器人 Webhook 绑定成功！")}
                    style={{ marginTop: '10px', padding: '4px 10px', fontSize: '11px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    订阅早报推送
                  </button>
                </div>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '12px', borderRadius: '8px', fontSize: '11.5px', color: '#1e40af' }}>
                📌 <strong>自动化推送规则：</strong>当国家知识产权局新公开属于“十五五战略产业”且初步判定为 TRL-6 级以上中试成果时，机器人将在每日 08:30 自动向各协同工作群推送投研速览。
              </div>
            </div>
          )}

          {activeTab === 'extension' && (
            <div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div style={{ fontSize: '40px' }}>🧩</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>智策·专利雷达 Chrome 浏览器官方扩展插件</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
                    在浏览国家知识产权局 (CNIPA)、SooPAT、佰腾网或 Google Patents 时，网页右侧浮动展示智策 AI 估值与 FTO 风险卡片。
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                安装指南 (开发者模式 / 离线安装包)：
              </div>
              <ol style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
                <li>下载离线扩展包 <code>zhice-patent-radar-v1.4.crx</code>；</li>
                <li>在 Chrome 浏览器地址栏打开 <code>chrome://extensions/</code> 并开启右上角“开发者模式”；</li>
                <li>将 CRX 文件直接拖入浏览器窗口即可完成安装。</li>
              </ol>

              <button
                onClick={() => alert("正在下载智策专利扩展插件 zhice-patent-radar-v1.4.crx (版本: 2026.10 生产版)")}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  background: 'var(--color-navy)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                📥 下载 Chrome 离线安装包 (.crx)
              </button>
            </div>
          )}

          {activeTab === 'sso' && (
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                🏛️ 高校科研处 / 国家技术转移中心专属数据桥接
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>
                智策支持与高校“科研创新与成果转化管理系统”（如南大通用、万方、正方科研 ERP）进行专属无缝对接，实现全校待转化专利库批量一键导入与估值建档。
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a', marginBottom: '4px' }}>统一身份认证 (CAS / SAML 2.0)</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>支持教师与技术经理人凭校园统一门户账号一键单点登录 (SSO)。</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a', marginBottom: '4px' }}>私有化数据隔离 (VPC / 本地部署)</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>未公开的重大技术交底书数据落本地私有数据库，模型推理通过专属安全网关。</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
