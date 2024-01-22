import { promises as fs } from "fs";

import Link from "next/link";
import { H1 } from "../components/typography";

export default async function RemoteMdxPage() {
  async function getFilesInFolder() {
    const folderPath = process.cwd() + "/src/app/data/days/";
    const files = await fs.readdir(folderPath);
    return files;
  }

  return (
    <>
      <H1>Excessus days</H1>
      <div className="container flex flex-col">
        <Link href="/days/today" className="pb-2 font-black hover:underline">
          Dnešní den
        </Link>

        {(await getFilesInFolder()).map((file, index) => {
          const fileName = file.replace(".md", "");
          const formattedFileName = fileName.startsWith("0") ? fileName.substring(1) : fileName;
          return (
            <Link className="hover:underline" key={index} href={"/days/" + fileName}>
              Den {formattedFileName}
            </Link>
          );
        })}
      </div>
    </>
  );
}
