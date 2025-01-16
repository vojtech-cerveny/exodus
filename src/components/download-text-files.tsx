import { FileTextIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { H2 } from "./typography";
import { Button } from "./ui/button";

export function DownloadTextFiles() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <H2>Texty 2024</H2>
      <Link
        className="plausible-event-name=exodus-90-download-pdf flex items-center"
        download
        prefetch={false}
        target="_blank"
        href="/files/exodus90.pdf"
      >
        <Button>
          <FileTextIcon className="mr-2" />
          <span>PDF textů pro tisk</span>
        </Button>
      </Link>

      <Link
        className="plausible-event-name=exodus-90-download-epub flex items-center"
        download
        prefetch={false}
        target="_blank"
        href="/books/exodus90-denni-texty.epub"
      >
        <Button>
          <FileTextIcon className="mr-2" />
          <span>Denní texty pro čtečky (epub)</span>
        </Button>
      </Link>

      <Link
        className="plausible-event-name=exodus-90-download-mobi flex items-center"
        download
        prefetch={false}
        target="_blank"
        href="/books/exodus90-denni-texty.mobi"
      >
        <Button>
          <FileTextIcon className="mr-2" />
          <span>Denní texty pro čtečky (mobi)</span>
        </Button>
      </Link>
    </div>
  );
}
