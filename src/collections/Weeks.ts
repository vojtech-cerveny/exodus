import { CollectionConfig, CollectionSlug } from "payload";

export const Weeks: CollectionConfig = {
  slug: "weeks",
  admin: {
    useAsTitle: "displayName",
  },
  fields: [
    {
      name: "displayName",
      type: "text",
      required: true,
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            const version = await req.payload.findByID({
              collection: "versions",
              id: data?.version,
            });
            return `${version.displayName} - Week ${data?.number} - ${data?.title}`;
          },
        ],
      },
    },
    {
      name: "version",
      type: "relationship",
      relationTo: "versions" as CollectionSlug,
      required: true,
      label: "Related Version",
      admin: {
        isSortable: true,
        description: "The version that this week belongs to",
      },
    },
    {
      name: "number",
      type: "number",
      required: true,
      label: "Week Number",
    },
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    {
      name: "tasks",
      type: "array", // Define tasks as an array field
      label: "Tasks for the Week",
      fields: [
        {
          name: "taskTitle",
          type: "text",
          required: true,
          label: "Task Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Task Description",
        },
        {
          name: "dueDate",
          type: "date",
          label: "Due Date (Optional)",
        },
      ],
    },
  ],
};
