import { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  auth: true, // Enable authentication
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export { Users };
