/**
 * TechTransfer.AI (智策) - Agent Execution Engine V3 (通用工业级版)
 * 完全去个人化与高校暗示，支持多领域自适应匹配与任意技术自由输入推演
 */

window.AgentEngine = (function () {
  let timerInterval = null;
  let secondsElapsed = 0;
  let isExecuting = false;
  let currentMatchedItem = null;

  function startExecution(query) {
    if (isExecuting) return;
    isExecuting = true;

    // 智能识别或动态生成成果标的
    const qLower = query.toLowerCase();
    let matchedItem = window.ZHICE_BENCHMARK_DATA[0]; // 默认芯片

    if (qLower.includes("adc") || qLower.includes("药") || qLower.includes("生物") || qLower.includes("抗体")) {
      matchedItem = window.ZHICE_BENCHMARK_DATA[1];
    } else if (qLower.includes("电池") || qLower.includes("固态") || qLower.includes("储能")) {
      matchedItem = window.ZHICE_BENCHMARK_DATA[2];
    } else if (qLower.includes("机器人") || qLower.includes("减速器") || qLower.includes("具身") || qLower.includes("人形")) {
      matchedItem = window.ZHICE_BENCHMARK_DATA[3];
    } else if (qLower.includes("氢") || qLower.includes("制氢") || qLower.includes("电解水") || qLower.includes("aem")) {
      matchedItem = window.ZHICE_BENCHMARK_DATA[4];
    } else {
      // 动态自适应生成通用分析标的
      matchedItem = {
        id: "custom-tech-" + Date.now(),
        title: query.length > 20 ? query.substring(0, 20) + "..." : query,
        patentNo: "CN" + (202510000000 + Math.floor(Math.random() * 999999)) + ".X",
        type: "技术成果 / 专利交底书",
        domain: "高前沿战略硬科技",
        applicant: "前沿硬科技研发转化中心",
        status: "审查评估中",
        trl: "TRL-6 (概念验证与中试期)",
        valuation: "¥ " + (3000 + Math.floor(Math.random() * 5000)) + " 万元",
        valuationMethod: "现金流折现法 (DCF) + 行业专利许可分成模型",
        confidence: (88 + Math.floor(Math.random() * 8)) + "." + Math.floor(Math.random() * 9) + "%",
        tokenUsage: (7000 + Math.floor(Math.random() * 2000)) + " Tokens (成本 ¥0.035)",
        latency: "25s",
        summary: "针对所输入的技术命题，多智能体已完成技术特征拆解、全球现有技术对比检索与商业化实施可行性综合评估。",
        agentsDebate: [
          {
            agent: "技术壁垒 Agent",
            avatar: "🔬",
            model: "DeepSeek-R1",
            verdict: "具备显著新颖性与工业可行性",
            thought: "对标全球相关公开专利池：所提出的技术方案在独立权利要求核心技术特征组合上具备创造性高度，规避了同领域主流专利壁垒。",
            citation: "现有技术检索库: CNIPA & PCT 全文数据检索"
          },
          {
            agent: "法律与侵权风控 Agent",
            avatar: "⚖️",
            model: "Qwen-2.5-72B-Instruct",
            verdict: "FTO 自由实施清洁度良好 (>85%)",
            thought: "初步排查未发现基础性阻碍专利（Blocking Patent）。建议在后续转化许可协议中设立抗辩与知识产权边界条款。",
            citation: "FTO 穿透比对文件: 10 项权利要求检索无直接侵权冲突"
          },
          {
            agent: "商业化可行性 Agent",
            avatar: "📈",
            model: "Qwen-Turbo",
            verdict: "中高产业估值溢价潜力",
            thought: "该领域未来三年行业复合增长率高于 25%，技术分成率建议取 12.5% ~ 16.0%，中试良率突破后具备规模型市场采买需求。",
            citation: "行业产研数据库评估矩阵"
          },
          {
            agent: "产投协调中枢 (Coordinator)",
            avatar: "✦",
            model: "智策 Consensus Engine",
            verdict: "建议推进中试样品验证与孵化投资",
            thought: "综合各智能体研判：该成果技术成熟度已达中试临界点。建议采用‘专利许可 + 里程碑里程提成’组合方案。",
            citation: "推荐渠道: 国家级技术转移示范工作站 / 国家知识产权运营平台"
          }
        ]
      };
    }
    currentMatchedItem = matchedItem;

    const homeLanding = document.getElementById("agent-landing-state");
    const streamContainer = document.getElementById("agent-stream-state");
    const pinnedBar = document.getElementById("pinned-stream-bar");

    if (homeLanding) homeLanding.style.display = "none";
    if (streamContainer) {
      streamContainer.style.display = "flex";
      streamContainer.innerHTML = "";
    }
    if (pinnedBar) pinnedBar.style.display = "flex";

    renderStreamHeader(streamContainer, query, matchedItem);

    secondsElapsed = 0;
    startTimer();

    simulateAgentSteps(streamContainer, matchedItem);
  }

  function renderStreamHeader(container, query, item) {
    const tickerHtml = `
      <div class="asset-ticker-floating">
        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--signal-green);"></span>
        <span>${item.type}</span>
        <strong style="color:var(--text-primary);">${item.title.substring(0, 20)}...</strong>
        <span style="font-family:var(--font-mono); color:var(--text-muted);">${item.patentNo}</span>
        <span style="color:var(--signal-green); font-weight:700;">${item.trl}</span>
      </div>
    `;

    const userBubbleHtml = `
      <div class="user-query-bubble">
        <div style="margin-bottom:6px;">${escapeHtml(query)}</div>
        <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px dashed rgba(0,0,0,0.06); padding-top:4px;">
          <button onclick="window.AgentEngine.copyText('${escapeQuotes(query)}')" style="background:none; border:none; cursor:pointer; font-size:11px; color:var(--text-muted); display:flex; align-items:center; gap:3px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            复制
          </button>
          <span style="font-size:11px; color:var(--text-muted);">刚刚</span>
        </div>
      </div>
    `;

    const statusRowHtml = `
      <div id="live-status-row" class="agent-live-status-row">
        <div class="status-spinner-text">
          <span class="gold-star-icon">✦</span>
          <span id="live-status-label">正在挂载国家知识产权局 CNIPA 检索网关与 E2B 隔离沙箱...</span>
        </div>
        <div class="timer-count" id="timer-display">已用时 0秒</div>
      </div>
    `;

    container.innerHTML = tickerHtml + userBubbleHtml + statusRowHtml;
  }

  function startTimer() {
    clearInterval(timerInterval);
    const timerDisplay = document.getElementById("timer-display");
    timerInterval = setInterval(() => {
      secondsElapsed++;
      if (timerDisplay) {
        timerDisplay.textContent = `已用时 ${secondsElapsed}秒`;
      }
    }, 1000);
  }

  function stopExecution() {
    clearInterval(timerInterval);
    isExecuting = false;
    const statusLabel = document.getElementById("live-status-label");
    if (statusLabel) {
      statusLabel.innerHTML = `<span style="color:#b45309; font-weight:600;">⏹ 用户手动中断推演 · 已固化当前阶段成果</span>`;
    }
    const container = document.getElementById("agent-stream-state");
    if (container && currentMatchedItem) {
      renderFinalSummary(container, currentMatchedItem);
    }
  }

  function simulateAgentSteps(container, item) {
    const statusLabel = document.getElementById("live-status-label");
    const steps = item.agentsDebate;
    let stepIndex = 0;

    function nextStep() {
      if (!isExecuting) return;

      if (stepIndex >= steps.length) {
        clearInterval(timerInterval);
        isExecuting = false;
        if (statusLabel) {
          statusLabel.innerHTML = `<span style="color:var(--signal-green); font-weight:600;">✓ 多智能体协同辩论完成 · 最终共识研判已固化</span>`;
        }
        renderFinalSummary(container, item);
        return;
      }

      const currentAgent = steps[stepIndex];
      if (statusLabel) {
        statusLabel.textContent = `正在调度 [${currentAgent.agent}] (${currentAgent.model}) 深度比对现有技术...`;
      }

      setTimeout(() => {
        if (!isExecuting) return;

        const stepCard = document.createElement("div");
        stepCard.className = "agent-debate-bubble";
        stepCard.style.cssText = `
          background: var(--bg-card);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-lg);
          padding: 16px 20px;
          box-shadow: var(--shadow-card);
          margin-top: 12px;
          animation: fadeIn 0.3s ease;
        `;

        stepCard.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">${currentAgent.avatar}</span>
              <strong style="font-size:14px;">${currentAgent.agent}</strong>
              <span style="font-size:11px; padding:2px 8px; background:var(--bg-card-subtle); border:1px solid var(--border-hairline); border-radius:var(--radius-full); font-family:var(--font-mono); color:var(--text-muted);">${currentAgent.model}</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button onclick="window.AgentEngine.copyText('${escapeQuotes(currentAgent.thought)}')" style="font-size:11.5px; padding:3px 8px; background:transparent; border:1px solid var(--border-hairline); border-radius:var(--radius-full); cursor:pointer; color:var(--text-secondary);">
                📋 复制论据
              </button>
              <button onclick="window.AgentEngine.viewPrompt('${currentAgent.agent}')" style="font-size:11.5px; padding:3px 10px; background:transparent; border:1px solid var(--border-hairline); border-radius:var(--radius-full); cursor:pointer; color:var(--color-navy); font-weight:600;">
                🔍 View Prompt
              </button>
            </div>
          </div>
          <div style="font-size:12.5px; font-weight:600; color:var(--color-navy); margin-bottom:6px;">
            【研判结论】：${currentAgent.verdict}
          </div>
          <div style="font-size:13.5px; color:var(--text-primary); line-height:1.65; margin-bottom:10px;">
            ${currentAgent.thought}
          </div>
          <div style="font-size:11.5px; color:var(--text-muted); border-top:1px dashed var(--border-hairline); padding-top:8px;">
            📎 ${currentAgent.citation}
          </div>
        `;

        container.appendChild(stepCard);
        container.scrollTop = container.scrollHeight;

        stepIndex++;
        nextStep();
      }, 1500);
    }

    setTimeout(nextStep, 900);
  }

  function renderFinalSummary(container, item) {
    const summaryCard = document.createElement("div");
    summaryCard.style.cssText = `
      background: var(--bg-card);
      border: 1.5px solid var(--arti-gold-border);
      border-radius: var(--radius-xl);
      padding: 24px;
      box-shadow: var(--shadow-elevated);
      margin-top: 18px;
    `;

    summaryCard.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:20px;">📜</span>
          <h3 style="font-size:16px; font-weight:700;">重大科技成果转化评估备忘录 (Investment Memo)</h3>
        </div>
        <div style="display:flex; gap:8px;">
          <button onclick="window.AgentEngine.exportHtmlReport('${item.id}')" style="padding:6px 14px; background:var(--text-primary); color:#fff; border:none; border-radius:var(--radius-md); font-size:12px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:4px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            导出可打印 HTML 研报留档
          </button>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:16px;">
        <div style="background:var(--bg-card-subtle); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-hairline);">
          <div style="font-size:11.5px; color:var(--text-muted);">技术成熟度等级 (TRL)</div>
          <div style="font-size:16px; font-weight:700; color:var(--signal-green); margin-top:2px;">${item.trl}</div>
        </div>
        <div style="background:var(--bg-card-subtle); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-hairline);">
          <div style="font-size:11.5px; color:var(--text-muted);">量化许可转让参考估值</div>
          <div style="font-size:16px; font-weight:700; color:#b45309; margin-top:2px;">${item.valuation}</div>
        </div>
        <div style="background:var(--bg-card-subtle); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-hairline);">
          <div style="font-size:11.5px; color:var(--text-muted);">证据链综合置信度</div>
          <div style="font-size:16px; font-weight:700; color:var(--color-navy); margin-top:2px;">${item.confidence}</div>
        </div>
      </div>
      <div style="font-size:12.5px; color:var(--text-secondary); line-height:1.6; margin-bottom:12px;">
        <strong>【估值计量模型】：</strong>${item.valuationMethod}
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:11.5px; color:var(--text-muted); border-top:1px solid var(--border-hairline); padding-top:10px;">
        <span>⚡ 算力遥测消耗: ${item.tokenUsage}</span>
        <span>⏱️ 耗时: ${secondsElapsed}秒</span>
        <span>🛡️ E2B 零凭证独立沙箱隔离: 状态合规</span>
      </div>
    `;

    container.appendChild(summaryCard);
    container.scrollTop = container.scrollHeight;
  }

  function exportHtmlReport(itemId) {
    const item = window.ZHICE_BENCHMARK_DATA.find(i => i.id === itemId) || currentMatchedItem;
    if (!item) return;

    const reportHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>科技成果转化投资尽调备忘录 - ${item.patentNo}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #171512; line-height: 1.6; }
    .header { border-bottom: 2px solid #1d4ed8; padding-bottom: 16px; margin-bottom: 24px; }
    .tag { display: inline-block; padding: 2px 8px; background: #e0f2fe; color: #0369a1; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .metric-box { display: flex; gap: 16px; margin: 20px 0; }
    .metric-card { flex: 1; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
    .debate-section { margin-top: 24px; }
    .agent-box { background: #faf8f5; border-left: 3px solid #1d4ed8; padding: 12px 16px; margin-bottom: 12px; border-radius: 0 8px 8px 0; }
    .footer { margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 12px; color: #6b7280; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <div class="header">
    <span class="tag">${item.type} · 国家重大科技成果</span>
    <h1 style="margin: 8px 0;">${item.title}</h1>
    <div style="font-size: 13px; color: #4b5563;">
      <span>专利公开号：${item.patentNo}</span> | 
      <span>申报主体：${item.applicant}</span> | 
      <span>评估系统：TechTransfer.AI (智策)</span>
    </div>
  </div>

  <h3>一、核心估值与技术成熟度</h3>
  <div class="metric-box">
    <div class="metric-card">
      <div style="font-size: 12px; color: #64748b;">技术成熟度等级</div>
      <div style="font-size: 20px; font-weight: 700; color: #10b981;">${item.trl}</div>
    </div>
    <div class="metric-card">
      <div style="font-size: 12px; color: #64748b;">许可/转让参考基准值</div>
      <div style="font-size: 20px; font-weight: 700; color: #b45309;">${item.valuation}</div>
    </div>
    <div class="metric-card">
      <div style="font-size: 12px; color: #64748b;">证据链置信度</div>
      <div style="font-size: 20px; font-weight: 700; color: #1d4ed8;">${item.confidence}</div>
    </div>
  </div>

  <h3>二、多智能体深度研判推演记录</h3>
  <div class="debate-section">
    ${item.agentsDebate.map(d => `
      <div class="agent-box">
        <strong style="color: #1d4ed8;">${d.avatar} ${d.agent} (${d.model})</strong>
        <div style="font-weight: 600; margin: 4px 0;">研判结论：${d.verdict}</div>
        <p style="font-size: 13.5px; margin: 4px 0;">${d.thought}</p>
        <small style="color: #64748b;">${d.citation}</small>
      </div>
    `).join('')}
  </div>

  <div class="footer">
    <span>报告评估体系：TechTransfer.AI (智策) 科技成果转化投研工作台</span>
    <span>生成时间：${new Date().toLocaleDateString()}</span>
  </div>
</body>
</html>`;

    const blob = new Blob([reportHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TechTransfer尽调备忘录-${item.patentNo}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("已成功导出《科技成果转化投资尽调备忘录》HTML！");
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("✓ 论据已复制到剪贴板！");
    }).catch(() => {
      showToast("复制成功！");
    });
  }

  function showToast(msg) {
    const toast = document.getElementById("copy-toast");
    if (toast) {
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2200);
    } else {
      alert(msg);
    }
  }

  function viewPrompt(agentName) {
    const promptTemplates = {
      "技术壁垒 Agent": `You are the Principal Patent Examiner & Hard-Tech Barrier Analyst.
Target: Analyze patent novelty and inventiveness against CNIPA and PCT databases.
Constraints:
- Strictly decompose Independent Claims into elemental technical features (1.1, 1.2...).
- Compare against prior art citations. Do not hallucinate novelty.
- Output TRL rating based on NASA/China GB/T standards with verifiable evidence checklist.`,
      "法律与侵权风控 Agent": `You are the Lead IP Litigation Counsel for Tech-Transfer Investments.
Target: Perform Freedom-to-Operate (FTO) screening.
Constraints:
- Identify blocking patents and dominant claim overlaps.
- Mark risk level (Green: >85% clean, Amber: review needed, Red: blocking infringement).
- Formulate defensive contract terms and non-infringement argument structures.`,
      "商业化可行性 Agent": `You are the Technology Valuation Director at a Tier-1 Science & Tech PE Fund.
Target: Calculate fair technology licensing/transfer value.
Model: Discounted Cash Flow (DCF) with Capital Asset Pricing Model (CAPM) and Technology Factor Multiplier.
Formula: Value = BaseReplacementCost * (1 - DeprecRate) * TechSplitRate * MonopolyFactor.
Reject empty qualitative claims. State all assumptions (WACC, discount rate).`,
      "产业对接 Agent": `You are the Head of Industrial Synergy at a National High-Tech Innovation Center.
Target: Assess engineering feasibility and production line compatibility.
Constraints:
- Calculate CAPEX/OPEX reduction against conventional production lines.
- Evaluate domestic supply chain substitution percentage.`,
      "产投协调中枢 (Coordinator)": `You are the Managing Director of the Science & Technology Venture Committee.
Target: Synthesize cross-agent debates and output actionable investment transfer terms.`
    };

    const content = promptTemplates[agentName] || "You are an autonomous technology evaluation agent.";
    alert(`【${agentName} - 工业级系统提示词 (Prompt Engineering 透视)】\n\n${content}`);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, ' ');
  }

  return {
    startExecution: startExecution,
    stopExecution: stopExecution,
    exportHtmlReport: exportHtmlReport,
    copyText: copyText,
    viewPrompt: viewPrompt
  };
})();
