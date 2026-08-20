---
sidebar_position: 3
title: Konva.js 开发 AI 工具
sidebar_label: AI 工具
hide_table_of_contents: true
slug: ai_tools.html
description: "使用 AI 更快地构建 Konva.js 应用。与通过 Konva 文档训练的 AI 机器人聊天，或将 Konva MCP 服务器连接到 Cursor、Claude Desktop、Windsurf 和其他 AI 编程工具。"
---

## 使用 Konva 和 AI 编程

我们提供多种 AI 工具，帮助你更快地构建 Konva 应用。所有工具均由 [CrawlChat](https://www.crawlchat.com/) 提供支持。

AI 智能体会广泛使用 Konva 文档来回答问题。请注意，它是一个 LLM，与任何现代 LLM 一样，可能给出错误答案。

## AI 聊天机器人

单击任意页面上的“Ask AI”按钮，即可询问有关 Konva 的问题。

也可以加入 [Konva Discord 社区](https://discord.gg/8FqZwVT)，并在那里询问 `@AiBot-CrawlChat`。

## MCP（模型上下文协议）

MCP 是一种将 AI 编程工具连接到外部文档的标准协议。Cursor、Claude Desktop 和 Windsurf 等工具通过 Konva MCP 服务器帮助你编写代码时，可以直接访问 Konva 文档。

### Cursor

将以下内容添加到 Cursor MCP 设置中：

**重要：Cursor 仅在“Agent”模式下使用 MCP。“Ask”和其他模式不会使用 MCP。**

```json
"konva-documentation": {
  "command": "npx",
  "args": [
    "crawl-chat-mcp",
    "--id=67d221efb4b9de65095a2579",
    "--name=konva_documentation"
  ]
}
```

### Claude Desktop

将以下内容添加到 Claude Desktop 配置文件（`claude_desktop_config.json`）中：

```json
{
  "mcpServers": {
    "konva-documentation": {
      "command": "npx",
      "args": [
        "crawl-chat-mcp",
        "--id=67d221efb4b9de65095a2579",
        "--name=konva_documentation"
      ]
    }
  }
}
```

在 macOS 上，配置文件位于 `~/Library/Application Support/Claude/claude_desktop_config.json`。在 Windows 上，配置文件位于 `%APPDATA%\Claude\claude_desktop_config.json`。

### Windsurf

将以下内容添加到 Windsurf MCP 配置中：

```json
"konva-documentation": {
  "command": "npx",
  "args": [
    "crawl-chat-mcp",
    "--id=67d221efb4b9de65095a2579",
    "--name=konva_documentation"
  ]
}
```

### 通用 MCP 命令

对于任何兼容 MCP 的工具，请使用：

```
npx crawl-chat-mcp --id=67d221efb4b9de65095a2579 --name=konva_documentation
```

## LLM 可读文档

Konva 为 AI 工具提供机器可读的文档文件：

- [`/llms.txt`](/llms.txt) — Konva 的简要概述，包含主要文档链接（遵循 [llmstxt.org](https://llmstxt.org/) 标准）
- [`<page>.md`](pathname:///zh-Hans/docs/overview.md) —— 每个文档页面都在相同路径下以 `.md` 扩展名提供纯 Markdown 版本

这些文件帮助 AI 助手准确回答有关 Konva 的问题。

## 结合 Konva 使用 AI 的提示

向 AI 工具询问 Konva 时，可以通过以下方式获得更好的结果：

- 在提示词中明确提及“Konva”或“react-konva”
- 引用具体的 Konva 功能，例如“Transformer”“Layer”或“toDataURL”
- 每次询问一项任务，不要组合多个问题
- 对照 [Konva 文档](/docs/overview.html)和 [API 参考](/api/Konva.html)检查 AI 生成的代码
