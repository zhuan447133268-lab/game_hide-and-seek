# 🎯 英语捉迷藏游戏

## 项目简介

这是一个基于Phaser 3开发的互动教育游戏，专为小学生设计。通过捉迷藏的方式学习人教版小学英语教材中的单词。

### 主要功能

- 🎮 **多场景切换** - 教室、家庭、公园、动物园、游乐场
- 📚 **教材单词** - 基于人教版小学英语1-2册
- 🖱️ **交互操作** - 支持点击和拖拽查找物品
- 🔊 **语音朗读** - 自动朗读找到的单词
- 🎨 **卡通风格** - 可爱的视觉设计，适合儿童
- 📱 **响应式** - 支持桌面、平板、手机
- 🌐 **单页应用** - 无需安装，浏览器直接运行

## 游戏玩法

1. **选择场景** - 从主菜单选择想要学习的场景
2. **查找物品** - 场景中隐藏了3-5个物品，上面有`?`标记
3. **点击或拖拽** - 点击问号或拖拽遮罩来发现物品
4. **学习单词** - 找到后显示英文单词并自动朗读
5. **完成游戏** - 找到所有隐藏物品即可通关

## 在线体验

访问以下链接即可直接开始游戏：

👉 **[在线游戏链接](https://yourusername.github.io/english-hide-seek-game)**

*(将 `yourusername` 替换为你的GitHub用户名)*

## 本地运行

### 方法1：使用Python简单服务器

```bash
cd english-hide-seek-game
python -m http.server 8080
```

然后访问：http://localhost:8080

### 方法2：使用Node.js

```bash
cd english-hide-seek-game
npx serve . -p 8080
```

### 方法3：使用VS Code Live Server

1. 安装 Live Server 扩展
2. 右键 `index.html` 选择 "Open with Live Server"

## 部署到GitHub Pages

### 步骤1：创建GitHub仓库

1. 登录 GitHub，创建新仓库命名为 `english-hide-seek-game`
2. 选择 Public 或 Private（Private 仅自己可见）
3. 点击 "Create repository"

### 步骤2：上传文件

#### 方法A：使用Git命令行（推荐）

```bash
# 初始化仓库
cd english-hide-seek-game
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 英语捉迷藏游戏"

# 添加远程仓库（替换YOUR_USERNAME为你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/english-hide-seek-game.git

# 推送
git push -u origin main
```

#### 方法B：使用GitHub网页界面

1. 打开创建的仓库页面
2. 点击 "Upload files"
3. 拖拽整个 `english-hide-seek-game` 文件夹到页面
4. 填写提交信息："Initial commit"
5. 点击 "Commit changes"

### 步骤3：启用GitHub Pages

1. 进入仓库的 "Settings" 页面
2. 在左侧菜单找到 "Pages"
3. 在 "Build and deployment" 部分：
   - Source 选择：`Deploy from a branch`
   - Branch 选择：`main`
   - Folder 选择：`/ (root)`
4. 点击 "Save"

### 步骤4：等待部署

- 等待1-2分钟
- 访问：`https://YOUR_USERNAME.github.io/english-hide-seek-game/`
- （将 `YOUR_USERNAME` 替换为你的GitHub用户名）

## 项目结构

```
english-hide-seek-game/
├── index.html              # 主页面
├── package.json           # 项目配置
├── README.md             # 项目说明
├── data/
│   └── gameData.js     # 游戏数据（单词、场景）
├── js/
│   └── game.js         # 游戏主逻辑
└── assets/              # 资源文件（可选）
```

## 自定义内容

### 修改单词

编辑 `data/gameData.js` 文件：

```javascript
scenes: [
    {
        id: 'custom_scene',
        name: '自定义场景',
        icon: '🎨',
        grade: 1,
        backgroundColor: '#ffeb3b',
        accentColor: '#ff9800',
        items: [
            { id: 100, word: 'apple', chinese: '苹果', icon: '🍎', size: 1 },
            { id: 101, word: 'banana', chinese: '香蕉', icon: '🍌', size: 1 }
        ]
    }
]
```

### 调整游戏设置

在 `data/gameData.js` 中修改：

```javascript
settings: {
    enableVoice: true,           // 启用语音朗读
    enableSpeechRecognition: false, // 语音识别（预留功能）
    showChinese: false,         // 显示中文翻译
    autoRead: true,             // 自动朗读
    allowRetry: true             // 允许重新开始
}
```

## 技术栈

- **Phaser 3.88.2** - HTML5游戏框架
- **原生JavaScript** - 无需编译
- **Web Speech API** - 语音合成
- **Canvas API** - 动态生成场景和物品

## 浏览器支持

| 浏览器 | 版本 | 支持度 |
|--------|------|--------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| iOS Safari | 14+ | ✅ 完全支持 |
| Chrome Mobile | 90+ | ✅ 完全支持 |

## 功能说明

### 已实现功能

✅ 多场景切换（5个场景，50+单词）
✅ 物品隐藏和发现机制
✅ 点击和拖拽交互
✅ 语音合成朗读
✅ 进度追踪系统
✅ 卡通风格背景生成
✅ 响应式设计
✅ 胜利动画和反馈

### 扩展功能（可自行添加）

🔲 语音识别（学生读出单词，系统判断）
🔲 关卡系统（难度递增）
🔲 计时模式（限时挑战）
🔲 积分排行榜（本地存储）
🔲 自定义场景编辑器

## 教育价值

- ✨ **趣味学习** - 通过游戏方式激发学习兴趣
- 🎯 **情景记忆** - 在真实场景中学习单词
- 🔊 **多感官** - 视觉+听觉双重刺激
- 📈 **即时反馈** - 找到物品立刻获得奖励
- 🎨 **色彩记忆** - 颜色+场景关联记忆

## 许可证

MIT License - 自由使用、修改和分享

## 贡献

欢迎提交Issue和Pull Request！

## 联系

如有问题，请提交Issue到GitHub仓库。

---

**祝学习愉快！📚✨**
