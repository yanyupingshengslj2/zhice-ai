import React, { useState } from 'react';
import MonteCarloModal from '../MonteCarlo/MonteCarloModal';

export const BENCHMARK_PATENTS = [
  // 一、国家“十五五”六大新兴支柱产业
  {
    id: "cpo-chip",
    title: "基于三维晶圆级封装的高密度光电共封 (CPO) 互连架构",
    patentNo: "CN202410882319.4",
    ipcClass: "H01L 25/065",
    pillarType: "新兴支柱 · 集成电路",
    category: "pillar",
    domain: "微电子与算力芯片",
    applicant: "前沿微电子国家重点实验室",
    status: "已授权 / 维持有效",
    trl: "TRL-6 (系统样机中试验证期)",
    baseValuation: 8500, // 万元
    valuation: "¥ 8,500 万元",
    valuationMethod: "收益现值折现法 (DCF) + 实物期权黑-斯科尔斯模型",
    confidence: "91.4%",
    summary: "本发明提出一种硅光共封装三维微凸点互连结构，通过垂直穿透硅通孔 (TSV) 与微流控片上液冷集成，解决 AI 超算中心百 Tbps 交换机芯片光电转换热损耗大与高频寄生电容瓶颈。",
    checklist: [
      { name: "第三方 CMA/CNAS 信号眼图测试报告", passed: true },
      { name: "中试产线连续 1000h 高温高湿无故障运行", passed: true },
      { name: "核心微纳米光纤阵列国产化供应链替代率", passed: false, note: "耦合设备暂依赖进口，自主可控度 72%" }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🔬",
        model: "DeepSeek-R1 (推理内核)",
        verdict: "极高壁垒 · 突破核心瓶颈",
        thought: "检索全球现有技术对比文件（Prior Art），对比 Broadcom 与台积电 COUPE 技术：本专利在独立权利要求 1 中限定的‘波导交错式垂直光栅耦合器’具备显著创造性，插损低于 1.2dB，领先行业中位数 30% 以上。",
        citation: "引用对比文件: US20220197001A1 (区别特征已充分公开并获得充分答辩保护)"
      },
      {
        agent: "法律与侵权风控 Agent",
        avatar: "⚖️",
        model: "Qwen-2.5-72B-Instruct",
        verdict: "低侵权风险 (FTO 清洁度 88%)",
        thought: "在欧亚主要专利池进行了权利要求保护边界自由实施（FTO）检索。未发现完全覆盖的阻碍专利（Blocking Patent）。建议在技术许可合同中补充知识产权抗辩免责条款。",
        citation: "FTO 穿透比对文件: 14 项有效权利要求，未命中侵权预警"
      },
      {
        agent: "商业化与财务 DCF Agent",
        avatar: "📈",
        model: "Qwen-Turbo (财务算力网关)",
        verdict: "爆发期早期 · AI 算力底座核心标的",
        thought: "测算 2026-2028 年全球 1.6T/3.2T 光模块市场渗透率，预估 2027 年中国算力中心光电共封渗透率达 18%。结合重置成本与技术分成率测算：技术分成率取 14.2%，折现率 WACC 取 12.5%，中性估值区间为 7,800万 ~ 9,200 万元。",
        citation: "数据源: 拓墣产业研究院 · 算力基础设施产业联盟 2026 报告"
      },
      {
        agent: "产投协调中枢 (Coordinator)",
        avatar: "✦",
        model: "智策 Consensus Engine",
        verdict: "建议推进 POC 概念验证中试对接",
        thought: "综合各智能体研判：该专利新颖性与成熟度达到产业领投标准。风险点在于微流控封装良率。建议采用‘专利独占许可 + 股债联动’方案，首期技术转让首付款不低于 2,500 万元。",
        citation: "转化实施路径: 挂牌国家知识产权运营公共服务平台"
      }
    ]
  },
  {
    id: "adc-bio",
    title: "靶向抗肿瘤双特异性抗体偶联药物 (ADC) 的合成与表达载体",
    patentNo: "CN202311249088.1",
    ipcClass: "C07K 16/28",
    pillarType: "新兴支柱 · 生物医药",
    category: "pillar",
    domain: "生物医药与靶向治疗",
    applicant: "生物医药前沿创新研究中心",
    status: "已授权",
    trl: "TRL-5 (临床前验证阶段)",
    baseValuation: 4800,
    valuation: "¥ 4,800 万元",
    valuationMethod: "管线里程碑折现法 (rNPV) + 临床前阶段期权定价",
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
        thought: "血浆稳定性突破，半衰期达 14.2 天，优于同类在研竞品 35%。结构修饰规避了原有保护核心，具有独立自主新颖性。",
        citation: "对比文件: WO2021088921"
      },
      {
        agent: "法律与 FTO 风控 Agent",
        avatar: "⚖️",
        model: "Qwen-2.5-72B",
        verdict: "中等风险 · 需规避海外核心序列",
        thought: "主抗体序列在欧洲存在类似保护构型，进入国际多中心临床前建议实施权利要求分割答辩。",
        citation: "FTO 比对: 存在 1 项潜在相关欧洲专利"
      },
      {
        agent: "商业化与财务 DCF Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "估值 ¥ 4,800 万元",
        thought: "管线里程碑折现法测算，二期临床成功率按 28% 折现，现金流覆盖安全。",
        citation: "医药投研数据库: 靶向消化道肿瘤适应症"
      },
      {
        agent: "产投协调中枢 (Coordinator)",
        avatar: "✦",
        model: "智策 Consensus Engine",
        verdict: "建议推进战略医药工业并购",
        thought: "国内双抗赛道竞争激烈，建议由具备 CMC 产能的上市药企进行独占许可实施。",
        citation: "推荐模式: 专利排他许可 + 临床里程碑提成"
      }
    ]
  },
  {
    id: "solid-battery",
    title: "高离子电导率硫化物固态电解质与锂金属阳极界面稳定化技术",
    patentNo: "CN202410332810.X",
    ipcClass: "H01M 10/0562",
    pillarType: "新兴支柱 · 新能源与储能",
    category: "pillar",
    domain: "先进储能材料",
    applicant: "固态化学电源国家工程实验室",
    status: "已授权 / 维持有效",
    trl: "TRL-6 (千次循环中试验证)",
    baseValuation: 12000,
    valuation: "¥ 12,000 万元",
    valuationMethod: "全生命周期现金流折现 + 产业溢价",
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
        thought: "常温离子电导率首次超越电解液水平，彻底解决硫化物遇水产生有毒气体的工业化难题。",
        citation: "测试验证: 国家动力电池检验中心检测"
      },
      {
        agent: "法律与 FTO 风控 Agent",
        avatar: "⚖️",
        model: "Qwen-2.5-72B",
        verdict: "核心母案保护，全球清洁度 94%",
        thought: "优先权日早于海外巨头同类申报，已完成 PCT 国际检索并进入美欧日韩国家阶段。",
        citation: "PCT/CN2024/082110 检索报告通过"
      },
      {
        agent: "商业化与财务 DCF Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "独角兽级估值 ¥ 1.2 亿元",
        thought: "对接低空飞行器与高端电动汽车首期装机订单，按 15 年自由现金流折现测算极具投资性价比。",
        citation: "市场预测: 2028 年半固态/全固态电池渗透率"
      },
      {
        agent: "产投协调中枢 (Coordinator)",
        avatar: "✦",
        model: "智策 Consensus Engine",
        verdict: "极力推荐国家制造业转型基金领投",
        thought: "解决我国下一代战略能源卡脖子环节，具备万亿级产业外溢效应。",
        citation: "投资建议: 增资扩股设立产业化实体"
      }
    ]
  },
  {
    id: "robotics-harmonic",
    title: "高功率密度双摆线谐波减速器与关节力控传感伺服系统",
    patentNo: "CN202410552190.3",
    ipcClass: "F16H 1/32",
    pillarType: "新兴支柱 · 智能机器人",
    category: "pillar",
    domain: "智能机器人与精密传动",
    applicant: "智能机器人精密传动技术研究院",
    status: "已授权 / 维持有效",
    trl: "TRL-7 (批量中试验证阶段)",
    baseValuation: 5400,
    valuation: "¥ 5,400 万元",
    valuationMethod: "重置成本法 + 供应链国产替代溢价系数",
    confidence: "94.6%",
    summary: "针对人形机器人灵巧关节高承载与抗冲击痛点，提出双摆线齿形拓扑优化算法与柔轮梯度渗氮强化工艺，额定扭矩提升 45%，传动背隙小于 1 弧分。",
    checklist: [
      { name: "连续 8000 小时加速疲劳寿命试验", passed: true },
      { name: "关节集成六维力矩传感器动态响应时延 < 1ms", passed: true },
      { name: "单件批量制造 BOM 成本控制在 1800 元以内", passed: true }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🤖",
        model: "DeepSeek-R1",
        verdict: "精密传动核心卡脖子攻关突破",
        thought: "对标哈默纳科（Harmonic Drive）：本专利柔轮材料疲劳极限突破 1200MPa，齿廓重合度达 38%，有效规避海外核心基础专利保护边界。",
        citation: "国家机床精密传动检测中心实测数据"
      },
      {
        agent: "商业化可行性 Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "人形机器人产业链核心卡位",
        thought: "随着具身智能双足机器人进入量产前夜，单机需配置 14-22 台高性能减速器，市场需求年化增长超 150%。",
        citation: "具身智能供应链研究报告 2026"
      }
    ]
  },
  {
    id: "aerospace-rocket",
    title: "百吨级全复用液氧甲烷运载火箭变推力针栓式喷注发动机",
    patentNo: "CN202410773120.5",
    ipcClass: "F02K 9/52",
    pillarType: "新兴支柱 · 商业航天",
    category: "pillar",
    domain: "航空航天与商业运载",
    applicant: "航天推进技术动力国家实验室",
    status: "实质审查中",
    trl: "TRL-6 (全系统长程热试车验证)",
    baseValuation: 12800,
    valuation: "¥ 12,800 万元",
    valuationMethod: "全生命周期研发成本法 + 商业发射折现",
    confidence: "92.5%",
    summary: "提出液氧/甲烷同轴变面积针栓式双向连续变推力喷注器，实现 40%~110% 宽域推力平滑调节，支撑商业运载火箭一子级定点动力垂直软着陆回收。",
    checklist: [
      { name: "连续 500 秒全系统额定推力地面热试车", passed: true },
      { name: "多次点火启动自愈与摇摆伺服控制试验", passed: true },
      { name: "涡轮泵全三维打印轻量化结构探伤达标", passed: true }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🚀",
        model: "DeepSeek-R1",
        verdict: "商业航天动力基石 · 变推力自主攻关",
        thought: "对标 SpaceX Raptor 与蓝色起源 BE-4：针栓式喷注器在燃烧稳定性与低频振荡抑制方面具备独立自主专利群，规避现有海外排他壁垒。",
        citation: "引用对比: US20190338722A1"
      }
    ]
  },
  {
    id: "evtol-lowaltitude",
    title: "倾转旋翼油电混合动力 eVTOL 飞行器涵道推进拓扑气动构型",
    patentNo: "CN202410991823.1",
    ipcClass: "B64C 29/00",
    pillarType: "新兴支柱 · 低空经济",
    category: "pillar",
    domain: "低空经济与先进立体飞行器",
    applicant: "先进航空与低空智能飞行创新中心",
    status: "已授权",
    trl: "TRL-6 (全尺寸验证机试飞达标)",
    baseValuation: 7600,
    valuation: "¥ 7,600 万元",
    valuationMethod: "适航审定管线折现模型 + 城际通勤运力现金流折现",
    confidence: "89.8%",
    summary: "设计涵道矢量旋翼与机翼气动一体化耦合构型，在兼顾垂直起降低噪声要求的同时，巡航气动升阻比突破 14.5，实现 300 公里城际低空航线无补能直达。",
    checklist: [
      { name: "低空风洞气动吹风与倾转过渡状态气动测试", passed: true },
      { name: "民航局 CAAC 特殊适航审定中试试验", passed: true },
      { name: "三冗余线控飞控计算机失效自愈考核", passed: true }
    ],
    agentsDebate: [
      {
        agent: "商业化可行性 Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "万亿级低空基础设施爆发标的",
        thought: "依托全国低空空域管理改革红利，城际无人低空载人交通营运牌照逐步发放，单机生命周期运营净现值测算达 1,200 万元，产业化落地确定性强。",
        citation: "中国民航局 (CAAC) 2026 低空空域发展报告"
      }
    ]
  },
  // 二、国家“十五五”六大未来产业
  {
    id: "quantum-radar",
    title: "基于超导微波量子电路的单光子相干量子雷达探测架构",
    patentNo: "CN202510118832.9",
    ipcClass: "G01S 7/48",
    pillarType: "未来产业 · 量子科技",
    category: "future",
    domain: "量子科技与微波遥感",
    applicant: "量子信息科学国家实验室",
    status: "实审公开",
    trl: "TRL-4 (芯片级实验室原理验证)",
    baseValuation: 6200,
    valuation: "¥ 6,200 万元",
    valuationMethod: "实物期权法 (Black-Scholes) + 国防采购溢价",
    confidence: "87.2%",
    summary: "利用压缩真空态微波光子对的量子纠缠特性，在强电磁干扰和低信噪比环境下实现隐身目标的亚波长分辨率成像，抗截获与防干扰性能提升 4 个数量级。",
    checklist: [
      { name: "稀释制冷机 10mK 超低温连续稳定运行测试", passed: true },
      { name: "暗室环境下隐身雷达截面积 (RCS) 仿真比对", passed: true },
      { name: "室温微波光子变频集成化模块封装", passed: false, note: "目前处于小型化攻关期" }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🔬",
        model: "DeepSeek-R1",
        verdict: "颠覆性前沿国防/民用技术",
        thought: "突破传统经典雷达雷利准则限制，属于不可替代的自主根技术体系。",
        citation: "量子光学物理实验室测试验证"
      }
    ]
  },
  {
    id: "embodied-ai",
    title: "具身智能多模态大模型全身柔性力控协同端到端策略网络",
    patentNo: "CN202510330911.8",
    ipcClass: "G06N 3/00",
    pillarType: "未来产业 · 具身智能",
    category: "future",
    domain: "具身智能与人工智能",
    applicant: "国家人工智能创新战略实验室",
    status: "已授权",
    trl: "TRL-6 (复杂非结构化环境实操通过)",
    baseValuation: 9800,
    valuation: "¥ 9,800 万元",
    valuationMethod: "全场景落地赋能折现 + 平台授权定价",
    confidence: "91.8%",
    summary: "融合视觉-触觉-本体感觉跨模态 Token 统一表征，构建高拟真物理环境与强化学习 Sim-to-Real 零样本迁移架构，实现双臂人形机器人毫米级精细装配动作。",
    checklist: [
      { name: "复杂车间非结构化柔性线束装配成功率 > 99.2%", passed: true },
      { name: "强外力扰动自平衡与步态恢复时延 < 15ms", passed: true },
      { name: "边缘算力卡 30W 超低功耗推理部署通过", passed: true }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🧠",
        model: "DeepSeek-R1",
        verdict: "Sim-to-Real 泛化能力行业标杆",
        thought: "通过世界模型自监督预测对抗，将仿真环境与真实物理接触误差压缩至 2% 以内，彻底打破传统强化学习需要海量人工标定的枷锁。",
        citation: "IEEE Robotics & Automation 会刊论文复现"
      }
    ]
  }
];

