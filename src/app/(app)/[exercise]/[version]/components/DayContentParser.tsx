"use client";

import { H1, H2, H3, Paragraph } from "@/components/typography";
import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { SerializedEditorState, SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConverters,
  JSXConvertersFunction,
  RichText,
  SerializedLexicalNodeWithParent,
} from "@payloadcms/richtext-lexical/react";
import Link from "next/link";

export const DayContentParser = ({ data }: { data: SerializedEditorState }) => {
  const parseNodes = ({
    node,
    nodesToJSX,
  }: {
    node: any;
    nodesToJSX: (args: {
      converters?: JSXConverters;
      disableIndent?: boolean | string[];
      disableTextAlign?: boolean | string[];
      nodes: SerializedLexicalNode[];
      parent?: SerializedLexicalNodeWithParent;
    }) => React.ReactNode[];
  }) => {
    return nodesToJSX({
      nodes: node.children,
    });
  };

  const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    paragraph: ({ node, nodesToJSX }) => {
      return <Paragraph>{parseNodes({ node, nodesToJSX })}</Paragraph>;
    },
    heading: ({ node, nodesToJSX }) => {
      switch (node.tag) {
        case "h1":
          return <H1>{parseNodes({ node, nodesToJSX })}</H1>;
        case "h2":
          return <H2>{parseNodes({ node, nodesToJSX })}</H2>;
        case "h3":
          return <H3>{parseNodes({ node, nodesToJSX })}</H3>;
        default:
          return <h2>{parseNodes({ node, nodesToJSX })}</h2>;
      }
    },
    quote: ({ node, nodesToJSX }) => {
      return (
        <blockquote className="mt-4 italic lg:mt-6 lg:border-l-2 lg:pl-6 dark:border-l-gray-600">
          {parseNodes({ node, nodesToJSX })}
        </blockquote>
      );
    },
    link: ({ node, nodesToJSX }) => {
      return (
        <Link href={node.fields?.url || ""} className="text-primary font-medium underline underline-offset-4">
          {parseNodes({ node, nodesToJSX })}
        </Link>
      );
    },
  });

  return <RichText className="mb-8" data={data} converters={jsxConverters} />;
};
