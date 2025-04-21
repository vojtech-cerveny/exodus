"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function MetaTheme() {
  const { resolvedTheme } = useTheme();
  console.log("resolvedTheme", resolvedTheme);
  useEffect(() => {
    const themeColor = resolvedTheme === "dark" ? "#17171c" : "#FFFFFF";

    document.querySelectorAll("meta[name='theme-color']").forEach((meta) => {
      console.log("meta", meta);
      meta.setAttribute("content", themeColor);
    });
  }, [resolvedTheme]);

  return <></>;
}
