import { Exercise, Version } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";
import { VersionSelectUi } from "./versionSelect-ui";

export async function VersionSelect() {
  const payload = await getPayload({ config });
  const versions = await payload.find({
    collection: "versions",
    where: {
      isVisible: { equals: true },
      startDate: { less_than: new Date() },
      endDate: { greater_than: new Date() },
    },
    depth: 2,
    sort: "-slug",
  });
  // console.log(versions.docs);

  return <VersionSelectUi versions={versions.docs as (Version & { exercise: Exercise })[]} />;
}
