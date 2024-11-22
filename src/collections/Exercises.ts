import { CollectionConfig } from "payload";

const Exercises: CollectionConfig = {
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
      type: "textarea",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};

export { Exercises };
