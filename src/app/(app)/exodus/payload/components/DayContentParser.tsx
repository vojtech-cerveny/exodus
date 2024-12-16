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
    paragraph: (props) => <Paragraph>{parseNodes(props)}</Paragraph>,
    heading: (props) => {
      switch (props.node.tag) {
        case "h1":
          return <H1>{parseNodes(props)}</H1>;
        case "h2":
          return <H2>{parseNodes(props)}</H2>;
        case "h3":
          return <H3>{parseNodes(props)}</H3>;
        default:
          return <h2>{parseNodes(props)}</h2>;
      }
    },
    quote: (props) => {
      return (
        <blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 pl-4 italic">
          {parseNodes(props)}
        </blockquote>
      );
    },
    link: (props) => (
      <Link
        href={props.node.fields.url || ""}
        {...props}
        className="font-medium text-primary underline underline-offset-4"
      >
        {parseNodes(props)}
      </Link>
    ),
  });

  return <RichText data={data} converters={jsxConverters} />;
};
