@echo off
chcp 65001 >nul
echo.
echo ======================================
echo 🎮 英语捉迷藏游戏 - GitHub部署工具
echo ======================================
echo.

REM 检查是否在正确目录
cd /d "%~dp0"
if not exist "index.html" (
    echo ❌ 错误：请在游戏目录中运行此脚本
    pause
    exit /b 1
)

echo 📁 项目目录: %cd%
echo.

REM 检查Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 请先安装Git：https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✓ Git已安装

REM 重命名分支为main（如果需要）
git branch -M main >nul 2>&1
if errorlevel 0 echo ✓ 分支设置为 main

echo.
echo --------------------------------------
echo 🚀 正在推送代码到GitHub...
echo --------------------------------------
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ 推送失败！请检查：
    echo   1. 是否已经创建GitHub仓库：https://github.com/new
    echo   2. 用户名是否正确：zhuan447133268
    echo   3. 网络连接是否正常
    echo.
    echo 📖 详细步骤请查看 DEPLOY_GUIDE.md
    pause
    exit /b 1
) else (
    echo.
    echo ✓ 代码推送成功！
    echo.
)

echo --------------------------------------
echo 🎉 部署完成！
echo --------------------------------------
echo.
echo 请手动启用GitHub Pages：
echo 1. 访问：https://github.com/zhuan447133268/english-hide-seek-game/settings/pages
echo 2. Branch: 选择 main
echo 3. Folder: 选择 / (root)
echo 4. 点击 Save
echo.
echo 等待1-2分钟后访问：
echo https://zhuan447133268.github.io/english-hide-seek-game
pause
