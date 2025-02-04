"use client";

import { H2 } from "@/components/typography";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <>
      <H2>Tak tohle tady fakt nemáme.</H2>
      <p>
        Pokud hledáš texty na den, může se stát, že naši překladatelé tento den ještě nepřeložili. Pokud si ale myslíš,
        že to je chyba a danou stránku bys měl vidět, dej nám prosím vědět.
      </p>
      <Link
        target="_blank"
        href={`https://exodus90.atlassian.net/servicedesk/customer/portal/1/group/1/create/10009?customfield_10043=${pathname}`}
      >
        <Button className="mt-4">NAHLÁSIT CHYBU</Button>
      </Link>
    </>
  );
}
