import React from 'react';

export default function ExportReportModal({ isOpen, onClose, patent, wacc, royaltyRate, dynamicValuation }) {
  if (!isOpen || !patent) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadWord = () => {
    const reportHtml = document.getElementById('investment-memo-content').innerHTML;
    const blob = new Blob(['\ufeff' + `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>科技成果转化投决书 - ${patent.title}</title>
      <style>
        body { font-family: SimSun, Arial, sans-serif; line-height: 1.6; }
        h1, h2, h3 { color: #0f172a; }
        table { border-collapse: collapse; width: 100%; margin: 12px 0; }
        th, td { border: 1px solid #333; padding: 6px 10px; font-size: 11pt; }
        th { background-color: #f2f2f2; }
      </style>
      </head>
      <body>${reportHtml}</body></html>
    `], { type: 'application/msword' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `十五五重大成果转化投决建议书-${patent.title.substring(0, 10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '14px',
        width: '100%',
        maxWidth: '840px',
        maxHeight: '92vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #cbd5e1',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Top Action Bar */}
        <div style={{
          padding: '12px 20px',
          background: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📑</span> 国家重大科技成果转化项目投资决策建议书 · 预览与导出
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrint}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid #475569',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🖨️ 打印 / 另存为 PDF
            </button>
            <button
              onClick={handleDownloadWord}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                background: 'var(--arti-gold-gradient)',
                color: 'var(--arti-gold-text)',
                border: '1px solid var(--arti-gold-border)',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📄 导出为 Word (.doc)
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '0 4px'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '36px 48px', background: '#f8fafc' }}>
          <div
            id="investment-memo-content"
            style={{
              background: '#ffffff',
              padding: '40px 48px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              color: '#1e293b',
              fontSize: '12.5px',
              lineHeight: 1.7
            }}
          >
            {/* Red Masthead */}
            <div style={{ borderBottom: '3px solid #dc2626', paddingBottom: '12px', marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', letterSpacing: '1px' }}>
                国家战略科技成果转移转化评估规范 · 专项评审件
              </div>
              <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: '8px 0 4px', letterSpacing: '0.5px' }}>
                重大科技成果转化投资决策建议书
              </h1>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                项目编号：TT-2026-{patent.id.toUpperCase()} · 密级：内部决策 · 查验哈希：0x7B9A...8821
              </div>
            </div>

            {/* Section 1 */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', borderLeft: '3px solid var(--color-navy)', paddingLeft: '8px', margin: '0 0 10px' }}>
                一、标的基本信息与权利要求梳理
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', marginBottom: '10px' }}>
                <tbody>
                  <tr style={{ background: '#f8fafc' }}>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', fontWeight: 700, width: '18%' }}>成果名称</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', width: '42%' }}>{patent.title}</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', fontWeight: 700, width: '18%' }}>IPC 国际分类</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', width: '22%' }}>{patent.ipcClass}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', fontWeight: 700 }}>专利公开号</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>{patent.patentNo}</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', fontWeight: 700 }}>战略赛道归属</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>{patent.pillarType}</td>
                  </tr>
                  <tr style={{ background: '#f8fafc' }}>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', fontWeight: 700 }}>申报依托单位</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px' }}>{patent.applicant}</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', fontWeight: 700 }}>工程技术熟化度</td>
                    <td style={{ border: '1px solid #e2e8f0', padding: '6px 10px', color: '#b45309', fontWeight: 700 }}>{patent.trl}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '6px', fontSize: '11.5px', color: '#475569' }}>
                <strong>摘要技术特征：</strong>{patent.summary}
              </div>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', borderLeft: '3px solid var(--color-navy)', paddingLeft: '8px', margin: '0 0 10px' }}>
                二、TRL 技术成熟度九级关键工程核验证据链
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {patent.checklist?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#f8fafc', border: '1px solid #edf2f7', borderRadius: '4px', fontSize: '11px' }}>
                    <span>{item.passed ? '✅ [核验合格]' : '⚠️ [关注攻关]'} {item.name}</span>
                    <span style={{ fontWeight: 700, color: item.passed ? 'var(--signal-green)' : '#b45309' }}>
                      {item.passed ? '通过国家认定机构评测' : (item.note || '待补充扩大验证')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', borderLeft: '3px solid var(--color-navy)', paddingLeft: '8px', margin: '0 0 10px' }}>
                三、收益法 (DCF) 白盒估值与敏感性测算结论
              </h3>
              <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '6px', marginBottom: '8px', fontSize: '11.5px' }}>
                <div><strong>估值量化模型：</strong>收益分成折现法 (Royalty Relief DCF Model)</div>
                <div><strong>建议过会中性估值：</strong><span style={{ fontSize: '16px', fontWeight: 900, color: '#b45309' }}>¥ {dynamicValuation.toLocaleString()} 万元</span></div>
                <div><strong>关键测算参数：</strong>加权资本成本 WACC = {wacc}% · 技术贡献分成率 α = {royaltyRate}% · 蒙特卡洛置信度 = {patent.confidence}</div>
              </div>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', borderLeft: '3px solid var(--color-navy)', paddingLeft: '8px', margin: '0 0 10px' }}>
                四、多智能体协同对抗辩论结论汇总
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {patent.agentsDebate?.map((a, idx) => (
                  <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px', background: '#fcfcfd' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>
                      {a.avatar} {a.agent}：<span style={{ color: '#1d4ed8' }}>{a.verdict}</span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '4px' }}>
                      {a.thought}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Signatures */}
            <div style={{ marginTop: '28px', borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
                五、科技成果转化投资决策委员会审批签署
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', textAlign: 'center', fontSize: '11px' }}>
                <div style={{ border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '14px 8px' }}>
                  <div style={{ color: '#64748b', marginBottom: '24px' }}>技术评估专家组长</div>
                  <div style={{ borderBottom: '1px solid #334155', width: '80%', margin: '0 auto' }}></div>
                  <div style={{ marginTop: '4px', color: '#94a3b8' }}>签署日期：2026年___月___日</div>
                </div>
                <div style={{ border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '14px 8px' }}>
                  <div style={{ color: '#64748b', marginBottom: '24px' }}>产业合伙人 / 投研总监</div>
                  <div style={{ borderBottom: '1px solid #334155', width: '80%', margin: '0 auto' }}></div>
                  <div style={{ marginTop: '4px', color: '#94a3b8' }}>签署日期：2026年___月___日</div>
                </div>
                <div style={{ border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '14px 8px' }}>
                  <div style={{ color: '#64748b', marginBottom: '24px' }}>风控法务合规官</div>
                  <div style={{ borderBottom: '1px solid #334155', width: '80%', margin: '0 auto' }}></div>
                  <div style={{ marginTop: '4px', color: '#94a3b8' }}>签署日期：2026年___月___日</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
