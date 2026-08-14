import { Callout } from "@/components/Callout";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = { Callout };

export function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
