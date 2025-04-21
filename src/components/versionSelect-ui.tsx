"use client";
import useLocalStorage from "@/app/(app)/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Exercise, Version } from "@/payload-types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface VersionSelectUiProps {
  versions: (Version & { exercise: Exercise })[];
  onVersionSelect?: (selectedVersions: (Version & { exercise: Exercise })[]) => void;
}

export function VersionSelectUi({ versions, onVersionSelect }: VersionSelectUiProps) {
  // Create a unique identifier for each version
  const createVersionKey = (version: Version & { exercise: Exercise }) => `${version.exercise.slug}:${version.slug}`;

  // Store exercise groups in state
  const [exerciseGroups, setExerciseGroups] = useState<
    Record<
      string,
      {
        exercise: Exercise;
        versions: (Version & { exercise: Exercise })[];
      }
    >
  >({});

  // Create a map for quick lookups - using useRef to avoid dependency issues
  const versionMapRef = useRef(new Map<string, Version & { exercise: Exercise }>());

  // Update the version map and groups whenever versions change
  useEffect(() => {
    // Clear existing data
    versionMapRef.current.clear();

    // Temporary groups object to build up
    const newGroups: Record<
      string,
      {
        exercise: Exercise;
        versions: (Version & { exercise: Exercise })[];
      }
    > = {};

    // Populate the grouped versions and map
    versions.forEach((version) => {
      if (!version?.exercise?.slug) return;
      const slug = version.exercise.slug;

      if (!newGroups[slug]) {
        newGroups[slug] = {
          exercise: version.exercise,
          versions: [],
        };
      }

      newGroups[slug].versions.push(version);
      versionMapRef.current.set(createVersionKey(version), version);
    });

    // Update state with new groups
    setExerciseGroups(newGroups);
  }, [versions]);

  // State for the popover
  const [open, setOpen] = useState(false);

  // Track selected versions by exercise slug -> version key with localStorage persistence
  const [storedSelections, setStoredSelections] = useLocalStorage<Record<string, string>>(
    "selected-exercise-versions",
    {},
  );
  const [isLoading, setIsLoading] = useState(true);

  // Initialize selected versions from localStorage and update when selections change
  useEffect(() => {
    if (versionMapRef.current.size === 0) return;

    // Filter out any stored selections that don't have a matching version in the current versionMap
    const validSelections: Record<string, string> = {};

    Object.entries(storedSelections).forEach(([exerciseSlug, versionKey]) => {
      // Check if the version exists in our current versions data
      if (versionMapRef.current.has(versionKey)) {
        validSelections[exerciseSlug] = versionKey;
      }
    });

    // Update versions based on valid selections
    const versionsArray = Object.values(validSelections)
      .map((key) => versionMapRef.current.get(key))
      .filter(Boolean) as (Version & { exercise: Exercise })[];

    if (onVersionSelect) {
      onVersionSelect(versionsArray);
    }

    setIsLoading(false);
  }, [storedSelections, onVersionSelect]);

  // Toggle or select a version for an exercise
  const selectVersion = (versionKey: string) => {
    const version = versionMapRef.current.get(versionKey);
    if (!version) return;

    const exerciseSlug = version.exercise.slug;
    const currentSelectedKey = storedSelections[exerciseSlug];

    // If clicking the currently selected version, deselect it
    if (currentSelectedKey === versionKey) {
      const { [exerciseSlug]: _, ...rest } = storedSelections;
      setStoredSelections(rest);
      toast(`Odstraněno: ${version.displayName}`);
    }
    // Otherwise select the new version, replacing any existing selection for this exercise
    else {
      setStoredSelections({
        ...storedSelections,
        [exerciseSlug]: versionKey,
      });
      toast(`Vybráno: ${version.displayName}`);

      // If replacing a previous selection, show a toast about that too
      if (currentSelectedKey) {
        const previousVersion = versionMapRef.current.get(currentSelectedKey);
        if (previousVersion) {
          toast(`Nahrazeno: ${previousVersion.displayName}`, { duration: 2000 });
        }
      }
    }
  };

  // If no versions provided, show a message
  if (versions.length === 0) {
    return null;
  }

  if (isLoading) {
    return <div className="p-2 text-blue-500">Loading versions...</div>;
  }

  // Check if we have only one exercise - use for button display text
  const exerciseSlugs = Object.keys(exerciseGroups);
  const isSingleExercise = exerciseSlugs.length === 1;

  // Get button display text
  let buttonText = "Vyber si verzi";

  if (isSingleExercise) {
    const exerciseSlug = exerciseSlugs[0];
    const selectedVersionKey = storedSelections[exerciseSlug];

    if (selectedVersionKey) {
      const selectedVersion = versionMapRef.current.get(selectedVersionKey);
      if (selectedVersion) {
        buttonText = selectedVersion.displayName;
      }
    }
  }

  return (
    <div className="my-4 space-y-4">
      {Object.keys(exerciseGroups).length === 0 && versions.length > 0 && (
        <div className="p-2 text-amber-500">Verze jsou k dispozici, ale nemohly být načteny.</div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {buttonText}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandEmpty>Žádné verze nebyly nalezeny.</CommandEmpty>
            <div className="max-h-[300px] overflow-y-auto">
              {Object.entries(exerciseGroups).map(([exerciseSlug, group]) => (
                <CommandGroup key={exerciseSlug} heading={group.exercise.name}>
                  {group.versions.map((version) => {
                    const versionKey = createVersionKey(version);
                    const isSelected = storedSelections[exerciseSlug] === versionKey;

                    return (
                      <CommandItem
                        key={versionKey}
                        value={`${version.exercise.name} ${version.displayName}`}
                        onSelect={() => selectVersion(versionKey)}
                      >
                        <div className="flex w-full items-center">
                          <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                          <span>{version.displayName}</span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
