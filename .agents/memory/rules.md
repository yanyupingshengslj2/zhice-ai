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
