import config from '@payload-config';
import { getPayload } from 'payload';
import { VersionSelectUi } from './versionSelect-ui';

export async function VersionSelect() {
  const payload = await getPayload({ config });
  const versions = await payload.find({
    collection: 'versions',
    where: {
      isVisible: { equals: true },
    },
    sort: '-slug',
    locale: 'sk',
  });

  console.log('verzie', versions.docs);

  //tu pokracovat, pridat selektor na jazyk a nastavit do localstorage a strcit vybrany jazyk do finderov

  return <VersionSelectUi versions={versions.docs} />;
}
