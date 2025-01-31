import { execSync } from "child_process";

interface GitCommit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export async function getGitCommits(limit = 10000): Promise<GitCommit[]> {
  try {
    const command = `git log -n ${limit} --pretty=format:"%H|%aI|%s|%an"`;
    const output = execSync(command).toString();

    return output
      .split("\n")
      .map((line) => {
        const [hash, date, message, author] = line.split("|");
        return {
          hash,
          date,
          message,
          author,
        };
      })
      .filter((commit) => {
        // Filter out merge commits and automated commits
        return (
          !commit.message.startsWith("Merge") &&
          !commit.message.includes("chore:") &&
          !commit.message.includes("[skip ci]")
        );
      });
  } catch (error) {
    console.error("Error fetching git commits:", error);
    return [];
  }
}
