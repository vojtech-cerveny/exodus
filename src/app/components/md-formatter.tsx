
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import React from "react";

const components: MDXRemoteProps["components"] = {
  h1: (props: any) => (
    <h1 {...props} className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4">
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2
      {...props}
      className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.children}
    </h3>
  ),
  blockquote: (props: any) => (
    <blockquote {...props} className="mt-4 lg:mt-6 lg:border-l-2 lg:pl-6 italic">
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
    const items = React.Children.toArray(children).map((child, index) => {
      // Extract the title and text from the child props
      const title = React.isValidElement(child) ? (child as React.ReactElement).props.children[0].toString() : '';
      const text =React.isValidElement(child) ? ((child as React.ReactElement).props.children[2] as React.ReactElement).props.children[1].props.children : ""

      return {
        title: title,
        text: text,
      };
    });

    return (
      <Accordion type="single" collapsible className="w-full">
        {items.filter((item) => item.text !== "").map((item, index) => (
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
};

export function CustomMDX(props: any) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
