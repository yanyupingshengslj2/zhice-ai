# 智策 (TechTransfer.AI) 架构决策与防坑条款 (Architecture Rules & Antipatterns)

## 条款 1：拒绝通用单体玩具 Agent，坚持动态角色多态分发
- **反模式 (Antipattern)**：将 Zion Agent 简单设为“知识处理专家（input1=选中文本，input2=问答）”，导致输出沦为通用聊天废话，彻底失去投研过会效力。
- **正向规范 (Best Practice)**：采用多态角色注入器（Polymorphic Role-Injector）。Zion 平台中的单智能体 `mvj2fqpz` 抽象为通用对冲基金投研推理核；`input1` 作为角色规程槽（Role & Rubric，动态载入壁垒审查、FTO、TRL 或 DCF 财务指令），`input2` 作为标的交底书槽（Claims Payload）。

## 条款 2：白盒财务估值必须遵循三步数学解释法
- 严禁在大模型输出中直接“拍脑袋给一个估值数字”（黑盒）。
- 任何 DCF、rNPV 或实物期权模型，必须公开自由现金流预测 $CF_t$、分成贡献率 $\alpha$、成熟度系数 $\beta_{TRL}$ 与折现率 $r$，确保投委会与法务完全可追溯。

## 条款 3：数据隔离与鉴权网关不可穿透
- 严禁任何绕过登录的页面直达。
- 公共十五五战略标的（Public Benchmarks）与用户个人私有交底书资产在数据库层面通过 `user_id` 物理隔离，新注册用户自管库初始必须保持纯净空状态。

## 条款 4：绝对零个人隐私泄露红线
- 严禁在任何前端占位符（placeholder）、示例数据、变量名、测试用例或代码注释中出现任何具体的真实个人姓名（如“石路加”）或特定历史工作单位（如“浙大国际科创中心”）。
- 必须统一采用通用机构级称谓（如“张投资总监 / 李研究员”、“国家级技术转移示范中心 / 某产业创投基金”）。

## 条款 5：全视口响应式居中与缩放适配规范
- 必须在根样式层强制声明 `html, body { width: 100%; height: 100%; display: block !important; }` 与 `#root { width: 100%; min-height: 100vh; }`。
- 登录鉴权卡片必须配置 `margin: 0 auto; width: 100%; max-width: 960px; grid-template-columns: minmax(320px, 420px) minmax(360px, 1fr);`，确保在 100%~175% 窗口缩放及各种分辨率下自适应居中，严禁内容向左侧漂移。

## 条款 6：Agent 推演杜绝套话与多态专业化输出
- 严禁在前端中使用硬编码的静态字符串进行所谓的“AI 解答”。
- 智能体系统必须基于技术特征（Prior Art、FTO、自由现金流、WACC 敏感性）执行动态结构化解析，深入权利要求细节与财务模型，提供专业、可追溯、带置信度的推演结果。

## 条款 7：首访冷启动纯净空状态（Clean Cold Start for New Accounts）
- 新注册用户首次进入工作台时，历史研判会话（History Sessions）必须遵循严格的冷启动空状态原则（`count = 0`），绝对禁止硬编码预置任何伪造的历史对话记录。
- 只有当用户在首屏或研判台中输入指令并产生首条研判交互后，会话才被动态创建并沉淀至本地/云端存储中。

## 条款 8：实体意图动态路由与语义解耦（Semantic Intent & Entity Routing）
- 严禁将聊天交互盲目绑定在当前默认激活的静态标的上下文上。
- 系统必须部署实体识别与意图路由引擎（Intent Router）。当用户输入涉及特定技术领域（如 CPO 光电共封装、固态电池、ADC 药物、具身智能等）时，必须动态识别核心标的并同步上下文，杜绝“用户问光芯片、系统答飞行汽车”的答非所问（Hallucination / Context Misalignment）。
