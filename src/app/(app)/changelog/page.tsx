import { getChangelogEntries } from "@/lib/changelog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog | Exodus",
  description: "Historie změn a aktualizací aplikace Exodus",
};

interface ChangelogItem {
  message: string;
  hash?: string;
}

interface ChangeType {
  type: string;
  items: ChangelogItem[];
}

interface ChangelogEntry {
  version: string;
  date: string;
  changes: ChangeType[];
}

export default async function ChangelogPage() {
  const entries = await getChangelogEntries();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Changelog</h1>

      {entries.map((entry: ChangelogEntry) => (
        <div key={entry.version} className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">
            Version {entry.version} - {entry.date}
          </h2>
          {entry.changes.map((changeType: ChangeType, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="mb-2 text-lg font-medium">{changeType.type}</h3>
              <ul className="space-y-2">
                {changeType.items.map((item: ChangelogItem, itemIndex: number) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item.message}</span>
                    {item.hash && <span className="ml-2 text-sm text-gray-500">({item.hash.substring(0, 7)})</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
