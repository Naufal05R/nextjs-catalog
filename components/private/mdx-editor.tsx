"use client";

import "@mdxeditor/editor/style.css";
import Mapper from "../server/Mapper";
import { Dispatch, SetStateAction, useCallback, useState, type ForwardedRef } from "react";
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
  ListsToggle,
  InsertThematicBreak,
  linkDialogPlugin,
  CreateLink,
  CodeToggle,
  usePublisher,
  insertImage$,
  ButtonWithTooltip,
  StrikeThroughSupSubToggles,
} from "@mdxeditor/editor";
import { cn } from "@/lib/utils";
import { ImagePlus, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog as DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ACCEPTED_IMAGE_MIME_EXTS } from "@/schema/media";
import { Image } from "@/components/server/Media";
import { Uploader } from "@/components/client/Uploader";

const InsertImage = () => {
  const insertImage = usePublisher(insertImage$);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback<(files: Array<File>) => void>((acceptedFiles) => {
    if (!!acceptedFiles.length) {
      const [selectedFile] = acceptedFiles;
      if (new Set<string>(ACCEPTED_IMAGE_MIME_EXTS).has(selectedFile.type)) setFile(selectedFile);
    }
  }, []);

  return (
    <DialogRoot onOpenChange={() => setTimeout(setFile, 500)}>
      <ButtonWithTooltip title="Insert image" className="!p-0">
        <DialogTrigger asChild>
          <ImagePlus className="size-7 p-1" />
        </DialogTrigger>
      </ButtonWithTooltip>
      <DialogContent className="sm:max-w-md" aria-describedby="insert-image-dialog">
        <form action="" id="insert-image-form" className="hidden" />

        <DialogHeader>
          <DialogTitle className="break-all font-body">Insert Image</DialogTitle>
          <DialogDescription className="break-all font-body">Select image for news content</DialogDescription>
        </DialogHeader>

        <fieldset>
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name ?? ""}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              classNames={{
                figure: "w-full h-40 aspect-auto rounded hover:cursor-pointer",
                image: "object-contain aspect-auto size-full",
              }}
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => (e.target as HTMLElement).requestFullscreen()}
            />
          ) : (
            <Uploader
              inputProps={{
                form: "insert-image-form",
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file && new Set<string>(ACCEPTED_IMAGE_MIME_EXTS).has(file.type)) {
                    setFile(file);
                  } else {
                    alert("filetype not allowed!");
                  }
                },
              }}
              options={{
                onDrop,
                accept: { [`${ACCEPTED_IMAGE_MIME_EXTS.join(",")}`]: [] },
              }}
            />
          )}
        </fieldset>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              form="insert-image-form"
              disabled={loading || !file}
              onClick={async () => {
                try {
                  if (!file) {
                    return;
                  }
                  setLoading(true);
                  insertImage({
                    file,
                    title: file.name,
                    altText: file.name,
                  });
                  setLoading(false);
                } catch {
                  setLoading(false);
                  toast({ title: "Can't Add your Image, try again." });
                } finally {
                  setFile(undefined);
                }
              }}
            >
              {loading ? <>Saving</> : <>Save</>}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

interface InitializedMDXEditorProps extends MDXEditorProps {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  blobUrls: Array<string>;
  setBlobUrls: Dispatch<SetStateAction<Array<string>>>;
}

export default function InitializedMDXEditor({
  editorRef,
  blobUrls,
  setBlobUrls,
  ...props
}: InitializedMDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        linkPlugin(),
        quotePlugin(),
        listsPlugin(),
        imagePlugin({
          disableImageSettingsButton: true,
          imageUploadHandler: async (file) => {
            const url = URL.createObjectURL(file);
            setBlobUrls([...blobUrls, url]);
            return Promise.resolve(url);
          },
        }),
        headingsPlugin(),
        codeBlockPlugin(),
        linkDialogPlugin({}),
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
                <div className="flex flex-wrap items-center">
                  <StrikeThroughSupSubToggles />
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
