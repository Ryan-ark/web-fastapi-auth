import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const venvDir = join(rootDir, ".venv");
const frontendDir = join(rootDir, "frontend");
const npmRunner =
  process.platform === "win32"
    ? { command: "cmd.exe", baseArgs: ["/d", "/s", "/c", "npm"] }
    : { command: "npm", baseArgs: [] };
const backendEnvFile = join(rootDir, "backend", ".env");
const backendEnvExample = join(rootDir, "backend", ".env.example");
const frontendEnvFile = join(frontendDir, ".env");
const frontendEnvExample = join(frontendDir, ".env.example");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.error) {
    console.error(`Failed to run: ${command} ${args.join(" ")}`);
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function resolvePythonCommand() {
  const candidates = [
    ["py", ["-3"]],
    ["python", []],
  ];

  for (const [command, baseArgs] of candidates) {
    const result = spawnSync(command, [...baseArgs, "--version"], {
      stdio: "ignore",
      shell: false,
    });

    if (result.status === 0) {
      return { command, baseArgs };
    }
  }

  throw new Error("Python was not found. Install Python 3.11+ and rerun `npm run setup`.");
}

function resolveVenvPython() {
  const windowsPython = join(venvDir, "Scripts", "python.exe");
  const unixPython = join(venvDir, "bin", "python");

  if (existsSync(windowsPython)) {
    return windowsPython;
  }

  if (existsSync(unixPython)) {
    return unixPython;
  }

  throw new Error("Virtual environment Python was not found after setup.");
}

function ensureEnvFile(targetFile, exampleFile) {
  if (!existsSync(targetFile) && existsSync(exampleFile)) {
    copyFileSync(exampleFile, targetFile);
  }
}

const python = resolvePythonCommand();

run(npmRunner.command, [...npmRunner.baseArgs, "install"], { cwd: rootDir });

if (!existsSync(venvDir)) {
  run(python.command, [...python.baseArgs, "-m", "venv", ".venv"], { cwd: rootDir });
}

const venvPython = resolveVenvPython();

run(venvPython, ["-m", "pip", "install", "-r", "backend/requirements.txt"], { cwd: rootDir });
run(npmRunner.command, [...npmRunner.baseArgs, "install"], { cwd: frontendDir });

ensureEnvFile(backendEnvFile, backendEnvExample);
ensureEnvFile(frontendEnvFile, frontendEnvExample);

console.log("");
console.log("Setup completed.");
console.log("Next steps:");
console.log("1. npm run local");
console.log("");
console.log("If PostgreSQL is already running, you can also use:");
console.log("- npm run db:init");
console.log("- npm run dev");
