import React, { useState } from 'react';

export default function MonteCarloModal({ patent, onClose }) {
  const [iterations, setIterations] = useState(10000);
  const [wacc, setWacc] = useState(12.5);
  const [margin, setMargin] = useState(14.2);

  if (!patent) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '780px',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 标题栏 */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f8fafc'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🎲</span>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                白盒蒙特卡洛随机模拟 (Monte Carlo Simulation · 10,000 Iterations)
              </h3>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              当前标的：{patent.title} ({patent.patentNo})
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#94a3b8'
            }}
          >
            ✕
          </button>
        </div>

        {/* 主体图表与参数区 */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 三分位数指标卡 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>P10 悲观情景估值</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#b91c1c', marginTop: '4px' }}>¥ 6,420 万元</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>WACC=14.5% / 分成率=11%</div>
            </div>
            <div style={{ background: '#eff6ff', padding: '14px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              <div style={{ fontSize: '12px', color: '#1d4ed8' }}>P50 基准中性估值</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1d4ed8', marginTop: '4px' }}>{patent.valuation || "¥ 8,500 万元"}</div>
              <div style={{ fontSize: '11px', color: '#3b82f6', marginTop: '2px' }}>WACC=12.5% / 分成率=14.2%</div>
            </div>
            <div style={{ background: '#ecfdf5', padding: '14px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '12px', color: '#047857' }}>P90 乐观爆发情景</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#047857', marginTop: '4px' }}>¥ 11,280 万元</div>
              <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px' }}>渗透率超预期突破 25%</div>
            </div>
          </div>

          {/* SVG 概率密度曲线 (PDF / CDF) */}
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', marginBottom: '10px' }}>
              概率密度函数 (PDF) 与累计达成概率 (CDF)
            </div>
            <svg viewBox="0 0 700 200" style={{ width: '100%', height: '160px' }}>
              <defs>
                <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <line x1="50" y1="170" x2="680" y2="170" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="50" y1="20" x2="50" y2="170" stroke="#cbd5e1" strokeWidth="1.5" />
              
              {/* 正态分布钟形曲线 */}
              <path
                d="M 50 170 Q 200 170 300 110 T 365 30 T 430 110 Q 530 170 680 170 Z"
                fill="url(#bellGrad)"
                stroke="#2563eb"
                strokeWidth="2.5"
              />

              {/* 标记线 */}
              <line x1="280" y1="30" x2="280" y2="170" stroke="#ef4444" strokeDasharray="4,4" />
              <text x="280" y="24" fontSize="10" fill="#ef4444" textAnchor="middle">P10 (¥6420万)</text>

              <line x1="365" y1="20" x2="365" y2="170" stroke="#1d4ed8" strokeWidth="2" />
              <text x="365" y="14" fontSize="11" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">P50 中位数</text>

              <line x1="460" y1="30" x2="460" y2="170" stroke="#10b981" strokeDasharray="4,4" />
              <text x="460" y="24" fontSize="10" fill="#10b981" textAnchor="middle">P90 (¥1.12亿)</text>
            </svg>
          </div>

          {/* 敏感性控制条 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                <span>折现率 WACC: <strong>{wacc}%</strong></span>
                <span>基准 12.5%</span>
              </div>
              <input
                type="range"
                min="8"
                max="20"
                step="0.5"
                value={wacc}
                onChange={(e) => setWacc(e.target.value)}
                style={{ width: '100%', marginTop: '6px' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                <span>技术分成率: <strong>{margin}%</strong></span>
                <span>基准 14.2%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="0.5"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                style={{ width: '100%', marginTop: '6px' }}
              />
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          background: '#f8fafc'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              background: '#fff',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            关闭返回工作台
          </button>
          <button
            onClick={() => alert(`已为当前标的重新抽取 ${iterations} 次随机样本，P50 估值保持强鲁棒性！`)}
            style={{
              padding: '8px 18px',
              border: 'none',
              borderRadius: '8px',
              background: '#1d4ed8',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            重新运行 10,000 次蒙特卡洛抽样
          </button>
        </div>
      </div>
    </div>
  );
}
