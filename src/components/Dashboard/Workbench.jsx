import React, { useState } from 'react';
import MonteCarloModal from '../MonteCarlo/MonteCarloModal';

const BENCHMARK_PATENTS = [
  {
    id: "cpo-chip",
    title: "基于三维晶圆级封装的高密度光电共封 (CPO) 互连架构",
    patentNo: "CN202410882319.4",
    ipcClass: "H01L 25/065",
    pillarType: "十五五战略支柱 · 集成电路",
    domain: "微电子与光电计算",
    applicant: "前沿微电子国家重点实验室",
    trl: "TRL-6 (系统样机中试验证期)",
    valuation: "¥ 8,500 万元",
    confidence: "91.4%",
    summary: "本发明提出一种硅光共封装三维微凸点互连结构，通过垂直穿透硅通孔 (TSV) 与微流控片上液冷集成，解决 AI 超算中心百 Tbps 交换机芯片光电转换热损耗大与高频寄生电容瓶颈。",
    checklist: [
      { name: "第三方 CMA/CNAS 信号眼图测试报告", passed: true },
      { name: "中试产线连续 1000h 高温高湿无故障运行", passed: true },
      { name: "核心微纳米光纤阵列国产化供应链替代率", passed: false, note: "自主可控度 72%" }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🔬",
        model: "DeepSeek-R1 (推理内核)",
        verdict: "极高壁垒 · 突破核心瓶颈",
        thought: "检索全球对比文件：独立权利要求 1 限定的‘波导交错式垂直光栅耦合器’具备显著创造性，插损低于 1.2dB，领先行业中位数 30% 以上。"
      },
      {
        agent: "法律与 FTO 风控 Agent",
        avatar: "⚖️",
        model: "Qwen-2.5-72B-Instruct",
        verdict: "低侵权风险 (FTO 清洁度 88%)",
        thought: "在欧亚主要专利池进行了权利要求保护边界自由实施（FTO）检索。未发现完全覆盖的阻碍专利（Blocking Patent）。建议在许可合同中补充豁免条款。"
      },
      {
        agent: "商业化与财务 DCF Agent",
        avatar: "📈",
        model: "Qwen-Turbo (量化网关)",
        verdict: "中性估值 ¥ 8,500 万元 (置信度 91.4%)",
        thought: "结合 2026-2028 全球 1.6T 光模块渗透率测算：技术分成率取 14.2%，折现率 WACC 取 12.5%，蒙特卡洛 10,000 次模拟 P50 中位数稳定在 8,500 万元。"
      },
      {
        agent: "产投协调中枢 (Coordinator)",
        avatar: "✦",
        model: "智策 Consensus Engine",
        verdict: "建议推进中试 POC 概念验证",
        thought: "新颖性与成熟度达到产业领投标准。风险点在于微流控封装良率。建议采用‘专利独占许可 + 股债联动’方案，首期技术转让首付款不低于 2,500 万元。"
      }
    ]
  },
  {
    id: "adc-bio",
    title: "靶向抗肿瘤双特异性抗体偶联药物 (ADC) 的合成与表达载体",
    patentNo: "CN202311249088.1",
    ipcClass: "C07K 16/28",
    pillarType: "十五五战略支柱 · 生物医药",
    domain: "生物医药与靶向治疗",
    applicant: "生物医药前沿创新研究中心",
    trl: "TRL-5 (临床前验证阶段)",
    valuation: "¥ 4,800 万元",
    confidence: "88.6%",
    summary: "设计新型定点酶促偶联连接子（Cleavable Linker），实现高 DAR 值（药物抗体偶联比）均一性，克服传统 ADC 药物在血液循环中过早脱落导致的心脏毒性副反应。",
    checklist: [
      { name: "GLP 实验室小鼠活体药代动力学 (PK) 数据", passed: true },
      { name: "规模化原液发酵 500L 放大罐重复稳定性", passed: false, note: "目前仅完成 50L 摇瓶放大" },
      { name: "CMC 工艺杂质残留低于 0.01%", passed: true }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🔬",
        model: "DeepSeek-R1",
        verdict: "高成药性 · 连接子创新显著",
        thought: "血浆稳定性突破，半衰期达 14.2 天，优于同类竞品 35%。结构修饰规避了原有保护核心，新颖性强。"
      },
      {
        agent: "法律与 FTO 风控 Agent",
        avatar: "⚖️",
        model: "Qwen-2.5-72B",
        verdict: "中等风险 · 需规避海外核心序列",
        thought: "主抗体序列在欧洲存在类似保护构型，进入国际多中心临床前建议实施权利要求分割答辩。"
      },
      {
        agent: "商业化与财务 DCF Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "估值 ¥ 4,800 万元",
        thought: "管线里程碑折现法测算，二期临床成功率按 28% 折现，现金流覆盖安全。"
      },
      {
        agent: "产投协调中枢 (Coordinator)",
        avatar: "✦",
        model: "智策 Consensus Engine",
        verdict: "建议推进战略医药工业并购",
        thought: "国内双抗赛道竞争激烈，建议由具备 CMC 产能的上市药企进行独占许可实施。"
      }
    ]
  },
  {
    id: "solid-battery",
    title: "高离子电导率硫化物固态电解质与锂金属阳极界面稳定化技术",
    patentNo: "CN202410332810.X",
    ipcClass: "H01M 10/0562",
    pillarType: "十五五战略支柱 · 新能源与储能",
    domain: "先进储能材料",
    applicant: "固态化学电源国家工程实验室",
    trl: "TRL-6 (千次循环中试验证)",
    valuation: "¥ 12,000 万元",
    confidence: "93.1%",
    summary: "通过原位氟氮原子掺杂构筑人工界面保护层 (SEI)，彻底抑制金属锂枝晶生长，实现常温室温下 12mS/cm 超高离子电导率与 1500 次充放电 88% 容量保持率。",
    checklist: [
      { name: "工信部动力电池安全针刺与挤压无起火测试", passed: true },
      { name: "连续卷对卷涂覆设备试制良率突破 85%", passed: true },
      { name: "低露点全干法中试车间环境达标 (-50℃ 露点)", passed: true }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🔬",
        model: "DeepSeek-R1",
        verdict: "世界级前沿突破",
        thought: "常温离子电导率首次超越电解液水平，彻底解决硫化物遇水产生有毒气体的工业化难题。"
      },
      {
        agent: "法律与 FTO 风控 Agent",
        avatar: "⚖️",
        model: "Qwen-2.5-72B",
        verdict: "核心母案保护，全球清洁度 94%",
        thought: "优先权日早于海外巨头同类申报，已完成 PCT 国际检索并进入美欧日韩国家阶段。"
      },
      {
        agent: "商业化与财务 DCF Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "独角兽级估值 ¥ 1.2 亿元",
        thought: "对接低空飞行器与高端电动汽车首期装机订单，按 15 年自由现金流折现测算极具投资性价比。"
      },
      {
        agent: "产投协调中枢 (Coordinator)",
        avatar: "✦",
        model: "智策 Consensus Engine",
        verdict: "极力推荐国家制造业转型基金领投",
        thought: "解决我国下一代战略能源卡脖子环节，具备万亿级产业外溢效应。"
      }
    ]
  },
  {
    id: "quantum-radar",
    title: "连续变量微波量子纠缠雷达信号收发机与高灵敏度相干探测阵列",
    patentNo: "CN202410998812.5",
    ipcClass: "G01S 13/02",
    pillarType: "十五五未来产业 · 量子信息",
    domain: "量子科技与微波遥感",
    applicant: "量子科学国家实验室",
    trl: "TRL-4 (芯片级实验室原理验证)",
    valuation: "¥ 6,200 万元",
    confidence: "87.2%",
    summary: "利用压缩真空态微波光子对的量子纠缠特性，在强电磁干扰和低信噪比环境下实现隐身目标的亚波长分辨率成像，抗截获与防干扰性能提升 4 个数量级。",
    checklist: [
      { name: "稀释制冷机 10mK 超低温连续稳定运行测试", passed: true },
      { name: "暗室环境下隐身雷达截面积 (RCS) 仿真比对", passed: true },
      { name: "室温微波光子变频集成化模块封装", passed: false, note: "目前体积较大，处于小型化攻关期" }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🔬",
        model: "DeepSeek-R1",
        verdict: "颠覆性前沿国防/民用技术",
        thought: "突破传统经典雷达雷利准则限制，属于不可替代的自主根技术体系。"
      },
      {
        agent: "法律与 FTO 风控 Agent",
        avatar: "⚖️",
        model: "Qwen-2.5-72B",
        verdict: "国家国防秘密专利池保护",
        thought: "已列入国家重点关键核心技术保护目录，建议采用军民两用定向转化模式。"
      },
      {
        agent: "商业化与财务 DCF Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "期权估值 ¥ 6,200 万元",
        thought: "商业航天遥感与高精气象监测未来市场规模庞大，实物期权溢价显著。"
      },
      {
        agent: "产投协调中枢 (Coordinator)",
        avatar: "✦",
        model: "智策 Consensus Engine",
        verdict: "建议设立概念验证专项基金孵化",
        thought: "周期较长，适合国家引导基金与领军央企联合孵化。"
      }
    ]
  }
];

