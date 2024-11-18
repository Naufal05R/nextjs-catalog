"use client";

import React, { useCallback, useState } from "react";
import Mapper from "@/components/server/Mapper";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

import { Image, Video } from "@/components/server/Media";
import { Eye, EyeOff, GripVertical, ImageUp, Plus, Trash2 } from "lucide-react";

import { ACCEPTED_MEDIA_MIME_TYPES, ACCEPTED_MEDIA_TYPES, MediaFormSchema } from "@/schema/media";
import { getFileDetails, getFileMimeTypes, refineBlobStr, removeUnwantedChars } from "@/lib/utils";
import { createProduct } from "@/lib/actions/product.action";
import { ComboboxDropdownCategory } from "./Combobox";
import { Dialog } from "@/components/server/Dialog";
import { Category } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { useFormState } from "react-dom";
import { InputFieldMessage } from "../server/Message";
import { ProductFormSchema } from "@/schema/product";
import { DataKeys } from "@/types/data";
import { RichText } from "./Editor";
import { createNews, updateNews } from "@/lib/actions/news.action";
import { Uploader } from "./Uploader";

interface EditNewsFormProps {
  text: string;
}

export function GuestbookForm() {
  const actionHanlder = async (formData: FormData) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            <Mapper data={Array.from(formData.entries())} render={([key, value]) => `${key}: ${value}\n`} />
          </code>
        </pre>
      ),
    });
  };

  return (
    <article className="mt-8 flex w-full flex-col space-y-4 text-right">
      <form id="guestbook-form" action={actionHanlder} className="hidden" />

      <Label htmlFor="name" form="guestbook-form">
        <Input id="name" name="name" className="rounded-none shadow-none" placeholder="Name" form="guestbook-form" />
      </Label>

      <Label htmlFor="origin" form="guestbook-form">
        <Input
          id="origin"
          name="origin"
          className="rounded-none shadow-none"
          placeholder="Origin"
          form="guestbook-form"
        />
      </Label>

      <Label htmlFor="message" form="guestbook-form">
        <Textarea
          id="message"
          name="message"
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
  const actionHanlder = async (formData: FormData) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            <Mapper data={Array.from(formData.entries())} render={([key, value]) => `${key}: ${value}\n`} />
          </code>
        </pre>
      ),
    });
  };

  return (
    <article className="mt-8 flex w-full flex-col space-y-4 text-right">
      <form id="contact-form" action={actionHanlder} className="hidden" />

      <Label htmlFor="name" form="contact-form">
        <Input id="name" name="name" className="rounded-none shadow-none" placeholder="Name" form="contact-form" />
      </Label>

      <Label htmlFor="email" form="contact-form">
        <Input id="email" name="email" className="rounded-none shadow-none" placeholder="Email" form="contact-form" />
      </Label>

      <Label htmlFor="phone" form="contact-form">
        <Input id="phone" name="phone" className="rounded-none shadow-none" placeholder="Phone" form="contact-form" />
      </Label>

      <Label htmlFor="message" form="contact-form">
        <Textarea
          id="message"
          name="message"
          className="rounded-none shadow-none"
          placeholder="Message"
          form="contact-form"
          cols={30}
          rows={10}
        />
      </Label>

      <Button type="submit" className="ml-auto rounded-none" form="contact-form">
        Send
      </Button>
    </article>
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

  const ErrorMessage = <T extends DataKeys<z.infer<typeof ProductFormSchema>>>({ name }: { name: T }) => {
    return <InputFieldMessage schema={ProductFormSchema} errors={errors} name={name} />;
  };

  return (
    <article className="mt-8 grid w-full grid-cols-12 gap-4">
      <form id="create-product-form" action={actionHandler} className="hidden" />

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
          <Uploader
            inputProps={{
              form: "create-product-form",
              multiple: true,
              onChange: (e) => {
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
              },
            }}
            options={{
              onDrop,
              accept: { [`${ACCEPTED_MEDIA_MIME_TYPES.join(",")}`]: [] },
            }}
          />
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
  );
}

