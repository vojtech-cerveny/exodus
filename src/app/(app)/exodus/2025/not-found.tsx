import { H2 } from "@/components/typography";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <H2>Tento den jsme nenašli.</H2>
      <p>
        Může se stát, že naši překladatelé tento den ještě nepřeložili. Pokud si ale myslíš, že to je chyba a den bys
        měl vidět, dej nám prosím vědět.
      </p>
      <Link
        target="_blank"
        href="https://exodus90.atlassian.net/servicedesk/customer/portal/1/group/1/create/10009?customfield_10043=https://aplikace.exodus90.cz/exodus/payload/2"
      >
        <Button className="mt-4">NAHLÁSIT CHYBU</Button>
      </Link>
    </>
  );
}
