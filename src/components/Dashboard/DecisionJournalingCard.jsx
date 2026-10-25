import React from 'react';

/**
 * 成果转化投资判断复盘沙盘 (Decision Journaling & Track Record Engine)
 * 对标 ARTi 智能投研核心哲学：“让投资判断开始复利，建立可回测、可审计的历史胜率账本”
 */
export default function DecisionJournalingCard({ patent }) {
  if (!patent) return null;

  // 模拟该标的在过去 6 个月内的历史判断日志与实际兑现复盘
  const judgmentRecords = [
    {
      date: "2026-03-15",
      stage: "初筛立项期 (TRL-5)",
      agentVerdict: "技术壁垒高，但预警‘微纳米光纤阵列国产化替代率仅 72%’，存在供应链断裂隐患",
      predictedValuation: "¥ 6,800 万元",
      actualOutcome: "2026-06 课题组与长飞光纤达成联合攻关，国产化替代率提升至 91%",
      hitStatus: "HIT",
      retrospectiveNote: "AI 预警的供应链卡点与实际瓶颈完全一致，促成专项中试资金精准扶持"
    },
    {
      date: "2026-06-20",
      stage: "中试概念验证期 (TRL-6)",
      agentVerdict: "建议出具‘专利独占许可 + 股债联动’方案，首期技术转让首付款不低于 2,500 万元",
      predictedValuation: "¥ 8,500 万元",
      actualOutcome: "2026-08 顺利通过省国资引导基金首轮评审，达成 2,800 万元首付款意向协议",
      hitStatus: "HIT",
      retrospectiveNote: "财务 Agent 给出的 DCF 现金流分成区间（14.2%）与产业方谈判底线高度契合"
    },
    {
      date: "2026-09-10",
      stage: "战略过会前瞻 (当前)",
      agentVerdict: "FTO 欧亚专利池清洁度 88%，核心波导耦合器具备强新颖性，建议向国家基金申报重大立项",
      predictedValuation: "¥ 8,500 ~ 9,200 万元",
      actualOutcome: "待下周投决会最终表决 (当前已完成 R4 级双人会签预备)",
      hitStatus: "PENDING",
      retrospectiveNote: "持续跟踪竞品博通最新公开案卷，未发现侵权冲突"
    }
  ];

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '18px 20px',
      marginTop: '16px'
    }}>
      {/* 标题栏与胜率雷达 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>📈</span>
          <div>
            <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
              成果转化投资判断复盘沙盘 (Decision Track Record)
            </h4>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              对标机构级复利投研：记录历史判断假设，自动回溯兑现偏差
            </span>
          </div>
        </div>

        {/* 胜率统计挂件 */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>历史判断命中率</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f766e' }}>92.4%</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#64748b' }}>价值成长复利</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563eb' }}>+25.0%</div>
          </div>
        </div>
      </div>

      {/* 历史复盘时间轴 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {judgmentRecords.map((rec, i) => (
          <div key={i} style={{
            background: rec.hitStatus === 'PENDING' ? '#f8fafc' : '#f0fdf4',
            border: rec.hitStatus === 'PENDING' ? '1px dashed #cbd5e1' : '1px solid #bbf7d0',
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '11.5px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{rec.stage}</span>
                <code style={{ fontSize: '10.5px', color: '#64748b' }}>{rec.date}</code>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '999px',
                background: rec.hitStatus === 'HIT' ? '#15803d' : '#0369a1',
                color: '#ffffff'
              }}>
                {rec.hitStatus === 'HIT' ? "✓ 判断已命中并兑现" : "⏳ 跟踪中 (待投决)"}
              </span>
            </div>

            <div style={{ color: '#334155', lineHeight: 1.5, marginBottom: '6px' }}>
              <strong>AI 原始判断与预警：</strong>{rec.agentVerdict}
            </div>

            <div style={{ color: '#047857', lineHeight: 1.5, marginBottom: '6px' }}>
              <strong>实际产业转化兑现：</strong>{rec.actualOutcome}
            </div>

            <div style={{ fontSize: '10.5px', color: '#64748b', fontStyle: 'italic', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '4px' }}>
              💡 复盘反思：{rec.retrospectiveNote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
