'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectItemText } from '@radix-ui/react-select';
import { usePathname, useRouter } from 'next/navigation';

type Language = 'cs' | 'sk';

type LanguageDetail = {
  flag: string;
  name: string;
};

const LANGUAGES: Record<Language, LanguageDetail> = {
  cs: { flag: '🇨🇿', name: 'Čeština' },
  sk: { flag: '🇸🇰', name: 'Slovenčina' },
};

export const LanguageSelect = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = (pathname.split('/')[2] as Language) ?? 'cs';

  const redirectedPathname = (locale: Language) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[2] = locale;
    return segments.join('/');
  };

  return (
    <Select
      onValueChange={(newValue) => {
        router.push(redirectedPathname(newValue as Language));
      }}
      value={locale}
    >
      <SelectTrigger>
        <SelectValue>{LANGUAGES[locale].flag}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <>
          {Object.keys(LANGUAGES).map((country: Language) => (
            <SelectItem key={country} value={country} className="flex gap-2">
              <SelectItemText>
                <div className="flex gap-2">
                  <div>{LANGUAGES[country].flag}</div>
                  <div>{LANGUAGES[country].name}</div>
                </div>
              </SelectItemText>
            </SelectItem>
          ))}
        </>
      </SelectContent>
    </Select>
  );
};
