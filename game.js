// 游戏主文件
const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: 'game-container',
    backgroundColor: '#667eea',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// 预加载场景
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // 创建加载提示
        const loadingText = this.add.text(480, 320, '游戏加载中...', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);

        // 动态创建场景背景纹理
        this.createSceneTextures();
    }

    createSceneTextures() {
        // 为每个场景创建卡通风格背景
        gameData.scenes.forEach(scene => {
            this.createCartoonBackground(scene);
        });
    }

    createCartoonBackground(scene) {
        const size = 512;
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        // 背景色
        graphics.fillStyle(scene.backgroundColor, 1);
        graphics.fillRect(0, 0, size, size);

        // 添加卡通风格装饰元素
        this.addSceneDecorations(graphics, scene, size);

        // 生成纹理
        graphics.generateTexture(`bg_${scene.id}`, size, size);
        graphics.destroy();
    }

    addSceneDecorations(graphics, scene, size) {
        // 添加云朵
        graphics.fillStyle('#ffffff', 0.8);
        this.drawCloud(graphics, 100, 80, 60);
        this.drawCloud(graphics, 350, 50, 80);
        this.drawCloud(graphics, 420, 120, 50);

        // 添加太阳（仅公园场景）
        if (scene.id === 'park' || scene.id === 'playground') {
            graphics.fillStyle('#ffeb3b', 1);
            graphics.fillCircle(450, 80, 40);
            graphics.fillStyle('#fff176', 1);
            graphics.fillCircle(450, 80, 30);
        }

        // 添加地面装饰
        const groundColor = Phaser.Display.Color.ValueToColor(scene.backgroundColor).darken(20);
        graphics.fillStyle(`#${groundColor.color.toString(16)}`, 1);
        graphics.fillRect(0, size - 80, size, 80);
    }

    drawCloud(graphics, x, y, size) {
        graphics.beginPath();
        graphics.arc(x, y, size * 0.5, Phaser.Math.PI2, 0, true);
        graphics.fillPath();
        graphics.closePath();
    }

    create() {
        this.scene.start('MenuScene');
    }
}

