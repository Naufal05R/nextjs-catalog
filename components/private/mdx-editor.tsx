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
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  markdownShortcutPlugin,
  codeBlockPlugin,
  linkPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  InsertAdmonition,
  imagePlugin,
  InsertImage,
  ListsToggle,
} from "@mdxeditor/editor";
import { cn } from "@/lib/utils";

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        linkPlugin(),
        quotePlugin(),
        listsPlugin(),
        imagePlugin({
          imageUploadHandler: () => {
            return Promise.resolve("https://picsum.photos/200/300");
          },
        }),
        headingsPlugin(),
        codeBlockPlugin(),
        diffSourcePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        toolbarPlugin({
          toolbarClassName:
            "!rounded-none !bg-slate-100 [&_button:hover]:!bg-slate-200 [&_button:checked]:!bg-slate-200 [&_button[aria-checked=true]]:!bg-slate-200",
          toolbarContents: () => (
            <DiffSourceToggleWrapper options={[]}>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <ListsToggle />
              <Separator />
              <InsertImage />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <InsertAdmonition />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      contentEditableClassName={cn(
        "mt-2 border border-slate-100 text-slate-800 min-h-96 bg-slate-50 [&_blockquote]:border-l-4 [&_blockquote]:text-base [&_blockquote]:pl-2.5 [&_blockquote]:py-1 [&_blockquote]:bg-slate-100 [&_blockquote]:text-slate-600 [&_*]:list-inside [&_ul]:list-disc [&_ol]:list-decimal [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-2xl [&_h5]:text-xl [&_h6]:text-lg",
        props.contentEditableClassName,
      )}
      {...props}
      ref={editorRef}
    />
  );
}
