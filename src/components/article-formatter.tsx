import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
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
    <blockquote {...props} className="mt-4 italic md:mt-6 md:border-l-2 md:pl-6 dark:border-l-gray-600">
      {props.children}
    </blockquote>
  ),
  p: (props: any) => <p {...props} className="leading-7 not-first:mt-6" />,
  a: (props: any) => (
    <Link {...props} className="text-primary font-medium underline underline-offset-4">
      {props.children}
    </Link>
  ),
  ol: (props) => {
    return <ol className="mt-4 list-outside list-decimal space-y-4 pl-4">{props.children}</ol>;
  },
  ul: (props) => {
    return <ul className="mt-4 list-inside list-disc space-y-4">{props.children}</ul>;
  },
  // li: (props) => {
  //   // Instead of rendering an actual 'li', just pass the props through.
  //   // The 'ol' component will handle the rendering.
  //   return props.children;
  // },
  li: (props: any) => {
    return <li> {props.children}</li>;
  },
  hr: (props: any) => props.children,
};

export function ArticleMDX(props: any) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
