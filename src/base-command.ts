import { Command } from "@oclif/core";
import { pathExists, readJson, ensureDir as ensureDirFs } from "fs-extra";
import { join as joinPath, resolve } from "path";
import { red, green, blue, yellow } from "yoctocolors";
import yoctospinner from "yocto-spinner";

export abstract class BaseCommand extends Command {

  protected async isMcpProject(dir: string): Promise<boolean> {
    try {
      const packageJsonPath = joinPath(dir, "package.json");
      if (await pathExists(packageJsonPath)) {
        const packageJson = await readJson(packageJsonPath);
        return (
          packageJson.dependencies &&
          packageJson.dependencies["@modelcontextprotocol/sdk"] !== undefined
        );
      }
    } catch (error) {
      this.debug(`Error checking if directory is an MCP project: ${error}`);
    }
    return false;
  }

  protected resolvePath(relativePath: string): string {
    return resolve(process.cwd(), relativePath);
  }

  protected async ensureDir(dir: string): Promise<void> {
    await ensureDirFs(dir);
  }

  protected logSuccess(message: string): void {
    this.log(green(message));
  }

  protected logError(message: string): void {
    this.log(red(message));
  }

  protected logWarning(message: string): void {
    this.log(yellow(message));
  }

  protected logInfo(message: string): void {
    this.log(blue(message));
  }

  protected spinner(text: string) {
    return yoctospinner({
        text,
    }).start();
  }
}