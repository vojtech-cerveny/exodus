import React, { ReactElement } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LucideHome } from "lucide-react";

// Define a mapping for custom route names
const routeNameMapping: { [key: string]: string } = {
  pruvodce: "Průvodce",
  "denni-texty": "Denní texty",
  "tydenni-setkani": "Týdenní setkání",
  articles: "Články",
  bookmarks: "Záložky",
  bratrstvo: "Bratrstvo",
  "terms-of-service": "Podmínky použití",
  privacy: "Ochrana osobních údajů",
  changelog: "Změny",
  settings: "Nastavení",
  "velikonocni-doba": "Velikonoční doba",
  "dnesni-texty": "Dnešní texty",
};

export function Breadcrumbs({ routes = [] }: { routes: string[] }) {
  let fullHref: string | undefined = undefined;
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    let href;

    // Determine the display text: check mapping first, then default capitalization
    let displayText = routeNameMapping[route] || route[0].toUpperCase() + route.slice(1);

    href = fullHref ? `${fullHref}/${route}` : `/${route}`;
    fullHref = href;

    if (i === routes.length - 1) {
      // If the last segment follows 'bratrstvo', display "Detail" instead of the ID
      if (i > 0 && routes[i - 1] === "bratrstvo") {
        displayText = "Detail"; // Replace ID with "Detail"
      }
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage>{displayText}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={href}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>,
      );
    }
  }

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <LucideHome className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
