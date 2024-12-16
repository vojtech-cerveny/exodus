import { CollectionConfig, CollectionSlug } from "payload";

export const Days: CollectionConfig = {
  slug: "days",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "relationType", // Determines if this day belongs to a Week or directly to an Exercise
      label: {
        cs: "Typ relace",
        en: "Relation Type",
      },
      type: "select",
      options: [
        {
          label: {
            cs: "Týden",
            en: "Week",
          },
          value: "week",
        },
        {
          label: {
            cs: "Cvičení",
            en: "Exercise",
          },
          value: "exercise",
        },
      ],
      required: true,
      defaultValue: "week",
    },
    {
      label: {
        cs: "Týden",
        en: "Week",
      },
      name: "week",
      type: "relationship",
      relationTo: "weeks" as CollectionSlug,
      admin: {
        condition: (data) => data.relationType === "week",
      },
    },
    {
      name: "exercise",
      type: "relationship",
      relationTo: "exercises" as CollectionSlug,
      admin: {
        condition: (data) => data.relationType === "exercise",
      },
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
