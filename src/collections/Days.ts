import { CollectionConfig, CollectionSlug } from "payload";

export const Days: CollectionConfig = {
  slug: "days",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "version",
      type: "relationship",
      relationTo: "versions" as CollectionSlug,
    },
    {
      name: "number",
      type: "number",
      required: true,
      label: {
        cs: "Číslo dne",
        en: "Day Number",
      },
    },
    {
      name: "title",
      type: "text",
      label: {
        cs: "Název",
        en: "Title",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: {
        cs: "Obsah",
        en: "Content",
      },
    },
  ],
};
