import { CollectionConfig } from "payload";

const Days: CollectionConfig = {
  slug: "days",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "week",
      type: "relationship",
      relationTo: "weeks",
      required: true,
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
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};

export { Days };
