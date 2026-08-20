---
sidebar_position: 3
title: AI Tools for Konva.js Development
sidebar_label: AI tools
hide_table_of_contents: true
slug: ai_tools.html
description: "Use AI to build Konva.js apps faster. Chat with an AI bot trained on Konva docs, or connect the Konva MCP server to Cursor, Claude Desktop, Windsurf, and other AI coding tools."
---

## Coding with Konva and AI

We have several AI tools to help you build Konva apps faster. All of them are powered by [CrawlChat](https://www.crawlchat.com/).

The AI agent uses Konva docs extensively to answer your questions. Please remember it is an LLM and as any modern LLM it may give wrong answers.

## AI Chat Bot

Click the "Ask AI" button on any page to ask a question about Konva.

You can also join the [Konva Discord community](https://discord.gg/8FqZwVT) and ask `@AiBot-CrawlChat` there.

## MCP (Model Context Protocol)

MCP is a standard protocol that connects AI coding tools to external documentation. With the Konva MCP server, tools like Cursor, Claude Desktop, and Windsurf can access Konva documentation directly when helping you write code.

### Cursor

Add the following to your Cursor MCP settings:

**Important: Cursor uses MCP only in "Agent" mode. "Ask" and other modes will not use it.**

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

Add the following to your Claude Desktop config file (`claude_desktop_config.json`):

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

On macOS, the config file is at `~/Library/Application Support/Claude/claude_desktop_config.json`. On Windows, it's at `%APPDATA%\Claude\claude_desktop_config.json`.

### Windsurf

Add the following to your Windsurf MCP configuration:

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

### Generic MCP Command

For any MCP-compatible tool, use:

```
npx crawl-chat-mcp --id=67d221efb4b9de65095a2579 --name=konva_documentation
```

## LLM-Readable Documentation

Konva provides machine-readable documentation files for AI tools:

- [`/llms.txt`](/llms.txt) — Concise summary of Konva with key documentation links (follows the [llmstxt.org](https://llmstxt.org/) standard)
- [`<page>.md`](pathname:///docs/overview.md) — Every documentation page is also served as plain markdown at the same path with a `.md` extension

These files help AI assistants give accurate answers about Konva.

## Tips for Using AI with Konva

When asking AI tools about Konva, you'll get better results if you:

- Mention "Konva" or "react-konva" explicitly in your prompt
- Reference specific Konva features (e.g., "Transformer", "Layer", "toDataURL")
- Ask about one task at a time rather than combining multiple questions
- Verify AI-generated code against the [Konva docs](https://konvajs.org/docs/overview.html) and [API reference](https://konvajs.org/api/Konva.html)
