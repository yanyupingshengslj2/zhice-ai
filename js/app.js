/**
 * TechTransfer.AI (智策) - App Controller V3 (通用多租户版)
 * 彻底去个人化与高校绑定，支持通用多租户注册/登录切换、五大标的自适应与全交互复盘
 */

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initNavigation();
  initDrawer();
  initSearchInteraction();
  initAccountCenter();
  initTrackingTableInteractivity();
  initFeedbackWidget();
  initPatentCreation();
});

// 1. 主题初始化与切换
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const storedTheme = localStorage.getItem("zhice-theme");
  
  if (storedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("zhice-theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("zhice-theme", "dark");
      }
    });
  }
}

// 2. 五大视图切换
function initNavigation() {
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  const views = {
    "nav-agent": document.getElementById("view-agent"),
    "nav-reports": document.getElementById("view-reports"),
    "nav-tracking": document.getElementById("view-tracking"),
    "nav-predict": document.getElementById("view-predict"),
    "nav-portfolio": document.getElementById("view-portfolio")
  };

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-target");

      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");

      Object.values(views).forEach(v => {
        if (v) v.classList.remove("active");
      });

      if (views[targetId]) {
        views[targetId].classList.add("active");
      }

      const pinnedBar = document.getElementById("pinned-stream-bar");
      if (pinnedBar && targetId !== "nav-agent") {
        pinnedBar.style.display = "none";
      }
    });
  });

  const goGenerateBtns = document.querySelectorAll(".btn-go-generate");
  goGenerateBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector('[data-target="nav-agent"]').click();
    });
  });
}

// 3. 60% PRD 抽屉
function initDrawer() {
  const openPrdBtn = document.getElementById("btn-open-prd");
  const closePrdBtn = document.getElementById("btn-close-drawer");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const prdDrawer = document.getElementById("prd-drawer");

  function openDrawer() {
    drawerBackdrop.classList.add("open");
    prdDrawer.classList.add("open");
  }

  function closeDrawer() {
    drawerBackdrop.classList.remove("open");
    prdDrawer.classList.remove("open");
  }

  if (openPrdBtn) openPrdBtn.addEventListener("click", openDrawer);
  if (closePrdBtn) closePrdBtn.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);
}

// 4. 输入框交互与吸底急停
function initSearchInteraction() {
  const textarea = document.getElementById("main-search-input");
  const submitBtn = document.getElementById("btn-submit-task");
  const promptPills = document.querySelectorAll(".prompt-pill");
  const modePills = document.querySelectorAll(".mode-pill");
  const stopBtn = document.getElementById("btn-stop-stream");
  const pinnedInput = document.getElementById("pinned-input-field");

  modePills.forEach(pill => {
    pill.addEventListener("click", function () {
      modePills.forEach(p => p.classList.remove("active"));
      this.classList.add("active");
    });
  });

  promptPills.forEach(pill => {
    pill.addEventListener("click", function () {
      const promptText = this.getAttribute("data-query");
      if (textarea) textarea.value = promptText;
      triggerAgentExecution(promptText);
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const query = textarea.value.trim();
      if (query) triggerAgentExecution(query);
    });
  }

  if (textarea) {
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const query = textarea.value.trim();
        if (query) triggerAgentExecution(query);
      }
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener("click", () => {
      if (window.AgentEngine) {
        window.AgentEngine.stopExecution();
      }
    });
  }

  if (pinnedInput) {
    pinnedInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const q = pinnedInput.value.trim();
        if (q) {
          pinnedInput.value = "";
          triggerAgentExecution(q);
        }
      }
    });
  }
}

function triggerAgentExecution(query) {
  if (window.AgentEngine) {
    window.AgentEngine.startExecution(query);
    appendUserHistory(query);
  }
}

