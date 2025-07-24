
# 🏫 Campus Front-End 项目

这是一个基于 React + Ant Design 构建的校园管理系统前端项目，支持多个用户角色（如学生、教师、管理员）进行操作管理，涵盖如学生事务、人事管理、财务审批等模块，配合后端接口实现数据交互。

---

## 🚀 项目特点

- 🌐 使用 React + Vite 构建高性能前端应用
- 🎨 UI 基于 Ant Design，界面简洁美观
- 🔐 支持多角色权限路由控制
- 🌍 国际化支持（i18n）
- 💬 模块化菜单与动态路由
- 📁 项目结构清晰，易于扩展与维护

---

## 📁 项目结构

```
campus-Front-End/
├── public/                  # 公共资源
├── src/
│   ├── api/                 # 所有 API 请求模块
│   ├── assets/              # 静态资源（图片、图标等）
│   ├── components/          # 可复用组件
│   ├── locales/             # 国际化配置
│   ├── pages/               # 页面级组件（按照模块划分）
│   ├── router/              # 路由配置
│   ├── store/               # 状态管理（如 pinia、redux）
│   ├── utils/               # 工具函数
│   ├── App.tsx             # 应用主组件
│   └── main.tsx            # 应用入口
├── .env                    # 环境变量配置
├── index.html              # HTML 入口
├── vite.config.ts          # Vite 配置文件
└── package.json            # 项目依赖和脚本
```

---

## 📦 安装与运行

### 1. 克隆项目

```bash
git clone https://github.com/Ading163/campus-Front-End.git
cd campus-Front-End
```

### 2. 安装依赖

```bash
npm install
# 或使用 yarn
yarn install
```

### 3. 启动开发环境

```bash
npm run dev
# 或使用 yarn
yarn dev
```

### 4. 打包构建生产环境

```bash
npm run build
# 或使用 yarn
yarn build
```

---

## 🔑 功能模块（可扩展）

- 🎓 学生事务管理
- 👨‍🏫 教职工管理
- 🧾 财务审批流程
- 📊 数据报表
- 🔧 系统配置
- 🔐 登录与权限认证
- 🌐 国际化支持

---

## 🌍 国际化说明

本项目使用 `i18next` 实现国际化，语言包存储于 `src/locales/` 目录，支持动态切换中英文。

```ts
// 示例：
{
  "menu": {
    "home": "首页",
    "userProfile": "个人中心",
    "forms": "表单管理"
  }
}
```

---

## 📌 开发约定

- 所有请求封装在 `src/api/` 中，统一使用 axios 实例
- 页面组件放置在 `src/pages/模块名/` 中
- 国际化字段统一维护，命名语义化
- 提交代码前建议使用 `eslint` 检查代码格式

---

## 📄 TODO（可视为开发计划）

- [x] 登录认证模块
- [x] 国际化支持
- [x] 菜单动态渲染
- [ ] 用户权限管理
- [ ] 角色管理与页面权限分配
- [ ] 数据大屏支持
- [ ] 接入后端接口联调

---

## 🤝 贡献指南

欢迎提交 PR 或 Issue，如果你希望贡献代码：

1. Fork 本仓库
2. 创建新分支：`git checkout -b feat/your-feature`
3. 提交代码：`git commit -m 'feat: 添加某功能'`
4. Push 到远程分支
5. 提交 Pull Request

---

## 📮 联系方式

如有问题或建议，欢迎通过 GitHub Issues 提交反馈。

---

## 📄 License

MIT License © 2024 [Ading163](https://github.com/Ading163)
