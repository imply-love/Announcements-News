# 前端设计文档 (FrontEnd.md)

## 1. 技术栈
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **状态管理**: Pinia (存储用户信息、Token、角色)
- **路由**: Vue Router
- **UI 组件库**: Element Plus
- **网络请求**: Axios

## 2. 项目目录结构
```text
frontend/
├── src/
│   ├── api/               # Axios 拦截器与接口定义
│   │   └── index.js
│   ├── assets/            # 静态资源 (图片, 样式)
│   ├── components/        # 可复用组件 (例如: PostCard.vue)
│   ├── layouts/           # 页面布局 (Header, Footer)
│   ├── store/             # Pinia 状态存储
│   │   └── user.js
│   ├── views/              # 页面视图
│   │   ├── Home.vue        # 公告栏 (默认启动页)
│   │   ├── Wall.vue        # 校园墙
│   │   ├── Tools.vue       # 工具栏
│   │   └── Login.vue       # 登录注册页
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── package.json           # 项目依赖
└── vite.config.js         # Vite 配置
```

## 3. 界面与权限实现
- **导航守卫**: 使用 `router.beforeEach` 校验用户角色。
- **角色控制 (v-if)**:
    - 管理员可见：发帖按钮(公告)、工具上传按钮、强制删除按钮。
    - 普通用户可见：发帖按钮(校园墙)、回复输入框。
    - 游客：隐藏所有交互按钮，评论区显示“请登录后查看”。
- **匿名切换**: 在发帖/回复对话框中提供 `Switch` 开关，控制 `is_anonymous` 参数。

## 4. 交互细节
- **公告栏**: 顶部显示置顶帖子，内容仅限通知。
- **校园墙**: 发帖前弹出 Element Plus 的 `MessageBox` 提醒违规细则。
- **实时性**: 提交成功后，通过 Pinia 状态更新或重新调用 API 刷新当前列表。
