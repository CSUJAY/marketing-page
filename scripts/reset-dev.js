const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const nextDir = path.join(projectRoot, ".next");

function log(message) {
  console.log(message);
}

function removeNextDir() {
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    log("Removed .next cache");
  }
}

function killPort(port) {
  if (process.platform !== "win32") return;

  try {
    const output = execSync(`netstat -ano | findstr :${port}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    const pids = new Set();
    for (const line of output.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed.includes("LISTENING")) continue;
      const pid = trimmed.split(/\s+/).at(-1);
      if (pid && pid !== "0") pids.add(pid);
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        log(`Stopped process ${pid} on port ${port}`);
      } catch {
        /* already stopped */
      }
    }
  } catch {
    /* nothing listening */
  }
}

removeNextDir();
for (const port of [3000, 3001, 3002, 3003]) {
  killPort(port);
}
log("Dev environment reset complete — run npm run dev");
