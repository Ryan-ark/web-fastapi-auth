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

function runAlembicUpgrade() {
  return new Promise((resolve) => {
    const migrationProcess = spawn(resolveVenvPython(), ["-m", "alembic", "upgrade", "head"], {
      cwd: join(rootDir, "backend"),
      stdio: "inherit",
    });

    migrationProcess.on("exit", (code) => {
      resolve(code ?? 0);
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const maxAttempts = 12;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const code = await runAlembicUpgrade();

  if (code === 0) {
    process.exit(0);
  }

  if (attempt < maxAttempts) {
    console.log(`Migration attempt ${attempt} failed. Waiting for PostgreSQL to become ready...`);
    await sleep(3000);
  }
}

process.exit(1);
