"use client";

import { redirect, useSearchParams } from "next/navigation";

export default function LoginRegirect() {
  const searchParams = useSearchParams();

  const search = searchParams.get("callbackUrl");

  redirect(search!);

  return <></>;
}
