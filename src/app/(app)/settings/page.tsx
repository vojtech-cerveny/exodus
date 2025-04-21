import prisma from "@/lib/db";
import { Exercise } from "@/payload-types"; // Corrected path if necessary
import { auth } from "@auth";
import config from "@payload-config";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import VersionSelectClient from "./version-select.client";

// Define interfaces inline or import if defined elsewhere
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

// <-- Add type for user selections
export type UserVersionSelections = Record<string, string>;

export default async function SettingsPage() {
  noStore(); // Opt out of caching for this page

  // <-- Get session and user ID
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin?callbackUrl=/settings"); // Redirect to login if not authenticated
  }
  const userId = session.user.id;

  // <-- Fetch user's current selections from Prisma
  const userSelectionsData = await prisma.versions.findMany({
    where: { userId: userId },
    select: { type: true, version: true },
  });

  const userSelections: UserVersionSelections = userSelectionsData.reduce(
    (acc: UserVersionSelections, selection: { type: string; version: string }) => {
      acc[selection.type] = selection.version;
      return acc;
    },
    {} as UserVersionSelections,
  );

  const payload = await getPayload({ config });

  // Fetch all relevant versions (e.g., not archived, or based on dates)
  const versionsResponse = await payload.find({
    collection: "versions",
    depth: 2, // Ensure exercise data is populated
    limit: 1000, // Adjust limit as needed
    // Add filters if necessary (e.g., filter out archived versions)
    // where: { archived: { equals: false } },
  });

  // Group versions by exercise
  const exercisesMap = new Map<string, ExerciseInfo>();

  versionsResponse.docs.forEach((version) => {
    // Type guard for populated exercise
    if (!version.exercise || typeof version.exercise !== "object" || !("slug" in version.exercise)) {
      return;
    }

    const exerciseData = version.exercise as Exercise;
    const exerciseSlug = exerciseData.slug;
    const versionInfo: VersionInfo = {
      slug: version.slug,
      name: version.name,
      startDate: version.startDate,
      endDate: version.endDate,
    };

    if (exercisesMap.has(exerciseSlug)) {
      exercisesMap.get(exerciseSlug)!.versions.push(versionInfo);
    } else {
      exercisesMap.set(exerciseSlug, {
        slug: exerciseSlug,
        name: exerciseData.name,
        versions: [versionInfo],
      });
    }
  });

  const exercises = Array.from(exercisesMap.values());

  // Sort exercises alphabetically by name
  exercises.sort((a, b) => a.name.localeCompare(b.name));

  // Optional: Sort versions within each exercise (e.g., by start date)
  exercises.forEach((exercise) => {
    exercise.versions.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  });

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="mb-6 text-3xl font-bold">Nastavení</h1>
      {/* Render the client component and pass the grouped exercises AND user selections */}
      <VersionSelectClient exercises={exercises} initialSelections={userSelections} />

      {/* You can add other settings sections here */}
      {/* <Card className="mt-8">
        <CardHeader>
          <CardTitle>Další Nastavení</CardTitle>
          <CardDescription>Zde můžete přidat další možnosti konfigurace.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Obsah dalších nastavení...</p>
        </CardContent>
      </Card> */}
    </div>
  );
}
