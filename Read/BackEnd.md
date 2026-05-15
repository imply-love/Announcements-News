# 后端设计文档 (BackEnd.md)

## 1. 技术栈
- **框架**: FastAPI (Python 3.10+)
- **ORM**: SQLAlchemy 2.0
- **数据库驱动**: PyMySQL
- **认证**: JWT (OAuth2 Password Bearer)
- **验证**: Pydantic v2

## 2. 项目目录结构
```text
backend/
├── app/
│   ├── main.py            # 程序入口，路由注册
│   ├── api/               # API 路由层
│   │   ├── auth.py        # 登录、注册、权限校验
│   │   ├── posts.py       # 公告与校园墙逻辑
│   │   ├── comments.py     # 评论与回复逻辑
│   │   └── tools.py        # 工具软件管理
│   ├── core/              # 核心配置
│   │   ├── config.py      # 环境配置 (DB URL, JWT Secret)
│   │   └── security.py     # 加密与 JWT 生成
│   ├── models/            # SQLAlchemy 数据库模型
│   │   └── models.py      # 表定义
│   ├── schemas/           # Pydantic 数据验证模型
│   │   └── schemas.py
│   └── services/          # 业务逻辑层 (Service Layer)
│       └── permission.py   # 权限判断逻辑
├── requirements.txt       # 依赖清单
└── .env                   # 环境变量
```

## 3. 关键 API 设计
- `POST /auth/login`: 用户登录，返回 JWT Token
- `GET /posts`: 获取帖子列表（支持类型过滤，游客可见）
- `POST /posts`: 发帖（校验管理员/普通用户权限）
- `GET /posts/{id}/comments`: 获取回复（校验登录状态）
- `DELETE /posts/{id}`: 删帖（校验发帖人或管理员权限）
- `POST /tools`: 上传工具（仅限管理员）

## 4. 实时性保证
- 使用 SQLAlchemy 的异步会话 (`AsyncSession`) 提高响应速度。
- 接口设计遵循 RESTful 规范，前端通过状态码和 JSON 响应实时更新界面。
