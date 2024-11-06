"use client";

import { z } from "zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";

import { Form as FormRoot, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

import Mapper from "@/components/server/Mapper";
import { Image, Video } from "../server/Media";
import {
  CloudUpload,
  Eye,
  EyeOff,
  GripVertical,
  HardDriveUpload,
  ImageUp,
  Plus,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import { GuestbookFormSchema } from "@/schema/guestbook";
import { ContactFormSchema } from "@/schema/contact";
import { ProductFormSchema } from "@/schema/product";

import { ACCEPTED_MEDIA_MIME_TYPES, ACCEPTED_MEDIA_TYPES, MediaFormSchema } from "@/schema/media";
import { Dialog } from "../server/Dialog";
import { Category } from "@prisma/client";
import { ComboboxDropdownCategory } from "./Combobox";
import { createProduct } from "@/lib/actions/product.action";
import { cn } from "@/lib/utils";

export function GuestbookForm() {
  const form = useForm<z.infer<typeof GuestbookFormSchema>>({
    resolver: zodResolver(GuestbookFormSchema),
    defaultValues: {
      name: "",
      origin: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof GuestbookFormSchema>) {
    console.log(data);

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
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="origin">
                <FormControl>
                  <Input id="origin" className="rounded-none shadow-none" placeholder="Origin" {...field} />
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
    console.log(data);

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
  const [files, setFiles] = useState<
    Required<Array<{ preview: string | ArrayBuffer | null } & z.infer<typeof MediaFormSchema>>>
  >([]);

  const productForm = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      title: "",
      state: "",
      color: "",
      width: 0,
      height: 0,
      length: 0,
      weight: 0,
      price: 0,
      discount: 0,
      description: "",
      categoryId: "",
    },
  });

  const onSubmit = async (params: z.infer<typeof ProductFormSchema>) => {
    const _files = files.map(({ title, preview, order }) => ({ title, preview, order }));

    const data = await createProduct({
      params,
      files: _files,
      collection,
    });
    toast({
      title: "Product Created:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const onDrop = useCallback<(files: Array<File>) => void>((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { [`${ACCEPTED_MEDIA_MIME_TYPES.join(",")}`]: [] },
  });

  return (
    <>
      <FormRoot {...productForm}>
        <form id="create-product-form" onSubmit={productForm.handleSubmit(onSubmit)} />

        <article className="mt-8 grid w-full grid-cols-12 gap-4">
          <fieldset className="col-span-12">
            <h6 className="mb-1 text-lg font-medium">Product Title</h6>
            <FormField
              control={productForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">
                    <FormControl>
                      <Input
                        id="title"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-12 grid grid-cols-3 gap-x-4">
            <h6 className="col-span-3 mb-1 text-lg font-medium">Product Detail</h6>
            <FormField
              control={productForm.control}
              name="categoryId"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <ComboboxDropdownCategory
                      data={categories}
                      field={field}
                      form={{ ...productForm, form: "create-product-form" }}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={productForm.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="state">
                    <FormControl>
                      <Input
                        id="state"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Origin"
                        {...field}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="color">
                    <FormControl>
                      <Input
                        id="color"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Color"
                        {...field}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-12 grid grid-cols-4 gap-x-4">
            <h6 className="-order-2 col-span-3 mb-1 text-lg font-medium">Product Size</h6>
            <FormField
              control={productForm.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="width">
                    <FormControl>
                      <Input
                        {...field}
                        id="width"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Width"
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="height">
                    <FormControl>
                      <Input
                        {...field}
                        id="height"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Height"
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="length">
                    <FormControl>
                      <Input
                        {...field}
                        id="length"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Length"
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h6 className="-order-1 col-span-1 mb-1 text-lg font-medium">Product Weight</h6>
            <FormField
              control={productForm.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="weight">
                    <FormControl>
                      <Input
                        {...field}
                        id="weight"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Weight"
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-12 grid grid-cols-2 gap-x-4">
            <h6 className="col-span-2 mb-1 text-lg font-medium">Product Rate</h6>
            <FormField
              control={productForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">
                    <FormControl>
                      <Input
                        {...field}
                        id="price"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Price"
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={productForm.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="discount">
                    <FormControl>
                      <Input
                        {...field}
                        id="discount"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Discount"
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-12 grid grid-cols-1 gap-x-4">
            <h6 className="-order-2 mb-1 text-lg font-medium">Product Description</h6>
            <FormField
              control={productForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">
                    <FormControl>
                      <Textarea
                        id="description"
                        form="create-product-form"
                        className="rounded-none shadow-none"
                        placeholder="Description"
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-12">
            <h6 className="mb-1 text-lg font-medium">Uploaded Images</h6>
            {!!files.length ? (
              <ul className="flex flex-col gap-y-2.5">
                <>
                  <Mapper
                    data={files}
                    render={({ media }, mediaIndex) => {
                      const currentFile = files.find((_, index) => index === mediaIndex);

                      const reader = new FileReader();
                      reader.addEventListener("load", () => {
                        setFiles((prevState) => {
                          return prevState.map((state, index) => {
                            if (index === mediaIndex) {
                              return {
                                ...state,
                                preview: reader.result,
                              };
                            }
                            return state;
                          });
                        });

                        if (media) {
                          return reader.removeEventListener("load", () => {
                            reader.readAsDataURL(media);
                          });
                        }
                      });

                      return (
                        <li className="flex w-full items-center gap-x-2 border p-2.5">
                          <Button type="button" size="icon" variant="ghost">
                            {/* <GripVertical className="text-slate-400" /> */}
                            {currentFile?.order}
                          </Button>

                          <Dialog
                            header={{
                              title: currentFile?.title ?? "",
                              description: "Click the image to view in fullscreen",
                            }}
                            element={{
                              trigger: (
                                <Button type="button" size="icon" variant="ghost" disabled={!media}>
                                  {media ? <Eye className="text-slate-400" /> : <EyeOff className="text-slate-400" />}
                                </Button>
                              ),
                              body:
                                media && currentFile?.preview && typeof currentFile.preview === "string" ? (
                                  media.type.startsWith("image/") ? (
                                    <Image
                                      src={currentFile.preview}
                                      alt={currentFile?.title ?? ""}
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
                                  ) : media.type.startsWith("video/") ? (
                                    <Video
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
                                  )
                                ) : (
                                  <></>
                                ),
                            }}
                          />

                          <Label htmlFor={`medias.${mediaIndex}.title`} className="flex-1">
                            <Input
                              id={`medias.${mediaIndex}.title`}
                              name="media.title"
                              form="create-product-form"
                              className="rounded-none border-none shadow-none read-only:cursor-default focus-visible:ring-0"
                              value={currentFile?.title ?? ""}
                              readOnly={!media}
                              onChange={(e) => {
                                setFiles((prevState) => {
                                  return prevState.map((state, index) => {
                                    if (index === mediaIndex) {
                                      return {
                                        ...state,
                                        title: e.target.value,
                                      };
                                    }
                                    return state;
                                  });
                                });
                              }}
                            />
                          </Label>

                          <div className="flex items-center gap-x-2">
                            <Button asChild type="button" size="icon" variant="ghost">
                              <Label htmlFor={`medias.${mediaIndex}.image`} className="size-9 hover:cursor-pointer">
                                <Input
                                  id={`medias.${mediaIndex}.image`}
                                  name="media.image"
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
                      setFiles((prevState) => [
                        ...prevState,
                        { title: "", order: prevState.length, media: null, preview: null },
                      ])
                    }
                  >
                    <Plus className="text-slate-400" />
                  </Button>
                </>
              </ul>
            ) : (
              <div
                className={cn(
                  "relative flex w-full flex-col items-center justify-center border-[1.5px] border-dashed border-slate-300 bg-slate-50 p-7 text-slate-400",
                  {
                    "border-teal-300 bg-teal-50 text-teal-400": isDragAccept,
                    "border-rose-300 bg-rose-50 text-rose-400": isDragReject,
                  },
                )}
              >
                <Label {...getRootProps()} htmlFor="files-uploader" className="absolute size-full hover:cursor-pointer">
                  <Input
                    {...getInputProps()}
                    id="files-uploader"
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
                                preview: URL.createObjectURL(file),
                              };
                            }),
                        );
                      }
                    }}
                  />
                </Label>

                {isDragActive ? (
                  isDragAccept ? (
                    <>
                      <HardDriveUpload className="mb-3.5 size-8" strokeWidth={1.5} />
                      Drag files or click to upload
                    </>
                  ) : (
                    isDragReject && (
                      <>
                        <TriangleAlert className="mb-3.5 size-8" strokeWidth={1.5} />
                        Files not allowed or not supported
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
          </fieldset>

          <Button
            type="submit"
            className="col-span-12 mt-8 flex w-full rounded-none"
            form="create-product-form"
            size="lg"
          >
            Save
          </Button>
        </article>
      </FormRoot>
    </>
  );
}
