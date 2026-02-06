// 人教版小学英语教材单词库
// 按年级和场景分类

const gameData = {
    // 场景配置
    scenes: [
        {
            id: 'classroom',
            name: '教室',
            icon: '🏫',
            grade: 1,
            backgroundColor: '#fff5e6', // 浅橙色
            accentColor: '#ff9800',
            items: [
                { id: 1, word: 'book', chinese: '书本', icon: '📚', size: 1 },
                { id: 2, word: 'pencil', chinese: '铅笔', icon: '✏️', size: 0.8 },
                { id: 3, word: 'desk', chinese: '课桌', icon: '🪑', size: 1.2 },
                { id: 4, word: 'chair', chinese: '椅子', icon: '🪑', size: 1.1 },
                { id: 5, word: 'blackboard', chinese: '黑板', icon: '📋', size: 1.5 },
                { id: 6, word: 'bag', chinese: '书包', icon: '🎒', size: 1.3 },
                { id: 7, word: 'ruler', chinese: '尺子', icon: '📏', size: 0.9 },
                { id: 8, word: 'eraser', chinese: '橡皮', icon: '🧽', size: 0.7 },
                { id: 9, word: 'pen', chinese: '钢笔', icon: '✒️', size: 0.8 },
                { id: 10, word: 'notebook', chinese: '笔记本', icon: '📓', size: 1 }
            ]
        },
        {
            id: 'home',
            name: '家庭',
            icon: '🏠',
            grade: 1,
            backgroundColor: '#e8f5e9', // 浅粉色
            accentColor: '#e91e63',
            items: [
                { id: 11, word: 'bed', chinese: '床', icon: '🛏️', size: 1.5 },
                { id: 12, word: 'chair', chinese: '椅子', icon: '🪑', size: 1.1 },
                { id: 13, word: 'table', chinese: '桌子', icon: '🪑', size: 1.4 },
                { id: 14, word: 'lamp', chinese: '台灯', icon: '💡', size: 0.9 },
                { id: 15, word: 'clock', chinese: '闹钟', icon: '⏰', size: 0.8 },
                { id: 16, word: 'window', chinese: '窗户', icon: '🪟', size: 1.3 },
                { id: 17, word: 'door', chinese: '门', icon: '🚪', size: 1.4 },
                { id: 18, word: 'picture', chinese: '画', icon: '🖼️', size: 1.1 },
                { id: 19, word: 'flower', chinese: '花', icon: '🌸', size: 0.7 },
                { id: 20, word: 'plant', chinese: '植物', icon: '🪴', size: 1.2 }
            ]
        },
        {
            id: 'park',
            name: '公园',
            icon: '🌳',
            grade: 1,
            backgroundColor: '#e3f2fd', // 浅绿色
            accentColor: '#4caf50',
            items: [
                { id: 21, word: 'tree', chinese: '树', icon: '🌳', size: 1.5 },
                { id: 22, word: 'flower', chinese: '花', icon: '🌸', size: 0.7 },
                { id: 23, word: 'bird', chinese: '鸟', icon: '🐦', size: 0.8 },
                { id: 24, word: 'dog', chinese: '狗', icon: '🐕', size: 1.1 },
                { id: 25, word: 'cat', chinese: '猫', icon: '🐱', size: 1.0 },
                { id: 26, word: 'bench', chinese: '长椅', icon: '🪑', size: 1.3 },
                { id: 27, word: 'sun', chinese: '太阳', icon: '☀️', size: 1.2 },
                { id: 28, word: 'cloud', chinese: '云', icon: '☁️', size: 1.0 },
                { id: 29, word: 'grass', chinese: '草地', icon: '🌿', size: 1.5 },
                { id: 30, word: 'path', chinese: '小路', icon: '🛤️', size: 1.4 }
            ]
        },
        {
            id: 'zoo',
            name: '动物园',
            icon: '🦁',
            grade: 2,
            backgroundColor: '#fff3e0', // 浅黄色
            accentColor: '#ff9800',
            items: [
                { id: 31, word: 'lion', chinese: '狮子', icon: '🦁', size: 1.4 },
                { id: 32, word: 'tiger', chinese: '老虎', icon: '🐅', size: 1.4 },
                { id: 33, word: 'elephant', chinese: '大象', icon: '🐘', size: 1.6 },
                { id: 34, word: 'monkey', chinese: '猴子', icon: '🐵', size: 1.0 },
                { id: 35, word: 'panda', chinese: '熊猫', icon: '🐼', size: 1.3 },
                { id: 36, word: 'zebra', chinese: '斑马', icon: '🦓', size: 1.3 },
                { id: 37, word: 'giraffe', chinese: '长颈鹿', icon: '🦒', size: 1.6 },
                { id: 38, word: 'kangaroo', chinese: '袋鼠', icon: '🦘', size: 1.2 },
                { id: 39, word: 'koala', chinese: '考拉', icon: '🐨', size: 1.1 },
                { id: 40, word: 'snake', chinese: '蛇', icon: '🐍', size: 1.0 }
            ]
        },
        {
            id: 'playground',
            name: '游乐场',
            icon: '🎡',
            grade: 2,
            backgroundColor: '#f3e5f5', // 浅紫色
            accentColor: '#9c27b0',
            items: [
                { id: 41, word: 'slide', chinese: '滑梯', icon: '🎢', size: 1.5 },
                { id: 42, word: 'swing', chinese: '秋千', icon: '🎡', size: 1.4 },
                { id: 43, word: 'ball', chinese: '球', icon: '⚽', size: 1.0 },
                { id: 44, word: 'frisbee', chinese: '飞盘', icon: '🥏', size: 0.9 },
                { id: 45, word: 'kite', chinese: '风筝', icon: '🪁', size: 1.1 },
                { id: 46, word: 'bicycle', chinese: '自行车', icon: '🚲', size: 1.5 },
                { id: 47, word: 'skateboard', chinese: '滑板', icon: '🛹', size: 1.3 },
                { id: 48, word: 'trampoline', chinese: '蹦床', icon: '🤸', size: 1.5 },
                { id: 49, word: 'sandbox', chinese: '沙坑', icon: '🏖️', size: 1.4 },
                { id: 50, word: 'fountain', chinese: '喷泉', icon: '⛲', size: 1.3 }
            ]
        }
    ],

    // 隐藏物品配置
    hiddenItemsConfig: {
        minHidden: 3,  // 最少隐藏物品数
        maxHidden: 5,  // 最多隐藏物品数
        difficulty: 'medium'  // easy, medium, hard
    },

    // 游戏设置
    settings: {
        enableVoice: true,           // 启用语音合成
        enableSpeechRecognition: false, // 语音识别（可选）
        showChinese: false,         // 是否显示中文翻译
        autoRead: true,             // 找到后自动朗读
        allowRetry: true             // 允许重新开始
    }
};
