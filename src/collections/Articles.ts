import { CollectionConfig } from 'payload';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        cs: 'Nadpis',
        sk: 'Nadpis',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: {
        cs: 'Obsah článku',
        sk: 'Obsah článku',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: {
        cs: 'Autor',
        sk: 'Autor',
      },
    },
    {
      name: 'labels',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: {
            cs: 'Kralovské leto',
            sk: 'Kráľovské léto',
          },
          value: 'kralovske-leto',
        },
        {
          label: {
            cs: 'Bratrstvo',
            sk: 'Bratstvo',
          },
          value: 'bratrstvo',
        },
        {
          label: {
            cs: 'Záložky',
            sk: 'Záložky',
          },
          value: 'zalozky',
        },
        {
          label: {
            cs: 'Exodus',
            sk: 'Exodus',
          },
          value: 'exodus',
        },
      ],
    },
  ],
};
