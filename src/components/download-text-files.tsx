import { FileTextIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "./ui/button";

export function DownloadTextFiles() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Button>
        <Link
          className="plausible-event-name=exodus-90-download-pdf flex items-center"
          download
          prefetch={false}
          target="_blank"
          href="/files/exodus90.pdf"
        >
          <FileTextIcon className="mr-2" />
          <span>PDF textů pro tisk</span>
        </Link>
      </Button>

      <Button>
        <Link
          className="plausible-event-name=exodus-90-download-epub flex items-center"
          download
          prefetch={false}
          target="_blank"
          href="/books/exodus90-denni-texty.epub"
        >
          <FileTextIcon className="mr-2" />
          <span>Denní texty pro čtečky (epub)</span>
        </Link>
      </Button>

      <Button>
        <Link
          className="plausible-event-name=exodus-90-download-mobi flex items-center"
          download
          prefetch={false}
          target="_blank"
          href="/files/exodus90-denni-texty.mobi"
        >
          <FileTextIcon className="mr-2" />
          <span>Denní texty pro čtečky (mobi)</span>
        </Link>
      </Button>
    </div>
  );
}
