import { spawnSync } from "node:child_process";

const ports = [8000, 5173];

for (const port of ports) {
  const lookup = spawnSync(
    "powershell",
    [
      "-NoProfile",
      "-Command",
      `Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique`,
    ],
    { encoding: "utf-8" },
  );

  const processIds = lookup.stdout
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter((value) => value && value !== "0");

  for (const processId of processIds) {
    spawnSync("taskkill", ["/PID", processId, "/F"], {
      stdio: "inherit",
    });
  }
}
