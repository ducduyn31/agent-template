import { run } from "@oclif/core";

export async function main() {
  await run();
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});