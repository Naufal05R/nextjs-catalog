"use client";

import "@mdxeditor/editor/style.css";
import type { ForwardedRef } from "react";
import {
  type MDXEditorMethods,
  type MDXEditorProps,
  headingsPlugin,
  MDXEditor,
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
  InsertAdmonition,
  imagePlugin,
  InsertImage,
  ListsToggle,
  InsertThematicBreak,
  linkDialogPlugin,
  CreateLink,
  CodeToggle,
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
        linkDialogPlugin(),
        diffSourcePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        toolbarPlugin({
          toolbarClassName:
            "flex flex-wrap !rounded-none !bg-slate-100 !gap-y-2 [&_[role=separator]]:max-lg:invisible [&_button:checked]:!bg-slate-200 [&_button:hover]:!bg-slate-200 [&_button[aria-checked=true]]:!bg-slate-200",
          toolbarContents: () => (
            <>
              <div className="flex flex-wrap items-center gap-y-2">
                <div className="flex flex-wrap items-center">
                  <UndoRedo />
                  <Separator />
                </div>
                <div className="flex flex-wrap items-center">
                  <BoldItalicUnderlineToggles />
                  <Separator />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-y-2">
                <div className="flex flex-wrap items-center">
                  <ListsToggle options={["bullet", "number"]} />
                  <Separator />
                </div>
                <div className="flex flex-wrap items-center">
                  <BlockTypeSelect />
                  <Separator />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-y-2">
                <div className="flex flex-wrap items-center">
                  <InsertImage />
                  <CodeToggle />
                  <CreateLink />
                  <InsertThematicBreak />
                  <Separator />
                </div>
                <div className="flex flex-wrap items-center">
                  <InsertAdmonition />
                </div>
              </div>
            </>
          ),
        }),
      ]}
      contentEditableClassName={cn(
        "mt-2 min-h-96 border border-slate-100 bg-slate-50 leading-normal text-slate-800 [&_*]:list-inside [&_blockquote]:border-l-4 [&_blockquote]:bg-slate-100 [&_blockquote]:py-1 [&_blockquote]:pl-2.5 [&_blockquote]:text-base [&_blockquote]:text-slate-600 [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-2xl [&_h5]:text-xl [&_h6]:text-lg [&_ol]:list-decimal [&_ul]:list-disc",
        props.contentEditableClassName,
      )}
      {...props}
      ref={editorRef}
    />
  );
}
