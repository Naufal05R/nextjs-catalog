"use client";

import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { Dispatch, forwardRef, SetStateAction } from "react";

const Editor = dynamic(() => import("../private/mdx-editor"), {
  ssr: false,
});

interface RichTextProps extends MDXEditorProps {
  blobUrls: Array<string>;
  setBlobUrls: Dispatch<SetStateAction<Array<string>>>;
}

export const RichText = forwardRef<MDXEditorMethods, RichTextProps>((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

RichText.displayName = "ForwardRefEditor";