export function CreateNewsForm() {
  const MARKDOWN = "**Hello,** world!" as const;

  const [blobUrls, setBlobUrls] = useState<Array<string>>([]);
  const [markdown, setMarkdown] = useState<string>(MARKDOWN);

  const changeOriginalImgSouce = (): [string] | [string, Array<`image_${string}`>] => {
    const getId = (): `image_${string}` => `image_${crypto.randomUUID()}`;

    function changeSrc(
      content: string,
      ids: Array<ReturnType<typeof getId>> = [],
      index: number = 0,
    ): [string, Array<`image_${string}`>] {
      const id = getId();
      const result = content.replace(refineBlobStr(blobUrls[index]), `${id}`);

      if (++index < blobUrls.length) {
        return changeSrc(result, [...ids, id], index);
      } else {
        return [result, [...ids, id]];
      }
    }

    if (!!blobUrls.length) {
      const [content, ids] = changeSrc(markdown);
      return [content, ids];
    } else {
      return [markdown];
    }
  };

  const actionHanlder = async (formData: FormData) => {
    const [content, ids] = changeOriginalImgSouce();

    formData.append("content", content);

    for (const blobUrl of blobUrls) {
      const blob = await fetch(blobUrl).then((r) => r.blob());
      formData.append("images.file", blob);
    }

    if (ids) {
      for (const id of ids) {
        formData.append("images.id", id);
      }
    }

    await createNews(formData);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            <Mapper data={Array.from(formData.entries())} render={([key, value]) => `${key}: ${value}\n`} />
          </code>
        </pre>
      ),
    });
  };

  return (
    <article className="mt-8 grid w-full grid-cols-12 gap-4">
      <form id="create-news-form" action={actionHanlder} className="hidden" />

      <fieldset className="col-span-12 grid grid-cols-4 gap-x-4">
        <h6 className="col-span-4 mb-1 text-lg font-medium lg:col-span-1">News Title</h6>
        <Label htmlFor="title" className="col-span-4 mb-4 lg:order-1 lg:col-span-1">
          <Input
            id="title"
            name="title"
            form="create-news-form"
            className="rounded-none shadow-none"
            placeholder="Title"
          />
          {/* <ErrorMessage name="title" /> */}
        </Label>

        <h6 className="col-span-4 mb-1 text-lg font-medium lg:col-span-3">News Description</h6>
        <Label htmlFor="description" className="col-span-4 lg:order-2 lg:col-span-3">
          <Input
            id="description"
            name="description"
            form="create-news-form"
            className="rounded-none shadow-none"
            placeholder="Description"
          />
          {/* <ErrorMessage name="description" /> */}
        </Label>
      </fieldset>

      <fieldset className="col-span-12">
        <h6 className="mb-1 text-lg font-medium">News Content</h6>
        <Label htmlFor="content">
          <RichText
            blobUrls={blobUrls}
            setBlobUrls={setBlobUrls}
            markdown={markdown.slice(0, 1048576)}
            onChange={(content) => {
              setMarkdown(content.slice(0, 1048576));
              setBlobUrls([
                ...blobUrls.filter((url) => {
                  if (content.includes(refineBlobStr(url))) {
                    return content.includes(refineBlobStr(url));
                  } else {
                    URL.revokeObjectURL(url);
                  }
                }),
              ]);
            }}
          />
          {/* <ErrorMessage name="description" /> */}
        </Label>
      </fieldset>

      <Button
        type="submit"
        // disabled={isPending}
        className="col-span-12 mt-8 flex w-full rounded-none"
        form="create-news-form"
        size="lg"
      >
        Save
      </Button>
    </article>
  );
}

export function EditNewsForm({ text }: EditNewsFormProps) {
  const [blobUrls, setBlobUrls] = useState<Array<string>>([]);
  const [markdown, setMarkdown] = useState<string>(text);

  const changeOriginalImgSouce = (): [string] | [string, Array<`image_${string}`>] => {
    const getId = (): `image_${string}` => `image_${crypto.randomUUID()}`;

    function changeSrc(
      content: string,
      ids: Array<ReturnType<typeof getId>> = [],
      index: number = 0,
    ): [string, Array<`image_${string}`>] {
      const id = getId();
      const result = content.replace(refineBlobStr(blobUrls[index]), `${id}`);

      if (++index < blobUrls.length) {
        return changeSrc(result, [...ids, id], index);
      } else {
        return [result, [...ids, id]];
      }
    }

    if (!!blobUrls.length) {
      const [content, ids] = changeSrc(markdown);
      return [content, ids];
    } else {
      return [markdown];
    }
  };

  const actionHanlder = async (formData: FormData) => {
    if (markdown === text) {
      updateNews(formData);
    } else {
      const [content, ids] = changeOriginalImgSouce();

      formData.append("content", content);

      for (const blobUrl of blobUrls) {
        const blob = await fetch(blobUrl).then((r) => r.blob());
        formData.append("images.file", blob);
      }

      if (ids) {
        for (const id of ids) {
          formData.append("images.id", id);
        }
      }

      updateNews(formData);
    }

    // await createNews(formData);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            <Mapper data={Array.from(formData.entries())} render={([key, value]) => `${key}: ${value}\n`} />
          </code>
        </pre>
      ),
    });
  };

  return (
    <article className="mt-8 grid w-full grid-cols-12 gap-4">
      <form id="create-news-form" action={actionHanlder} className="hidden" />

      <fieldset className="col-span-12 grid grid-cols-4 gap-x-4">
        <h6 className="col-span-4 mb-1 text-lg font-medium lg:col-span-1">News Title</h6>
        <Label htmlFor="title" className="col-span-4 mb-4 lg:order-1 lg:col-span-1">
          <Input
            id="title"
            name="title"
            form="create-news-form"
            className="rounded-none shadow-none"
            placeholder="Title"
          />
          {/* <ErrorMessage name="title" /> */}
        </Label>

        <h6 className="col-span-4 mb-1 text-lg font-medium lg:col-span-3">News Description</h6>
        <Label htmlFor="description" className="col-span-4 lg:order-2 lg:col-span-3">
          <Input
            id="description"
            name="description"
            form="create-news-form"
            className="rounded-none shadow-none"
            placeholder="Description"
          />
          {/* <ErrorMessage name="description" /> */}
        </Label>
      </fieldset>

      <fieldset className="col-span-12">
        <h6 className="mb-1 text-lg font-medium">News Content</h6>
        <Label htmlFor="content">
          <RichText
            blobUrls={blobUrls}
            setBlobUrls={setBlobUrls}
            markdown={markdown.slice(0, 1048576)}
            onChange={(content) => {
              setMarkdown(content.slice(0, 1048576));
              setBlobUrls([
                ...blobUrls.filter((url) => {
                  if (content.includes(refineBlobStr(url))) {
                    return content.includes(refineBlobStr(url));
                  } else {
                    URL.revokeObjectURL(url);
                  }
                }),
              ]);
            }}
          />
          {/* <ErrorMessage name="description" /> */}
        </Label>
      </fieldset>

      <Button
        type="submit"
        // disabled={isPending}
        className="col-span-12 mt-8 flex w-full rounded-none"
        form="create-news-form"
        size="lg"
      >
        Save
      </Button>
    </article>
  );
}
