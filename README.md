<div align="center">
  <h1>awecolor: Hex Color Visualizer</h1>
  <p><strong>Colorize hex color codes in your terminal.</strong></p>
  <p>Pipe text or pass files to see hex colors rendered with their actual background.</p>
  <p>
    <strong>English</strong> ·
    <a href="./README_cn.md">简体中文</a> ·
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

> Colorize hex color codes in your terminal.

A small CLI that finds hex color codes (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`) in text and renders them with colored backgrounds. Useful for previewing colors in CSS, config files, or any text that contains hex values.

## Install

```bash
npm install -g awecolor
```

Or run directly with `npx`:

```bash
npx awecolor styles.css
```

## Quick Start

```bash
# Pipe from any command
cat styles.css | awecolor

# Read a file directly
awecolor theme.json

# List all colors with locations
awecolor --extract styles.css
```

## Commands

```bash
awecolor [OPTIONS] [FILE...]

awecolor styles.css                     # Colorize hex codes in a file
cat styles.css | awecolor               # Colorize from stdin
awecolor --extract styles.css           # List colors with location and context
awecolor --no-color styles.css          # Plain text output (no ANSI)
awecolor --force-color styles.css       # Force color even when piped
```

## Development

```bash
npm test
```
