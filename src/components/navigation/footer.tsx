"use client";

import { ExclamationTriangleIcon, Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="mt-4 text-sm font-medium text-gray-500 md:flex md:flex-col  md:items-center">
      <Separator />
      <div className="mx-auto w-full flex-col p-4 md:flex md:items-center md:justify-center">
        <ul className="mt-3 flex flex-col flex-wrap justify-start gap-1  sm:mt-0 md:flex-row md:gap-0">
          <li>
            <Link href="/privacy?lang=cz" className="me-4 hover:underline md:me-6">
              Zásady ochrany os. údajů
            </Link>
          </li>
          <li>
            <a href="/terms-of-service?lang=cz" className="me-4 hover:underline md:me-6">
              Podmínky užití
            </a>
          </li>
          <li>
            <a href="mailto:cervik49@gmail.com" className="me-4 flex gap-1 hover:underline">
              <Pencil2Icon />
              <span className="">Email</span>
            </a>
          </li>
          <li>
            <Link
              href={`https://exodus90.atlassian.net/servicedesk/customer/portal/1/group/1/create/10009?customfield_10043=https://aplikace.exodus90.cz${pathname}`}
              className="me-4 flex items-center gap-1 hover:underline md:mx-1 md:me-6"
              target="_blank"
            >
              <ExclamationTriangleIcon />
              Podpora & Nahlásit chybu
            </Link>
          </li>
        </ul>
        <div className="mt-2">
          <span>
            Vyrobeno pro{" "}
            <Link href="https://exodus90.cz" target="_blank" className="me-4 hover:underline md:me-6">
              <span className="font-bold">Exodus90</span>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
