"use server";
import { H2, H3 } from "@/components/typography";

import { Week } from "@/payload-types";
import config from "@payload-config";

import { getPayload } from "payload";
import { DayContentParser } from "./components/DayContentParser";
import { TasksAccordeon } from "./components/TaskAccordeon";

export default async function ExodusPayloadPage() {
  const payload = await getPayload({ config });
  const days = await payload.find({ collection: "days" });

  return (
    <div>
      <H2>{days.docs[0].title}</H2>

      {days.docs[0].week && (
        <>
          <H3>{(days.docs[0].week as Week).title}</H3>
          <TasksAccordeon tasks={(days.docs[0].week as Week).tasks} />
        </>
      )}
      <DayContentParser data={days.docs[0].content} />
    </div>
  );
}
