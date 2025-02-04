import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMemberProgressByBrotherhoodId } from "@/domain/brotherhood-progress/brotherhood-progress-service";
import { cn, getProgressDay, isToday } from "@/lib/utils";
import {
  CheckCircledIcon,
  CheckIcon,
  Cross2Icon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import moment from "moment";
import { AvatarWithFallBack } from "../avatar";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

// TODO: This is kinda messy, but it works. Refactor it.
export default async function ProgressTable({ brotherhoodId }: { brotherhoodId: string }) {
  const progress = await getMemberProgressByBrotherhoodId(brotherhoodId);

  return (
    <div>
      <div className="relative hidden overflow-x-auto md:block">
        <table className="mb-6 w-full text-center text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr className="m-4">
              <th scope="col" className="px-6 py-3">
                <div className="flex justify-center">
                  <img src={`/icons/table-uzivatel.svg`} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex justify-center">
                  <img src={`/icons/table-datum.svg`} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <img src={`/icons/table-sprcha.svg`} />
              </th>
              <th scope="col" className="px-6 py-3">
                <img src={`/icons/table-cviceni.svg`} />
              </th>
              <th scope="col" className="px-6 py-3">
                <img src={`/icons/table-askeze.svg`} />
              </th>
              <th scope="col" className="px-6 py-3">
                <img src={`/icons/table-svata-hodinka.svg`} />
              </th>
              <th scope="col" className="px-6 py-3">
                <img src={`/icons/table-zhodnoceni.svg`} />
              </th>
              <th scope="col" className="px-6 py-3">
                <img src={`/icons/table-note.svg`} />
              </th>
            </tr>
          </thead>
          <tbody>
            {progress.map((memberProgress) => (
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800" key={memberProgress.id}>
                <td scope="row" className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-white">
                  <AvatarWithFallBack user={memberProgress.user} />
                </td>
                <td className="px-6 py-4 text-center">
                  {getProgressDay(memberProgress.date)}
                  {isToday(memberProgress.lastUpdateDate) && (
                    <div className="text-center text-sm italic leading-none text-gray-400">
                      {moment(memberProgress.lastUpdateDate).fromNow()}
                    </div>
                  )}
                </td>

                <td className="px-4 py-2">{doneStatusToIcon(memberProgress.shower)}</td>
                <td className="px-4 py-2">{doneStatusToIcon(memberProgress.exercise)}</td>
                <td className="px-4 py-2">{doneStatusToIcon(memberProgress.asceticism)}</td>
                <td className="px-4 py-2">{statusToIcon(memberProgress.prayer)}</td>
                <td className="px-4 py-2">{statusToIcon(memberProgress.overallMood)}</td>
                <td className="px-4 py-2">{memberProgress.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4 flex flex-col gap-4 md:hidden">
        {progress.map((memberProgress) => (
          <Card key={memberProgress.id} className="w-full">
            <CardHeader className="">
              <CardTitle className="flex items-center gap-x-2">
                <span className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <AvatarWithFallBack user={memberProgress.user} />
                </span>
                <span>{memberProgress.user.name}</span>
              </CardTitle>
              <CardDescription>
                {getProgressDay(memberProgress.date)}{" "}
                {isToday(memberProgress.lastUpdateDate) && (
                  <span className="text-center leading-none text-gray-400">
                    {moment(memberProgress.lastUpdateDate).fromNow()}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">{mobileProgressTable(memberProgress)}</div>
              <Separator className="mt-2" />
              {memberProgress.note && (
                <div>
                  <Label>Poznámka</Label>
                  <div>{memberProgress.note}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function mobileProgressTable(memberProgress: any) {
  const map = new Map([
    ["shower", "Sprcha"],
    ["exercise", "Cvičení"],
    ["asceticism", "Askeze"],
    ["prayer", "Svatá hodinka"],
    ["overallMood", "Zhodnocení"],
  ]);
  return Object.entries(memberProgress).map(([key, value]) => {
    if (map.get(key)) {
      let badge: { style: string; variant: "default" | "outline" | "secondary"; icon?: React.ReactNode } = {
        style: "",
        variant: "default",
      };
      if (value === "DONE" || value === "NOT_DONE" || value === "NO_INFORMATION") {
        // style.style = "w-max max-w-max";
        if (value === "DONE") {
          badge.variant = "default";
        } else {
          badge.style += " text-gray-300";
          badge.variant = "outline";
        }
      } else if (value === "GOOD" || value === "NEUTRAL" || value === "SAD") {
        badge.style = "w-max max-w-max";
        badge.variant = "default";
        badge.icon = <img className="h-5 w-5" src={`/icons/mood-${value.toLocaleLowerCase()}.svg`} />;
        if (value === "GOOD") {
          badge.style += " bg-green-100 hover:bg-green-300 text-black";
        } else if (value === "NEUTRAL") {
          badge.style += " bg-yellow-100 hover:bg-yellow-300 text-black";
        } else if (value === "SAD") {
          badge.style += " bg-red-100 hover:bg-red-300 text-black";
        }
      }
      return (
        <Badge key={key} className={cn("text-sm", badge.style)} variant={badge.variant}>
          {badge.icon}
          {value === "DONE" && <CheckIcon className="mr-1" />}
          {value === "NOT_DONE" && <Cross2Icon className="mr-1" />}
          {map.get(key)}
        </Badge>
      );
    }
  });
}

function statusToIcon(status: string) {
  switch (status) {
    case "GOOD":
      return (
        <Badge variant="default" className="w-max max-w-max bg-green-100 text-[12px] hover:bg-green-300">
          <img className="h-6 w-6" src={`/icons/mood-${status.toLocaleLowerCase()}.svg`} />
        </Badge>
      );
    case "NEUTRAL":
      return (
        <Badge variant="default" className="w-max max-w-max bg-yellow-100 text-[16px] hover:bg-yellow-300">
          <img className="h-6 w-6" width={15} height={15} src={`/icons/mood-${status.toLocaleLowerCase()}.svg`} />
        </Badge>
      );
    case "SAD":
      return (
        <Badge variant="default" className="w-max max-w-max bg-red-100 hover:bg-red-300">
          <img className="h-6 w-6" src={`/icons/mood-${status.toLocaleLowerCase()}.svg`} />
        </Badge>
      );
    default:
      return (
        <span className="border-green-300 text-red-500">
          <img className="h-6 w-6" src={`/icons/mood-${status.toLocaleLowerCase()}.svg`} />
        </span>
      );
  }
}

function doneStatusToIcon(done: string) {
  switch (done) {
    case "DONE":
      return (
        <Badge variant="default" className="text-[12px]">
          <CheckCircledIcon className="h-6 w-6 self-center" />
        </Badge>
      );
    case "NOT_DONE":
      return (
        <Badge variant="outline" className="text-[12px]">
          <CrossCircledIcon className="h-6 w-6 self-center" />
        </Badge>
      );
    case "NO_INFORMATION":
      return (
        <Badge variant="secondary" className="text-[12px]">
          <QuestionMarkCircledIcon className="h-6 w-6 self-center" />
        </Badge>
      );
    default:
      return <span className="text-red-500">🙁</span>;
  }
}