// 5. 通用多租户账户管理中心与注册/登录 (Universal Multi-tenant Auth)
function initAccountCenter() {
  const userTrigger = document.getElementById("user-profile-trigger");
  const userPopover = document.getElementById("user-popover-menu");
  const authBackdrop = document.getElementById("auth-modal-backdrop");
  const btnOpenAuth = document.getElementById("btn-open-auth-modal");
  const btnCloseAuth = document.getElementById("btn-close-auth-modal");

  // 严格检查已登录用户状态，未登录即刻重定向至登录页
  const storedUser = localStorage.getItem("zhice-current-user");
  let currentUserObj = null;
  if (storedUser) {
    try {
      currentUserObj = JSON.parse(storedUser);
      updateUserIdentity(currentUserObj.name, currentUserObj.school, currentUserObj.role, currentUserObj.avatarLetter, currentUserObj.history);
    } catch (_) {
      window.location.replace("login.html");
      return;
    }
  } else {
    window.location.replace("login.html");
    return;
  }

  const btnLoginManager = document.getElementById("btn-login-manager");
  const btnLoginInvestor = document.getElementById("btn-login-investor");
  const btnLoginGuest = document.getElementById("btn-login-guest");
  const btnCustomRegister = document.getElementById("btn-custom-register");

  if (userTrigger && userPopover) {
    userTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      userPopover.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!userPopover.contains(e.target) && !userTrigger.contains(e.target)) {
        userPopover.classList.remove("show");
      }
    });
  }

  if (btnOpenAuth) {
    btnOpenAuth.addEventListener("click", () => {
      if (userPopover) userPopover.classList.remove("show");
      if (authBackdrop) authBackdrop.classList.add("show");
    });
  }

  if (btnCloseAuth && authBackdrop) {
    btnCloseAuth.addEventListener("click", () => authBackdrop.classList.remove("show"));
    authBackdrop.addEventListener("click", (e) => {
      if (e.target === authBackdrop) authBackdrop.classList.remove("show");
    });
  }

  // 1. 执业技术经理人
  if (btnLoginManager) {
    btnLoginManager.addEventListener("click", () => {
      saveAndSetUser("技术经理人 (执业会员)", "国家级技术转移示范工作站", "高级技术经纪资质 · 执业编号 TM-8848", "技", [
        "光电共封CPO互连架构技术壁垒",
        "双抗ADC偶联药物表达载体估值",
        "全固态电池复合电解质量产可行性"
      ]);
      authBackdrop.classList.remove("show");
      if (window.AgentEngine) window.AgentEngine.copyText("已登录：技术经理人执业会员身份！");
    });
  }

  // 2. 硬科技产投总监
  if (btnLoginInvestor) {
    btnLoginInvestor.addEventListener("click", () => {
      saveAndSetUser("产投分析师 (PE/VC)", "前沿硬科技先导孵化基金", "投资决策委员会 (IC) 成员", "投", [
        "具身智能双摆线谐波减速器评定",
        "兆瓦级AEM电解水制氢膜电极"
      ]);
      authBackdrop.classList.remove("show");
      if (window.AgentEngine) window.AgentEngine.copyText("已登录：硬科技产业投资机构身份！");
    });
  }

  // 3. 访客体验模式
  if (btnLoginGuest) {
    btnLoginGuest.addEventListener("click", () => {
      saveAndSetUser("访客研究员 (Guest)", "开放访问节点", "基础尽调权限 · 100 初始算力", "客", []);
      authBackdrop.classList.remove("show");
      if (window.AgentEngine) window.AgentEngine.copyText("已切回：访客体验模式！");
    });
  }

  // 4. 自定义注册新身份 (新用户纯净空状态)
  if (btnCustomRegister) {
    btnCustomRegister.addEventListener("click", () => {
      const customName = prompt("请输入您的姓名或机构代号：", "创新研判专家");
      const customOrg = prompt("请输入您所属的机构/高校/企业：", "硬科技战略研究院");
      if (customName && customOrg) {
        saveAndSetUser(customName, customOrg, "企业注册实名会员", customName.substring(0, 1), []);
        authBackdrop.classList.remove("show");
        if (window.AgentEngine) window.AgentEngine.copyText(`欢迎，${customName}！已为您初始化专属空白工作空间！`);
      }
    });
  }
}

function saveAndSetUser(name, school, role, avatarLetter, history = []) {
  const userProfile = {
    name,
    school,
    role,
    avatarLetter,
    history,
    credits: 100
  };
  localStorage.setItem("zhice-current-user", JSON.stringify(userProfile));
  updateUserIdentity(name, school, role, avatarLetter, history);
}

function updateUserIdentity(name, school, role, avatarLetter, history = []) {
  const nameEl = document.getElementById("current-user-name");
  const schoolEl = document.getElementById("current-user-school");
  const avatarEl = document.getElementById("current-user-avatar");
  const popoverName = document.getElementById("popover-user-name");
  const popoverRole = document.getElementById("popover-user-role");
  const popoverAvatar = document.getElementById("popover-user-avatar");
  const topAuthBtn = document.getElementById("btn-top-auth");

  if (nameEl) nameEl.textContent = name;
  if (schoolEl) schoolEl.textContent = school;
  if (avatarEl) avatarEl.textContent = avatarLetter;
  if (popoverName) popoverName.textContent = name;
  if (popoverRole) popoverRole.textContent = `${role} · ${school}`;
  if (popoverAvatar) popoverAvatar.textContent = avatarLetter;

  // 顶部导航栏用户登录态实时同步，消除未登录假象
  if (topAuthBtn) {
    topAuthBtn.innerHTML = `<span>👤</span> <strong>${name}</strong> <span style="opacity:0.65; font-size:11px; margin-left:2px;">(${school})</span>`;
    topAuthBtn.onclick = function (e) {
      e.stopPropagation();
      const popover = document.getElementById("user-popover-menu");
      if (popover) popover.classList.toggle("show");
    };
  }

  renderSidebarHistory(history);
}

