import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const rootDir = process.cwd();

function resolveVenvPython() {
  const windowsPython = join(rootDir, ".venv", "Scripts", "python.exe");
  const unixPython = join(rootDir, ".venv", "bin", "python");

  if (existsSync(windowsPython)) {
    return windowsPython;
  }

  if (existsSync(unixPython)) {
    return unixPython;
  }

  console.error("Virtual environment not found. Run `npm run setup` first.");
  process.exit(1);
}

const testProcess = spawn(resolveVenvPython(), ["-m", "pytest", "backend/tests"], {
  cwd: rootDir,
  stdio: "inherit",
});

testProcess.on("exit", (code) => {
  process.exit(code ?? 0);
});
