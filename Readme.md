# 校园公告系统 (Campus Announcement System)

一个基于 **Vue 3 + FastAPI + MySQL** 的现代化校园公告与动态发布平台。支持管理员发布官方通知、普通用户发布校园墙动态、匿名评论、资源工具分享等功能。

---

## 🚀 技术栈

| 模块 | 技术 |
|------|------|
| **前端** | Vue 3, Vue Router, Pinia, Axios, Element Plus, Vite |
| **后端** | Python 3.10+, FastAPI, SQLAlchemy, Pydantic, PyJWT, Passlib |
| **数据库** | MySQL 5.7+ / 8.0+ |
| **认证** | JWT (JSON Web Token) |
| **部署** | Nginx (前端), Gunicorn/Uvicorn (后端) |

---

## 📁 项目结构

```text
Campus-Announcement/
├── backend/                 # 后端服务 (FastAPI)
│   ├── app/
│   │   ├── api/            # 路由接口 (auth, posts, comments, tools)
│   │   ├── core/           # 核心配置 (config, database, security)
│   │   ├── models/         # 数据库模型 (SQLAlchemy)
│   │   ├── schemas/        # 数据校验 (Pydantic)
│   │   └── services/       # 业务逻辑 (权限控制)
│   └── requirements.txt    # Python 依赖
├── frontend/               # 前端项目 (Vue 3)
│   ├── src/
│   │   ├── api/           # API 请求封装
│   │   ├── views/         # 页面组件 (Home, Wall, Tools, Login)
│   │   ├── router/        # 路由配置
│   │   └── store/         # 状态管理 (Pinia)
│   └── package.json       # Node 依赖
├── mysql.sql              # 数据库初始化脚本
└── README.md              # 项目说明文档
```

---

## 🛠️ 快速开始

### 1️⃣ 环境准备

- **Python 3.10+**
- **Node.js 16+**
- **MySQL 5.7+**

### 2️⃣ 数据库初始化

1. 启动 MySQL 服务。
2. 执行初始化脚本：
   ```bash
   mysql -u root -p < mysql.sql
   ```
   > 默认数据库名：`campus_notice`，默认管理员账号：`admin` / `admin123`

### 3️⃣ 后端启动

```bash
cd backend
# 创建虚拟环境 (可选)
python -m venv venv
venv\Scripts\activate  # Windows

# 安装依赖
pip install -r requirements.txt

# 启动服务
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
后端服务地址：`http://localhost:8000`  
Swagger 文档：`http://localhost:8000/docs`

### 4️⃣ 前端启动

```bash
cd frontend
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```
前端服务地址：`http://localhost:5173`

---

## 🔑 功能特性

| 功能 | 描述 | 权限 |
|------|------|------|
| **用户注册/登录** | 支持 JWT 认证 | 公开 |
| **公告发布** | 官方通知，置顶功能 | 仅管理员 |
| **校园墙** | 用户动态发布，支持匿名 | 已登录用户 |
| **评论系统** | 支持回复评论 | 已登录用户 |
| **工具分享** | 管理员上传学习/生活工具 | 仅管理员 |
| **权限控制** | 基于角色的访问控制 (RBAC) | 全员 |

---

## 📝 开发说明

### 配置数据库连接

编辑 `backend/app/core/config.py`：
```python
DATABASE_URL = "mysql+pymysql://root:你的密码@localhost:3306/campus_notice?charset=utf8mb4"
SECRET_KEY = "你的随机密钥"
```

### 前端代理配置

编辑 `frontend/vite.config.js`：
```javascript
proxy: {
  "/api": {
    target: "http://localhost:8000",
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