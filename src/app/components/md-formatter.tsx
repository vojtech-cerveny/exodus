import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import React from "react";
import { H1, H2, H3 } from "./typography";

const components: MDXRemoteProps["components"] = {
  h1: (props: any) => <H1 {...props}>{props.children}</H1>,
  h2: (props: any) => <H2 {...props}>{props.children}</H2>,
  h3: (props: any) => <H3 {...props}>{props.children}</H3>,
  h4: (props: any) => (
    <h4 {...props} className="mt-8 scroll-m-20 text-xl tracking-tight">
      {props.children}
    </h4>
  ),
  blockquote: (props: any) => (
    <blockquote {...props} className="mt-4 lg:mt-6 lg:border-l-2 dark:border-l-gray-600 lg:pl-6 italic">
      {props.children}
    </blockquote>
  ),
  p: (props: any) => <p {...props} className="leading-7 [&:not(:first-child)]:mt-6" />,
  a: (props: any) => (
    <Link {...props} className="font-medium text-primary underline underline-offset-4">
      {props.children}
    </Link>
  ),
  ol: ({ children }) => {
    // Assuming 'children' is an array of 'li' components, transform them into the format expected by your Accordion
    const array: { title: string; text: string }[] = [];
    const items = React.Children.toArray(children).filter((item) => item !== "\n");
    for (let i = 0; i < items.length; i = i + 2) {
      array.push({
        title: (items[i] as React.ReactElement).props.children.toString(),
        text: (items[i + 1] as React.ReactElement).props.children.toString(),
      });
    }

    return (
      <Accordion type="single" collapsible className="w-full">
        {array
          .filter((item) => item.text !== "")
          .map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.text}</AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    );
  },
  li: (props) => {
    // Instead of rendering an actual 'li', just pass the props through.
    // The 'ol' component will handle the rendering.
    return props.children;
  },
  hr: (props: any) => props.children,
};

export function CustomMDX(props: any) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