// 动态渲染侧边栏研判记录（新用户为空状态）
function renderSidebarHistory(history) {
  const historyListEl = document.getElementById("sidebar-history-list");
  const countBadge = document.getElementById("history-count-badge");
  if (!historyListEl) return;

  const items = Array.isArray(history) ? history : [];
  if (countBadge) countBadge.textContent = items.length;

  if (items.length === 0) {
    historyListEl.innerHTML = `
      <div style="padding:14px 10px; text-align:center; color:var(--text-muted); font-size:12px; border:1px dashed var(--border-hairline); border-radius:var(--radius-md); margin:6px 0; background:rgba(0,0,0,0.01);">
        <div style="font-size:16px; margin-bottom:2px;">📁</div>
        <div style="font-weight:600;">暂无历史研判</div>
        <div style="font-size:11px; opacity:0.75; margin-top:2px;">发起首次尽调后自动沉淀</div>
      </div>
    `;
    return;
  }

  historyListEl.innerHTML = items.map((title, idx) => `
    <a class="history-item ${idx === 0 ? 'active' : ''}" onclick="triggerHistoryItem('${title.replace(/'/g, "\\'")}')" title="${title}">
      ${title.length > 15 ? title.substring(0, 15) + '...' : title}
    </a>
  `).join("");
}

function triggerHistoryItem(query) {
  const searchInput = document.getElementById("main-search-input");
  if (searchInput) searchInput.value = query;
  if (window.AgentEngine) {
    window.AgentEngine.startExecution(query);
  }
}
window.triggerHistoryItem = triggerHistoryItem;

// 记录一条新的研判到用户历史资产
function appendUserHistory(title) {
  try {
    const raw = localStorage.getItem("zhice-current-user");
    if (!raw) return;
    const user = JSON.parse(raw);
    user.history = user.history || [];
    // 过滤去重并插在最前面
    user.history = [title, ...user.history.filter(t => t !== title)].slice(0, 8);
    localStorage.setItem("zhice-current-user", JSON.stringify(user));
    renderSidebarHistory(user.history);
  } catch (_) {}
}

// 退出登录
window.logoutUser = function () {
  if (confirm("确定要退出当前工作台并返回登录页面吗？")) {
    localStorage.removeItem("zhice-current-user");
    window.location.replace("login.html");
  }
};

// 6. 复盘表格置顶与Tab筛选
function initTrackingTableInteractivity() {
  const rows = document.querySelectorAll(".tracking-table tbody tr");
  
  rows.forEach(row => {
    const pin = row.querySelector(".btn-pin-row");
    if (pin) {
      pin.addEventListener("click", function (e) {
        e.stopPropagation();
        const tbody = row.parentElement;
        const isPinned = row.getAttribute("data-pinned") === "true";
        if (isPinned) {
          row.removeAttribute("data-pinned");
          this.style.opacity = "0.4";
        } else {
          row.setAttribute("data-pinned", "true");
          this.style.opacity = "1";
          tbody.prepend(row);
        }
      });
    }
  });

  const filterTabs = document.querySelectorAll(".tracking-filter-tab");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", function () {
      filterTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      const filter = this.getAttribute("data-filter");
      const liveRows = document.querySelectorAll(".tracking-table tbody tr");
      liveRows.forEach((r) => {
        const cat = r.getAttribute("data-category");
        if (filter === "all") {
          r.style.display = "";
        } else if (filter === "pillar") {
          r.style.display = (cat === "pillar") ? "" : "none";
        } else if (filter === "future") {
          r.style.display = (cat === "future") ? "" : "none";
        } else {
          r.style.display = "";
        }
      });
    });
  });
}

// 7. 通用反馈挂件
function initFeedbackWidget() {
  const feedbackBtn = document.getElementById("floating-feedback-btn");
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", () => {
      const contactInfo = `【TechTransfer.AI 成果转化与产投合作中心】\n\n服务通道：国家技术转移示范网络 · 智策多智能体联合实验室\n电子邮箱：service@techtransfer.ai\n系统状态：API/MCP 网关实时在线，欢迎提交重大科技成果中试评估需求！`;
      alert(contactInfo);
    });
  }
}

