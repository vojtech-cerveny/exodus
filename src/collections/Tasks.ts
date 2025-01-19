import { CollectionConfig, CollectionSlug } from 'payload';

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: {
      cs: 'Disciplína',
      sk: 'Disciplína',
    },
    plural: {
      cs: 'Disciplíny',
      sk: 'Disciplíny',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        cs: 'Titulek',
        sk: 'Titulok',
      },
      localized: true,
    },
    {
      name: 'isRequired',
      type: 'checkbox',
      defaultValue: true,
      label: {
        cs: 'Je tahle disciplína povinná?',
        sk: 'Je tato disciplína povinná?',
      },
      admin: {
        width: '50%',
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'version',
          type: 'relationship',
          relationTo: 'versions' as CollectionSlug,
          required: true,
          admin: {
            width: '50%',
          },
          label: {
            cs: '',
            sk: '',
          },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            {
              label: {
                cs: 'Denní disciplína',
                sk: 'Denná disciplína',
              },
              value: 'daily',
            },
            { label: { cs: 'Týdenní', sk: 'Týždenná' }, value: 'weekly' },
            { label: { cs: 'V konkrétni den týdne', sk: 'V konkrétny deň týždňa' }, value: 'weekday' },
            { label: { cs: 'Měsiční', sk: 'Mesačná' }, value: 'monthly' },
            { label: { cs: 'V konkretni den cvičení', sk: 'V konkretný deň cvičenia' }, value: 'specificDay' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'scheduling',
      type: 'group',
      fields: [
        {
          name: 'week',
          type: 'number',
          min: 1,
          max: 13,
          admin: {
            condition: (data) => ['weekly'].includes(data.type),
          },
          label: {
            cs: 'Týden',
            sk: 'Týždeň',
          },
        },
        {
          name: 'dayInWeek',
          type: 'select',
          options: [
            { label: { cs: 'Pondělí', sk: 'Pondelok' }, value: '1' },
            { label: { cs: 'Úterý', sk: 'Utorok' }, value: '2' },
            { label: { cs: 'Středa', sk: 'Streda' }, value: '3' },
            { label: { cs: 'Čtvrtek', sk: 'Štvrtok' }, value: '4' },
            { label: { cs: 'Pátek', sk: 'Piatok' }, value: '5' },
            { label: { cs: 'Sobota', sk: 'Sobota' }, value: '6' },
            { label: { cs: 'Neděle', sk: 'Nedela' }, value: '7' },
          ],
          admin: {
            condition: (data) => ['weekday'].includes(data.type),
          },
        },
        {
          name: 'dayNumber',
          type: 'number',
          min: 1,
          max: 90,
          admin: {
            condition: (data) => ['specificDay'].includes(data.type),
          },
          label: {
            cs: 'Číslo dne',
            sk: 'Číslo dňa',
          },
        },
        {
          name: 'month',
          type: 'number',
          min: 1,
          max: 3,
          admin: {
            condition: (data) => ['monthly'].includes(data.type),
          },
          label: {
            cs: 'Číslo měsíce',
            sk: 'Číslo mesiaca',
          },
        },
      ],
    },

    {
      name: 'tasks',
      type: 'array', // Define tasks as an array field
      label: {
        en: 'Tasks',
        cs: 'Úkoly',
        sk: '',
      },

      fields: [
        {
          name: 'taskTitle',
          type: 'text',
          required: true,
          label: {
            cs: 'Název disciplíny',
            sk: 'Názov Disciplíny',
          },
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: {
            cs: 'Popis disciplíny',
            sk: 'Popis disciplíny',
          },
          localized: true,
        },
      ],
    },
  ],
};
