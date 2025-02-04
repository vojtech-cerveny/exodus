import { CollectionConfig, CollectionSlug } from "payload";

export const Tasks: CollectionConfig = {
  slug: "tasks",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "isRequired",
      type: "checkbox",
      defaultValue: true,
      label: "Is this task required?",
      admin: {
        width: "50%",
      },
    },

    {
      type: "row",
      fields: [
        {
          name: "version",
          type: "relationship",
          relationTo: "versions" as CollectionSlug,
          required: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Daily Task", value: "daily" },
            { label: "Weekly Task", value: "weekly" },
            { label: "Specific Weekday", value: "weekday" },
            { label: "Monthly Task", value: "monthly" },
            { label: "Specific Day", value: "specificDay" },
          ],
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "scheduling",
      type: "group",
      fields: [
        {
          name: "week",
          type: "number",
          min: 1,
          max: 13,
          admin: {
            condition: (data) => ["weekly"].includes(data.type),
          },
        },
        {
          name: "dayInWeek",
          type: "select",
          options: [
            { label: "Monday", value: "1" },
            { label: "Tuesday", value: "2" },
            { label: "Wednesday", value: "3" },
            { label: "Thursday", value: "4" },
            { label: "Friday", value: "5" },
            { label: "Saturday", value: "6" },
            { label: "Sunday", value: "7" },
          ],
          admin: {
            condition: (data) => ["weekday"].includes(data.type),
          },
        },
        {
          name: "dayNumber",
          type: "number",
          min: 1,
          max: 90,
          admin: {
            condition: (data) => ["specificDay"].includes(data.type),
          },
        },
        {
          name: "month",
          type: "number",
          min: 1,
          max: 3,
          admin: {
            condition: (data) => ["monthly"].includes(data.type),
          },
        },
      ],
    },

    {
      name: "tasks",
      type: "array", // Define tasks as an array field
      label: {
        en: "Tasks",
        cs: "Úkoly",
      },

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
      ],
    },
  ],
};
