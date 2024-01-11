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
    <div>
      <H1>Excessus days</H1>
      {(await getFilesInFolder()).map((file, index) => {
        const fileName = file.replace(".md", "");
        const formattedFileName = fileName.startsWith("0") ? fileName.substring(1) : fileName;
        return (
          <div key={index}>
            <Link href={"/days/" + fileName}>Den {formattedFileName}</Link>
          </div>
        );
      })}
    </div>
  );
}
