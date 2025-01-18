import { CollectionConfig, CollectionSlug } from 'payload';

export const StartingDates: CollectionConfig = {
  slug: 'starting-dates',
  admin: {
    useAsTitle: 'startDate',
  },
  labels: {
    singular: {
      cs: 'Datum zahájení cvičení',
      sk: 'Datum zahájenia cvičenia',
    },
    plural: {
      cs: 'Data zahájení cvičení',
      sk: 'Disciplíny',
    },
  },
  fields: [
    {
      name: 'exercise',
      type: 'relationship',
      relationTo: 'exercises' as CollectionSlug,
      required: true,
      label: { cs: 'Přidružené cvičení', sk: 'Pridružené cvičenie' },
    },
    {
      name: 'version',
      type: 'relationship',
      relationTo: 'versions' as CollectionSlug,
      required: false,
      label: { cs: 'Přidržená verze', sk: 'Pridružená verzia' },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: { cs: 'Datum začátku', sk: 'Datum začiatku' },
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
      label: { cs: 'Datum ukončení', sk: 'Datum ukončenia' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      label: { cs: 'Začátek povolen', sk: 'Začiatok povolený' },
    },
  ],
};