// 主菜单场景
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // 移除加载文字
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        // 标题
        this.add.text(480, 100, '🎯 英语捉迷藏游戏', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial',
            stroke: '#333333',
            strokeThickness: 6
        }).setOrigin(0.5);

        // 副标题
        this.add.text(480, 160, '选择场景开始游戏', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);

        // 场景选择按钮
        let startY = 240;
        gameData.scenes.forEach((scene, index) => {
            const button = this.createSceneButton(480, startY + index * 90, scene);
            button.setData('sceneIndex', index);
        });

        // 说明文字
        const instructions = '玩法：点击或拖拽找到隐藏的物品，读出英文单词！';
        this.add.text(480, 580, instructions, {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);
    }

    createSceneButton(x, y, scene) {
        const button = this.add.container(x, y);

        // 按钮背景
        const bg = this.add.rectangle(0, 0, 400, 70, scene.accentColor)
            .setStrokeStyle(3, 0xffffff)
            .setInteractive({ useHandCursor: true });

        // 场景图标
        const icon = this.add.text(-160, 0, scene.icon, {
            fontSize: '40px'
        }).setOrigin(0.5);

        // 场景名称
        const name = this.add.text(50, 0, `${scene.name} (${scene.items.length}个物品)`, {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // 年级标签
        const grade = this.add.text(160, 0, `第${scene.grade}册`, {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);

        button.add([bg, icon, name, grade]);

        // 按钮悬停效果
        bg.on('pointerover', () => {
            bg.setFillStyle(Phaser.Display.Color.ValueToColor(scene.accentColor).brighten(30).color);
        });
        bg.on('pointerout', () => {
            bg.setFillStyle(scene.accentColor);
        });

        // 按钮点击事件
        bg.on('pointerdown', () => {
            this.cameras.main.fade(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start('GameScene', { sceneIndex: button.getData('sceneIndex') });
            });
        });

        return button;
    }
}

// 游戏场景
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.sceneIndex = data.sceneIndex || 0;
        this.currentScene = gameData.scenes[this.sceneIndex];
        this.hiddenItems = [];
        this.foundItems = [];
        this.isDragging = false;
    }

    create() {
        // 设置背景
        this.add.image(480, 320, `bg_${this.currentScene.id}`);

        // 创建返回按钮
        this.createBackButton();

        // 创建顶部信息栏
        this.createTopBar();

        // 随机选择要隐藏的物品
        this.selectHiddenItems();

        // 创建隐藏物品
        this.createHiddenItems();

        // 添加交互提示
        this.showHint();

        // 检查语音支持
        this.checkVoiceSupport();
    }

    createBackButton() {
        const btn = this.add.rectangle(60, 40, 100, 50, 0xff6b6b)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(2, 0xffffff);

        const text = this.add.text(60, 40, '返回', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);

        const container = this.add.container(0, 0, [btn, text]);

        btn.on('pointerdown', () => {
            this.cameras.main.fade(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start('MenuScene');
            });
        });

        btn.on('pointerover', () => btn.setFillStyle(0xff5252));
        btn.on('pointerout', () => btn.setFillStyle(0xff6b6b));
    }

    createTopBar() {
        // 背景栏
        this.add.rectangle(480, 30, 960, 60, 0x333333)
            .setAlpha(0.9);

        // 场景名称
        this.add.text(150, 30, this.currentScene.name, {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // 进度显示
        this.progressText = this.add.text(820, 30, '0/0', {
            fontSize: '22px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);

        this.updateProgress();
    }

    updateProgress() {
        const found = this.foundItems.length;
        const total = this.hiddenItems.length;
        this.progressText.setText(`${found}/${total}`);

        // 检查是否全部找到
        if (found === total && total > 0) {
            this.time.delayedCall(1000, () => {
                this.scene.start('WinScene', {
                    scene: this.currentScene,
                    foundItems: this.foundItems
                });
            });
        }
    }

    selectHiddenItems() {
        const config = gameData.hiddenItemsConfig;
        const min = Math.min(config.minHidden, this.currentScene.items.length);
        const max = Math.min(config.maxHidden, this.currentScene.items.length);
        const count = Phaser.Math.Between(min, max);

        // 随机打乱并选择
        const shuffled = [...this.currentScene.items]
            .sort(() => Math.random() - 0.5)
            .slice(0, count);

        this.hiddenItems = shuffled;
    }

    createHiddenItems() {
        const padding = 100;
        const gameArea = {
            minX: padding,
            maxX: 960 - padding,
            minY: 120,
            maxY: 540
        };

        this.hiddenItems.forEach((item, index) => {
            // 随机位置，确保不重叠
            const pos = this.findValidPosition(gameArea, item.size * 40);

            // 创建物品容器
            const container = this.add.container(pos.x, pos.y);

            // 创建物品（使用emoji图标）
            const icon = this.add.text(0, 0, item.icon, {
                fontSize: `${Math.round(item.size * 40)}px`
            }).setOrigin(0.5);

            // 创建遮罩（隐藏效果）
            const mask = this.add.rectangle(0, 0, item.size * 40, item.size * 40, this.currentScene.accentColor)
                .setAlpha(0.9)
                .setInteractive({ useHandCursor: true, draggable: true })
                .setStrokeStyle(3, 0xffffff);

            // 添加问号
            const question = this.add.text(0, 0, '?', {
                fontSize: `${Math.round(item.size * 30)}px`,
                fill: '#ffffff'
            }).setOrigin(0.5);

            container.add([icon, mask, question]);
            container.setData('item', item);
            container.setData('found', false);
            container.setData('originalAlpha', 1);

            // 设置交互区域
            mask.on('pointerdown', (pointer) => {
                if (!container.getData('found')) {
                    this.foundItem(container, pointer);
                }
            });

            mask.on('dragstart', () => {
                this.isDragging = true;
            });

            mask.on('drag', (pointer, dragX, dragY) => {
                container.x = dragX;
                container.y = dragY;
            });

            mask.on('dragend', () => {
                this.isDragging = false;
            });

            // 隐藏动画
            container.setScale(0);
            this.tweens.add({
                targets: container,
                scale: 1,
                duration: 500,
                ease: 'Elastic.out',
                delay: index * 200
            });
        });
    }

    findValidPosition(area, size) {
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
            const x = Phaser.Math.Between(area.minX + size, area.maxX - size);
            const y = Phaser.Math.Between(area.minY + size, area.maxY - size);

            // 检查是否与其他物品重叠
            let overlap = false;
            for (const existing of this.children.list) {
                if (existing.getData && existing.getData('item')) {
                    const distance = Phaser.Math.Distance.Between(
                        x, y,
                        existing.x, existing.y
                    );
                    if (distance < size * 1.5) {
                        overlap = true;
                        break;
                    }
                }
            }

            if (!overlap) {
                return { x, y };
            }

            attempts++;
        }

        return { x: Phaser.Math.Between(area.minX, area.maxX), y: Phaser.Math.Between(area.minY, area.maxY) };
    }

    foundItem(container, pointer) {
        if (this.isDragging) return;

        container.setData('found', true);
        this.foundItems.push(container.getData('item'));

        // 移除遮罩
        const mask = container.getAt(1);
        const question = container.getAt(2);
        mask.destroy();
        question.destroy();

        // 显示物品和文字
        const item = container.getData('item');
        
        // 添加高亮边框
        const border = this.add.rectangle(0, 0, item.size * 45, item.size * 45)
            .setStrokeStyle(4, 0x4caf50)
            .setAlpha(0);

        
        container.add(border);

        // 高亮动画
        this.tweens.add({
            targets: border,
            alpha: 1,
            duration: 300,
            yoyo: true,
            repeat: 2
        });

        // 显示英文单词
        const wordText = this.add.text(0, item.size * 25, item.word, {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 10, y: 5 },
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        container.add(wordText);

        // 如果启用中文，显示中文
        if (gameData.settings.showChinese) {
            const chineseText = this.add.text(0, item.size * 25 + 35, item.chinese, {
                fontSize: '18px',
                fill: '#ffffff',
                backgroundColor: '#666666',
                padding: { x: 8, y: 3 },
                fontFamily: 'Microsoft YaHei, SimHei, Arial'
            }).setOrigin(0.5);
            container.add(chineseText);
        }

        // 播放音效
        this.playSound('found');

        // 朗读单词
        if (gameData.settings.enableVoice) {
            this.speakWord(item.word);
        }

        // 更新进度
        this.updateProgress();

        // 隐藏提示
        this.hintText?.destroy();
    }

    speakWord(word) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }

    checkVoiceSupport() {
        if (!('speechSynthesis' in window)) {
            console.warn('浏览器不支持语音合成');
        }
    }

    playSound(type) {
        // 使用Web Audio API生成简单音效
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        if (type === 'found') {
            // 成功音效：上升音调
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        }

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }

    showHint() {
        this.hintText = this.add.text(480, 580, '💡 点击或拖拽 ? 找到隐藏的物品！', {
            fontSize: '20px',
            fill: '#ffffff',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: { x: 15, y: 10 },
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);

        // 5秒后淡出
        this.tweens.add({
            targets: this.hintText,
            alpha: 0,
            duration: 1000,
            delay: 4000,
            onComplete: () => this.hintText?.destroy()
        });
    }
}

// 胜利场景
class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    init(data) {
        this.scene = data.scene;
        this.foundItems = data.foundItems;
    }

    create() {
        // 背景
        this.add.rectangle(480, 320, 960, 640, 0x4caf50, 0.9);

        // 胜利文字
        this.add.text(480, 150, '🎉 太棒了！', {
            fontSize: '64px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial',
            stroke: '#333333',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(480, 230, '你找到了所有隐藏的物品！', {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);

        // 找到的物品列表
        let startY = 320;
        this.foundItems.forEach((item, index) => {
            const y = startY + (index % 5) * 60;
            const x = 200 + Math.floor(index / 5) * 350;

            // 物品卡片
            const bg = this.add.rectangle(x, y, 300, 50, 0xffffff, 0.9)
                .setStrokeStyle(2, 0x4caf50);

            // 图标
            this.add.text(x - 120, y, item.icon, {
                fontSize: '32px'
            }).setOrigin(0.5);

            // 单词
            this.add.text(x + 20, y, item.word, {
                fontSize: '20px',
                fill: '#333333',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        });

        // 重玩按钮
        const replayBtn = this.add.rectangle(480, 530, 200, 60, 0xff9800)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(3, 0xffffff);

        const replayText = this.add.text(480, 530, '再玩一次', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Microsoft YaHei, SimHei, Arial'
        }).setOrigin(0.5);

        replayBtn.on('pointerover', () => replayBtn.setFillStyle(0xfb8c00));
        replayBtn.on('pointerout', () => replayBtn.setFillStyle(0xff9800));
        replayBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

// 注册场景
config.scene = [PreloadScene, MenuScene, GameScene, WinScene];

// 初始化游戏
window.addEventListener('load', () => {
    new Phaser.Game(config);
});
