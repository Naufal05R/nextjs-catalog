"use client";

import "@mdxeditor/editor/style.css";
import { useState, type ForwardedRef } from "react";
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
  usePublisher,
  insertImage$,
  Button,
  ButtonWithTooltip,
  SingleChoiceToggleGroup,
  StrikeThroughSupSubToggles,
} from "@mdxeditor/editor";
import { cn } from "@/lib/utils";
import { ImageIcon, ImagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const AddImage = () => {
  const insertImage = usePublisher(insertImage$);
  const [openImageDialog, seOpenImageDialog] = useState(false);
  const [imgUrl, setImgUrl] = useState({
    src: "",
    alt: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <Dialog
        open={openImageDialog}
        onOpenChange={() => seOpenImageDialog(false)}
        aria-labelledby="Create Note"
        aria-describedby="Dialog to create new note"
      >
        <ButtonWithTooltip title="Insert image" className="!size-7 !p-1" onClick={() => seOpenImageDialog(true)}>
          <DialogTrigger>
            <ImagePlus size={20} />
          </DialogTrigger>
        </ButtonWithTooltip>
        <DialogContent
          aria-labelledby="Create Note"
          aria-describedby="Dialog to create new note"
          className="flex w-full max-w-screen-xs flex-col gap-6 border-none bg-slate-100 px-6 py-9 shadow-md"
        >
          <div className="flex flex-col gap-2">
            <div className="my-2 flex w-full flex-col items-center justify-center">
              <ImagePlus />
              <p className="mt-1 text-2xl font-semibold">Add Image</p>
            </div>
            {/* <UploadDropzone
              appearance={{
                button: "bg-ui-yellow px-4 py-2 text-light-text-primary my-2 font-medium cursor-pointer text-base",
                allowedContent: "my-2 text-sm",
              }}
              className="dark:border-dark-border border-light-border"
              endpoint="imageUploader"
              config={{
                appendOnPaste: true,
              }}
              onClientUploadComplete={(res) => {
                res.forEach((file) => {
                  insertImage({
                    src: file.url,
                    altText: file.name,
                    title: file.name,
                  });
                });
                toast({ title: `Upload Complete` });
                seOpenImageDialog(false);
              }}
              onUploadError={(error) => {
                toast({ title: `ERROR! ${error.message}` });
              }}
            /> */}
            <div className="flex w-full justify-center">
              <Separator className="bg-light-border dark:bg-dark-border my-4 h-[2px] w-[80%]" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="image_source" className="font-semibold">
                Source link:
              </label>
              <Input
                value={imgUrl.src}
                id="image_source"
                placeholder="Image Link"
                className="dark:bg-dark-2 bg-light-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => setImgUrl({ ...imgUrl, src: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image_alt" className="font-semibold">
                Image title:
              </label>
              <Input
                value={imgUrl.alt}
                id="image_alt"
                placeholder="Image Title"
                className="dark:bg-dark-2 bg-light-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => setImgUrl({ ...imgUrl, alt: e.target.value })}
              />
            </div>
            <div className="flex w-full items-center justify-end gap-2">
              <Button
                className="dark:disabled:bg-dark-2/90 dark:bg-dark-2 disabled:bg-light-3 bg-gray-300/90 hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => seOpenImageDialog(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={loading || imgUrl.alt.trim().length === 0 || imgUrl.src.trim().length === 0}
                className="text-dark-text-primary disabled:bg-green-1/90 bg-green-1 hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                {loading ? (
                  <>
                    {/* <Image width={28} height={28} src="/icons/loading-circle.svg" alt="Loading" className="mr-2" /> */}
                    Saving
                  </>
                ) : (
                  <>Save</>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
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
                  <AddImage /> {/* Add it here */}
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
