import { spawnSync } from "node:child_process";

const args = new Set(process.argv.slice(2));
const shouldBuildStorybook = args.has("storybook") || args.has("--storybook");

const run = (command: string, commandArgs: string[]) => {
  const result = spawnSync(command, commandArgs, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run("pnpm", ["run", "build:lib"]);

if (shouldBuildStorybook) {
  run("pnpm", ["run", "build-storybook"]);
}
