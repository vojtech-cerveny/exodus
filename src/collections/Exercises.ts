import { CollectionConfig } from 'payload';

export const Exercises: CollectionConfig = {
  slug: 'exercises',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: {
      cs: 'Cvičení',
      sk: 'Cvičenie',
    },
    plural: {
      cs: 'Cvičení',
      sk: 'Cvičenia',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        cs: 'Jméno',
        sk: 'Meno',
      },
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: {
        cs: 'Popis',
        sk: 'Popis',
      },
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: {
        cs: 'slug',
        sk: 'slug',
      },
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
      label: {
        cs: 'Ikonka',
        sk: 'Ikonka',
      },
    },
  ],
};
