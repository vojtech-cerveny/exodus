import { Breadcrumbs } from "./component";

type Props = {
  params: Promise<{
    catchAll: string[];
  }>;
};
export default async function BreadcrumbsSlot({ params }: Props) {
  const resolvedParams = await params;
  return <Breadcrumbs routes={resolvedParams.catchAll} />;
}
