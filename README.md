# 在线棋牌游戏平台

这是一个简单的在线棋牌游戏平台，目前支持五子棋游戏。用户无需登录，只需通过房间号就可以与朋友一起游戏。

## 功能特点

- 无需登录，通过房间号邀请好友
- 实时对战，使用 Socket.IO 进行通信
- 响应式设计，适配桌面和移动设备
- 支持游戏：五子棋（Gomoku）

## 技术栈

- Next.js - React 框架
- TypeScript - 类型安全的 JavaScript
- Socket.IO - 实时通信
- Tailwind CSS - 样式框架

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

这将启动开发服务器，访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 游戏说明

### 五子棋

1. 在首页选择"五子棋"进入游戏
2. 创建新游戏或输入房间号加入已有游戏
3. 将房间号分享给朋友，邀请他们加入
4. 黑棋先行，轮流在棋盘上落子
5. 任意一方先形成五子连线（横、竖、斜）即为获胜

## 项目结构

- `/src/app` - Next.js 页面路由
- `/src/components` - React 组件
- `/src/lib` - 工具函数和游戏逻辑
- `/src/styles` - 全局样式文件
- `/public` - 静态资源 