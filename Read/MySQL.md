# MySQL 数据库设计文档

## 1. 数据库概览
本项目使用 MySQL 8.0，旨在支撑校园公告系统的高并发读取和权限控制。

## 2. 目录/表结构
### 2.1 用户表 (`users`)
存储所有用户的账户信息和角色。
- `id` (INT, PK, AI): 用户唯一标识
- `username` (VARCHAR(50), Unique): 登录账号
- `password_hash` (VARCHAR(255)): 加密后的密码
- `role` (ENUM('admin', 'user'): 角色（管理员/普通用户）
- `created_at` (DATETIME): 注册时间

### 2.2 帖子表 (`posts`)
涵盖公告栏和校园墙的内容。
- `id` (INT, PK, AI): 帖子唯一标识
- `user_id` (INT, FK): 发帖人ID
- `content` (TEXT): 帖子内容
- `type` (ENUM('announcement', 'wall')): 类型（公告/校园墙）
- `is_anonymous` (BOOLEAN): 是否选择匿名发布
- `is_pinned` (BOOLEAN): 是否置顶（仅公告栏可用）
- `created_at` (DATETIME: 发布时间

### 2.3 评论表 (`comments`)
存储对帖子的回复。
- `id` (INT, PK, AI): 评论唯一标识
- `post_id` (INT, FK): 所属帖子ID
- `user_id` (INT, FK): 评论人ID
- `parent_id` (INT, FK, Nullable): 父评论ID（用于分级回复）
- `content` (TEXT): 评论内容
- `is_anonymous` (BOOLEAN): 是否选择匿名回复
- `is_pinned` (BOOLEAN): 是否被置顶（由发帖人控制）
- `created_at` (DATETIME): 评论时间

### 2.4 工具表 (`tools`)
存储软件工具资源。
- `id` (INT, PK, AI): 工具唯一标识
- `name` (VARCHAR(100)): 工具名称
- `description` (TEXT): 工具描述
- `download_url` (VARCHAR(500)): 下载链接
- `uploader_id` (INT, FK): 上传者ID（必须是管理员）
- `created_at` (DATETIME): 上传时间

## 3. 权限逻辑实现
- **匿名性**：`is_anonymous` 字段在前端显示时决定是否隐藏用户名，但数据库始终记录 `user_id` 以便管理员审计。
- **可见性**：非登录用户通过 API 过滤，仅能请求 `posts` 接口，无法请求 `comments` 接口。
