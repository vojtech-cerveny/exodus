import { getGitCommits } from "@/lib/git";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog | Exodus",
  description: "Historie změn a aktualizací aplikace Exodus",
};

interface Commit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

function groupCommitsByDate(commits: Commit[]) {
  const grouped = commits.reduce(
    (acc, commit) => {
      const date = formatDate(new Date(commit.date));
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(commit);
      return acc;
    },
    {} as Record<string, Commit[]>,
  );

  return grouped;
}

export default async function ChangelogPage() {
  const commits = await getGitCommits();
  const groupedCommits = groupCommitsByDate(commits);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Changelog</h1>

      {Object.entries(groupedCommits).map(([date, commits]) => (
        <div key={date} className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{date}</h2>
          <div className="space-y-4">
            {commits.map((commit) => (
              <div key={commit.hash} className="border-l-2 border-gray-200 pl-4">
                <p className="text-sm text-gray-600">
                  {commit.author} • {commit.hash.substring(0, 7)}
                </p>
                <p className="mt-1">{commit.message}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
