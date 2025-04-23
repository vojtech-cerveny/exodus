import { CollectionConfig, CollectionSlug, Where } from "payload";

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
      label: "Version Name",
      hooks: {
        beforeChange: [
          async ({ data, req, originalDoc }) => {
            if (data?.exercise && data?.name) {
              const whereClause: { and: Where[] } = {
                and: [{ exercise: { equals: data.exercise } }, { name: { equals: data.name } }],
              };

              // If we're updating an existing document, exclude it from the check
              if (originalDoc?.id) {
                whereClause.and.push({
                  id: { not_equals: originalDoc.id },
                });
              }

              const existingVersion = await req.payload.find({
                collection: "versions",
                where: whereClause,
              });

              if (existingVersion.totalDocs > 0) {
                throw new Error("Name must be unique within the scope of the exercise.");
              }
            }
          },
        ],
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      hooks: {
        beforeChange: [
          async ({ data, req, originalDoc }) => {
            if (data?.exercise && data?.slug) {
              const whereClause: { and: Where[] } = {
                and: [{ exercise: { equals: data.exercise } }, { slug: { equals: data.slug } }],
              };

              // If we're updating an existing document, exclude it from the check
              if (originalDoc?.id) {
                whereClause.and.push({
                  id: { not_equals: originalDoc.id },
                });
              }

              const existingVersion = await req.payload.find({
                collection: "versions",
                where: whereClause,
              });

              if (existingVersion.totalDocs > 0) {
                throw new Error("Slug must be unique within the scope of the exercise.");
              }
            }
          },
        ],
      },
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
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
      required: true,
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.startDate) {
              const startDate = new Date(data.startDate);
              startDate.setHours(0, 0, 0, 0);
              return startDate.toISOString();
            }
            return data?.startDate;
          },
        ],
      },
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date",
      required: true,
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.startDate) {
              const startDate = new Date(data.startDate);
              startDate.setHours(0, 0, 0, 0);
              return startDate.toISOString();
            }
            return data?.startDate;
          },
        ],
      },
    },
    {
      name: "duration",
      type: "number",
      label: "Duration",
      required: true,
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ data }) => {
            // Calculate duration in days between startDate and endDate
            if (data?.startDate && data?.endDate) {
              const startDate = new Date(data.startDate);
              const endDate = new Date(data.endDate);
              const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays;
            }
            return data?.duration || 0;
          },
        ],
      },
    },
  ],
};
