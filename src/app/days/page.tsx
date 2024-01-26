import { promises as fs } from "fs";

import { cn } from "@/lib/utils";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { H1 } from "../../components/typography";
import { countDaysFromJan1PlusOne } from "../utils/date";

export default async function RemoteMdxPage() {
  unstable_noStore();

  async function getFilesInFolder() {
    const folderPath = process.cwd() + "/src/app/data/days/";
    const files = await fs.readdir(folderPath);
    return files;
  }

  return (
    <>
      <H1>Excessus days</H1>
      <div className="grid-flex grid grid-cols-5 flex-col gap-2 md:grid-cols-7">
        {(await getFilesInFolder()).map((file, index) => {
          const today = countDaysFromJan1PlusOne();
          const fileName = file.replace(".md", "");
          const formattedFileName = fileName.startsWith("0") ? fileName.substring(1) : fileName;

          return (
            <Link
              className={cn(
                "flex h-12 items-center justify-center rounded-md border border-zinc-300 underline hover:bg-zinc-100 md:no-underline dark:border-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600",
                today > parseInt(formattedFileName) &&
                  "border-zinc-300 bg-zinc-100 text-zinc-400 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-600 dark:hover:bg-zinc-700",
                today == parseInt(formattedFileName) &&
                  "bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:text-zinc-300 dark:hover:bg-green-700",
              )}
              key={index}
              href={"/days/" + fileName}
            >
              <div>{formattedFileName}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
