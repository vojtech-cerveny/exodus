#!/usr/bin/env ts-node
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execPromise = promisify(exec);

const BACKUP_DIR = path.join(process.cwd(), "backups");
const CI_MODE = process.env.CI === "true" || process.env.CI === "1";

async function runCommand(command: string): Promise<string> {
  try {
    const { stdout } = await execPromise(command);
    return stdout;
  } catch (error: any) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    throw error;
  }
}

// Helper to detect if this is running in CI/CD
function isRunningInCI(): boolean {
  return CI_MODE;
}

async function main() {
  try {
    // Ensure backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // Determine environment
    const isProd = process.env.NODE_ENV === "production";
    console.log(`Running in ${isProd ? "PRODUCTION" : "DEVELOPMENT"} mode`);

    if (isRunningInCI()) {
      console.log("Detected CI/CD environment - running in automated mode");
    }

    if (isProd && !isRunningInCI()) {
      // In production (but not in CI), always ask for confirmation
      console.log("⚠️ You are about to run migrations in PRODUCTION. This operation may be destructive.");

      // Display migration status
      console.log("Checking migration status...");
      await runCommand("npx payload migrate:status");
      await runCommand("npx prisma migrate status");

      // Ask for confirmation
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const proceed = await new Promise<boolean>((resolve) => {
        readline.question("Do you want to proceed with the migration? (yes/no): ", (answer: string) => {
          readline.close();
          resolve(answer.toLowerCase() === "yes");
        });
      });

      if (!proceed) {
        console.log("Migration cancelled.");
        return;
      }
    }

    // Create backup in production (always, even in CI)
    if (isProd) {
      // Create backup
      const date = new Date().toISOString().replace(/[:.]/g, "-");
      const backupFile = path.join(BACKUP_DIR, `backup-${date}.sql`);

      console.log(`Creating database backup at ${backupFile}...`);
      try {
        await runCommand(`pg_dump -h $DATABASE_HOST -U $DATABASE_USER $DATABASE_NAME > ${backupFile}`);
        console.log("Backup created successfully.");
      } catch (error) {
        console.error("Warning: Backup creation failed, but proceeding with migration:", error);
        // Continue with migration even if backup fails in CI
        if (!isRunningInCI()) {
          throw error; // In interactive mode, fail if backup fails
        }
      }
    }

    // Run migrations
    console.log("Running PayloadCMS migrations...");
    await runCommand("npx payload migrate");

    console.log("Running Prisma migrations...");
    await runCommand("npx prisma migrate deploy");

    console.log("✅ All migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
