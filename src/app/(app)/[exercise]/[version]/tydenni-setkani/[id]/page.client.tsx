"use client";

import { H1, H2 } from "@/components/typography";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WeeklyMeeting } from "@/payload-types";
import { useRouter } from "next/navigation";
import { DayContentParser } from "../../components/DayContentParser";

interface WeeklyMeetingProps {
  title: string;
  content: any;
  currentNumber: number;
  version: string;
  weeklyMeetings: Pick<WeeklyMeeting, "number" | "title">[];
}

export default function WeeklyMeetingClientPage({
  title,
  content,
  currentNumber,
  version,
  weeklyMeetings,
}: WeeklyMeetingProps) {
  const router = useRouter();

  const weeks = weeklyMeetings.map((meeting) => ({
    value: meeting.number.toString(),
    label: `Týden ${meeting.number}`,
  }));

  const handleWeekChange = (value: string) => {
    if (value === "2024") {
      router.push("/tydenni-setkani");
    } else {
      router.push(`/exodus/${version}/tydenni-setkani/${value}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <H1 className="pb-0">Týdenní setkání</H1>
        <Select value={currentNumber.toString()} onValueChange={handleWeekChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Vyberte týden" />
          </SelectTrigger>
          <SelectContent>
            {weeks.map((week) => (
              <SelectItem key={week.value} value={week.value}>
                {week.label}
              </SelectItem>
            ))}
            <SelectItem value="2024">2024 verze</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <H2>Týden {currentNumber}</H2>
      <DayContentParser data={content} />
    </div>
  );
}
