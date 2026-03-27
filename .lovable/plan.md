

## Agens.run 原型全面重构

基于讨论和产品设计文档，对原型进行全面重构：简化用户旅程、新增产品首页和登录注册页、侧边栏分组、Marketplace 化的 Catalog 页面、对话式创建流程。

---

### 1. 新增：产品首页（Landing Page）

**文件**: `src/pages/LandingPage.tsx`

独立于 workspace 的营销首页，不带侧边栏：
- 顶部导航栏：Logo + "Login" / "Get Started" 按钮
- Hero 区域：大标题 "Your AI workforce, always on"，副标题说明核心价值，CTA 按钮 "Get Started"
- 3 个特性亮点卡片（Durable employees / Event-driven / Connected to your tools）
- 简洁现代风格，延续现有设计系统的颜色和字体

### 2. 新增：登录注册页

**文件**: `src/pages/AuthPage.tsx`

左右分栏布局：
- **左侧**：深色背景（复用 sidebar 色调），品牌 logo、tagline "Hire AI employees that actually work"、3 个特性要点
- **右侧**：白色背景，Login / Sign up tab 切换，Email + Password 表单，Google OAuth 按钮（mock）
- 纯前端 mock，提交后跳转到 `/preview/workspace`

### 3. 侧边栏重构

**文件**: `src/components/AppLayout.tsx`

分组层级设计：
- 左上角 workspace 名称，点击可 rename（inline 编辑态）
- CTA 按钮 "+ Create Employee" 保留
- **分组**：用灰色小标题分隔
  - 无标题组：Home, Employees
  - **CATALOG**：Skills, Tools, Connectors
  - **MANAGE**：Billing, Settings
- "Home" 标签改为 "Home"（保持简单）
- 新增 Tools tab（Wrench 图标）
- Connections 改名为 Connectors（Plug 图标）

### 4. Home 页简化

**文件**: `src/pages/HomePage.tsx`

用产品语言替代数据字段：
- 统计行简化为 3 卡片：
  - "X employees working" — 用自然语言，不显示 credits 数字
  - "Credits" — 简化为余额 + "充足/偏低" 文案，不显示 burn rate
  - "Connections" — "X connectors active"
- "Needs attention" 保留但措辞口语化
- Employee 状态列表：只显示头像 + 名字 + 一句话当前在做什么 + 状态灯，去掉 budget/channels/skills 数字

### 5. Employees 列表页简化

**文件**: `src/pages/EmployeesPage.tsx`

大幅精简卡片：
- 每张卡：头像 + 名字 + 一句话职责描述 + 状态指示灯
- 去掉 budget 进度条、credits/wk、channels 数量、skills 数量
- 保留 "Latest work" 作为一行简短文案
- 简单的状态筛选 tab（All / Working / Needs attention / Idle）

### 6. Employee 详情页简化

**文件**: `src/pages/EmployeeDetailPage.tsx`

分层信息展示：
- **第一眼**：头像、名字、职责、当前在做什么（自然语言）、状态
- **Recent work**：最近的工作成果列表（简洁版）
- **侧栏折叠式**：Skills & Tools（已装配，可增删）、Connectors、用量概况
- 去掉 budget 百分比条、owner、defaultRoute 等技术细节

### 7. Skills 页 — Marketplace 风格

**文件**: `src/pages/SkillsPage.tsx`

- 顶部搜索栏 + "Create custom skill" 按钮
- 卡片网格：每张卡 = 图标 + 名称 + 一句话描述 + "X employees using"
- 去掉 StateBadge、source 标签、category 标签

### 8. 新增：Tools 页

**文件**: `src/pages/ToolsPage.tsx`

与 Skills 页类似的 marketplace 布局：
- 搜索 + 卡片网格
- 示例数据：Web Search, Image Generation, Code Interpreter, PDF Reader, Spreadsheet, Calendar

### 9. Connectors 页简化

**文件**: `src/pages/ConnectionsPage.tsx`

- 每张卡：Logo 占位 + 名称 + 连接状态（绿点/灰点）+ 一句话描述用途
- 去掉 routeLabel、lastDelivery、type 标签等运维细节
- 新增 "Add connector" 按钮

### 10. Create Employee 重构 — 对话式

**文件**: `src/pages/CreateEmployeePage.tsx`

3 步流程：
- **Step 1**：模板选择（3-4 个角色模板卡片）+ "或用自己的话描述" 文本框 + "Generate" 按钮
- **Step 2**：预览系统生成的角色草案（名字、职责、已自动配备的 skills/tools），可微调，"Activate" 按钮
- **Step 3**：成功页 — "Maya 已经开始工作了"，连接 Slack 作为可选后续步骤

### 11. 数据层更新

**文件**: `src/lib/data.ts`

- 新增 `ToolPreview` 接口和示例数据（6 个 tools）
- 新增 `RoleTemplate` 接口和 3-4 个模板数据
- Employee 新增 `statusMessage` 字段（自然语言状态，如"正在追踪 3 个竞品的价格变化"）
- 简化不需要在前端展示的字段（保留在数据中但页面不显示）

### 12. 路由更新

**文件**: `src/App.tsx`

- `/` → LandingPage（产品首页）
- `/auth` → AuthPage（登录注册）
- `/preview/tools` → ToolsPage
- `/preview/connectors` → ConnectionsPage（路由名同步改）
- 其余保持

### 13. Billing 页简化

**文件**: `src/pages/BillingPage.tsx`

- 简化为：当前余额（大数字）+ "充足" 状态 + 简单的近期用量趋势文案 + "Add credits" 按钮
- 去掉每个员工的 budget 明细表格

---

### 涉及文件汇总

| 操作 | 文件 |
|------|------|
| 新建 | `LandingPage.tsx`, `AuthPage.tsx`, `ToolsPage.tsx` |
| 重构 | `AppLayout.tsx`, `HomePage.tsx`, `EmployeesPage.tsx`, `EmployeeDetailPage.tsx`, `SkillsPage.tsx`, `ConnectionsPage.tsx`, `CreateEmployeePage.tsx`, `BillingPage.tsx` |
| 更新 | `data.ts`, `App.tsx` |

共 13 个文件，核心工作量在 Create Employee 的 3 步流程重构、Marketplace 页面、以及所有现有页面的信息简化。

