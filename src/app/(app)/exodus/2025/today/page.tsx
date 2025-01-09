"use server";

import config from "@payload-config";

import { notFound } from "next/navigation";
import { getPayload } from "payload";

import { getEventStatus } from "@/app/(app)/utils/date";
import { DayPagination } from "@/components/days/day-pagination";
import { H2, H3 } from "@/components/typography";
import { DayContentParser } from "../components/DayContentParser";
import { TasksAccordeon } from "../components/TaskAccordeon";
import { calculateSchedulingFromDay } from "../utils/calculateScheduling";

export default async function ExodusPayloadPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const payload = await getPayload({ config });

  const status = getEventStatus("EXODUS");

  if (!status.isRunning) {
    return <H2>Toto cvičení zrovna neprobíhá.</H2>;
  }

  const scheduling = calculateSchedulingFromDay(status.currentDays);

  const day = await payload.find({
    collection: "days",
    where: { number: { equals: Number(status.currentDays) }, "version.displayName": { equals: "Exodus - 2025" } },
    pagination: false,
    depth: 1,
  });

  const tasks = await payload.find({
    collection: "tasks",
    where: {
      "version.displayName": { equals: "Exodus - 2025" },
      or: [
        { type: { equals: "daily" } },
        {
          and: [{ type: { equals: "weekly" } }, { "scheduling.week": { equals: scheduling.week } }],
        },
        {
          and: [
            { type: { equals: "weekday" } },
            { "scheduling.dayInWeek": { equals: scheduling.dayInWeek.toString() } },
          ],
        },
        {
          and: [{ type: { equals: "monthly" } }, { "scheduling.month": { equals: scheduling.month } }],
        },
        {
          and: [{ type: { equals: "specificDay" } }, { "scheduling.dayNumber": { equals: scheduling.dayNumber } }],
        },
      ],
    },
    pagination: false,
    depth: 1,
  });

  const daysTotalDocs = await payload.find({
    collection: "days",
    where: { "version.displayName": { equals: "Exodus - 2025" } },
    sort: "number",
  });

  if (day.docs.length === 0) {
    notFound();
  }

  return (
    <div>
      <DayPagination currentPage={params.id} lastPage={daysTotalDocs.totalDocs} />
      <H2>{day.docs[0].title}</H2>

      {tasks.docs.length != 0 &&
        tasks.docs.map((tasks, index) => {
          return (
            <div key={index}>
              <H3>{tasks.title}</H3>
              <TasksAccordeon tasks={tasks.tasks} />
            </div>
          );
        })}

      <DayContentParser data={day.docs[0].content} />
      <DayPagination currentPage={params.id} lastPage={daysTotalDocs.totalDocs} />
    </div>
  );
}
