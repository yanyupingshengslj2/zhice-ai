/**
 * TechTransfer.AI (智策) - 国家“十五五”战略硬科技金标成果数据库 (V4.0 十五五战略版)
 * 架构：六大新兴支柱产业 + 六大未来产业
 * 体系：十五五战略产业大类 + WIPO IPC 国际专利主分类号双轨映射
 */

window.ZHICE_BENCHMARK_DATA = [
  // =========================================================================
  // 一、国家“十五五”六大新兴支柱产业 (Pillar Strategic Industries)
  // =========================================================================
  {
    id: "cpo-chip",
    title: "基于三维晶圆级封装的高密度光电共封 (CPO) 互连架构",
    patentNo: "CN202410882319.4",
    ipcClass: "H01L 25/065",
    pillarType: "新兴支柱产业 · 集成电路",
    type: "发明专利",
    domain: "微电子与算力芯片",
    applicant: "前沿微电子国家重点实验室",
    status: "已授权 / 维持有效",
    trl: "TRL-6 (系统样机中试验证期)",
    valuation: "¥ 8,500 万元",
    valuationMethod: "收益现值折现法 (DCF) + 实物期权黑-斯科尔斯模型 (Black-Scholes)",
    confidence: "91.4%",
    tokenUsage: "8,420 Tokens (成本 ¥0.038)",
    latency: "28s (5 Agent 并发辩论)",
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
        thought: "检索全球现有技术对比文件（Prior Art），对比 Broadcom 与台积电 COUPE 技术：本专利在独立权利要求 1 中限定的‘波导交错式垂直光栅耦合器’具备显著创造性，插损低于 1.2dB，领先行业中位数 30%。",
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
        agent: "商业化可行性 Agent",
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
    pillarType: "新兴支柱产业 · 生物医药",
    type: "发明专利",
    domain: "生物医药与靶向治疗",
    applicant: "生物医药前沿创新研究中心",
    status: "已授权",
    trl: "TRL-5 (临床前验证阶段)",
    valuation: "¥ 4,800 万元",
    valuationMethod: "管线里程碑折现法 (rNPV) + 临床前阶段期权定价",
    confidence: "88.6%",
    tokenUsage: "7,110 Tokens (成本 ¥0.032)",
    latency: "24s (4 Agent 并发研判)",
    summary: "本专利设计了一种新型定点酶促偶联连接子（Cleavable Linker），实现高 DAR 值（药物抗体偶联比）均一性，克服传统 ADC 药物在血液循环中过早脱落导致的心脏毒性副反应。",
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
        thought: "专利在血浆稳定性上实现突破，半衰期达 14.2 天，优于同类在研竞品 35%。结构修饰规避了原有保护核心，具有独立自主新颖性。",
        citation: "对比文件: WO2021088921"
      },
      {
        agent: "商业化可行性 Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "高估值 · 临床 II 期出海潜力",
        thought: "全球双抗 ADC 授权交易中位数为首付款 3,000 万美元 + 里程碑 5 亿美元。目前处于 IND-enabling 阶段，建议由创新药企受让并主导国内 I 期临床推进。",
        citation: "数据源: Nature Reviews Drug Discovery 2025 ADC Deals"
      }
    ]
  },
  {
    id: "battery-solid",
    title: "高能量密度全固态锂电池原位固化聚合电解质复合隔膜",
    patentNo: "CN202410339812.8",
    ipcClass: "H01M 10/052",
    pillarType: "新兴支柱产业 · 新型储能",
    type: "发明专利",
    domain: "新能源与先进储能",
    applicant: "动力电池与先进储能材料实验室",
    status: "实质审查中",
    trl: "TRL-7 (工程样品完成中试台架验证)",
    valuation: "¥ 6,200 万元",
    valuationMethod: "市场法参照系数修正 + 重置成本法",
    confidence: "93.1%",
    tokenUsage: "9,050 Tokens (成本 ¥0.041)",
    latency: "31s (5 Agent 并发推演)",
    summary: "通过原位注入单体在电极界面完成超分子自组装固化，消除传统硫化物电解质易水解产生剧毒硫化氢的痛点，常温离子电导率突破 1.2×10⁻³ S/cm。",
    checklist: [
      { name: "10Ah 软包电芯针刺与过充热失控不起火测试", passed: true },
      { name: "常温 0.5C 循环 1500 周容量保持率 > 85%", passed: true },
      { name: "Roll-to-Roll 双面涂布宽幅 800mm 连续生产", passed: true }
    ],
    agentsDebate: [
      {
        agent: "产业对接 Agent",
        avatar: "🏭",
        model: "DeepSeek-R1",
        verdict: "量产适配性极佳 · 产线兼容度 80%",
        thought: "原位固化工艺无需重资产投入千级洁净干燥室，可复用现有锂电池隔膜涂布机与注液产线，大幅降低电池制造厂的技术切换门槛（CAPEX 节省约 65%）。",
        citation: "产线比对: 头部动力电池厂现有辊压与注液设备兼容性"
      }
    ]
  },
  {
    id: "robotics-harmonic",
    title: "高功率密度双摆线谐波减速器与关节力控传感伺服系统",
    patentNo: "CN202410552190.3",
    ipcClass: "F16H 1/32",
    pillarType: "新兴支柱产业 · 智能机器人",
    type: "发明专利",
    domain: "智能机器人与精密传动",
    applicant: "智能机器人精密传动技术研究院",
    status: "已授权 / 维持有效",
    trl: "TRL-7 (批量中试验证阶段)",
    valuation: "¥ 5,400 万元",
    valuationMethod: "重置成本法 + 供应链国产替代溢价系数",
    confidence: "94.6%",
    tokenUsage: "7,880 Tokens (成本 ¥0.035)",
    latency: "26s (5 Agent 并发研判)",
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
        citation: "比对机构: 国家机床精密传动检测中心实测数据"
      }
    ]
  },
  {
    id: "aerospace-rocket",
    title: "百吨级全复用液氧甲烷运载火箭变推力针栓式喷注发动机",
    patentNo: "CN202410773120.5",
    ipcClass: "F02K 9/52",
    pillarType: "新兴支柱产业 · 航空航天",
    type: "发明专利",
    domain: "航空航天与可重复使用运载",
    applicant: "航天推进技术动力国家实验室",
    status: "实质审查中",
    trl: "TRL-6 (全系统长程热试车验证)",
    valuation: "¥ 12,800 万元",
    valuationMethod: "全生命周期研发成本法 + 商业发射折现",
    confidence: "92.5%",
    tokenUsage: "8,920 Tokens (成本 ¥0.040)",
    latency: "29s (5 Agent 并发研判)",
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
        citation: "引用对比: US20190338722A1 (区别技术特征已实现全冗余自主保护)"
      }
    ]
  },
  {
    id: "evtol-lowaltitude",
    title: "倾转旋翼油电混合动力 eVTOL 飞行器涵道推进拓扑气动构型",
    patentNo: "CN202410991823.1",
    ipcClass: "B64C 29/00",
    pillarType: "新兴支柱产业 · 低空经济",
    type: "发明专利",
    domain: "低空经济与先进立体飞行器",
    applicant: "先进航空与低空智能飞行创新中心",
    status: "已授权",
    trl: "TRL-6 (全尺寸验证机试飞达标)",
    valuation: "¥ 7,600 万元",
    valuationMethod: "适航审定管线折现模型 + 城际通勤运力现金流折现",
    confidence: "89.8%",
    tokenUsage: "7,500 Tokens (成本 ¥0.034)",
    latency: "25s (4 Agent 并发研判)",
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
        citation: "数据源: 中国民用航空局 (CAAC) 2026 低空空域发展报告"
      }
    ]
  },

  // =========================================================================
  // 二、国家“十五五”六大未来产业 (Future Strategic Frontiers)
  // =========================================================================
  {
    id: "quantum-radar",
    title: "基于超导微波量子电路的单光子相干量子雷达探测架构",
    patentNo: "CN202510118832.9",
    ipcClass: "G01S 7/48",
    pillarType: "未来产业 · 量子科技",
    type: "发明专利",
    domain: "量子科技与微波精密探测",
    applicant: "量子科学与技术国家实验室",
    status: "实质审查中",
    trl: "TRL-4 (芯片级实验室原理样机验证)",
    valuation: "¥ 9,200 万元",
    valuationMethod: "实物期权复合二叉树模型 (Binomial Options)",
    confidence: "87.3%",
    tokenUsage: "9,400 Tokens (成本 ¥0.042)",
    latency: "32s (5 Agent 并发推演)",
    summary: "通过约瑟夫森参量放大器产生微波纠缠光子对，利用量子照射协议（Quantum Illumination）在强背景杂波与强电磁对抗环境中实现对微弱隐身目标的超灵敏探测。",
    checklist: [
      { name: "毫开尔文稀释制冷机下连续 72h 相干纠缠保持", passed: true },
      { name: "微波暗室隐身材料散射截面增强信噪比实测", passed: true },
      { name: "室温接收机微波-光子相干变频转换效率 > 45%", passed: false, note: "目前处于单通道转换攻关期" }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🔬",
        model: "DeepSeek-R1",
        verdict: "量子探测革命性突破 · 战略先发优势",
        thought: "本发明突破经典雷达香农信道容量限制，在低截获概率与抗干扰能力上比传统相控阵雷达提升两个数量级，独立权利要求覆盖约瑟夫森行波混频器关键设计。",
        citation: "对比文件: IEEE Transactions on Quantum Engineering 2025"
      }
    ]
  },
  {
    id: "bci-neural",
    title: "高导电柔性微米级植入式神经微电极阵列与闭环神经解码芯片",
    patentNo: "CN202510226491.7",
    ipcClass: "A61B 5/04",
    pillarType: "未来产业 · 脑机接口",
    type: "发明专利",
    domain: "脑机接口与神经工程",
    applicant: "脑科学与类脑计算前沿创新研究院",
    status: "实质审查中",
    trl: "TRL-5 (灵长类动物活体闭环实验通过)",
    valuation: "¥ 6,800 万元",
    valuationMethod: "临床转化风险调整净现值法 (rNPV)",
    confidence: "90.7%",
    tokenUsage: "8,100 Tokens (成本 ¥0.036)",
    latency: "27s (4 Agent 并发研判)",
    summary: "采用高分子聚酰亚胺与碳纳米管复合微丝，单根电极线径小于 5 微米，集成 1024 通道超低功耗片上峰电位检测与神经放电滤波专用集成电路 (ASIC)。",
    checklist: [
      { name: "猕猴活体运动皮层神经元信号长期植入相容性", passed: true },
      { name: "皮层组织慢性炎症与神经胶质细胞包包裹抑制测试", passed: true },
      { name: "NMPA 创新医疗器械特别审查绿色通道申报", passed: true }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🧠",
        model: "DeepSeek-R1",
        verdict: "微米级柔性植入全球领先水平",
        thought: "对标 Neuralink N1 芯片：本专利电极材料生物相容性更佳，柔性模量与脑组织软质弹性完全匹配，阻抗降低 40%，有效规避血管损伤。",
        citation: "对比文献: Nature Biomedical Engineering 2025"
      }
    ]
  },
  {
    id: "hydrogen-aem",
    title: "兆瓦级高通量阴离子交换膜 (AEM) 电解水制氢膜电极组件",
    patentNo: "CN202410221940.6",
    ipcClass: "C25B 1/04",
    pillarType: "未来产业 · 氢能与核聚变",
    type: "发明专利",
    domain: "绿色氢能与脱碳材料",
    applicant: "低碳洁净能源国家研究中心",
    status: "实质审查中",
    trl: "TRL-6 (百千瓦级工业电堆实测)",
    valuation: "¥ 3,900 万元",
    valuationMethod: "平准化制氢成本 (LCOH) 敏感性折现法",
    confidence: "90.2%",
    tokenUsage: "6,400 Tokens (成本 ¥0.029)",
    latency: "22s (4 Agent 并发推演)",
    summary: "采用非氟化主链与季铵化交联网络，在保持强碱耐受性的同时，彻底摆脱铱、铂等贵金属催化剂依赖，电解电流密度达到 2.0 A/cm² @ 1.8V。",
    checklist: [
      { name: "0.1M KOH 环境下连续运行 3000 小时衰减率 < 2%", passed: true },
      { name: "非贵金属镍铁水滑石催化剂规模化涂布稳定性", passed: true },
      { name: "电堆冷启动升温时效满足风光电波动匹配要求", passed: true }
    ],
    agentsDebate: [
      {
        agent: "产业对接 Agent",
        avatar: "🏭",
        model: "DeepSeek-R1",
        verdict: "绿氢降本关键催化标的",
        thought: "制氢电解槽单方资本开支可由 PEM 的 8000 元/Nm³ 降至 2500 元/Nm³，对可再生能源弃风弃光就地制氢具有极高商业吸引力。",
        citation: "数据源: 中国氢能联盟 (CHA) 2026 产业蓝皮书"
      }
    ]
  },
  {
    id: "bio-pha",
    title: "用于全降解微藻基聚羟基脂肪酸酯 (PHA) 的高产工程菌株合成生物选育",
    patentNo: "CN202410668210.4",
    ipcClass: "C12N 1/21",
    pillarType: "未来产业 · 生物制造",
    type: "发明专利",
    domain: "合成生物与绿色生物制造",
    applicant: "合成生物技术前沿研发实验室",
    status: "已授权",
    trl: "TRL-5 (吨级发酵罐中试达标)",
    valuation: "¥ 4,500 万元",
    valuationMethod: "绿色生物基材料重置成本替代法",
    confidence: "91.5%",
    tokenUsage: "7,200 Tokens (成本 ¥0.033)",
    latency: "24s (4 Agent 并发研判)",
    summary: "利用 CRISPR 代谢通路靶向重编程技术，改造嗜盐极端微生物底盘，使其可直接利用工业有机废气与微藻提取物高效合成可完全生物降解的 PHA 塑料，合成产率提升 85%。",
    checklist: [
      { name: "吨级非灭菌连续开放式发酵稳定性测试", passed: true },
      { name: "海洋与土壤自然降解周期实测低于 180 天", passed: true },
      { name: "高分子结晶度与熔指达到注塑级工业标准", passed: true }
    ],
    agentsDebate: [
      {
        agent: "商业化可行性 Agent",
        avatar: "📈",
        model: "Qwen-Turbo",
        verdict: "限塑令与碳中和强驱动新兴产业",
        thought: "开放式发酵免去高压灭菌环节，生产成本比传统合成生物 PHA 下降 42%，在高端医用材料与绿色包装领域具备数百亿市场置换空间。",
        citation: "数据源: 国际合成生物制造产业联盟 2026 年报"
      }
    ]
  },
  {
    id: "embodied-ai",
    title: "端到端跨具身多模态物理大模型与灵巧触觉仿生手关节系统",
    patentNo: "CN202510339011.0",
    ipcClass: "B25J 9/16",
    pillarType: "未来产业 · 具身智能",
    type: "发明专利",
    domain: "具身智能与仿生机器人",
    applicant: "具身智能人形机器人创新联合体",
    status: "实质审查中",
    trl: "TRL-6 (千次工业精密装配验证)",
    valuation: "¥ 8,800 万元",
    valuationMethod: "无形资产超额收益分成模型 (Royalty Relief Method)",
    confidence: "93.4%",
    tokenUsage: "8,600 Tokens (成本 ¥0.039)",
    latency: "28s (5 Agent 并发推演)",
    summary: "提出视觉-触觉-本体感觉跨模态自监督物理表征网络，配合集成压阻/电容双重触觉阵列的 24 自由度仿生灵巧手，实现对异形脆弱工件的零样本自适应抓取与高精插拔。",
    checklist: [
      { name: "微米级触觉空间分辨率与法向力/切向力解耦测试", passed: true },
      { name: "千次电子元器件精密柔顺装配成功率 > 99.2%", passed: true },
      { name: "端到端推断延时控制在 15ms 以内 (满足实时闭环)", passed: true }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "🤖",
        model: "DeepSeek-R1",
        verdict: "实体 AI 核心突破 · 具身智能第一梯队",
        thought: "摆脱传统基于规则设定的刚性编程，实现物理世界泛化操作。算法结合仿生手硬件构型形成紧密防御专利池，具备极高技术壁垒。",
        citation: "对比文献: Science Robotics 2025 封面成果"
      }
    ]
  },
  {
    id: "telecom-6g",
    title: "太赫兹超大规模超表面相控阵天线与通感算一体化射频前端",
    patentNo: "CN202510447192.8",
    ipcClass: "H01Q 21/06",
    pillarType: "未来产业 · 第六代移动通信 (6G)",
    type: "发明专利",
    domain: "6G 通信与太赫兹射频",
    applicant: "新一代移动通信无线网络国家实验室",
    status: "实质审查中",
    trl: "TRL-5 (室外百米太赫兹通感一体化试验通过)",
    valuation: "¥ 10,500 万元",
    valuationMethod: "标准必要专利 (SEP) 许可费基数收益折现法",
    confidence: "89.1%",
    tokenUsage: "9,100 Tokens (成本 ¥0.041)",
    latency: "30s (5 Agent 并发推演)",
    summary: "采用动态可重构超表面 (RIS) 与硅基太赫兹集成芯片，在 0.3THz 频段实现 Tbps 级无线通信传输，同时兼具亚毫米级三维空间全景成像与运动雷达感知功能。",
    checklist: [
      { name: "太赫兹频段 100Gbps 实时单载波无线传输连通", passed: true },
      { name: "通感一体化波形正交无串扰外场测定", passed: true },
      { name: "CMOS 工艺射频芯片噪声系数低于 8dB", passed: true }
    ],
    agentsDebate: [
      {
        agent: "技术壁垒 Agent",
        avatar: "📡",
        model: "DeepSeek-R1",
        verdict: "6G 国际标准必要专利候选",
        thought: "将通信与雷达感知波形深度融合，利用超表面降低射频功耗 70%，在 ITU-R 6G 关键指标框架下具备国际标准主导权。",
        citation: "标准提案: 3GPP 6G Study Item Proposal 2026"
      }
    ]
  }
];
