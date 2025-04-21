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
    // Ensure backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
      console.log(`Created backup directory: ${BACKUP_DIR}`);
    }

    // Get command line arguments
    const args = process.argv.slice(2);
    let format = "custom"; // Default to custom format for Coolify compatibility

    // Check for format flag
    const formatIndex = args.indexOf("--format");
    if (formatIndex !== -1 && args.length > formatIndex + 1) {
      format = args[formatIndex + 1];
    }

    // Validate format
    if (!["plain", "custom", "directory", "tar"].includes(format)) {
      console.error("Invalid format. Available formats: plain, custom, directory, tar");
      console.error("Using default: custom");
      format = "custom";
    }

    // Format flag for pg_dump
    let formatFlag = "";
    let extension = "";

    switch (format) {
      case "plain":
        formatFlag = "-F p";
        extension = ".sql";
        break;
      case "custom":
        formatFlag = "-F c";
        extension = ".backup";
        break;
      case "directory":
        formatFlag = "-F d";
        extension = "_dir";
        break;
      case "tar":
        formatFlag = "-F t";
        extension = ".tar";
        break;
    }

    // Get database connection details
    let dbHost = process.env.DATABASE_HOST;
    let dbUser = process.env.DATABASE_USER;
    let dbName = process.env.DATABASE_NAME;
    let dbPort = process.env.DATABASE_PORT || "5432";
    let dbPassword = process.env.DATABASE_PASSWORD || "";

    // If environment variables are not set, prompt for them
    if (!dbHost || !dbUser || !dbName) {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

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

      readline.close();
    }

    // Generate backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}${extension}`);

    // Create backup command
    const backupCommand = `PGPASSWORD="${dbPassword}" pg_dump -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} ${formatFlag} -f "${backupFile}"`;

    console.log(`Creating database backup in ${format} format...`);
    console.log(`Running backup command...`);

    // Execute the backup command
    await runCommand(backupCommand);

    // Get the file size
    const stats = fs.statSync(backupFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`✅ Database backup completed successfully!`);
    console.log(`📁 Backup saved to: ${backupFile} (${fileSizeMB} MB)`);
    console.log(`\nTo restore this backup:`);

    if (format === "plain") {
      console.log(`- Use psql: psql -h <host> -p <port> -U <user> -d <database> -f "${backupFile}"`);
    } else {
      console.log(`- Use pg_restore: pg_restore -h <host> -p <port> -U <user> -d <database> "${backupFile}"`);
      console.log(`- Or use Coolify's restore functionality (custom format is compatible)`);
    }
  } catch (error) {
    console.error("❌ Database backup failed:", error);
    process.exit(1);
  }
}

main();
