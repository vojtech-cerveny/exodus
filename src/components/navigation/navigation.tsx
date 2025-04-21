import prisma from "@/lib/db";
import { Exercise, Version } from "@/payload-types";
import { auth } from "@auth";
import config from "@payload-config";
import { getPayload } from "payload";
import NavigationClient from "./navigation.client";

// Define the type for user selections
type UserSelections = Record<string, string>;

export default async function Navigation() {
  const payload = await getPayload({ config });

  // Get authenticated user session
  const session = await auth();

  // Initialize userSelections as empty object - for unauthenticated users, we'll use latest versions
  let userSelections: UserSelections = {};

  // Only fetch user-specific selections if the user is authenticated
  if (session?.user?.id) {
    const userVersions = await prisma.versions.findMany({
      where: { userId: session.user.id },
      select: { type: true, version: true },
    });

    userSelections = userVersions.reduce((acc, { type, version }) => {
      acc[type] = version;
      return acc;
    }, {} as UserSelections);
  }
  // For unauthenticated users, userSelections remains empty and NavigationClient will default to latest versions

  const versions = await payload.find({
    collection: "versions",
    sort: "startDate",
    depth: 2,
  });

  const today = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(today.getDate() + 14);

  // First filter versions that are active or starting soon
  const filteredVersions = versions.docs.filter((doc) => {
    const startDate = new Date(doc.startDate);
    const endDate = doc.endDate ? new Date(doc.endDate) : null;

    // Check if the startDate is within two weeks from today
    const isWithinTwoWeeks = startDate >= today && startDate <= twoWeeksFromNow;

    // Check if today is between startDate and endDate
    const isActivePeriod = startDate <= today && (!endDate || today <= endDate);

    return isWithinTwoWeeks || isActivePeriod;
  });

  // Group versions by exercise and select the latest for each
  const latestVersionsByExercise = new Map<string, Version & { exercise: Exercise }>();

  filteredVersions.forEach((version) => {
    if (!version.exercise || typeof version.exercise !== "object") return;

    const exerciseSlug = version.exercise.slug;

    // If no version for this exercise yet, or this one is newer, update it
    if (
      !latestVersionsByExercise.has(exerciseSlug) ||
      new Date(version.startDate) > new Date(latestVersionsByExercise.get(exerciseSlug)!.startDate)
    ) {
      latestVersionsByExercise.set(exerciseSlug, version as Version & { exercise: Exercise });
    }
  });

  // Convert map to array for the client component
  const latestVersions = Array.from(latestVersionsByExercise.values());

  return <NavigationClient versions={latestVersions} userSelections={userSelections} />;
}
