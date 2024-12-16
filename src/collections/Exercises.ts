import { CollectionConfig } from "payload";

export const Exercises: CollectionConfig = {
  slug: "exercises",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
