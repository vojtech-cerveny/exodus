import { CollectionConfig, CollectionSlug } from "payload";

export const Versions: CollectionConfig = {
  slug: "versions",
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
        // This hook is used for generating the display name for the version
        // It fetches the exercise data using the exercise ID and then concatenates the exercise name and the version name
        beforeChange: [
          async ({ data, req }) => {
            const exercise = await req.payload.findByID({
              collection: "exercises",
              id: data?.exercise,
            });
            return `${exercise?.name} - ${data?.name}`;
          },
        ],
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      label: "Version Name",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "exercise",
      type: "relationship",
      relationTo: "exercises" as CollectionSlug,
      required: true,
      label: "Associated Exercise",
      maxDepth: 2,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active Version",
      defaultValue: false,
    },
    { name: "isVisible", type: "checkbox", label: "Visible", defaultValue: true },
  ],
};
