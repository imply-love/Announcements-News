# 校园公告系统 (Campus Announcement System)

一个基于 **Vue 3 + FastAPI/Node.js + MySQL** 的现代化校园公告与动态发布平台。旨在为校园提供一个高效的官方通知传达渠道与自由的校园交流空间。

## 🌟 作品简介
本项目构建了一个全栈式的校园信息集成平台。系统将“权威通知”与“自由社交”相结合：一方面通过**公告栏**实现管理端对全校的快速通知触达；另一方面通过**校园墙**提供一个去中心化的动态发布空间，支持匿名交流，满足学生在校园生活中的社交与信息共享需求。同时，内置的**工具分享**模块为学生提供了学习资源与实用软件的便捷分发渠道。

### ✨ 创新点
- **双端同步架构**：同时提供 PC 端管理/浏览界面与 Mobile 端轻量化体验，满足不同场景下的使用需求。
- **灵活的匿名机制**：在校园墙和评论系统中引入 `is_anonymous` 机制，在保证管理员可审计（数据库记录）的前提下，赋予用户在前端显示的匿名权，降低社交压力。
- **多后端生态支持**：项目同时提供 **FastAPI (Python)** 和 **Express (Node.js)** 两套后端实现，证明了系统架构的解耦性与良好的 API 规范性，方便开发者根据运行环境选择最优方案。
- **现代化的 UI/UX**：采用极简主义设计语言，针对移动端优化了 FAB 悬浮按钮与卡片流布局，提升了信息获取效率。

---

## 🚀 技术栈

| 模块 | 技术 |
|------|------|
| **前端 (Web)** | Vue 3, Vue Router, Pinia, Axios, Element Plus, Vite |
| **前端 (Mobile)** | uni-app (Vue 3), Vite, HBuilderX |
| **后端 (Python)** | Python 3.10+, FastAPI, SQLAlchemy, Pydantic, PyJWT, Passlib |
| **后端 (Node.js)** | Node.js, Express, mysql2, jsonwebtoken, bcryptjs |
| **数据库** | MySQL 5.7+ / 8.0+ (utf8mb4) |
| **认证** | JWT (JSON Web Token) |
| **部署** | Nginx (前端), Gunicorn/Uvicorn (Python), PM2 (Node.js) |

---

## 📁 项目结构

```text
Campus-Announcement/
├── backend/                 # 后端服务 (FastAPI/Python)
│   ├── app/
│   │   ├── api/            # 路由接口 (auth, posts, comments, tools)
│   │   ├── core/           # 核心配置 (config, database, security)
│   │   ├── models/         # 数据库模型 (SQLAlchemy)
│   │   ├── schemas/        # 数据校验 (Pydantic)
│   │   └── services/       # 业务逻辑层 (权限控制)
│   └── requirements.txt    # Python 依赖
├── backend-node/            # 后端服务 (Express/Node.js)
│   ├── src/
│   │   ├── api/            # 路由接口 (auth, posts, comments, tools)
│   │   ├── core/           # 核心配置 (config, database, security)
│   │   ├── middlewares/     # 中间件 (auth.middleware)
│   │   └── index.js        # 程序入口
│   ├── .env                # 环境变量配置
│   └── package.json        # Node 依赖
├── frontend/               # 前端 Web 项目 (Vue 3)
│   ├── src/
│   │   ├── api/           # API 请求封装
│   │   ├── views/         # 页面组件 (Home, Wall, Tools, Login)
│   │   ├── router/        # 路由配置
│   │   └── store/         # 状态管理 (Pinia)
│   └── package.json       # Node 依赖
├── mobile-app/             # 移动端项目 (uni-app)
│   ├── common/api/        # API 请求封装
│   ├── pages/             # 页面视图 (index, wall, tools, profile, auth)
│   ├── static/            # 静态资源
│   └── pages.json         # 路由与 TabBar 配置
├── mysql.sql              # 数据库初始化脚本
└── README.md              # 项目说明文档
```

---

## 🛠️ 快速开始

### 1️⃣ 环境准备
- **Python 3.10+** (如使用 Python 后端)
- **Node.js 16+** (前端及 Node 后端必选)
- **MySQL 5.7+**

### 2️⃣ 数据库初始化
1. 启动 MySQL 服务。
2. 执行初始化脚本：
   ```bash
   mysql -u root -p < mysql.sql
   ```
   > 默认数据库名：`campus_notice`，默认管理员账号：`admin` / `admin123`

### 3️⃣ 后端启动 (二选一)

**选项 A: Python 后端**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**选项 B: Node.js 后端**
```bash
cd backend-node
npm install
npm run dev
```
> 服务默认地址：`http://localhost:8000`

### 4️⃣ 前端启动

**Web 端：**
```bash
cd frontend
npm install
npm run dev
```
> 地址：`http://localhost:5173`

**移动端：**
- 使用 **HBuilderX** 打开 `mobile-app` 目录 $\rightarrow$ `运行` $\rightarrow$ `运行到浏览器`。

---

## 🔑 功能特性

| 功能 | 描述 | 权限 |
|------|------|------|
| **用户注册/登录** | 支持 JWT 认证，多端共享 Token | 公开 |
| **公告发布** | 官方通知，支持置顶功能 | 仅管理员 |
| **校园墙** | 用户动态发布，支持匿名发表 | 已登录用户 |
| **评论系统** | 支持对公告和动态进行回复，支持匿名评论 | 已登录用户 |
| **工具分享** | 管理员上传学习/生活工具资源 | 仅管理员 |
| **权限控制** | 基于角色的访问控制 (RBAC)，确保管理权限安全 | 全员 |

---

## 📝 开发说明

### 配置数据库连接
- **Python**: 编辑 `backend/app/core/config.py`
- **Node.js**: 编辑 `backend-node/.env`

### 前端代理配置
编辑 `frontend/vite.config.js`，确保 target 指向正确的后端端口：
```javascript
proxy: {
  "/api": {
    target: "http://127.0.0.1:8000",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
}
```

---

## 📄 许可证
MIT License

---

## 👥 贡献
欢迎提交 Issue 和 Pull Request！

---

## 📞 联系方式
如有问题，请提交 Issue 或联系开发者。
