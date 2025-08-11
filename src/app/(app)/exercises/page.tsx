import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Exercise, Version } from "@/payload-types";
import config from "@payload-config";
import { ArrowLeft } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { getPayload } from "payload";
import { ExerciseCard } from "./components/ExerciseCard";

interface ExerciseWithVersions extends Exercise {
  versions: (Version & { exercise: Exercise })[];
}

export default async function ExercisesPage() {
  unstable_noStore();

  const payload = await getPayload({ config });

  // Fetch all exercises
  const exercisesResponse = await payload.find({
    collection: "exercises",
    sort: "name",
    limit: 100,
  });

  // Fetch all versions with exercise data
  const versionsResponse = await payload.find({
    collection: "versions",
    depth: 2, // This ensures exercise data is populated
    sort: "startDate",
    limit: 1000,
  });

  // Group versions by exercise
  const exercisesWithVersions: ExerciseWithVersions[] = exercisesResponse.docs.map((exercise) => {
    const versions = versionsResponse.docs.filter(
      (version) => typeof version.exercise === "object" && version.exercise.id === exercise.id,
    ) as (Version & { exercise: Exercise })[];

    return {
      ...exercise,
      versions: versions.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()),
    };
  });

  return (
    <>
      <main className="flex-1">
        <div className="flex h-full w-full max-w-5xl flex-col gap-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-muted/50 flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Zpět na hlavní stránku
              </Button>
            </Link>
          </div>

          <div className="space-y-3 text-center">
            <H1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
              Dostupná cvičení
            </H1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Vyberte si cvičení a verzi, která vám vyhovuje. Každé cvičení může mít více verzí v různých jazycích.
            </p>
          </div>

          {exercisesWithVersions.length > 0 ? (
            <div className="space-y-6">
              {exercisesWithVersions.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/20 border-muted/30 rounded-lg border p-6 text-center">
              <p className="text-muted-foreground">Zatím nejsou k dispozici žádná cvičení.</p>
            </div>
          )}

          <div className="from-muted/20 to-muted/10 border-muted/30 rounded-xl border bg-gradient-to-r p-6 text-center">
            <div className="mx-auto max-w-2xl space-y-3">
              <p className="text-muted-foreground text-base">
                Každé cvičení může mít více verzí v různých jazycích. Verze jsou dostupné podle vašich preferencí a
                jazykových nastavení.
              </p>
              <p className="text-muted-foreground/80 text-sm italic">
                * Nezapomeňte, že je potřeba používat stejnou verzi jako vaše bratrstvo.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
