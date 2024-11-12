"use client";

import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";

const Editor = dynamic(() => import("../private/mdx-editor"), {
  ssr: false,
});

export const RichText = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

RichText.displayName = "ForwardRefEditor";
