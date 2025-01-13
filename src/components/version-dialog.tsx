"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { VersionSelectDialog } from "./version-select-dialog";

export async function VersionDialog() {
  const payload = await getPayload({ config });
  const versions = await payload.find({
    collection: "versions",
    where: { isVisible: { equals: true } },
    sort: "-slug",
  });
  return <VersionSelectDialog versions={versions.docs} />;
}
