#!/usr/bin/env ts-node
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execPromise = promisify(exec);
const BACKUP_DIR = path.join(process.cwd(), "backups");

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

async function main() {
  try {
    // List available backups
    if (!fs.existsSync(BACKUP_DIR)) {
      console.error(`Backup directory '${BACKUP_DIR}' does not exist.`);
      process.exit(1);
    }

    const backupFiles = fs
      .readdirSync(BACKUP_DIR)
      .filter((file) => file.endsWith(".sql") || file.endsWith(".dump") || file.endsWith(".custom"))
      .sort((a, b) => {
        // Sort by file creation time descending (newest first)
        return (
          fs.statSync(path.join(BACKUP_DIR, b)).mtime.getTime() - fs.statSync(path.join(BACKUP_DIR, a)).mtime.getTime()
        );
      });

    if (backupFiles.length === 0) {
      console.error("No backup files found in the backup directory.");
      process.exit(1);
    }

    console.log("Available backups:");
    backupFiles.forEach((file, index) => {
      const stats = fs.statSync(path.join(BACKUP_DIR, file));
      const fileDate = stats.mtime.toLocaleString();
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`${index + 1}. ${file} (${fileSizeMB} MB, created on ${fileDate})`);
    });

    // Ask for backup selection
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const backupIndexStr = await new Promise<string>((resolve) => {
      readline.question(`\nEnter the number of the backup to restore (1-${backupFiles.length}): `, (answer: string) => {
        resolve(answer);
      });
    });

    const backupIndex = parseInt(backupIndexStr) - 1;
    if (isNaN(backupIndex) || backupIndex < 0 || backupIndex >= backupFiles.length) {
      console.error("Invalid selection. Please run the script again.");
      readline.close();
      process.exit(1);
    }

    const selectedBackup = backupFiles[backupIndex];
    const backupPath = path.join(BACKUP_DIR, selectedBackup);

    console.log(`\nWarning: This will restore the database from '${selectedBackup}'.`);
    console.log("All current data in the database will be overwritten.");

    const confirmRestore = await new Promise<boolean>((resolve) => {
      readline.question("Do you want to proceed? (yes/no): ", (answer: string) => {
        resolve(answer.toLowerCase() === "yes");
      });
    });

    if (!confirmRestore) {
      console.log("Restore cancelled.");
      readline.close();
      return;
    }

    // Get database connection details
    let dbHost = process.env.DATABASE_HOST;
    let dbUser = process.env.DATABASE_USER;
    let dbName = process.env.DATABASE_NAME;
    let dbPort = process.env.DATABASE_PORT || "5432";
    let dbPassword = process.env.DATABASE_PASSWORD || "";

    if (!dbHost || !dbUser || !dbName) {
      console.log("Database connection details not found in environment variables.");

      dbHost = await new Promise<string>((resolve) => {
        readline.question("Database Host: ", (answer: string) => {
          resolve(answer);
        });
      });

      dbPort = await new Promise<string>((resolve) => {
        readline.question(`Database Port (default: 5432): `, (answer: string) => {
          resolve(answer || "5432");
        });
      });

      dbUser = await new Promise<string>((resolve) => {
        readline.question("Database User: ", (answer: string) => {
          resolve(answer);
        });
      });

      dbName = await new Promise<string>((resolve) => {
        readline.question("Database Name: ", (answer: string) => {
          resolve(answer);
        });
      });
    }

    // Determine the backup format and use appropriate restore command
    let restoreCommand: string;

    // Check if the file is a text format SQL dump or a custom format
    const isTextFormat = selectedBackup.endsWith(".sql");

    if (isTextFormat) {
      // For plain text SQL file, use psql
      console.log("Detected text format SQL dump. Using psql for restore...");
      restoreCommand = `PGPASSWORD="${dbPassword}" psql -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} -f "${backupPath}"`;
    } else {
      // For custom, directory, or tar format, use pg_restore
      console.log("Detected custom/binary format. Using pg_restore...");
      restoreCommand = `PGPASSWORD="${dbPassword}" pg_restore -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} --clean --if-exists "${backupPath}"`;
    }

    readline.close();

    // Execute the restore
    console.log("\nRestoring database...");
    console.log(`Running restore command...`);
    await runCommand(restoreCommand);

    console.log("✅ Database restore completed successfully!");
  } catch (error) {
    console.error("❌ Database restore failed:", error);
    console.error(
      "\nIf you're seeing 'pg_restore: error: input file appears to be a text format dump. Please use psql',",
    );
    console.error(
      "then you're trying to restore a plain SQL dump with pg_restore. The script should handle this automatically.",
    );
    console.error("\nTo manually restore your backup, use one of these commands:");
    console.error(
      "For text format (.sql files): psql -h <host> -p <port> -U <user> -d <database> -f <backup_file.sql>",
    );
    console.error("For custom format: pg_restore -h <host> -p <port> -U <user> -d <database> <backup_file.custom>");
    process.exit(1);
  }
}

main();
