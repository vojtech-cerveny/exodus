import { CollectionConfig, CollectionSlug } from "payload";

export const WeeklyMeeting: CollectionConfig = {
  slug: "weekly-meeting",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        cs: "Název",
        en: "Title",
      },
    },
    {
      name: "number",
      type: "number",
      required: true,
      label: {
        cs: "Číslo týdne",
        en: "Week Number",
      },
    },
    {
      name: "version",
      type: "relationship",
      relationTo: "versions" as CollectionSlug,
      required: true,
      label: {
        cs: "Verze",
        en: "Version",
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
