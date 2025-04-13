# MCP Server Template Generator CLI - Architecture Decision Record

## Status

Accepted

## Context

We need to create a CLI tool that generates MCP server project templates. The tool should be flexible, user-friendly, and follow best practices from existing MCP server implementations.

## Decision

We will create a CLI tool with the following architecture:

### 1. Framework and Libraries

- **CLI Framework**: Oclif - provides a robust structure for CLI applications with topic-based commands
- **Template Engine**: Handlebars - for generating files from templates
- **Interactive Prompts**: @inquirer/prompts - for user input and configuration
- **File Operations**: fs-extra - for enhanced file system operations
- **Code Transformation**: jscodeshift - for AST-based code transformations during migrations
- **UI Elements**: yoctocolors and yocto-spinner - for colorful output and progress indicators
- **Formatting/Linting**: Biome - for consistent code style

### 2. Command Structure

We'll use a topic-based command structure to organize functionality:

- **Project Commands**
  - `agent project create` - Creates a new MCP server project
  - `agent project migrate` - Migrates projects to newer template versions

- **Tool Commands**
  - `agent tool create` - Creates a new tool in an existing project
  - `agent tool list` - Lists available tools or tools in a project
  - `agent tool remove` - Removes a tool from a project

- **Resource Commands**
  - `agent resource create` - Creates a new resource in an existing project
  - `agent resource list` - Lists available resources or resources in a project
  - `agent resource remove` - Removes a resource from a project

- **Prompt Commands**
  - `agent prompt create` - Creates a new prompt in an existing project
  - `agent prompt list` - Lists available prompts or prompts in a project
  - `agent prompt remove` - Removes a prompt from a project

### 3. Project Structure

```
agent-template/
├── bin/                      # CLI executable files
├── src/                      # Source code
│   ├── commands/             # CLI commands organized by topics
│   │   ├── project/          # Project-related commands
│   │   ├── tool/             # Tool-related commands
│   │   ├── resource/         # Resource-related commands
│   │   └── prompt/           # Prompt-related commands
│   ├── templates/            # Template files
│   │   ├── base/             # Base project structure
│   │   ├── tools/            # Tool templates
│   │   ├── resources/        # Resource templates
│   │   ├── prompts/          # Prompt templates
│   │   ├── services/         # Service templates
│   │   └── docker/           # Docker setup templates
│   ├── utils/                # Utility functions
│   ├── codemods/             # Codemod transformations for migrations
│   ├── base-command.ts       # Base command class for all commands
│   └── index.ts              # Main entry point
├── test/                     # Tests
├── package.json              # Package configuration
└── tsconfig.json             # TypeScript configuration
```

### 4. Generated Project Structure

```
{project-name}/
├── src/
│   ├── index.ts              # Main entry point
│   ├── tools/                # Tools implementation
│   ├── resources/            # Resources implementation (optional)
│   ├── prompts/              # Prompts implementation (optional)
│   ├── services/             # Services implementation
│   └── utils/                # Utility functions
├── test/                     # Tests
├── Dockerfile                # Docker configuration (optional)
├── package.json              # Package configuration
└── tsconfig.json             # TypeScript configuration
```

### 5. Core Features

1. **Interactive Project Creation**
   - Configurable project name and output directory
   - Selection of components to include (tools, resources, prompts)
   - Optional Docker setup

2. **Component Management**
   - Add, list, and remove components from existing projects
   - Component templates with best practices

3. **Project Migration**
   - Migrate projects to newer template versions
   - Code transformations using codemods
   - Migration reports and rollback capability

4. **Hello World Examples**
   - Example implementations for each component type
   - Comprehensive tests for all components

### 6. CI/CD and Release Process

Based on the nr-mcp repository, we'll implement the following GitHub Actions workflows:

1. **Release Please**
   - Automates version management and release process
   - Creates release PRs with changelog updates
   - Runs on pushes to the main branch

2. **Docker Deploy**
   - Builds and publishes Docker images
   - Supports multi-architecture builds (arm64, amd64)
   - Tags images with version numbers and "latest" tag
   - Triggered manually or on new releases

3. **Tests**
   - Runs tests and linting on PRs and pushes to main
   - Uses pnpm for package management
   - Ensures code quality before merging

## Consequences

### Positive

- Topic-based command structure provides intuitive organization
- Oclif plugins provide additional functionality (autocomplete, help, etc.)
- Modular architecture allows for easy extension
- Interactive prompts improve user experience
- Codemod system enables safe migrations
- Automated release process ensures consistent versioning

### Negative

- More complex architecture than a simple script
- Requires maintenance of templates as MCP standards evolve
- Dependencies on external libraries may require updates

## Workflow

```mermaid
flowchart TD
    A[User] -->|Runs CLI| B[CLI Command]
    B -->|project commands| C[Project Operations]
    B -->|component commands| D[Component Operations]
    
    C -->|Prompt for info| E[Interactive Prompts]
    D -->|Prompt for info| E
    
    E -->|Generate/Modify| F[Project Generator]
    
    F -->|File Operations| G[Generated/Modified Project]
    
    G -->|npm install| H[Ready to Use]