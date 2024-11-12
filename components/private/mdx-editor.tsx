"use client";

import "@mdxeditor/editor/style.css";
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  Separator,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import { cn } from "@/lib/utils";

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <Separator />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <Separator />
              <BlockTypeSelect />
            </>
          ),
        }),
      ]}
      {...props}
      contentEditableClassName={cn(
        "mt-2 rounded-md border border-slate-100 min-h-96 bg-slate-50",
        props.contentEditableClassName,
      )}
      ref={editorRef}
    />
  );
}
