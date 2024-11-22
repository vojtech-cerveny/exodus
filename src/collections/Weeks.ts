import { CollectionConfig } from "payload";

const Weeks: CollectionConfig = {
  slug: "weeks",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "version",
      type: "relationship",
      relationTo: "versions",
      required: true, // Each week belongs to a version
    },
    {
      name: "number",
      type: "number",
      required: true,
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "assignments",
      type: "richText",
    },
  ],
};

export { Weeks };
