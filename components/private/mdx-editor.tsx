"use client";

import "@mdxeditor/editor/style.css";
import Image from "next/image";
import { useCallback, useState, type ForwardedRef } from "react";
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
import { CloudUpload, HardDriveUpload, ImagePlus, ShieldAlert } from "lucide-react";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog } from "../server/Dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDropzone } from "react-dropzone";
import { ACCEPTED_IMAGE_EXTS, ACCEPTED_IMAGE_MIME_EXTS } from "@/schema/media";

const InsertImage = () => {
  const insertImage = usePublisher(insertImage$);
  const [files, setFiles] = useState<Array<Record<string, unknown>>>([]);
  const [openImageDialog, seOpenImageDialog] = useState(false);
  const [imgUrl, setImgUrl] = useState({
    src: "",
    alt: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback<(files: Array<File>) => void>((acceptedFiles) => {
    if (!!acceptedFiles.length) {
      // setFiles(
      //   Array.from(acceptedFiles)
      //     .filter((acceptedFile) => new Set<string>(ACCEPTED_IMAGE_MIME_EXTS).has(acceptedFile.type))
      //     .map((file, index) => {
      //       return {
      //         title: file.name,
      //         order: index,
      //         media: file,
      //       };
      //     }),
      // );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, fileRejections, open } = useDropzone({
    onDrop,
    accept: { [`${ACCEPTED_IMAGE_MIME_EXTS.join(",")}`]: [] },
  });

  const DynamicUI = () => (
    <div className="line-clamp-2 text-center">
      {isDragActive ? (
        isDragAccept ? (
          <>
            <HardDriveUpload className="mx-auto mb-3.5 size-8" strokeWidth={1.5} />
            Drag files or click to upload
          </>
        ) : isDragReject ? (
          <>
            <ShieldAlert className="mx-auto mb-3.5 size-8" strokeWidth={1.5} />
            One or more files not allowed or not supported
          </>
        ) : (
          <>
            <CloudUpload className="mx-auto mb-3.5 size-8" strokeWidth={1.5} />
            Drag files or click to upload
          </>
        )
      ) : (
        <>
          <CloudUpload className="mx-auto mb-3.5 size-8" strokeWidth={1.5} />
          Drag files or click to upload
        </>
      )}
    </div>
  );

  return (
    <Dialog
      header={{
        title: "Insert Image",
      }}
      element={{
        trigger: (
          <ButtonWithTooltip title="Insert image" className="!size-7 !p-1">
            <ImagePlus size={20} />
          </ButtonWithTooltip>
        ),
        body: (
          <>
            <fieldset className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={"title"} className="text-left">
                Title
              </Label>
              <Input id={"title"} name="title" className="col-span-3" form="create-collection-form" />
            </fieldset>
            <fieldset className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="py-[11px] text-left">
                Description
              </Label>
              <Textarea
                rows={3}
                id="description"
                name="description"
                className="col-span-3"
                form="create-collection-form"
              />
            </fieldset>
            <fieldset>
              <div
                className={cn(
                  "relative flex h-40 w-full flex-col items-center justify-center border-[1.5px] border-dashed border-slate-300 bg-slate-50 p-7 text-slate-400",
                  {
                    "border-teal-300 bg-teal-50 text-teal-400": isDragActive && isDragAccept,
                    "border-rose-300 bg-rose-50 text-rose-400": isDragActive && isDragReject,
                  },
                )}
              >
                <div {...getRootProps()} className="absolute size-full hover:cursor-pointer" onClick={open}>
                  <Input
                    {...getInputProps()}
                    // form="create-product-form"
                    className="hidden"
                    type="file"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        setFiles(
                          Array.from(files)
                            .filter((file) => {
                              if (new Set<string>(ACCEPTED_IMAGE_MIME_EXTS).has(file.type)) {
                                return true;
                              } else {
                                alert(`Invalid File ${file.name}! Allowed files: \n${ACCEPTED_IMAGE_EXTS.join(", ")}`);
                                return false;
                              }
                            })
                            .map((file, index) => {
                              return {
                                title: file.name,
                                order: index,
                                media: file,
                              };
                            }),
                        );
                      }
                    }}
                  />
                </div>

                <DynamicUI />
              </div>
            </fieldset>
          </>
        ),
      }}
      footer={{
        button: (
          <Button
            disabled={loading || imgUrl.alt.trim().length === 0 || imgUrl.src.trim().length === 0}
            onClick={async () => {
              try {
                if (imgUrl.alt.trim().length === 0 || imgUrl.src.trim().length === 0) {
                  return;
                }
                setLoading(true);
                await insertImage({
                  src: imgUrl.src,
                  altText: imgUrl.alt,
                  title: imgUrl.alt,
                });
                setLoading(false);
                seOpenImageDialog(false);
              } catch {
                setLoading(false);
                toast({ title: "Can't Add your Image, try again." });
              }
            }}
          >
            {loading ? <>Saving</> : <>Save</>}
          </Button>
        ),
      }}
    />
  );
};

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
                  {/* <InsertImage /> */}
                  <InsertImage /> {/* Add it here */}
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
