import { cn } from "@/lib/utils";
import React from "react";

export function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn([props.className, "scroll-m-20 pb-4 text-4xl font-extrabold tracking-tight lg:text-5xl"])}
    >
      {props.children}
    </h1>
  );
}

export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={cn([
        "mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ",
        props.className,
      ])}
    >
      {props.children}
    </h2>
  );
}

export function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 {...props} className={cn(props.className, "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight")}>
      {props.children}
    </h3>
  );
}

export function Paragraph(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={cn(props.className, "leading-7 [&:not(:first-child)]:mt-6")} />;
}
