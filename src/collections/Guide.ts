import { CollectionConfig, CollectionSlug } from "payload";

export const Guide: CollectionConfig = {
  slug: "guide",
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
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "orderNumber",
      type: "number",
      required: true,
      label: {
        cs: "Pořadí",
        en: "Order",
      },
      unique: true,
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
    },
  ],
};
