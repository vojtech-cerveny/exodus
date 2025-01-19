'use client';

import { getEventStatus } from '@/app/(app)/utils/date';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, HomeIcon } from '@radix-ui/react-icons';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ExodusIsOver() {
  const router = useRouter();
  const exodus = getEventStatus('EXODUS');

  return (
    <main className="relative mt-16 flex w-full flex-col items-center justify-center">
      <h1 className="text-9xl font-extrabold tracking-widest text-black dark:text-white">DONE</h1>
      <div className="absolute top-20 rotate-12 rounded bg-[#cfcfcf] px-2 text-2xl text-zinc-800">
        Exodus už skončil / nebo ještě nezačal
      </div>
      <p>
        Exodus už skončil nebo ještě nezačal, tady nic nenajdeš. Zde uvidíš víc {moment(exodus.startDate).fromNow()} (
        {moment(exodus.startDate).format('LL')})
      </p>
      <p>Tuhle stránku si můžeš dát do svých oblíbených a vždy zde uvidíš texty na daný den.</p>
      <div className="container flex justify-center gap-4 pt-4">
        <Button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeftIcon />
          Zpět
        </Button>
        <Button className="flex items-center gap-1">
          <HomeIcon />
          <Link href="/">Domů</Link>
        </Button>
      </div>
    </main>
  );
}
