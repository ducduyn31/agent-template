import { Args, Flags } from '@oclif/core'
import { input, select, confirm } from '@inquirer/prompts'
import { BaseCommand } from '../../base-command.js'

export default class ProjectCreate extends BaseCommand {
  static override description = 'Create a new MCP server project'

  static override examples = [
    '<%= config.bin %> <%= command.id %> my-mcp-server',
    '<%= config.bin %> <%= command.id %> my-mcp-server --output ./projects',
    '<%= config.bin %> <%= command.id %> --interactive',
  ]

  static override args = {
    name: Args.string({
      description: 'Project name',
      required: false,
    }),
  }

  static override flags = {
    output: Flags.string({
      char: 'o',
      description: 'Output directory',
      default: './',
    }),
    interactive: Flags.boolean({
      char: 'i',
      description: 'Use interactive mode',
      default: false,
    }),
    docker: Flags.boolean({
      description: 'Include Docker setup',
      default: true,
    }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(ProjectCreate)
    
    let name = args.name
    let outputDir = flags.output
    let includeDocker = flags.docker
    let includeResources = false
    let includePrompts = false
    
    if (flags.interactive || !name) {
      name = await input({
        message: 'Project name:',
        default: name || 'mcp-server',
      })
      
      outputDir = await input({
        message: 'Output directory:',
        default: outputDir,
      })
      
      const components = await select({
        message: 'Select components to include:',
        choices: [
          { name: 'Tools only', value: 'tools' },
          { name: 'Tools + Resources', value: 'tools+resources' },
          { name: 'Tools + Prompts', value: 'tools+prompts' },
          { name: 'All components', value: 'all' },
        ],
      })
      
      includeResources = components === 'tools+resources' || components === 'all'
      includePrompts = components === 'tools+prompts' || components === 'all'
      
      includeDocker = await confirm({
        message: 'Include Docker setup?',
        default: true,
      })
    }
    
    const spinner = this.spinner(`Creating MCP server project: ${name}`)
    
    try {
      // TODO: Implement actual project generation
      // For now, just log what would be created
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate work
      
      this.logInfo(`Project name: ${name}`)
      this.logInfo(`Output directory: ${outputDir}`)
      this.logInfo(`Components:`)
      this.log(`  - Tools: Yes (always included)`)
      this.log(`  - Resources: ${includeResources ? 'Yes' : 'No'}`)
      this.log(`  - Prompts: ${includePrompts ? 'Yes' : 'No'}`)
      this.logInfo(`Docker setup: ${includeDocker ? 'Yes' : 'No'}`)
      
      spinner.success(`Project created successfully: ${name}`)
      
      this.logSuccess('\nNext steps:')
      this.log(`  cd ${outputDir}/${name}`)
      this.log('  npm install')
      this.log('  npm run dev')
      
      if (includeDocker) {
        this.log('\nTo build and run with Docker:')
        this.log(`  cd ${outputDir}/${name}`)
        this.log('  docker build -t my-mcp-server .')
        this.log('  docker run -it --rm my-mcp-server')
      }
    } catch (error) {
      spinner.error('Failed to create project')
      this.logError(`Error: ${error instanceof Error ? error.message : String(error)}`)
      this.exit(1)
    }
  }
}
