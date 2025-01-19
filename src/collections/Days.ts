import { CollectionConfig, CollectionSlug } from 'payload';

export const Days: CollectionConfig = {
  slug: 'days',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: {
      cs: 'Den',
      sk: 'Deň',
    },
    plural: {
      cs: 'Dny',
      sk: 'Dni',
    },
  },
  fields: [
    {
      name: 'version',
      type: 'relationship',
      relationTo: 'versions' as CollectionSlug,
      label: {
        cs: 'Verze',
        sk: 'Verzia',
      },
    },
    {
      name: 'number',
      type: 'number',
      required: true,
      label: {
        cs: 'Číslo dne',
        sk: 'Poradové číslo dňa',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: {
        cs: 'Název dne',
        sk: 'Názov ďňa',
      },
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: {
        cs: 'Obsah dne',
        sk: 'Obsah dňa',
      },
      localized: true,
    },
  ],
};
