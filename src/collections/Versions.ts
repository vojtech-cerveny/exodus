import { CollectionConfig } from "payload";

const Versions: CollectionConfig = {
  slug: "versions",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true, // Ensures no duplicate version names
      label: "Version Name",
    },
    {
      name: "exercise",
      type: "relationship",
      relationTo: "exercises",
      required: true, // Each version must belong to an exercise
      label: "Associated Exercise",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date",
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active Version",
      defaultValue: false,
    },
  ],
};

export { Versions };
