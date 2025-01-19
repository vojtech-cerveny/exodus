import { CollectionConfig, CollectionSlug } from 'payload';

export const Versions: CollectionConfig = {
  slug: 'versions',
  admin: {
    useAsTitle: 'displayName',
  },
  labels: {
    singular: {
      cs: 'Verze',
      sk: 'Verzia',
    },
    plural: {
      cs: 'Verze',
      sk: 'Verzie',
    },
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
      hooks: {
        // This hook is used for generating the display name for the version
        // It fetches the exercise data using the exercise ID and then concatenates the exercise name and the version name
        beforeChange: [
          async ({ data, req, previousValue }) => {
            const exercise = await req.payload.findByID({
              collection: 'exercises',
              id: data?.exercise,
              locale: req.locale,
            });

            return `${exercise?.name} - ${data?.name}`;
          },
        ],
      },
      localized: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: { cs: 'Název verze', sk: 'Názov verzie' },
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: { cs: 'slug', sk: 'slug' },
    },
    {
      name: 'exercise',
      type: 'relationship',
      relationTo: 'exercises' as CollectionSlug,
      required: true,
      label: { cs: 'Přidružené cvičení', sk: 'Pridružené cvičenie' },
      maxDepth: 2,
    },
    {
      name: 'description',
      type: 'textarea',
      label: { cs: 'Popis', sk: 'Popis' },
      localized: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: { cs: 'Aktivní verze', sk: 'Aktivná verzia' },
      defaultValue: false,
    },
    { name: 'isVisible', type: 'checkbox', label: { cs: 'Viditelná', sk: 'Viditelná' }, defaultValue: true },
  ],
};