export default function Workbench({ user, onLogout }) {
  // Navigation View State: 'nav-agent' | 'nav-reports' | 'nav-tracking' | 'nav-predict' | 'nav-portfolio'
  const [activeTab, setActiveTab] = useState('nav-agent');
  
  // Patent & Category Filter
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'pillar' | 'future'
  const [selectedPatent, setSelectedPatent] = useState(BENCHMARK_PATENTS[0]);
  
  // Interactive DCF Parameters
  const [wacc, setWacc] = useState(12.5); // %
  const [royaltyRate, setRoyaltyRate] = useState(14.2); // %
  const [showMonteCarlo, setShowMonteCarlo] = useState(false);
  const [showUserPopover, setShowUserPopover] = useState(false);

  // Dynamic DCF Valuation calculation
  const dynamicValuation = Math.round(
    selectedPatent.baseValuation * (1 + (royaltyRate - 14.2) * 0.035) / (1 + (wacc - 12.5) * 0.04)
  );

  // Filtered Patents
  const filteredPatents = BENCHMARK_PATENTS.filter(p => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `您好，${user?.name || "专家"}！已接入 Zion 生产级技术转移多智能体集群 (Agent ID: mvj2fqpz)。当前聚焦在【${selectedPatent.title}】。您可以向我询问技术壁垒评级、FTO 侵权风险、DCF 现金流敏感性，或输入您自己的技术命题进行推演！`
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Intelligent Multi-Agent Synthesis Dialog Engine
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatLoading(true);

    setTimeout(() => {
      // Dynamic domain synthesis based on prompt keywords & current patent
      const q = userMsg.toLowerCase();
      let responseText = "";

      if (q.includes("fto") || q.includes("侵权") || q.includes("法律") || q.includes("风险")) {
        responseText = `【⚖️ 法律与 FTO 风控 Agent · 专项研判报告】：
围绕您关心的「${userMsg}」，法律风控模型在欧亚及 CNIPA 核心专利池执行了多维权利要求映射：
1. 保护边界核查：${selectedPatent.title} 核心独立权利要求已构建严密的封闭式保护，当前 PCT 国际检索结论显示无完全重叠的基础阻碍专利（Blocking Patent）；
2. 规避设计建议：建议在后续国际多中心转化实施中，对从属权利要求中的特定工艺参数做分割答辩；
3. 协议排险建议：在技术许可合同中必须载明“第三方知识产权不侵权保证与追偿责任豁免”条款，FTO 综合清洁度评定为 88.5%。`;
      } else if (q.includes("估值") || q.includes("dcf") || q.includes("钱") || q.includes("成本") || q.includes("收益") || q.includes("wacc")) {
        responseText = `【📈 商业化与财务 DCF Agent · 动态量化测算】：
针对您的财务评估指令「${userMsg}」：
1. 白盒 DCF 测算基准：在折现率 WACC = ${wacc}% 与技术分成率 α = ${royaltyRate}% 条件下，模型测算当前基准估值为 ¥ ${dynamicValuation.toLocaleString()} 万元；
2. 敏感性弹性分析：折现率 WACC 每上升 100bps (1%)，估值现值折让约 4.0%；技术分成率 α 每变动 1%，估值变动约 3.5%；
3. 蒙特卡洛 10,000 次模拟校验：P50 估值中位数高度收敛在 ¥ ${dynamicValuation.toLocaleString()} 万元附近，置信度达到 ${selectedPatent.confidence}。`;
      } else if (q.includes("壁垒") || q.includes("技术") || q.includes("创新") || q.includes("参数") || q.includes("芯片") || q.includes("材料")) {
        responseText = `【🔬 技术壁垒 Agent (DeepSeek-R1 推理内核) · 深度穿透分析】：
针对技术命题「${userMsg}」的技术特征拆解：
1. 创新独特性：在「${selectedPatent.title}」中，关键创新在于打破了传统方案的固有物理瓶颈，实测指标领先行业基线 30% 以上；
2. TRL 成熟度证据链：当前处于 ${selectedPatent.trl}，中试验证关键数据（包括第三方 CMA/CNAS 检验与千小时环境考核）均已形成审计闭环；
3. 工艺攻坚焦点：建议项目方在量产前攻坚中试良率与国产供应链替代率，进一步巩固产业护城河。`;
      } else {
        responseText = `【✦ 智策产投协调中枢 (Consensus Engine) · 全景研判】：
多智能体集群已就「${userMsg}」展开协同推演：
• 技术维度：该标的（${selectedPatent.patentNo}）符合国家十五五战略重点导向，技术成熟度已跨越实验室阶段；
• 商业维度：在当前参数设定下动态估值为 ¥ ${dynamicValuation.toLocaleString()} 万元，具备明确的产业承接方与订单空间；
• 建议决策：建议以“技术经理人概念验证专项资助 + 独占实施许可”组合拳推进，首期首付款建议按 25%~30% 锁定以对冲研发不确定性。`;
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
      setChatLoading(false);
    }, 700);
  };

  return (
    <div className="app-container" style={{ width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden' }}>
      
      {/* ==========================================================================
          1. 左侧导航边栏 (Sidebar: Warm Oatmeal)
          ========================================================================== */}
      <aside className="sidebar" style={{
        width: '240px',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-hairline)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        userSelect: 'none',
        zIndex: 20
      }}>
        {/* 头部品牌 */}
        <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-hairline)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-navy)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '13px'
            }}>⚡</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
              TechTransfer.AI <span style={{ fontWeight: 400, opacity: 0.6 }}>(智策)</span>
            </div>
          </div>
          <span style={{ fontSize: '10px', background: 'rgba(29,78,216,0.1)', color: 'var(--color-navy)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
            PREVIEW
          </span>
        </div>

        {/* 5 大核心功能导航链接 */}
        <nav style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('nav-agent')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'nav-agent' ? '#ffffff' : 'transparent',
              color: activeTab === 'nav-agent' ? 'var(--color-navy)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'nav-agent' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: activeTab === 'nav-agent' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🤖</span>
              <span>新建智能研判</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('nav-reports')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'nav-reports' ? '#ffffff' : 'transparent',
              color: activeTab === 'nav-reports' ? 'var(--color-navy)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'nav-reports' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: activeTab === 'nav-reports' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📊</span>
              <span>成果研报库</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('nav-tracking')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'nav-tracking' ? '#ffffff' : 'transparent',
              color: activeTab === 'nav-tracking' ? 'var(--color-navy)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'nav-tracking' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: activeTab === 'nav-tracking' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📈</span>
              <span>人机研判复盘</span>
            </div>
            <span style={{ fontSize: '9px', background: '#fef3c7', color: '#b45309', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
              13:12
            </span>
          </button>

          <button
            onClick={() => setActiveTab('nav-predict')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'nav-predict' ? '#ffffff' : 'transparent',
              color: activeTab === 'nav-predict' ? 'var(--color-navy)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'nav-predict' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: activeTab === 'nav-predict' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎯</span>
              <span>TRL 成熟度预测</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('nav-portfolio')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'nav-portfolio' ? '#ffffff' : 'transparent',
              color: activeTab === 'nav-portfolio' ? 'var(--color-navy)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'nav-portfolio' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: activeTab === 'nav-portfolio' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💼</span>
              <span>POC 概念验证池</span>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>¥1.0亿</span>
          </button>
        </nav>

        {/* 历史研判标的快速跳转 */}
        <div style={{ flex: 1, padding: '12px 14px', overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
            标的成果快捷切换
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {BENCHMARK_PATENTS.slice(0, 6).map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPatent(p);
                  setActiveTab('nav-agent');
                }}
                style={{
                  padding: '7px 8px',
                  borderRadius: '6px',
                  background: selectedPatent.id === p.id && activeTab === 'nav-agent' ? 'rgba(29,78,216,0.08)' : 'transparent',
                  cursor: 'pointer',
                  border: selectedPatent.id === p.id && activeTab === 'nav-agent' ? '1px solid rgba(29,78,216,0.2)' : '1px solid transparent',
                  fontSize: '11.5px',
                  color: selectedPatent.id === p.id && activeTab === 'nav-agent' ? 'var(--color-navy)' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                title={p.title}
              >
                • {p.title}
              </div>
            ))}
          </div>
        </div>

        {/* 侧边栏底部：账户中心与 Popover */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-hairline)', position: 'relative' }}>
          <div
            onClick={() => setShowUserPopover(!showUserPopover)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
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
              {user?.avatarLetter || "技"}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name || "技术经理人"}
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.org || "国家级技术转移示范工作站"}
              </div>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>⚙️</span>
          </div>

          {/* 用户账户弹窗 */}
          {showUserPopover && (
            <div style={{
              position: 'absolute',
              bottom: '56px',
              left: '12px',
              right: '12px',
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid var(--border-hairline)',
              boxShadow: 'var(--shadow-elevated)',
              padding: '12px',
              zIndex: 100
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>账户与权限</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                算力点数：<strong style={{ color: '#b45309' }}>✨ {user?.credits || 100} Credits</strong><br />
                隔离沙箱：<strong style={{ color: 'var(--signal-green)' }}>已挂载 · 零泄密</strong>
              </div>
              <button
                onClick={onLogout}
                style={{
                  width: '100%',
                  padding: '6px',
                  background: '#fee2e2',
                  color: 'var(--signal-red)',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🚪 退出登录
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ==========================================================================
          2. 主工作区视口 (Main Viewport)
          ========================================================================== */}
      <main className="main-viewport" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-canvas)' }}>
        
        {/* 顶部现代化操作条 */}
        <header style={{
          height: '52px',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-hairline)',
          background: 'rgba(235, 231, 223, 0.75)',
          backdropFilter: 'blur(12px)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Zion BaaS 生产节点已直连 (Agent: mvj2fqpz)
            </span>
            <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.05)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
              国家“十五五”重点科技成果转化专项
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '3px 10px',
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
              onClick={() => alert('【TechTransfer.AI (智策) 机构级全景 PRD 规范】\n\n1. 白盒 DCF 估值架构：支持折现率与技术分成率实时敏感性推演；\n2. 4 大多智能体并行研判：DeepSeek-R1 (壁垒)、Qwen-2.5-72B (FTO)、Qwen-Turbo (财务)、Consensus (产投决策)；\n3. 人机对抗研判复盘：以 13:12 专家 vs 智能体对抗存证持续沉淀技术经理人经验！')}
              style={{
                padding: '4px 12px',
                background: '#ffffff',
                border: '1px solid var(--border-hairline)',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              📖 PRD 架构规范
            </button>
          </div>
        </header>

        {/* 视口内容容器 */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>

          {/* ------------------------------------------------------------------
              VIEW 1: 核心尽调工作台 (nav-agent)
              ------------------------------------------------------------------ */}
          {activeTab === 'nav-agent' && (
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr 340px', overflow: 'hidden' }}>
              
              {/* 左栏：十五五战略产业图谱标的列表 */}
              <aside style={{ borderRight: '1px solid var(--border-hairline)', background: 'var(--bg-sidebar)', padding: '14px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  <button
                    onClick={() => setCategoryFilter('all')}
                    style={{
                      flex: 1,
                      padding: '5px 0',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: categoryFilter === 'all' ? '1px solid var(--color-navy)' : '1px solid var(--border-hairline)',
                      background: categoryFilter === 'all' ? '#fff' : 'transparent',
                      color: categoryFilter === 'all' ? 'var(--color-navy)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    全部 ({BENCHMARK_PATENTS.length})
                  </button>
                  <button
                    onClick={() => setCategoryFilter('pillar')}
                    style={{
                      flex: 1,
                      padding: '5px 0',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: categoryFilter === 'pillar' ? '1px solid var(--color-navy)' : '1px solid var(--border-hairline)',
                      background: categoryFilter === 'pillar' ? '#fff' : 'transparent',
                      color: categoryFilter === 'pillar' ? 'var(--color-navy)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    战略支柱
                  </button>
                  <button
                    onClick={() => setCategoryFilter('future')}
                    style={{
                      flex: 1,
                      padding: '5px 0',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: categoryFilter === 'future' ? '1px solid var(--color-navy)' : '1px solid var(--border-hairline)',
                      background: categoryFilter === 'future' ? '#fff' : 'transparent',
                      color: categoryFilter === 'future' ? 'var(--color-navy)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    未来产业
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {filteredPatents.map(p => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPatent(p)}
                      style={{
                        padding: '11px',
                        borderRadius: '8px',
                        border: selectedPatent.id === p.id ? '2px solid var(--color-navy)' : '1px solid var(--border-hairline)',
                        background: selectedPatent.id === p.id ? '#ffffff' : 'rgba(255,255,255,0.65)',
                        cursor: 'pointer',
                        boxShadow: selectedPatent.id === p.id ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '3px' }}>
                        {p.pillarType}
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, lineHeight: 1.35, color: 'var(--text-primary)', marginBottom: '5px' }}>
                        {p.title}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <code>{p.ipcClass}</code>
                        <span style={{ fontWeight: 700, color: '#b45309' }}>{p.valuation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              {/* 中栏：专利深度交底、白盒 DCF 估值公式与 4 大 Agent 并行对抗辩论 */}
              <main style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* 标的概览卡片 */}
                <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-hairline)', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {selectedPatent.pillarType} · {selectedPatent.ipcClass}
                      </span>
                      <h1 style={{ fontSize: '17px', fontWeight: 800, margin: '8px 0 4px', color: '#0f172a' }}>
                        {selectedPatent.title}
                      </h1>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        专利公开号: {selectedPatent.patentNo} · 申请单位: {selectedPatent.applicant} · {selectedPatent.trl}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6, background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', margin: 0 }}>
                    {selectedPatent.summary}
                  </p>
                </div>

                {/* 白盒 DCF 估值公式与参数敏感性推演卡片 */}
                <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-hairline)', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📐</span> 白盒收益法 (DCF) 现金流折现量化估值模型
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                        公式：V₀ = ∑ [CF_t · α / (1 + WACC)^t] + [TV / (1 + WACC)^n]
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>实时灵敏度测算估值</div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-navy)' }}>
                        ¥ {dynamicValuation.toLocaleString()} 万元
                      </div>
                    </div>
                  </div>

                  {/* 交互滑块：WACC 与技术分成率 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', marginBottom: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        <span>加权平均资本成本 (WACC 折现率)</span>
                        <span style={{ color: 'var(--color-navy)' }}>{wacc}%</span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="18"
                        step="0.5"
                        value={wacc}
                        onChange={(e) => setWacc(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                      />
                      <div style={{ fontSize: '10.5px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                        <span>8% (低风险)</span>
                        <span>12.5% (中性)</span>
                        <span>18% (高风险)</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        <span>技术分成率 (Royalty Rate α)</span>
                        <span style={{ color: '#b45309' }}>{royaltyRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="0.5"
                        value={royaltyRate}
                        onChange={(e) => setRoyaltyRate(parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                      />
                      <div style={{ fontSize: '10.5px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                        <span>5% (初创期)</span>
                        <span>14.2% (高壁垒专利)</span>
                        <span>25% (平台垄断)</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      蒙特卡洛 10,000 次随机抽样置信度：<strong style={{ color: 'var(--signal-green)' }}>{selectedPatent.confidence}</strong>
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
                      🎲 展开蒙特卡洛 10,000 次仿真
                    </button>
                  </div>
                </div>

                {/* TRL 成熟度证据链清单 */}
                <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-hairline)', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                    🎯 TRL 成熟度关键工程核验证据项
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedPatent.checklist?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{item.passed ? '✅' : '⚠️'}</span>
                          <span style={{ fontWeight: 600, color: item.passed ? '#0f172a' : '#b45309' }}>{item.name}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: item.passed ? 'var(--signal-green)' : '#b45309', fontWeight: 700 }}>
                          {item.passed ? '核验通过' : (item.note || '中试待攻关')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 大 Agent 并行对抗辩论 */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>⚔️</span> 4 大多智能体对抗辩论推演 (Zion BaaS mvj2fqpz 驱动)
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {selectedPatent.agentsDebate?.map((a, idx) => (
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
                          <span style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b', padding: '2px 6px', borderRadius: '4px' }}>
                            {a.model}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d4ed8', marginBottom: '6px' }}>
                          结论: {a.verdict}
                        </div>
                        <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.55, marginBottom: '8px' }}>
                          {a.thought}
                        </div>
                        {a.citation && (
                          <div style={{ fontSize: '10.5px', color: '#94a3b8', borderTop: '1px dashed #e2e8f0', paddingTop: '6px' }}>
                            📌 {a.citation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </main>

              {/* 右栏：Zion AI Agent 实时研判交互 */}
              <aside style={{ borderLeft: '1px solid var(--border-hairline)', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-hairline)', background: '#f8fafc' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                    💬 Zion Agent 研判推演终端
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Agent ID: mvj2fqpz · 多智能体协同问答
                  </div>
                </div>

                <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {chatMessages.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '90%',
                        padding: '10px 14px',
                        borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                        background: m.sender === 'user' ? 'var(--color-navy)' : '#f8fafc',
                        color: m.sender === 'user' ? '#ffffff' : '#1e293b',
                        fontSize: '12px',
                        lineHeight: 1.6,
                        border: m.sender === 'user' ? 'none' : '1px solid var(--border-hairline)',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {m.text}
                    </div>
                  ))}
                  {chatLoading && (
                    <div style={{ alignSelf: 'flex-start', padding: '10px 14px', background: '#f8fafc', borderRadius: '10px', fontSize: '11.5px', color: '#64748b' }}>
                      ⏳ 4 大 Agent 正在检索全球专利库并测算现金流...
                    </div>
                  )}
                </div>

                {/* 快捷推荐提问胶囊 */}
                <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border-hairline)', background: '#fafafa', display: 'flex', gap: '6px', overflowX: 'auto' }}>
                  <button
                    onClick={() => {
                      setChatInput('分析该技术的法律 FTO 侵权风险与海外规避空间');
                    }}
                    style={{ padding: '4px 8px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    ⚖️ 查 FTO 侵权
                  </button>
                  <button
                    onClick={() => {
                      setChatInput('重新以折现率 WACC=14% 测算保守情形下的估值');
                    }}
                    style={{ padding: '4px 8px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    📈 测现金流折现
                  </button>
                  <button
                    onClick={() => {
                      setChatInput('拆解独立权利要求 1 的核心技术壁垒与创造性');
                    }}
                    style={{ padding: '4px 8px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    🔬 拆技术壁垒
                  </button>
                </div>

                {/* 对话输入框 */}
                <form onSubmit={handleSendChat} style={{ padding: '12px', borderTop: '1px solid var(--border-hairline)', display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="输入问题或技术交底书文本..."
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-hairline)',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={chatLoading}
                    style={{
                      padding: '8px 14px',
                      background: 'var(--color-navy)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    发送
                  </button>
                </form>
              </aside>
            </div>
          )}

          {/* ------------------------------------------------------------------
              VIEW 2: 成果研报库 (nav-reports)
              ------------------------------------------------------------------ */}
          {activeTab === 'nav-reports' && (
            <div style={{ flex: 1, padding: '30px 40px', overflowY: 'auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📑</div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                  TechTransfer 转化研报库
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  所有在智能研判中完成的尽调评估，均已自动沉淀为机构级投资备忘录与技术尽调底稿。
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
                {BENCHMARK_PATENTS.map(p => (
                  <div key={p.id} style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '4px' }}>
                      {p.pillarType}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                      估值基准：<strong>{p.valuation}</strong> · 成熟度：<strong>{p.trl}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setSelectedPatent(p);
                          setActiveTab('nav-agent');
                        }}
                        style={{ flex: 1, padding: '6px', background: 'var(--color-navy)', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        展开研判
                      </button>
                      <button
                        onClick={() => alert(`已生成【${p.title}】机构级投资备忘录 (HTML/PDF 存证编号: TT-${p.id}-2026)`)}
                        style={{ padding: '6px 12px', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '11.5px', cursor: 'pointer' }}
                      >
                        📥 导出备忘录
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------
              VIEW 3: 判断复盘与人机对抗 (nav-tracking)
              ------------------------------------------------------------------ */}
          {activeTab === 'nav-tracking' && (
            <div style={{ flex: 1, padding: '24px 30px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
                  技术经理人 VS 智策 AI 判断复盘 (13:12 对抗存证)
                </h2>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  记录每一次科技成果转化判断，跟踪中试与商业化后续表现，复盘人机分歧，让尽调经验不断复利。
                </p>
              </div>

              {/* 三联比对看板 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: '16px', marginBottom: '24px' }}>
                {/* 专家看板 */}
                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>技</div>
                      <span style={{ fontWeight: 700, fontSize: '13px' }}>技术经理人团队</span>
                    </div>
                    <span style={{ fontSize: '11px', background: '#ecfdf5', color: 'var(--signal-green)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                      命中率 92.5%
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
                    <div><div style={{ fontSize: '18px', fontWeight: 800 }}>24</div><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>研判总数</div></div>
                    <div><div style={{ fontSize: '18px', fontWeight: 800 }}>18</div><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>已中试</div></div>
                    <div><div style={{ fontSize: '18px', fontWeight: 800 }}>16</div><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>估值达标</div></div>
                    <div><div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--signal-green)' }}>+34%</div><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>IRR回报</div></div>
                  </div>
                </div>

                {/* AI 看板 */}
                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>✦</span>
                      <span style={{ fontWeight: 700, fontSize: '13px' }}>智策 AI 多智能体</span>
                    </div>
                    <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                      命中率 89.1%
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
                    <div><div style={{ fontSize: '18px', fontWeight: 800 }}>24</div><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>研判总数</div></div>
                    <div><div style={{ fontSize: '18px', fontWeight: 800 }}>18</div><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>已中试</div></div>
                    <div><div style={{ fontSize: '18px', fontWeight: 800 }}>15</div><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>估值达标</div></div>
                    <div><div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--signal-green)' }}>+28%</div><div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>IRR回报</div></div>
                  </div>
                </div>

                {/* 分歧对比 */}
                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    ⚖️ 人机对抗比分
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                    <div>
                      <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--color-navy)' }}>13</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>专家胜出</div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#94a3b8' }}>VS</div>
                    <div>
                      <div style={{ fontSize: '26px', fontWeight: 900, color: '#b45309' }}>12</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>AI 胜出</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 标的复盘表格 */}
              <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-hairline)', color: '#64748b' }}>
                      <th style={{ padding: '10px 14px' }}>战略硬科技标的</th>
                      <th style={{ padding: '10px 14px' }}>产业赛道</th>
                      <th style={{ padding: '10px 14px' }}>成熟度</th>
                      <th style={{ padding: '10px 14px' }}>参考估值</th>
                      <th style={{ padding: '10px 14px' }}>置信度</th>
                      <th style={{ padding: '10px 14px' }}>中试状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BENCHMARK_PATENTS.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>{p.title}</td>
                        <td style={{ padding: '10px 14px' }}><code>{p.pillarType}</code></td>
                        <td style={{ padding: '10px 14px', color: 'var(--signal-green)', fontWeight: 600 }}>{p.trl.split(' ')[0]}</td>
                        <td style={{ padding: '10px 14px', fontWeight: 700, color: '#b45309' }}>{p.valuation}</td>
                        <td style={{ padding: '10px 14px' }}>{p.confidence}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ fontSize: '11px', background: '#ecfdf5', color: 'var(--signal-green)', padding: '2px 6px', borderRadius: '4px' }}>
                            验证通过
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------
              VIEW 4: TRL 成熟度预测 (nav-predict)
              ------------------------------------------------------------------ */}
          {activeTab === 'nav-predict' && (
            <div style={{ flex: 1, padding: '24px 30px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
                  TRL 技术成熟度演进与风险敏感性预测
                </h2>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  对标工信部《重大技术装备评定》与 NASA 9级标准，通过 10,000 次蒙特卡洛模拟穿透中试失败率与技术贬值曲线。
                </p>
              </div>

              {/* 4 维指标卡 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>跨标的综合成熟度</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-navy)', margin: '4px 0' }}>TRL-5.8</div>
                  <div style={{ fontSize: '11px', color: '#b45309' }}>中试攻坚临界期</div>
                </div>

                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>蒙特卡洛达产概率</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--signal-green)', margin: '4px 0' }}>84.2%</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>置信区间 78.5% ~ 89.6%</div>
                </div>

                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>中试跨越周期</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#b45309', margin: '4px 0' }}>14.6 个月</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>较传统转化提速 45%</div>
                </div>

                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>预测估值提升空间</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#2563eb', margin: '4px 0' }}>+ 42.8%</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>TRL 每跃迁一级溢价 +15%</div>
                </div>
              </div>

              {/* TRL 底稿表格 */}
              <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-hairline)', color: '#64748b' }}>
                      <th style={{ padding: '10px 14px' }}>标的成果</th>
                      <th style={{ padding: '10px 14px' }}>当前等级</th>
                      <th style={{ padding: '10px 14px' }}>目标等级</th>
                      <th style={{ padding: '10px 14px' }}>达产成功率</th>
                      <th style={{ padding: '10px 14px' }}>预计周期</th>
                      <th style={{ padding: '10px 14px' }}>关键工程失效点 (FMEA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BENCHMARK_PATENTS.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 700 }}>{p.title}</td>
                        <td style={{ padding: '10px 14px', color: '#b45309', fontWeight: 700 }}>{p.trl.split(' ')[0]}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--signal-green)', fontWeight: 700 }}>TRL-8 (产线)</td>
                        <td style={{ padding: '10px 14px', fontWeight: 700 }}>88.5%</td>
                        <td style={{ padding: '10px 14px' }}>12 个月</td>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>中试产线连续稳定性与良率</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------
              VIEW 5: POC 概念验证池 (nav-portfolio)
              ------------------------------------------------------------------ */}
          {activeTab === 'nav-portfolio' && (
            <div style={{ flex: 1, padding: '24px 30px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
                  概念验证 (POC) 与先导中试基金池
                </h2>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>
                  高校科技成果转化先导基金虚拟持仓 · 动态追踪概念验证无偿资助撬动硬科技产业资本杠杆。
                </p>
              </div>

              {/* 4 维基金指标卡 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>先导基金总盘子规模</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-navy)', margin: '4px 0' }}>¥ 10,000 万元</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>专项用于 TRL-3 至 TRL-6</div>
                </div>

                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>已拨付中试资助</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#b45309', margin: '4px 0' }}>¥ 4,200 万元</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>到位率 100%</div>
                </div>

                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>撬动产业资本杠杆</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--signal-green)', margin: '4px 0' }}>1 : 5.8</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>¥ 2.43 亿元认购意向</div>
                </div>

                <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>虚拟期权增值倍数</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#7c3aed', margin: '4px 0' }}>+ 38.5% IRR</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>技术作价入股股权浮盈</div>
                </div>
              </div>

              {/* 资金里程碑拨付表 */}
              <div style={{ background: '#fff', border: '1px solid var(--border-hairline)', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-hairline)', color: '#64748b' }}>
                      <th style={{ padding: '10px 14px' }}>在孵标的名称</th>
                      <th style={{ padding: '10px 14px' }}>资助额度</th>
                      <th style={{ padding: '10px 14px' }}>拨付进度</th>
                      <th style={{ padding: '10px 14px' }}>阶段关键指标 (KPI)</th>
                      <th style={{ padding: '10px 14px' }}>转化状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BENCHMARK_PATENTS.slice(0, 4).map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 700 }}>{p.title}</td>
                        <td style={{ padding: '10px 14px' }}>¥ {1200 + i * 300} 万元</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ fontWeight: 700 }}>{75 - i * 5}%</span>
                          <div style={{ width: '80px', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginTop: '3px' }}>
                            <div style={{ width: `${75 - i * 5}%`, height: '100%', background: 'var(--signal-green)', borderRadius: '2px' }}></div>
                          </div>
                        </td>
                        <td style={{ padding: '10px 14px', color: '#64748b' }}>完成工程样机台架测试与三方 CMA 检验报告</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ fontSize: '11px', background: '#ecfdf5', color: 'var(--signal-green)', padding: '2px 6px', borderRadius: '4px' }}>
                            中试冲刺
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 蒙特卡洛随机模拟弹窗 */}
      {showMonteCarlo && (
        <MonteCarloModal
          patent={selectedPatent}
          onClose={() => setShowMonteCarlo(false)}
        />
      )}
    </div>
  );
}
