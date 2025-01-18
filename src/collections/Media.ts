import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      cs: 'Médium',
      sk: 'Médium',
    },
    plural: {
      cs: 'Média',
      sk: 'Médiá',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
};
