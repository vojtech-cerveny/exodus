'use client';
import useLocalStorage from '@/app/(app)/hooks/useLocalStorage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Version } from '@/payload-types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface VersionSelectUiProps {
  versions: Version[];
  onVersionSelect?: () => void;
}

export function VersionSelectUi({ versions, onVersionSelect }: VersionSelectUiProps) {
  const [version, setVersion] = useLocalStorage<Version | undefined>(
    'exodus-version',
    versions.find((v) => v.isActive),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const selectVersion = (slug: string) => {
    const selectedVersion = versions.find((v) => v.slug === slug)!;
    setVersion(selectedVersion);
    toast('Verze Exodus90 byla změněna na ' + selectedVersion.displayName);
    onVersionSelect?.();
  };

  if (isLoading) {
    return null; // or return a skeleton/loading state if preferred
  }

  return (
    <div className="my-4 flex items-center justify-center space-x-4">
      <Select onValueChange={selectVersion}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={version?.displayName ?? 'Vyberte verzi'} />
        </SelectTrigger>
        <SelectContent>
          {versions.map((v) => (
            <SelectItem key={v.slug} value={v.slug}>
              {v.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
