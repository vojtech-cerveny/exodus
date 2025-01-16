"use client";

import { ExclamationTriangleIcon, Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="mt-8 border-t py-6 text-center text-sm dark:border-border">
      <div className="flex justify-center space-x-4">
        <Link href="/faq" className="me-4 hover:underline md:me-6">
          Jak používat aplikaci
        </Link>
        <Link href="/privacy?lang=cz" className="me-4 hover:underline md:me-6">
          Zásady ochrany os. údajů
        </Link>
        <Link href="/terms-of-service?lang=cz" className="me-4 hover:underline md:me-6">
          Podmínky užití
        </Link>
        <a href="mailto:cervik49@gmail.com" className="me-4 flex gap-1 hover:underline">
          <Pencil2Icon />
          <span className="">Email</span>
        </a>
        <Link
          href={`https://exodus90.atlassian.net/servicedesk/customer/portal/1/group/1/create/10009?customfield_10043=https://aplikace.exodus90.cz${pathname}`}
          className="me-4 flex items-center gap-1 hover:underline md:mx-1 md:me-6"
          target="_blank"
        >
          <ExclamationTriangleIcon />
          Podpora & Nahlásit chybu
        </Link>
      </div>
      <div className="mt-2">
        <span>
          Vyrobeno pro{" "}
          <Link href="https://exodus90.cz" target="_blank" className="me-4 hover:underline md:me-6">
            <span className="font-bold">Exodus90</span>
          </Link>
        </span>
      </div>
    </footer>
  );
}
