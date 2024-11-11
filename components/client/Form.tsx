"use client";

import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import { Form as FormRoot, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { toast as sonner } from "sonner";

import Mapper from "@/components/server/Mapper";
import { Image, Video } from "@/components/server/Media";
import {
  CloudUpload,
  Eye,
  EyeOff,
  GripVertical,
  HardDriveUpload,
  ImageUp,
  Plus,
  ShieldAlert,
  Trash2,
} from "lucide-react";

import { ContactFormSchema } from "@/schema/contact";

import { ACCEPTED_MEDIA_MIME_TYPES, ACCEPTED_MEDIA_TYPES, MediaFormSchema } from "@/schema/media";
import { cn, getFileDetails, getFileMimeTypes, removeUnwantedChars } from "@/lib/utils";
import { createProduct } from "@/lib/actions/product.action";
import { ComboboxDropdownCategory } from "./Combobox";
import { Dialog } from "@/components/server/Dialog";
import { Category } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { useFormState } from "react-dom";
import { InputFieldMessage } from "../server/Message";
import { ProductFormSchema } from "@/schema/product";
import { DataKeys } from "@/types/data";

export function GuestbookForm() {
  const actionHanlder = async (formData: FormData) => {
    const data = formData.entries();

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <article className="mt-8 w-full space-y-4 text-right">
      <form id="guestbook-form" action={actionHanlder} className="hidden" />

      <Label htmlFor="name" form="guestbook-form">
        <Input id="name" className="rounded-none shadow-none" placeholder="Name" form="guestbook-form" />
      </Label>

      <Label htmlFor="origin" form="guestbook-form">
        <Input id="origin" className="rounded-none shadow-none" placeholder="Origin" form="guestbook-form" />
      </Label>

      <Label htmlFor="message" form="guestbook-form">
        <Textarea
          id="message"
          className="rounded-none shadow-none"
          placeholder="Message"
          form="guestbook-form"
          cols={30}
          rows={10}
        />
      </Label>

      <Button type="submit" className="ml-auto rounded-none" form="guestbook-form">
        Send
      </Button>
    </article>
  );
}

export function ContactForm() {
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof ContactFormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <FormRoot {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 w-full space-y-4 text-right">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">
                <FormControl>
                  <Input id="name" className="rounded-none shadow-none" placeholder="Name" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">
                <FormControl>
                  <Input id="email" className="rounded-none shadow-none" placeholder="Email" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">
                <FormControl>
                  <Input id="phone" className="rounded-none shadow-none" placeholder="Phone" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="message">
                <FormControl>
                  <Textarea
                    cols={30}
                    rows={10}
                    id="message"
                    className="rounded-none shadow-none"
                    placeholder="Message"
                    {...field}
                  />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="ml-auto rounded-none">
          Send
        </Button>
      </form>
    </FormRoot>
  );
}

export function CreateProductForm({ collection, categories }: { collection: string; categories: Array<Category> }) {
  const [errors, formAction, isPending] = useFormState(createProduct, undefined);

  const [files, setFiles] = useState<Required<Array<z.infer<typeof MediaFormSchema>>>>([]);

  const actionHandler = async (formData: FormData) => {
    files
      .filter(({ media }) => !!media && new Set<string>(ACCEPTED_MEDIA_MIME_TYPES).has(media.type))
      .sort((a, b) => a.order - b.order)
      .forEach(({ title, media }) => {
        if (media) {
          formData.append("media.title", getFileDetails(title).fileName);
          formData.append("media.image", media);
        }
      });

    formAction({ formData, collection });
  };

  const onDrop = useCallback<(files: Array<File>) => void>((acceptedFiles) => {
    if (!!acceptedFiles.length) {
      setFiles(
        Array.from(acceptedFiles)
          .filter((acceptedFile) => new Set<string>(ACCEPTED_MEDIA_MIME_TYPES).has(acceptedFile.type))
          .map((file, index) => {
            return {
              title: file.name,
              order: index,
              media: file,
            };
          }),
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, fileRejections, open } = useDropzone({
    onDrop,
    accept: { [`${ACCEPTED_MEDIA_MIME_TYPES.join(",")}`]: [] },
  });

  useEffect(() => {
    if (!!fileRejections.length) {
      fileRejections.forEach((fileRejection, index) => {
        const { file, errors } = fileRejection;

        setTimeout(() => {
          sonner.error(
            <blockquote>
              <h5 className="break-all text-sm">
                <strong>Error: </strong>Invalid File <strong>{file.name}</strong>
              </h5>
              <br />
              <ul>
                <Mapper data={Array.from(errors)} render={({ message }) => <li>{message}</li>} />
              </ul>
            </blockquote>,
            { duration: 10000 },
          );
        }, 2000 * index);
      });
    }
  }, [fileRejections]);

  const ErrorMessage = <T extends DataKeys<z.infer<typeof ProductFormSchema>>>({ name }: { name: T }) => {
    return <InputFieldMessage schema={ProductFormSchema} errors={errors} name={name} />;
  };

  return (
    <>
      <form action={actionHandler} id="create-product-form" />

      <article className="mt-8 grid w-full grid-cols-12 gap-4">
        <fieldset className="col-span-12">
          <h6 className="mb-1 text-lg font-medium">Product Title</h6>
          <Label htmlFor="title">
            <Input
              id="title"
              name="title"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Title"
            />
            <ErrorMessage name="title" />
          </Label>
        </fieldset>

        <fieldset className="col-span-12 grid grid-cols-3 gap-x-4">
          <h6 className="col-span-3 mb-1 text-lg font-medium">Product Detail</h6>
          <Label htmlFor="categoryId" className="flex flex-col">
            <ComboboxDropdownCategory data={categories} form="create-product-form" />
            <ErrorMessage name="categoryId" />
          </Label>

          <Label htmlFor="state">
            <Input
              id="state"
              name="state"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Origin"
            />
            <ErrorMessage name="state" />
          </Label>

          <Label htmlFor="color">
            <Input
              id="color"
              name="color"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Color"
            />
            <ErrorMessage name="color" />
          </Label>
        </fieldset>

        <fieldset className="col-span-12 grid grid-cols-4 gap-x-4">
          <h6 className="-order-2 col-span-3 mb-1 text-lg font-medium">Product Size</h6>
          <Label htmlFor="width">
            <Input
              id="width"
              name="width"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Width"
            />
            <ErrorMessage name="width" />
          </Label>

          <Label htmlFor="height">
            <Input
              id="height"
              name="height"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Height"
            />
            <ErrorMessage name="height" />
          </Label>

          <Label htmlFor="length">
            <Input
              id="length"
              name="length"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Length"
            />
            <ErrorMessage name="length" />
          </Label>

          <h6 className="-order-1 col-span-1 mb-1 text-lg font-medium">Product Weight</h6>
          <Label htmlFor="weight">
            <Input
              id="weight"
              name="weight"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Weight"
            />
            <ErrorMessage name="weight" />
          </Label>
        </fieldset>

        <fieldset className="col-span-12 grid grid-cols-2 gap-x-4">
          <h6 className="col-span-2 mb-1 text-lg font-medium">Product Rate</h6>
          <Label htmlFor="price">
            <Input
              id="price"
              name="price"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Price"
            />
            <ErrorMessage name="price" />
          </Label>

          <Label htmlFor="discount">
            <Input
              id="discount"
              name="discount"
              form="create-product-form"
              className="rounded-none shadow-none"
              placeholder="Discount"
            />
            <ErrorMessage name="discount" />
          </Label>
        </fieldset>

        <fieldset className="col-span-12 grid grid-cols-1 gap-x-4">
          <h6 className="-order-2 mb-1 text-lg font-medium">Product Description</h6>
          <Label htmlFor="description">
            <Textarea
              id="description"
              form="create-product-form"
              name="description"
              className="rounded-none shadow-none"
              placeholder="Description"
              rows={10}
            />
            <ErrorMessage name="description" />
          </Label>
        </fieldset>

        <fieldset className="col-span-12">
          <h6 className="mb-1 text-lg font-medium">Uploaded Images</h6>
          {!!files.length ? (
            <ul className="flex flex-col gap-y-2.5">
              <Mapper
                data={files}
                render={({ title, media }, mediaIndex) => {
                  const { fileType, fileMime } = getFileMimeTypes(media?.type ?? "");
                  const { fileName } = getFileDetails(title, true);

                  return (
                    <li className="flex w-full items-center gap-x-2 border p-2.5">
                      <Button type="button" size="icon" variant="ghost">
                        <GripVertical className="text-slate-400" />
                      </Button>

                      <Dialog
                        header={{
                          title: title ?? "",
                          description: "Click the image to view in fullscreen",
                        }}
                        element={{
                          trigger: (
                            <Button type="button" size="icon" variant="ghost" disabled={!media}>
                              {media ? <Eye className="text-slate-400" /> : <EyeOff className="text-slate-400" />}
                            </Button>
                          ),
                          body:
                            media && media.type.startsWith("image/") ? (
                              <Image
                                src={URL.createObjectURL(media)}
                                alt={title ?? ""}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                classNames={{
                                  figure: "w-full aspect-video rounded hover:cursor-pointer",
                                  image: "object-contain",
                                }}
                                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                                  (e.target as HTMLElement).requestFullscreen()
                                }
                              />
                            ) : media && media.type.startsWith("video/") ? (
                              <Video
                                src={URL.createObjectURL(media)}
                                controls
                                autoPlay
                                classNames={{
                                  figure: "w-full aspect-video rounded hover:cursor-pointer",
                                  video: "object-contain",
                                }}
                                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                                  (e.target as HTMLElement).requestFullscreen()
                                }
                              />
                            ) : (
                              <></>
                            ),
                        }}
                      />

                      <Label htmlFor={`medias.${mediaIndex}.title`} className="flex flex-1 items-center gap-2">
                        <Input
                          id={`medias.${mediaIndex}.title`}
                          form="create-product-form"
                          className="flex-1 shrink-0 rounded-none border-none shadow-none read-only:cursor-default"
                          customize="no-focus"
                          value={removeUnwantedChars(fileName)}
                          readOnly={!media}
                          onChange={(e) => {
                            setFiles((prevState) => {
                              return prevState.map((state, index) => {
                                if (index === mediaIndex) {
                                  return {
                                    ...state,
                                    title: removeUnwantedChars(e.target.value),
                                  };
                                }
                                return state;
                              });
                            });
                          }}
                        />

                        {fileType && (
                          <Badge variant="secondary" className="text-slate-400">
                            {fileType}
                          </Badge>
                        )}

                        {fileMime && (
                          <Badge variant="secondary" className="text-slate-400">
                            {fileMime}
                          </Badge>
                        )}
                      </Label>

                      <div className="flex items-center gap-x-2">
                        <Button asChild type="button" size="icon" variant="ghost">
                          <Label htmlFor={`medias.${mediaIndex}.image`} className="size-9 hover:cursor-pointer">
                            <Input
                              id={`medias.${mediaIndex}.image`}
                              form="create-product-form"
                              className="hidden"
                              type="file"
                              accept={ACCEPTED_MEDIA_MIME_TYPES.join(",")}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (Array.from<string>(ACCEPTED_MEDIA_MIME_TYPES).includes(file.type)) {
                                    setFiles((prevState) => {
                                      return prevState.map((state, index) => {
                                        if (index === mediaIndex) {
                                          return {
                                            ...state,
                                            title: file.name,
                                            media: file,
                                          };
                                        }
                                        return state;
                                      });
                                    });
                                  } else {
                                    alert(
                                      `Invalid File ${file.name}! Allowed files: \n${ACCEPTED_MEDIA_TYPES.join(", ")}`,
                                    );
                                  }
                                }
                              }}
                            />
                            <ImageUp className="text-slate-400" />
                          </Label>
                        </Button>

                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            setFiles((prevState) =>
                              prevState
                                .filter((_, index) => index !== mediaIndex)
                                .map((state, index) => ({ ...state, order: index })),
                            )
                          }
                        >
                          <Trash2 className="text-slate-400" />
                        </Button>
                      </div>
                    </li>
                  );
                }}
              />

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-none py-7 shadow-none"
                onClick={() =>
                  setFiles((prevState) => [...prevState, { title: "", order: prevState.length, media: null }])
                }
              >
                <Plus className="text-slate-400" />
              </Button>
            </ul>
          ) : (
            <div
              className={cn(
                "relative flex w-full flex-col items-center justify-center border-[1.5px] border-dashed border-slate-300 bg-slate-50 p-7 text-slate-400",
                {
                  "border-teal-300 bg-teal-50 text-teal-400": isDragActive && isDragAccept,
                  "border-rose-300 bg-rose-50 text-rose-400": isDragActive && isDragReject,
                },
              )}
            >
              <div {...getRootProps()} className="absolute size-full hover:cursor-pointer" onClick={open}>
                <Input
                  {...getInputProps()}
                  form="create-product-form"
                  className="hidden"
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      setFiles(
                        Array.from(files)
                          .filter((file) => {
                            if (new Set<string>(ACCEPTED_MEDIA_MIME_TYPES).has(file.type)) {
                              return true;
                            } else {
                              alert(`Invalid File ${file.name}! Allowed files: \n${ACCEPTED_MEDIA_TYPES.join(", ")}`);
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

              {isDragActive ? (
                isDragAccept ? (
                  <>
                    <HardDriveUpload className="mb-3.5 size-8" strokeWidth={1.5} />
                    Drag files or click to upload
                  </>
                ) : (
                  isDragReject && (
                    <>
                      <ShieldAlert className="mb-3.5 size-8" strokeWidth={1.5} />
                      One or more files not allowed or not supported
                    </>
                  )
                )
              ) : (
                <>
                  <CloudUpload className="mb-3.5 size-8" strokeWidth={1.5} />
                  Drag files or click to upload
                </>
              )}
            </div>
          )}
          <ErrorMessage name="medias" />
        </fieldset>

        <Button
          type="submit"
          disabled={isPending}
          className="col-span-12 mt-8 flex w-full rounded-none"
          form="create-product-form"
          size="lg"
        >
          Save
        </Button>
      </article>
    </>
  );
}
