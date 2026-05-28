<div align="center">
  <h1>awecolor: Hex Color Visualizer</h1>
  <p><strong>在终端中渲染十六进制颜色代码。</strong></p>
  <p>通过管道或文件参数传入文本，即可看到十六进制颜色的实际背景效果。</p>
  <p>
    <a href="./README.md">English</a> ·
    <strong>简体中文</strong> ·
    <a href="https://we.webioinfo.top/">Webioinfo</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/version-0.1.0-7C3AED?style=flat-square" alt="Version">
    <img src="https://img.shields.io/badge/node-%E2%89%A518-0EA5E9?style=flat-square" alt="Node">
  </p>
  <p>
    <img src="https://img.shields.io/badge/status-alpha-c96a3d?style=flat-square" alt="Status">
    <img src="https://img.shields.io/badge/install-npm-22C55E?style=flat-square" alt="npm install">
    <img src="https://img.shields.io/badge/platform-terminal-334155?style=flat-square" alt="Platform">
    <img src="https://img.shields.io/npm/dm/awecolor?style=flat-square" alt="npm downloads">
    <img src="https://img.shields.io/github/stars/mugpeng/awecolor?style=flat-square" alt="GitHub stars">
  </p>
</div>

> 在终端中渲染十六进制颜色代码。

一个小巧的 CLI 工具，用于查找文本中的十六进制颜色代码（`#RGB`、`#RGBA`、`#RRGGBB`、`#RRGGBBAA`），并用对应颜色的背景渲染它们。适合预览 CSS、配置文件或任何包含十六进制颜色值的文本。

## 安装

```bash
npm install -g awecolor
```

或使用 `npx` 直接运行：

```bash
npx awecolor styles.css
```

## 快速开始

```bash
# 管道输入
cat styles.css | awecolor

# 读取文件
awecolor theme.json

# 列出所有颜色及其位置
awecolor --extract styles.css
```

## 命令

```bash
awecolor [OPTIONS] [FILE...]

awecolor styles.css                     # 渲染文件中的十六进制颜色
cat styles.css | awecolor               # 从 stdin 渲染
awecolor --extract styles.css           # 列出颜色、位置和上下文
awecolor --no-color styles.css          # 纯文本输出（无 ANSI）
awecolor --force-color styles.css       # 即使管道输出也强制使用颜色
```

## 开发

```bash
npm test
```
