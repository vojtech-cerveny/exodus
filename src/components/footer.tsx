"use client";

import { ExclamationTriangleIcon, Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="bg-white  md:flex md:items-center dark:bg-gray-800">
      <div className="mx-auto w-full p-4 md:flex md:items-center md:justify-center">
        <span className="mx-2 flex text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}
          <a href="https://verici.dev/" className="mx-2 hover:underline">
            VERICI.DEV
          </a>
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
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
            <a href="mailto:cervik49@gmail.com" className="me-4 flex hover:underline">
              <Pencil2Icon />
            </a>
          </li>
          <li>
            <Link
              href={`https://exodus90.atlassian.net/servicedesk/customer/portal/1/group/1/create/10009?customfield_10043=https://verici.dev${pathname}`}
              className="mx-1 me-4 flex items-center gap-1 hover:underline md:me-6"
            >
              <ExclamationTriangleIcon />
              Podpora & Nahlásit chybu
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
