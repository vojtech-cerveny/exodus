import { CollectionConfig, CollectionSlug } from "payload";

export const StartingDates: CollectionConfig = {
  slug: "starting-dates",
  admin: {
    useAsTitle: "startDate",
  },
  fields: [
    {
      name: "exercise",
      type: "relationship",
      relationTo: "exercises" as CollectionSlug,
      required: true,
      label: "Associated Exercise",
    },
    {
      name: "version",
      type: "relationship",
      relationTo: "versions" as CollectionSlug,
      required: false,
      label: "Associated Version",
    },
    {
      name: "startDate",
      type: "date",
      required: true,
      label: "Start Date",
    },
    {
      name: "endDate",
      type: "date",
      required: false,
      label: "End Date",
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: false,
      label: "Active Start Date",
    },
  ],
};
