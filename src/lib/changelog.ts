import { readFileSync } from "fs";
import path from "path";

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: string;
    items: Array<{
      message: string;
      hash?: string;
    }>;
  }[];
}

export async function getChangelogEntries(): Promise<ChangelogEntry[]> {
  try {
    const changelogPath = path.join(process.cwd(), "CHANGELOG.md");
    const content = readFileSync(changelogPath, "utf-8");

    const entries: ChangelogEntry[] = [];
    let currentEntry: ChangelogEntry | null = null;
    let currentChangeType: string | null = null;

    const lines = content.split("\n");

    for (const line of lines) {
      // Version header
      const versionMatch = line.match(/### \[(.*?)\].*\((.*?)\)/);
      if (versionMatch) {
        if (currentEntry) {
          entries.push(currentEntry);
        }
        currentEntry = {
          version: versionMatch[1],
          date: versionMatch[2],
          changes: [],
        };
        continue;
      }

      // Change type header
      const changeTypeMatch = line.match(/### (.*)/);
      if (changeTypeMatch && currentEntry) {
        currentChangeType = changeTypeMatch[1];
        currentEntry.changes.push({
          type: currentChangeType,
          items: [],
        });
        continue;
      }

      // Change item with hash - handle both formats:
      // - message (hash) or - message ([hash]) or - message ([hash](url))
      const changeItemMatch = line.match(/- (.*?)\s+\((?:\[)?([a-f0-9]+)(?:\])?(?:\(.*?\))?\)/);
      if (changeItemMatch && currentEntry && currentChangeType) {
        const currentChangeTypeIndex = currentEntry.changes.length - 1;
        currentEntry.changes[currentChangeTypeIndex].items.push({
          message: changeItemMatch[1],
          hash: changeItemMatch[2],
        });
        continue;
      }

      // Change item without hash
      const simpleChangeItemMatch = line.match(/- (.*)/);
      if (simpleChangeItemMatch && currentEntry && currentChangeType) {
        const currentChangeTypeIndex = currentEntry.changes.length - 1;
        currentEntry.changes[currentChangeTypeIndex].items.push({
          message: simpleChangeItemMatch[1],
        });
      }
    }

    // Don't forget to push the last entry
    if (currentEntry) {
      entries.push(currentEntry);
    }

    return entries;
  } catch (error) {
    console.error("Error reading changelog:", error);
    return [];
  }
}
