'use server';

import config from '@payload-config';

import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

import { HighlightedTextMobile } from '@/components/bookmarks/highlighted-text-mobile';
import ProgressUpdateCard from '@/components/brotherhood/progress-update-card';
import { DayPagination } from '@/components/days/day-pagination';
import Timer from '@/components/days/timer';
import { H2, H3 } from '@/components/typography';
import { auth } from '@auth';
import { SessionProvider } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { DayContentParser } from '../components/DayContentParser';
import { TasksAccordeon } from '../components/TaskAccordeon';
import { calculateSchedulingFromDay } from '../utils/calculateScheduling';

export default async function ExodusPayloadPage(props: {
  params: Promise<{ id: string; version: string; lang: string }>;
}) {
  const params = await props.params;
  const scheduling = calculateSchedulingFromDay(Number(params.id));
  const payload = await getPayload({ config });
  const session = await auth();
  // const { locale, defaultLocale } = useRouter();

  try {
    const day = await payload.find({
      collection: 'days',
      where: {
        number: { equals: Number(params.id) },
        'version.slug': { equals: params.version },
      },
      pagination: false,
      depth: 1,
      locale: params.lang,
    });

    const tasks = await payload.find({
      collection: 'tasks',
      where: {
        'version.slug': { equals: params.version },
        or: [
          { type: { equals: 'daily' } },
          {
            and: [{ type: { equals: 'weekly' } }, { 'scheduling.week': { equals: scheduling.week } }],
          },
          {
            and: [
              { type: { equals: 'weekday' } },
              { 'scheduling.dayInWeek': { equals: scheduling.dayInWeek.toString() } },
            ],
          },
          {
            and: [{ type: { equals: 'monthly' } }, { 'scheduling.month': { equals: scheduling.month } }],
          },
          {
            and: [{ type: { equals: 'specificDay' } }, { 'scheduling.dayNumber': { equals: scheduling.dayNumber } }],
          },
        ],
      },
      pagination: false,
      depth: 1,
      locale: params.lang,
    });

    const daysTotalDocs = await payload.find({
      collection: 'days',
      where: {
        'version.slug': { equals: params.version },
      },
      sort: 'number',
      locale: params.lang,
    });

    if (day.docs.length === 0) {
      notFound();
    }

    return (
      <div>
        <DayPagination currentPage={params.id} lastPage={daysTotalDocs.totalDocs} />
        <SessionProvider basePath={'/api/auth'} session={session}>
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
          <HighlightedTextMobile>
            <div id="helper-for-selection">
              <DayContentParser data={day.docs[0].content} />
            </div>
          </HighlightedTextMobile>
        </SessionProvider>
        <DayPagination currentPage={params.id} lastPage={daysTotalDocs.totalDocs} />
        <Timer audioSrc="/sounds/gong.mp3" />
        {session && (
          <div className="mb-4 flex items-center justify-center">
            <ProgressUpdateCard />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
