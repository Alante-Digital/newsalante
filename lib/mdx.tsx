import { Callout } from "@/components/Callout";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";

function MdxLink({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

const components = { Callout, a: MdxLink };

export function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
