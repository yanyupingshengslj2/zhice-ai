import React, { useState } from 'react';

export default function UploadDisclosureModal({ isOpen, onClose, onImportPatent }) {
  const [dragActive, setDragActive] = useState(false);
  const [parsingStep, setParsingStep] = useState(0); // 0: idle, 1: parsing, 2: completed
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [parsedData, setParsedData] = useState(null);

  if (!isOpen) return null;

  const samplePresets = [
    {
      name: "新型硅基微流道光纤耦合超快芯片交底书.pdf",
      size: "3.4 MB",
      patent: {
        id: "custom-" + Date.now(),
        title: "基于硅基微流控高密度垂直光纤光栅耦合的光电芯片系统",
        patentNo: "CN202510992314.X (交底书申请中)",
        ipcClass: "H01L 23/473",
        pillarType: "战略支柱 · 集成电路与硅光",
        category: "pillar",
        domain: "微电子与光互联",
        applicant: "国家先进光子技术创新联合体",
        status: "审查中 / 拟作价入股",
        trl: "TRL-6 (系统级工程原型完成)",
        baseValuation: 6800,
        valuation: "¥ 6,800 万元",
        valuationMethod: "收益现值折现法 (DCF) + 研发成本重置法",
        confidence: "89.2%",
        summary: "本成果针对百卡/千卡 GPU 算力集群高频光互连热应力形变与耦合衰减难题，提出一种片上微流控与垂直波导耦合光栅一体化封装拓扑，将单通道插损降至 1.15dB 以下，满足 1.6T 传输能耗要求。",
        checklist: [
          { name: "片上微流道高温高压循环可靠性试验 (85℃/85%RH)", passed: true },
          { name: "单模光纤阵列垂直对准自动化耦合良率测试 (>82%)", passed: true },
          { name: "硅光 Foundry 晶圆级批量代工兼容性验证", passed: false, note: "目前处于 MPW 多项目晶圆中试流片阶段" }
        ],
        agentsDebate: [
          {
            agent: "技术壁垒 Agent",
            avatar: "🔬",
            model: "DeepSeek-R1 (推理内核)",
            verdict: "高技术门槛 · 突破垂直耦合公差瓶颈",
            thought: "深入穿透交底书独立权利要求 1~3，其在微流控侧壁绝缘层纳米微孔阵列的设计上具备独立新颖性，避开了台积电 COUPE 专利主权利要求的保护范围。",
            citation: "现有技术检索：CN115825781A、US2023019801A1"
          },
          {
            agent: "法律与 FTO 风控 Agent",
            avatar: "⚖️",
            model: "Qwen-2.5-72B-Instruct",
            verdict: "低侵权风险 (FTO 清洁度 92%)",
            thought: "未检索到对该特定流道冷却拓扑形成全面封锁的有效优先权专利。已核验完成高校科技成果转化赋权备案。",
            citation: "FTO 清洁报告已生成，无硬性阻塞专利"
          },
          {
            agent: "商业化与财务 DCF Agent",
            avatar: "📈",
            model: "Qwen-Turbo",
            verdict: "估值区间 ¥ 6,500万 ~ 7,200 万元",
            thought: "依据光模块向 CPO 升级的产业渗透率曲线，以 WACC=12.5% 折现，5 年期现金流净现值中位数约为 6,800 万元。",
            citation: "数据源: 光通信产业技术联盟 2026 年预测"
          },
          {
            agent: "产投协调中枢 (Coordinator)",
            avatar: "✦",
            model: "智策 Consensus Engine",
            verdict: "建议推进作价入股或排他独占许可",
            thought: "综合研判：该成果工程熟化度已过死亡谷前哨，建议由地方产业资本领投中试轮。",
            citation: "转化模式建议：技术入股 60% + 现金中试配套 40%"
          }
        ]
      }
    },
    {
      name: "全固态聚合物电解质薄膜连续辊压复合专利申请书.docx",
      size: "2.8 MB",
      patent: {
        id: "custom-" + Date.now(),
        title: "高离子电导率全固态聚合物-石榴石复合电解质连续辊压制备工艺",
        patentNo: "CN202511008892.3 (交底书申报)",
        ipcClass: "H01M 10/0565",
        pillarType: "新兴支柱 · 新能源与储能",
        category: "pillar",
        domain: "新能源动力电池",
        applicant: "动力电池材料工程技术研究中心",
        status: "中试技术交底",
        trl: "TRL-5 (中试样机放大试验)",
        baseValuation: 5200,
        valuation: "¥ 5,200 万元",
        valuationMethod: "实物期权法 (Black-Scholes) + 收益分成折现法",
        confidence: "87.5%",
        summary: "发明公开了一种厚度小于 15μm 的无溶剂辊压复合固态电解质膜，室温离子电导率突破 3.2×10⁻³ S/cm，支持高比能全固态动力电池常温快充与针刺安全。",
        checklist: [
          { name: "常温 3C 充放电循环 1500 周容量保持率 >85%", passed: true },
          { name: "宽幅 500mm 连续辊压厚度均匀性公差 (±1.5μm)", passed: false, note: "目前仅完成 200mm 幅宽实验机调试" },
          { name: "针刺短路温升试验 (最高温 <65℃)", passed: true }
        ],
        agentsDebate: [
          {
            agent: "技术壁垒 Agent",
            avatar: "🔬",
            model: "DeepSeek-R1",
            verdict: "工艺壁垒突出 · 无溶剂辊压具备成本优势",
            thought: "无溶剂干法成膜技术具有显著的降本效应，权利要求重点限定了超细石榴石颗粒的原位包覆与剪切分散参数。",
            citation: "对比文件: JP2023548911A"
          },
          {
            agent: "法律与 FTO 风控 Agent",
            avatar: "⚖️",
            model: "Qwen-2.5-72B",
            verdict: "中低风险 (FTO 清洁度 86%)",
            thought: "需注意海外某头部车企固态隔膜的基础专利保护期，本方案从复合添加剂角度实现绕开。",
            citation: "专利防卫分析已存档"
          },
          {
            agent: "商业化与财务 DCF Agent",
            avatar: "📈",
            model: "Qwen-Turbo",
            verdict: "建议中试增资估值 ¥ 5,200 万元",
            thought: "若 500mm 幅宽示范线验证成功，估值可跃升至 1.2 亿元以上。",
            citation: "锂电产业研报 2026"
          },
          {
            agent: "产投协调中枢 (Coordinator)",
            avatar: "✦",
            model: "智策 Consensus Engine",
            verdict: "推荐与头部电池厂共建概念验证中心",
            thought: "建议采取‘股权+里程碑达产回购’协议锁定转化收益。",
            citation: "推荐路径: 联合概念验证"
          }
        ]
      }
    }
  ];

  const handleStartParsing = (name, size, patentData) => {
    setFileName(name);
    setFileSize(size);
    setParsingStep(1);

    setTimeout(() => {
      setParsedData(patentData);
      setParsingStep(2);
    }, 1800);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleStartParsing(file.name, (file.size / 1024 / 1024).toFixed(1) + " MB", samplePresets[0].patent);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleStartParsing(file.name, (file.size / 1024 / 1024).toFixed(1) + " MB", samplePresets[0].patent);
    }
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
        maxWidth: '680px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 22px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f8fafc'
        }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📎</span> 科技成果交底书 / 专利申报文档智能结构化解析
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
              支持 PDF、DOCX、TXT 文档 · 自动抽取技术特征、标的权利要求与成熟度评估
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '18px',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '22px' }}>
          {parsingStep === 0 && (
            <div>
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleFileDrop}
                style={{
                  border: dragActive ? '2px dashed var(--color-navy)' : '2px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '36px 20px',
                  textAlign: 'center',
                  background: dragActive ? '#f0f9ff' : '#f8fafc',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '18px'
                }}
                onClick={() => document.getElementById('patent-file-upload-input').click()}
              >
                <input
                  id="patent-file-upload-input"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                <div style={{ fontSize: '38px', marginBottom: '8px' }}>📄</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                  拖拽交底书文件至此处，或 <span style={{ color: 'var(--color-navy)', textDecoration: 'underline' }}>点击浏览文件</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                  支持国家重点实验室交底书、PCT 国际专利公报、职务成果说明书等 (文件限 50MB)
                </div>
              </div>

              {/* Sample Presets */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                  ⚡ 没有现成文件？可直接选用以下真实重大科技成果交底书样本：
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {samplePresets.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleStartParsing(s.name, s.size, s.patent)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-navy)'; e.currentTarget.style.background = '#f8fafc'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#ffffff'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>📑</span>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>{s.name}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>标的：{s.patent.title.substring(0, 24)}... · 大小：{s.size}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-navy)', background: '#eff6ff', padding: '3px 8px', borderRadius: '4px' }}>
                        选用此成果测试 →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {parsingStep === 1 && (
            <div style={{ textAlign: 'center', padding: '32px 10px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px', animation: 'spin 2s linear infinite' }}>⚙️</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                智策科技成果结构化解析引擎正在运行...
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
                正在解析文件：<strong>{fileName}</strong> ({fileSize})
              </div>

              {/* Progress Steps */}
              <div style={{ maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--signal-green)' }}>
                  <span>✓</span> 提取文档结构与独立权利要求 1~3 (AST 抽象语法树完成)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--signal-green)' }}>
                  <span>✓</span> 检索国家知识产权局 (CNIPA) 及 WIPO 现有技术库 (Prior-Art 比对)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-navy)', fontWeight: 600 }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid var(--color-navy)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                  计算 TRL 技术成熟度与收益法现金流折现估值底价...
                </div>
              </div>
            </div>
          )}

          {parsingStep === 2 && parsedData && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: '#065f46' }}>
                <span>✅</span> 成果交底书结构化解析成功！已提取完整特征并在国家十五五战略图谱中完成定位。
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '10.5px', background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {parsedData.pillarType} · IPC: {parsedData.ipcClass}
                    </span>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
                      {parsedData.title}
                    </h3>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      申请单位：{parsedData.applicant} · {parsedData.patentNo}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>AI 预评估值</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309' }}>
                      {parsedData.valuation}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, background: '#ffffff', padding: '10px 12px', borderRadius: '6px', border: '1px solid #edf2f7', marginTop: '10px' }}>
                  {parsedData.summary}
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11.5px', color: '#64748b' }}>
                  <div>成熟度评级：<strong style={{ color: '#0f172a' }}>{parsedData.trl}</strong></div>
                  <div>置信度：<strong style={{ color: 'var(--signal-green)' }}>{parsedData.confidence}</strong></div>
                  <div>估值模型：<strong style={{ color: '#0f172a' }}>收益现值折现法 (DCF)</strong></div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => setParsingStep(0)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '12px',
                    color: '#475569',
                    cursor: 'pointer'
                  }}
                >
                  重新选择文件
                </button>
                <button
                  onClick={() => {
                    onImportPatent(parsedData);
                    onClose();
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'var(--color-navy)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(15, 23, 42, 0.2)'
                  }}
                >
                  🚀 载入工作台并开启全景研判 →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
