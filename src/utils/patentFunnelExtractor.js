/**
 * 双阶漏斗科技成果交底书结构化抽取器 (Two-Stage Patent Funnel Extractor)
 * 阶段一：正则状态机锚点定位（权利要求 1~5、摘要、发明目的与技术效果）
 * 阶段二：启发式滑动窗口与必要技术特征密度加权兜底（针对非标格式交底书）
 */

// 常见硬科技领域与 IPC 分类映射表
const IPC_DOMAIN_RULES = [
  {
    keywords: ['深度学习', '复杂网络', '图神经网络', 'gnn', '大模型', '神经网络', '智能算力', '拓扑', '拓扑网络'],
    ipc: 'G06N 3/08 (机器学习与复杂网络拓扑计算)',
    pillar: '战略支柱 · 新一代人工智能与算力网络',
    domain: '新一代人工智能与复杂网络',
    defaultValuation: 4800,
    applicant: '复杂网络与智能计算国家重点实验室'
  },
  {
    keywords: ['芯片', '光电', '微电子', '半导体', '硅光', '微流控', '光栅', 'cpo', '垂直波导'],
    ipc: 'H01L 23/473 (集成电路微流道与光互连)',
    pillar: '战略支柱 · 集成电路与硅光',
    domain: '微电子与光互联芯片',
    defaultValuation: 6800,
    applicant: '国家先进光子技术创新联合体'
  },
  {
    keywords: ['电池', '固态', '电解质', '储能', '锂电', '正极', '隔膜', '辊压'],
    ipc: 'H01M 10/0565 (固态电池电解质及电极工艺)',
    pillar: '新兴支柱 · 新能源与储能',
    domain: '新能源动力电池与固态储能',
    defaultValuation: 5200,
    applicant: '动力电池材料工程技术研究中心'
  },
  {
    keywords: ['靶点', '抗体', 'mrna', '生物医药', '小分子', '抑制剂', '基因', '蛋白质'],
    ipc: 'C07K 16/28 (靶向单克隆抗体及药物)',
    pillar: '战略支柱 · 生物医药与精准诊疗',
    domain: '创新生物医药',
    defaultValuation: 5800,
    applicant: '国家分子医学转化科学中心'
  },
  {
    keywords: ['机器人', '具身智能', '端到端', '关节', '伺服', '机械臂', '触觉传感'],
    ipc: 'B25J 9/16 (机器人程序与具身感知控制)',
    pillar: '未来产业 · 具身智能与智能机器人',
    domain: '具身智能与仿生机器人',
    defaultValuation: 4500,
    applicant: '机器人国家工程研究中心'
  }
];

export function extractPatentFunnelPayload(rawContent = '', fileName = '') {
  const cleanFileName = fileName.replace(/\.[^/.]+$/, '').trim();
  const text = (rawContent || '').replace(/\r\n/g, '\n').trim();

  // 1. 标题提取 (Title Extraction)
  let extractedTitle = cleanFileName;
  if (!extractedTitle || extractedTitle.length < 3) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 4);
    extractedTitle = lines[0]?.replace(/^[#*【】\s]+|[#*【】\s]+$/g, '') || "前沿科技成果交底书";
  }

  // 2. 领域与 IPC 自动匹配 (Domain & IPC Inference)
  const fullContextForMatch = (cleanFileName + ' ' + text.slice(0, 3000)).toLowerCase();
  let matchedRule = IPC_DOMAIN_RULES.find(rule => 
    rule.keywords.some(kw => fullContextForMatch.includes(kw))
  );

  if (!matchedRule) {
    matchedRule = {
      ipc: 'G06F 30/20 (工业与工程物理智能建模)',
      pillar: '战略前沿 · 自主硬核技术创新',
      domain: '交叉工程与自主硬核科技',
      defaultValuation: 4200,
      applicant: '高校工业技术研究院 / 国家重点实验室'
    };
  }

  // 3. 阶段一：正则状态机定位【权利要求书】
  let claimsPayload = '';
  let extractionMethod = 'AST_Regex_StateMachine';

  const claimsRegex = /(?:【权利要求书】|权利要求书|权\s*利\s*要\s*求)([\s\S]*?)(?:【说明书】|【具体实施方式】|说明书详细实施|具体实施方式|附图说明|$)/i;
  const claimsMatch = text.match(claimsRegex);

  if (claimsMatch && claimsMatch[1].trim().length > 40) {
    const rawClaims = claimsMatch[1].trim();
    // 截取第 1 项至第 5 项权利要求
    const splitClaims = rawClaims.split(/(?=\n\s*[2-6]\s*[\.、])/);
    claimsPayload = splitClaims.slice(0, 4).join('\n').slice(0, 1600);
  } else {
    // 阶段二：启发式滑动窗口与特征密度加权兜底
    extractionMethod = 'Heuristic_Sliding_Window_Fallback';
    const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 20);

    const scoredParagraphs = paragraphs.map(p => {
      let score = 0;
      if (p.includes('其特征在于')) score += 5;
      if (p.includes('包括以下步骤') || p.includes('包括：') || p.includes('包括:')) score += 4;
      if (p.includes('技术方案')) score += 3;
      if (p.includes('发明目的') || p.includes('技术效果')) score += 3;
      if (p.includes('系统') || p.includes('装置') || p.includes('模块')) score += 2;
      return { text: p, score };
    }).sort((a, b) => b.score - a.score);

    if (scoredParagraphs.length > 0 && scoredParagraphs[0].score >= 3) {
      claimsPayload = scoredParagraphs.slice(0, 3).map(p => p.text).join('\n\n---\n\n').slice(0, 1600);
    } else {
      // 极限保底：取全文前序有效技术文本
      claimsPayload = text.slice(0, 1500) || `标的名称：《${extractedTitle}》关键自主技术路线交底书载荷。`;
    }
  }

  // 4. 抽取发明目的与技术效果
  const effectRegex = /(?:技术效果|有益效果|发明目的|达到如下有益效果)([\s\S]*?)(?:具体实施方式|附图说明|\n\s*\n|$)/i;
  const effectMatch = text.match(effectRegex);
  if (effectMatch && effectMatch[1].trim().length > 10) {
    claimsPayload += "\n\n【核心发明效果与性能指标】:\n" + effectMatch[1].trim().slice(0, 350);
  }

  // 5. 组装输入至 Zion Agent1 的标准 7 大入参
  const zionInputArgs = {
    patent_title: extractedTitle,
    claims_payload: claimsPayload,
    ipc_classification: matchedRule.ipc,
    strategic_pillar: matchedRule.pillar,
    claimed_trl: "TRL-6",
    financial_assumptions: `折现率 WACC=11.8%，技术分成率 Gamma=25%，预测期 5 年自由现金流`,
    eval_mode: "Strict_Hedge_Fund_Audit"
  };

  return {
    zionInputArgs,
    meta: {
      domain: matchedRule.domain,
      applicant: matchedRule.applicant,
      defaultValuation: matchedRule.defaultValuation,
      extractionMethod,
      fidelityScore: extractionMethod === 'AST_Regex_StateMachine' ? 0.94 : 0.88,
      payloadCharCount: claimsPayload.length
    }
  };
}
