import config from "@payload-config";
import { getPayload } from "payload";
import { VersionSelectUi } from "./versionSelect-ui";

export async function VersionSelect() {
  const payload = await getPayload({ config });
  const versions = await payload.find({
    collection: "versions",
    where: {
      isVisible: { equals: true },
    },
    sort: "-slug",
  });
  // console.log(versions.docs);

  return <VersionSelectUi versions={versions.docs} />;
}
