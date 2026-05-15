# 移动端设计文档 (MobileApp.md)

## 1. 技术栈
- **框架**: uni-app (Vue 3 Composition API)
- **构建工具**: Vite / HBuilderX
- **状态管理**: LocalStorage (Token & UserInfo)
- **网络请求**: uni.request (封装为 Promise 模式)
- **样式**: SCSS / Flexbox 响应式布局

## 2. 项目目录结构
```text
mobile-app/
├── common/
│   └── api/
│       ├── index.js          # 网络请求封装 (拦截器, BASE_URL)
│       └── user.js           # 业务接口定义 (Auth, Posts, Tools)
├── pages/
│   ├── index/
│   │   └── index.vue         # 首页 - 官方公告浏览
│   ├── wall/
│   │   └── index.vue         # 校园墙 - 动态发布与浏览
│   ├── tools/
│   │   └── index.vue         # 工具箱 - 资源下载列表
│   ├── profile/
│   │   └── index.vue         # 个人中心 - 用户信息与设置
│   └── auth/
│       └── login.vue         # 登录页面
├── static/                  # 静态资源 (图标, 图片)
├── App.vue                  # 全局样式与生命周期
├── main.js                  # 入口文件
└── pages.json               # 路由配置与 TabBar 定义
```

## 3. 核心功能实现
- **认证流**: 用户登录后将 `access_token` 存入本地缓存，在 `common/api/index.js` 中通过请求头 `Authorization: Bearer <token>` 实现身份校验。
- **公告系统**: 通过 `GET /posts?type=announcement` 获取官方通知，采用纯净卡片流展示。
- **校园墙**: 
    - 浏览：`GET /posts?type=wall`。
    - 发布：`POST /posts`，支持 `is_anonymous` 字段控制匿名性。
- **工具箱**: `GET /tools` 获取资源列表，点击下载时通过剪贴板 API 提供便捷访问。

## 4. UI/UX 设计规范
- **设计风格**: 极简主义 (Minimalism)，采用大圆角卡片、充足的留白和淡灰色背景 (`#F5F7FA`)。
- **交互细节**:
    - **FAB 按钮**: 校园墙采用悬浮加号按钮，快速触发发布弹窗。
    - **视觉反馈**: 使用 `uni.showToast` 提供即时的操作反馈（如“登录成功”、“链接已复制”）。
    - **响应式**: 全量使用 `rpx` 单位，确保在不同尺寸手机屏幕上的适配一致性。
