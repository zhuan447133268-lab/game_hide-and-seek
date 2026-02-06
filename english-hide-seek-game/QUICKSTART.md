# 🚀 快速启动指南

## 方法1：本地测试（5秒开始）

### Windows
```bash
cd english-hide-seek-game
start index.html
```

### Mac/Linux
```bash
cd english-hide-seek-game
open index.html
# 或
python -m http.server 8080
```

然后访问 http://localhost:8080

---

## 方法2：部署到GitHub Pages（5分钟上线）

### 1️⃣ 创建GitHub仓库
- 登录 https://github.com
- 点击右上角 `+` → `New repository`
- 仓库名称填写：`english-hide-seek-game`
- 选择 `Public`（公开）或 `Private`（私有）
- 点击 `Create repository`

### 2️⃣ 上传文件
在仓库页面点击 `uploading an existing file`，然后：
- 拖拽整个 `english-hide-seek-game` 文件夹到页面
- 填写：`Initial commit: 英语捉迷藏游戏`
- 点击 `Commit changes`

### 3️⃣ 启用GitHub Pages
1. 在仓库页面点击 `Settings`（右上角齿轮图标）
2. 左侧菜单找到并点击 `Pages`
3. 在 `Build and deployment` 部分：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `main`
   - **Folder**: 选择 `/ (root)`
4. 点击 `Save`

### 4️⃣ 获取游戏链接
等待1-2分钟后，访问：
```
https://YOUR_USERNAME.github.io/english-hide-seek-game
```
（替换 `YOUR_USERNAME` 为你的GitHub用户名）

---

## 自定义游戏

### 添加新场景
编辑 `data/gameData.js`：

```javascript
scenes: [
    {
        id: 'my_scene',
        name: '我的场景',
        icon: '🎨',
        grade: 1,
        backgroundColor: '#ffeb3b',  // 背景色
        accentColor: '#ff9800',      // 强调色
        items: [
            { id: 101, word: 'apple', chinese: '苹果', icon: '🍎', size: 1 },
            { id: 102, word: 'cat', chinese: '猫', icon: '🐱', size: 1.2 }
        ]
    }
]
```

### 修改游戏设置
在 `data/gameData.js` 中：

```javascript
settings: {
    enableVoice: true,           // true=开启朗读，false=关闭
    showChinese: false,         // true=显示中文，false=只显示英文
    autoRead: true,             // 找到物品后自动朗读
    allowRetry: true             // 允许重玩
}
```

---

## 常见问题

### Q: 语音不工作？
A: 确保浏览器支持Web Speech API。建议使用Chrome、Edge或Safari最新版。

### Q: 无法拖拽物品？
A: 这是正常的，物品被"隐藏"后不能拖拽，只能点击来"发现"。

### Q: 如何添加更多单词？
A: 编辑 `data/gameData.js` 的 `scenes` 数组，按照现有格式添加。

### Q: 游戏加载慢？
A: 游戏使用CDN加载Phaser，首次可能需要几秒。建议使用稳定网络。

### Q: GitHub Pages无法访问？
A: 检查：
1. Settings → Pages 是否已启用
2. 分支是否选择 `main`
3. 等待2-3分钟让部署完成

---

## 技术支持

- Phaser文档：https://photonstorm.github.io/phaser3-docs/
- Web Speech API：https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API
- GitHub Pages帮助：https://docs.github.com/en/pages

---

🎮 祝你玩得开心！
