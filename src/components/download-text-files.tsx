import { FileTextIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "./ui/button";

export function DownloadTextFiles() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Link download prefetch={false} target="_blank" href="/files/exodus90.pdf">
        <Button>
          <FileTextIcon className="mr-2" />
          PDF textů pro tisk
        </Button>
      </Link>
      <Link download prefetch={false} target="_blank" href="/books/exodus90-denni-texty.epub">
        <Button>
          <FileTextIcon className="mr-2" />
          Denní texty pro čtečky (epub)
        </Button>
      </Link>
      <Link download prefetch={false} target="_blank" href="/files/exodus90-denni-texty.mobi">
        <Button>
          <FileTextIcon className="mr-2" />
          Denní texty pro čtečky (mobi)
        </Button>
      </Link>
    </div>
  );
}
