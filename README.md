# Agent Template - MCP Server Generator

> **DRAFT VERSION** - This tool is currently in development and not ready for production use. Please check back later for a stable release.

A command-line interface (CLI) tool for generating Model Context Protocol (MCP) server projects with best practices and common patterns.

## Overview

Agent Template helps you quickly scaffold MCP server projects with the following features:

- **Project Generation**: Create new MCP server projects with a well-structured codebase
- **Component Management**: Add, list, and remove components (tools, resources, prompts)
- **Project Migration**: Upgrade existing projects to newer template versions
- **Docker Support**: Optional Docker configuration for containerized deployment

## Command Structure

The CLI uses a topic-based command structure:

```
agent project create    # Create a new MCP server project
agent project migrate   # Migrate a project to a newer template version

agent tool create       # Create a new tool in an existing project
agent tool list         # List available tools or tools in a project
agent tool remove       # Remove a tool from a project

agent resource create   # Create a new resource in an existing project
agent resource list     # List available resources or resources in a project
agent resource remove   # Remove a resource from a project

agent prompt create     # Create a new prompt in an existing project
agent prompt list       # List available prompts or prompts in a project
agent prompt remove     # Remove a prompt from a project
```

## Installation

> **Note**: This package is not yet published to npm. The installation instructions below are for future reference.

```bash
# Install globally
npm install -g agent-template

# Or use with npx
npx agent-template [command]
```

## Usage Examples

### Creating a New Project

```bash
# Basic usage
agent project create my-mcp-server

# With options
agent project create my-mcp-server --output ./projects

# Interactive mode
agent project create --interactive
```

### Adding Components

```bash
# Add a tool
agent tool create hello-world --project ./my-mcp-server

# Add a resource
agent resource create greeting --project ./my-mcp-server

# Add a prompt
agent prompt create welcome --project ./my-mcp-server
```

### Listing Components

```bash
# List tools in a project
agent tool list --project ./my-mcp-server

# List available resource templates
agent resource list templates
```

### Removing Components

```bash
# Remove a tool
agent tool remove hello-world --project ./my-mcp-server

# Remove a resource
agent resource remove greeting --project ./my-mcp-server
```

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/agent-template.git
cd agent-template

# Install dependencies
pnpm install

# Build the project
pnpm build

# Link for local development
pnpm link --global
```

### Commands

```bash
# Run in development mode
pnpm dev

# Build the project
pnpm build

# Run tests
pnpm test

# Format code
pnpm format

# Lint code
pnpm lint
```

## License

ISC