"use client";

import { H1, H2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Exercise, Version } from "@/payload-types";
import { Calendar, Clock, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DayContentParser } from "../../[exercise]/[version]/components/DayContentParser";

interface ExerciseCardProps {
  exercise: Exercise & { versions: (Version & { exercise: Exercise })[] };
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getLanguageLabel = (language: string) => {
    return language === "czk" ? "Čeština" : "Slovenčina";
  };

  const getLanguageFlag = (language: string) => {
    return language === "czk" ? "🇨🇿" : "🇸🇰";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("cs-CZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        {/* Exercise Header */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          {exercise.icon && typeof exercise.icon === "object" && "url" in exercise.icon && (
            <div className="flex-shrink-0 self-center sm:self-start">
              <img
                src={exercise.icon.url || ""}
                alt={exercise.icon.alt || exercise.name}
                className="h-12 w-12 rounded-lg object-cover shadow-sm sm:h-12 sm:w-12"
              />
            </div>
          )}
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <H1 className="text-xl lg:text-2xl xl:text-3xl">{exercise.name}</H1>
            {exercise.description && (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">{isOpen ? "Skrýt popis" : "Zobrazit popis"}</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="prose prose-sm text-muted-foreground border-muted/30 mt-2 max-w-none border-l-2 pl-5">
                    <DayContentParser data={exercise.description} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>

        {/* Versions Section */}
        {exercise.versions.length > 0 && (
          <div className="space-y-3">
            <H2 className="text-foreground/80 mt-4 mb-3 text-base">Dostupné verze</H2>
            <div className="space-y-3">
              {exercise.versions.map((version) => (
                <div
                  key={version.id}
                  className="group hover:bg-muted/40 border-muted/100 hover:border-muted/60 rounded-lg border p-4 transition-all duration-200"
                >
                  {/* Version Content - All Information First */}
                  <div className="space-y-3">
                    {/* Version Header */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                      <h4 className="text-foreground text-base font-medium">{version.name}</h4>
                      <div className="text-muted-foreground flex items-center gap-1 text-sm">
                        <Globe className="text-primary/70 h-4 w-4" />
                        <span className="flex items-center gap-1">
                          {getLanguageFlag(version.language)} {getLanguageLabel(version.language)}
                        </span>
                      </div>
                    </div>

                    {/* Version Details */}
                    <div className="text-muted-foreground space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-primary/70 h-4 w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          {formatDate(version.startDate)} - {formatDate(version.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary/70 h-4 w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{version.duration} dní</span>
                      </div>
                    </div>
                  </div>

                  {/* Button - Always Last */}
                  <div className="mt-4 flex w-full justify-center">
                    <Link className="w-full" href={`/${exercise.slug}/${version.slug}`}>
                      <Button size="sm" variant="outline" className="w-full">
                        Zobrazit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
