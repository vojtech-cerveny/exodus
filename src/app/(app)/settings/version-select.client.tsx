"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateUserVersionSelection } from "./actions";
import { UserVersionSelections } from "./page";

interface VersionInfo {
  slug: string;
  name: string;
  startDate: string;
  endDate?: string | null;
}

interface ExerciseInfo {
  slug: string;
  name: string;
  versions: VersionInfo[];
}

interface VersionSelectClientProps {
  exercises: ExerciseInfo[];
  initialSelections: UserVersionSelections;
}

export default function VersionSelectClient({ exercises, initialSelections }: VersionSelectClientProps) {
  const [selectedVersions, setSelectedVersions] = useState<UserVersionSelections>(initialSelections);
  const [isPending, startTransition] = useTransition();

  const handleSelectionChange = (exerciseSlug: string, versionSlug: string) => {
    setSelectedVersions((prev) => ({
      ...prev,
      [exerciseSlug]: versionSlug,
    }));

    startTransition(async () => {
      const result = await updateUserVersionSelection(exerciseSlug, versionSlug);
      if (result?.error) {
        toast.error(`Chyba při ukládání výběru pro ${exerciseSlug}: ${result.error}`);
        setSelectedVersions((prev) => ({
          ...prev,
          [exerciseSlug]: initialSelections[exerciseSlug] || "",
        }));
      } else {
        toast.success(`Výběr pro ${exerciseSlug} uložen.`);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Výběr Verze Cvičení</CardTitle>
        <CardDescription>
          Vyberte verzi pro každé cvičení, kterou chcete používat v aplikaci. Vaše volba se automaticky uloží.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {exercises.map((exercise) => (
          <div key={exercise.slug}>
            <h3 className="mb-2 text-lg font-semibold">{exercise.name}</h3>
            <RadioGroup
              value={selectedVersions[exercise.slug] || ""}
              onValueChange={(value) => handleSelectionChange(exercise.slug, value)}
              disabled={isPending}
            >
              {exercise.versions
                .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                .map((version) => {
                  const versionId = `${exercise.slug}-${version.slug}`;
                  return (
                    <div key={versionId} className="mb-2 flex items-center space-x-2">
                      <RadioGroupItem value={version.slug} id={versionId} />
                      <Label htmlFor={versionId} className="cursor-pointer">
                        {version.name} ({version.slug})
                      </Label>
                    </div>
                  );
                })}
            </RadioGroup>
            {isPending &&
              selectedVersions[exercise.slug] ===
                exercise.versions.find((v) => v.slug === selectedVersions[exercise.slug])?.slug && (
                <p className="text-muted-foreground mt-1 text-sm">Ukládání...</p>
              )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