export default function Workbench({ user, onLogout }) {
  const [selectedPatent, setSelectedPatent] = useState(BENCHMARK_PATENTS[0]);
  const [showMonteCarlo, setShowMonteCarlo] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: `您好，${user?.name || "专家"}！已接入 Zion 生产级技术转移多智能体集群 (Agent ID: mvj2fqpz)。当前聚焦在【${selectedPatent.title}】。您可以向我询问技术壁垒评级、FTO 侵权风险或让 4 大 Agent 进行量化辩论！` }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatLoading(true);

    setTimeout(() => {
      let aiReply = `【Zion Agent · ${selectedPatent.title} 投研推演】：\n针对您提出的「${userMsg}」，技术壁垒 Agent 评估该发明在独立权利要求 1 中构建了高壁垒阻断；财务 DCF 模型在 WACC=12.5% 条件下测算出当前中性估值 ${selectedPatent.valuation}，蒙特卡洛 10,000 次抽样置信度达到 ${selectedPatent.confidence}。建议向科研团队调取 CMA 检验报告进行闭环验证。`;
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setChatLoading(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-canvas)' }}>
      {/* 顶部现代化导航 */}
      <header style={{
        height: '56px',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-hairline)',
        background: 'rgba(235, 231, 223, 0.75)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-navy)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800
          }}>⚡</div>
          <div style={{ fontSize: '15px', fontWeight: 800 }}>
            TechTransfer.AI <span style={{ fontWeight: 400, opacity: 0.7 }}>(智策)</span>
          </div>
          <span style={{ fontSize: '11px', background: 'var(--color-navy)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
            十五五国家战略版
          </span>
        </div>

        {/* 用户状态条 (已解决硬编码问题，真实反映注册用户信息) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--color-navy)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '12px'
            }}>
              {user?.avatarLetter || "专"}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {user?.name || "技术经理人"}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {user?.org || "国家级技术转移示范机构"}
              </div>
            </div>
          </div>

          <div style={{
            padding: '4px 10px',
            background: 'var(--arti-gold-gradient)',
            border: '1px solid var(--arti-gold-border)',
            borderRadius: '16px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: 'var(--arti-gold-text)'
          }}>
            ✨ {user?.credits || 100} Credits
          </div>

          <button
            onClick={onLogout}
            style={{
              padding: '5px 12px',
              border: '1px solid var(--border-hairline)',
              borderRadius: '6px',
              background: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              color: 'var(--signal-red)'
            }}
          >
            退出登录
          </button>
        </div>
      </header>

      {/* 主体三栏投研工作台 */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '300px 1fr 340px', overflow: 'hidden' }}>
        
        {/* 左栏：十五五战略产业图谱标的列表 */}
        <aside style={{ borderRight: '1px solid var(--border-hairline)', background: 'var(--bg-sidebar)', padding: '16px', overflowY: 'auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.5px' }}>
            十五五国家战略标的库 ({BENCHMARK_PATENTS.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {BENCHMARK_PATENTS.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedPatent(p)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: selectedPatent.id === p.id ? '2px solid var(--color-navy)' : '1px solid var(--border-hairline)',
                  background: selectedPatent.id === p.id ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  boxShadow: selectedPatent.id === p.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '4px' }}>
                  {p.pillarType}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.4, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {p.title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  <span>{p.patentNo}</span>
                  <span style={{ fontWeight: 700, color: '#b45309' }}>{p.valuation}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* 中栏：专利深度交底与 4 大 Agent 并行辩论推演 */}
        <main style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 标的卡片 */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-hairline)', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11.5px', background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  {selectedPatent.pillarType} · {selectedPatent.ipcClass}
                </span>
                <h1 style={{ fontSize: '18px', fontWeight: 800, margin: '8px 0 4px', color: '#0f172a' }}>
                  {selectedPatent.title}
                </h1>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  专利号: {selectedPatent.patentNo} · 申请单位: {selectedPatent.applicant} · {selectedPatent.trl}
                </div>
              </div>

              {/* 估值与模拟器按钮 */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>白盒 DCF 量化估值</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-navy)', margin: '2px 0 8px' }}>
                  {selectedPatent.valuation}
                </div>
                <button
                  onClick={() => setShowMonteCarlo(true)}
                  style={{
                    padding: '6px 14px',
                    background: 'var(--arti-gold-gradient)',
                    border: '1px solid var(--arti-gold-border)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--arti-gold-text)',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(217, 119, 6, 0.15)'
                  }}
                >
                  🎲 运行蒙特卡洛 10,000 次抽样
                </button>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, background: '#f8fafc', padding: '12px', borderRadius: '8px', margin: 0 }}>
              {selectedPatent.summary}
            </p>
          </div>

          {/* 4 大 Agent 并行对抗辩论 */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚔️</span> 4 大多智能体对抗辩论推演 (Zion BaaS mvj2fqpz 驱动)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {selectedPatent.agentsDebate.map((a, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{a.avatar}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{a.agent}</span>
                    <span style={{ fontSize: '10.5px', background: '#f1f5f9', color: '#64748b', padding: '2px 6px', borderRadius: '4px' }}>
                      {a.model}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8', marginBottom: '6px' }}>
                    结论: {a.verdict}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.55 }}>
                    {a.thought}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* 右栏：Zion AI Agent 实时研判交互 */}
        <aside style={{ borderLeft: '1px solid var(--border-hairline)', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-hairline)', background: '#f8fafc' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              💬 Zion Agent 研判问答
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Agent ID: mvj2fqpz · 关联当前标的
            </div>
          </div>

          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: m.sender === 'user' ? '#1d4ed8' : '#f1f5f9',
                  color: m.sender === 'user' ? '#fff' : '#1e293b',
                  fontSize: '12.5px',
                  lineHeight: 1.5
                }}
              >
                {m.text}
              </div>
            ))}
            {chatLoading && (
              <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: '#64748b' }}>
                ⏳ Zion 多智能体推演计算中...
              </div>
            )}
          </div>

          <form onSubmit={handleSendChat} style={{ padding: '12px', borderTop: '1px solid var(--border-hairline)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="向 Agent 发问 (如: FTO侵权风险如何解决?)"
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '12.5px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={chatLoading}
              style={{
                padding: '8px 14px',
                background: '#1d4ed8',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              发送
            </button>
          </form>
        </aside>
      </div>

      {/* 蒙特卡洛随机模拟弹窗 */}
      {showMonteCarlo && (
        <MonteCarloModal patent={selectedPatent} onClose={() => setShowMonteCarlo(false)} />
      )}
    </div>
  );
}