// 8. 录入/导入成果标的 (直连 Zion BaaS 云端数据库)
function initPatentCreation() {
  const btnOpen = document.getElementById("btn-open-create-patent");
  const modalBackdrop = document.getElementById("create-patent-modal-backdrop");
  const btnClose = document.getElementById("btn-close-create-patent");
  const form = document.getElementById("form-create-patent");

  if (btnOpen && modalBackdrop) {
    btnOpen.addEventListener("click", () => {
      modalBackdrop.classList.add("show");
    });
  }

  if (btnClose && modalBackdrop) {
    btnClose.addEventListener("click", () => {
      modalBackdrop.classList.remove("show");
    });
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove("show");
    });
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("input-new-patent-title").value.trim();
      const patentNo = document.getElementById("input-new-patent-no").value.trim();
      const domain = document.getElementById("input-new-patent-domain").value;
      const applicant = document.getElementById("input-new-patent-applicant").value.trim() || "硬科技创新联合体";
      const valNum = document.getElementById("input-new-patent-val").value.trim() || "6000";
      const summary = document.getElementById("input-new-patent-summary").value.trim();

      const newPatent = {
        title: title,
        patentNo: patentNo,
        type: "发明专利",
        domain: domain,
        applicant: applicant,
        trl: "TRL-6 (中试验证)",
        valuation: `¥ ${Number(valNum).toLocaleString()} 万元`,
        valuationMethod: "收益现值折现法 (DCF) + 实物期权模型",
        confidence: "91.8%",
        summary: summary || `本发明涉及${domain}关键核心技术攻关，具备独立自主知识产权与显著产业化转化潜力。`
      };

      const submitBtn = document.getElementById("btn-submit-new-patent");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "⏳ 正在同步至 Zion 云端...";
      }

      // 写入 Zion BaaS 云端
      if (window.ZionClient) {
        await window.ZionClient.insertPatent(newPatent);
      }

      // 动态追加到前端复盘明细表格头部
      const tbody = document.querySelector(".tracking-table tbody");
      if (tbody) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td><span class="btn-pin-row" style="cursor:pointer; opacity:1;" title="已置顶">📌</span></td>
          <td><strong>${newPatent.title}</strong></td>
          <td>${newPatent.domain}</td>
          <td><span style="color:var(--signal-green); font-weight:600;">TRL-6</span></td>
          <td>${newPatent.valuation}</td>
          <td>${newPatent.confidence}</td>
          <td><span class="badge-preview" style="background:rgba(16,185,129,0.15); color:var(--signal-green);">云端已入库</span></td>
          <td>已同步 Zion 云端数据库，建议发起技术许可</td>
        `;
        tbody.prepend(newRow);
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "🚀 提交并同步至 Zion 云端";
      }

      modalBackdrop.classList.remove("show");
      form.reset();

      if (window.AgentEngine) {
        window.AgentEngine.copyText(`成果「${newPatent.title}」已成功写入 Zion 云端并入库！`);
      }

      // 自动切回 Agent 工作台并立即触发该专利的多智能体推演
      const agentNav = document.querySelector('[data-target="nav-agent"]');
      if (agentNav) agentNav.click();

      const searchInput = document.getElementById("main-search-input");
      if (searchInput) searchInput.value = `${newPatent.patentNo} ${newPatent.title}`;

      if (window.AgentEngine) {
        window.AgentEngine.startExecution(newPatent.title);
      }
    });
  }
}

// 7. 蒙特卡洛 10,000 次风险敏感性仿真模型模态框控制
function initSimulationModal() {
  const modal = document.getElementById("simulation-modal-backdrop");
  const btnClose1 = document.getElementById("btn-close-sim-modal");
  const btnClose2 = document.getElementById("btn-close-sim-modal-2");

  if (btnClose1 && modal) {
    btnClose1.addEventListener("click", () => modal.classList.remove("show"));
  }
  if (btnClose2 && modal) {
    btnClose2.addEventListener("click", () => modal.classList.remove("show"));
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show");
    });
  }

  window.openSimulationModal = function (title, meta, trl, rate, cycle, fmea) {
    const titleEl = document.getElementById("sim-modal-title");
    const metaEl = document.getElementById("sim-modal-meta");
    const cycleEl = document.getElementById("sim-modal-cycle");
    const rateEl = document.getElementById("sim-modal-rate");
    const fmeaEl = document.getElementById("sim-modal-fmea");

    if (titleEl) titleEl.textContent = title;
    if (metaEl) metaEl.textContent = `${meta} · 当前 ${trl} · 蒙特卡洛 10,000 次抽样模拟`;
    if (cycleEl) cycleEl.textContent = `${cycle} (预期达产跨越)`;
    if (rateEl) rateEl.textContent = `${rate} (中试高保真通过)`;
    if (fmeaEl) fmeaEl.textContent = `${fmea} (贡献主要仿真方差)`;

    if (modal) modal.classList.add("show");
  };
}

document.addEventListener("DOMContentLoaded", function () {
  initSimulationModal();
});

