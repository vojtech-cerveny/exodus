import { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
  },
  fields: [
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
    {
      name: "labels",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "Kralovské leto",
          value: "kralovske-leto",
        },
        {
          label: "Bratrstvo",
          value: "bratrstvo",
        },
        {
          label: "Záložky",
          value: "zalozky",
        },
        {
          label: "Exodus",
          value: "exodus",
        },
      ],
    },
  ],
};
