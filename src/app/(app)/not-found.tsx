'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, HomeIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="relative mt-16 flex w-full flex-col items-center justify-center">
      <h1 className="text-9xl font-extrabold tracking-widest text-black dark:text-white">404</h1>
      <div className="absolute top-20 rotate-12 rounded bg-[#cfcfcf] px-2 text-2xl text-zinc-800">Nenalezeno</div>
      <p>Huh, tak tohle se nám stalo poprvé...</p>
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
