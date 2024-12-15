"use client";

import React, { useActionState, useCallback, useEffect, useState } from "react";
import Mapper from "@/components/server/Mapper";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { ClerkAPIError } from "@clerk/types";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

import { Image, Video } from "@/components/server/Media";
import { Eye, EyeOff, /* GripVertical, */ ImageUp, Plus, Trash2, X } from "lucide-react";
// TODO: Should Implement draggable images feature

import {
  ACCEPTED_IMAGE_EXTS,
  ACCEPTED_IMAGE_MIME_EXTS,
  ACCEPTED_MEDIA_MIME_TYPES,
  ACCEPTED_MEDIA_TYPES,
  MediaFormSchema,
} from "@/schema/media";
import {
  cn,
  getFileDetails,
  getFileMimeTypes,
  handlingError,
  initRawData,
  refineBlobStr,
  removeUnallowedChars,
  removeUnwantedChars,
} from "@/lib/utils";
import { createProduct, getProductMedia, updateProduct } from "@/lib/actions/product.action";
import { ComboboxDropdownCategory } from "./Combobox";
import { Dialog } from "@/components/server/Dialog";
import { Category, Media, Prisma, Product, Tag } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { InputFieldMessage } from "../server/Message";
import { ProductFormSchema } from "@/schema/product";
import { DataKeys } from "@/types/data";
import { RichText } from "./Editor";
import { createNews, getNewsThumbnail, updateNews } from "@/lib/actions/news.action";
import { Uploader } from "./Uploader";
import { useSidebar } from "../ui/sidebar";
import { NewsFormSchema } from "@/schema/news";
import { extensionError } from "@/lib/utils/error";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContactMessage } from "@/lib/actions/contact.action";
import { ContactFormSchema } from "@/schema/contact";

interface CreateProductFormProps {
  collection: string;
  categories: Array<Category>;
}

interface EditProductFormProps extends CreateProductFormProps {
  product: Product & {
    gallery: {
      medias: Media[];
    } | null;
  } & {
    tags: Array<Tag>;
  };
}

interface EditNewsFormProps {
  news: Prisma.NewsGetPayload<{
    include: { thumbnail: true };
  }>;
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
  const [state, formAction, isPending] = useActionState(createContactMessage, undefined);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  const actionHanlder = async (formData: FormData) => {
    const { success, error } = ContactFormSchema.safeParse(initRawData(formData));
    if (success) {
      formAction(formData);
    } else {
      setErrors(error.errors);
    }
  };

  useEffect(() => {
    const matcher = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    if (typeof state === "string" && matcher.test(state)) {
      toast({ description: "Successfully sending message!" });
    }
  }, [state]);

  const ErrorMessage = <T extends DataKeys<z.infer<typeof ContactFormSchema>>>({ name }: { name: T }) => {
    return <InputFieldMessage schema={ContactFormSchema} errors={errors} name={name} />;
  };

  return (
    <fieldset className="mt-8 flex w-full flex-col space-y-4" disabled={isPending}>
      <form id="contact-form" action={actionHanlder} className="hidden" />

      <Label htmlFor="name" form="contact-form">
        <Input id="name" name="name" className="rounded-none shadow-none" placeholder="Name" form="contact-form" />
        <ErrorMessage name="name" />
      </Label>

      <Label htmlFor="email" form="contact-form">
        <Input id="email" name="email" className="rounded-none shadow-none" placeholder="Email" form="contact-form" />
        <ErrorMessage name="email" />
      </Label>

      <Label htmlFor="phone" form="contact-form">
        <Input id="phone" name="phone" className="rounded-none shadow-none" placeholder="Phone" form="contact-form" />
        <ErrorMessage name="phone" />
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
        <ErrorMessage name="message" />
      </Label>

      <Button type="submit" className="ml-auto rounded-none" form="contact-form">
        Send
      </Button>
    </fieldset>
  );
}

export function SignInForm() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [errors, setErrors] = React.useState<ClerkAPIError[]>();
  const [credential, setCredential] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors(() => undefined);

    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: credential.username,
        password: credential.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/dashboard");
      } else {
        window.alert(signInAttempt);
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      } else {
        handlingError(error);
      }
    }
  };

  return (
    <fieldset className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-inherit p-4 shadow-lg" disabled={!isLoaded}>
      <form id="sign-in-form" onSubmit={handleSubmit} />
      <h2 className="mb-8 text-xl uppercase">Legenda Permata</h2>
      <Label className="flex flex-col gap-2">
        Username
        <Input
          form="sign-in-form"
          value={credential.username}
          onChange={(e) => setCredential({ ...credential, username: e.target.value })}
        />
      </Label>
      <Label className="flex flex-col gap-2">
        Password
        <Input
          form="sign-in-form"
          type="password"
          value={credential.password}
          onChange={(e) => setCredential({ ...credential, password: e.target.value })}
        />
      </Label>
      <Button form="sign-in-form" className="mt-8 w-full">
        Sign In
      </Button>

      {errors && <p className="text-xs text-rose-500">Authorization process failed!</p>}
    </fieldset>
  );
}

export function CreateProductForm({ collection, categories }: CreateProductFormProps) {
  const [{ errors, isLoading }, setStatus] = useState<{ errors?: z.ZodIssue[]; isLoading?: boolean }>({});
  const [files, setFiles] = useState<Required<Array<z.infer<typeof MediaFormSchema>>>>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const { push } = useRouter();
  const { open } = useSidebar();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus((prevState) => ({ ...prevState, isLoading: true }));
    const formData = new FormData(event.currentTarget);

    files
      .filter(({ media }) => !!media && new Set<string>(ACCEPTED_MEDIA_MIME_TYPES).has(media.type))
      .sort((a, b) => a.order - b.order)
      .forEach(({ title, media }) => {
        if (media) {
          formData.append("media.title", getFileDetails(title).fileName);
          formData.append("media.image", media);
        }
      });

    const { success, error } = ProductFormSchema.omit({ id: true }).safeParse(initRawData(formData));

    if (success) {
      const result = await createProduct({ formData, collection });
      if (typeof result === "string")
        toast({
          title: "Failed to create product!",
          description: result,
          variant: "destructive",
        });
      if (typeof result === "object" && !Array.isArray(result)) push(`/dashboard/products/${collection}`);
    } else {
      setStatus(() => ({ errors: error.errors }));
    }

    setStatus((prevState) => ({ ...prevState, isLoading: false }));
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
    <fieldset className="mt-8 grid w-full grid-cols-12 gap-4" disabled={isLoading}>
      <form id="create-product-form" onSubmit={submitHandler} className="hidden" />

      <article className="col-span-12">
        <h6 className="mb-1 line-clamp-1 text-lg font-medium">Product Title</h6>
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
      </article>

      <article className="col-span-12 grid grid-cols-6 gap-4">
        <h6 className="col-span-6 -mb-3 line-clamp-1 text-lg font-medium">Product Detail</h6>
        <Label
          htmlFor="categoryId"
          className={cn("col-span-6 flex flex-col lg:col-span-2", { "md:col-span-2": !open })}
        >
          <ComboboxDropdownCategory data={categories} form="create-product-form" />
          <ErrorMessage name="categoryId" />
        </Label>

        <Label htmlFor="state" className={cn("col-span-6 xs:col-span-3 lg:col-span-2", { "md:col-span-2": !open })}>
          <Input
            id="state"
            name="state"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Origin"
          />
          <ErrorMessage name="state" />
        </Label>

        <Label htmlFor="color" className={cn("col-span-6 xs:col-span-3 lg:col-span-2", { "md:col-span-2": !open })}>
          <Input
            id="color"
            name="color"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Color"
          />
          <ErrorMessage name="color" />
        </Label>
      </article>

      <article
        className={cn("col-span-12 grid grid-cols-3 gap-4 sm:col-span-9", { "md:col-span-6 lg:col-span-9": open })}
      >
        <h6 className="col-span-3 -mb-3 line-clamp-1 text-lg font-medium">Product Size</h6>
        <Label htmlFor="width" className={cn("col-span-3 xs:col-span-1", { "md:col-span-3 lg:col-span-1": open })}>
          <Input
            id="width"
            name="width"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Width"
          />
          <ErrorMessage name="width" />
        </Label>

        <Label htmlFor="height" className={cn("col-span-3 xs:col-span-1", { "md:col-span-3 lg:col-span-1": open })}>
          <Input
            id="height"
            name="height"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Height"
          />
          <ErrorMessage name="height" />
        </Label>

        <Label htmlFor="length" className={cn("col-span-3 xs:col-span-1", { "md:col-span-3 lg:col-span-1": open })}>
          <Input
            id="length"
            name="length"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Length"
          />
          <ErrorMessage name="length" />
        </Label>
      </article>

      <article className={cn("col-span-12 flex flex-col sm:col-span-3", { "md:col-span-6 lg:col-span-3": open })}>
        <h6 className="mb-1 line-clamp-1 h-fit text-lg font-medium">Product Weight</h6>
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
      </article>

      <article className="col-span-12 grid grid-cols-2 gap-4">
        <h6 className="col-span-2 -mb-3 line-clamp-1 text-lg font-medium">Product Rate</h6>
        <Label htmlFor="price" className="col-span-2 xs:col-span-1">
          <Input
            id="price"
            name="price"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Price"
          />
          <ErrorMessage name="price" />
        </Label>

        <Label htmlFor="discount" className="col-span-2 xs:col-span-1">
          <Input
            id="discount"
            name="discount"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Discount"
          />
          <ErrorMessage name="discount" />
        </Label>
      </article>

      <article className="col-span-12 grid grid-cols-1 gap-x-4">
        <h6 className="-order-2 mb-1 text-lg font-medium">Product Tags</h6>
        <Label htmlFor="tags">
          <Input
            id="tags"
            className="rounded-none shadow-none"
            placeholder="Tags"
            value={selectedTag}
            onChange={(e) => {
              const { value } = e.target;
              const allowedValue = removeUnallowedChars(value);

              if (allowedValue.endsWith(",")) {
                setSelectedTag("");
                setTags(Array.from(new Set([...tags, allowedValue.slice(0, -1)])));
              } else {
                setSelectedTag(allowedValue);
              }
            }}
          />
          <Input hidden type="hidden" className="hidden" name="tags" form="create-product-form" readOnly value={tags} />
          <ul className="flex flex-wrap gap-2 py-2">
            <Mapper
              data={tags}
              render={(tag) => (
                // TODO: Should removing key props after issue fixed by nextjs or react
                <Badge key={tag} variant="secondary" className="flex items-center gap-2">
                  {tag}
                  <Button
                    variant={null}
                    customize="icon"
                    className="size-3.5 p-0"
                    onClick={() => setTags((prevState) => prevState.filter((prev) => prev !== tag))}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              )}
            />
          </ul>
          <ErrorMessage name="tags" />
        </Label>
      </article>

      <article className="col-span-12 grid grid-cols-1 gap-x-4">
        <h6 className="-order-2 mb-1 line-clamp-1 text-lg font-medium">Product Description</h6>
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
      </article>

      <article className="col-span-12">
        <h6 className="mb-1 line-clamp-1 text-lg font-medium">Uploaded Images</h6>
        {!!files.length ? (
          <ul className="flex flex-col gap-y-2.5">
            <Mapper
              data={files}
              render={({ title, media }, mediaIndex) => {
                const { fileType, fileMime } = getFileMimeTypes(media?.type ?? "");
                const { fileName } = getFileDetails(title, true);

                return (
                  // TODO: Should removing key props after issue fixed by nextjs or react
                  <li key={mediaIndex} className="flex w-full items-center gap-x-2 border p-2.5">
                    {/* <Button type="button" size="icon" variant="ghost">
                      <GripVertical className="text-slate-400" />
                    </Button> */}

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
                        <Badge variant="secondary" className="text-slate-400 max-xs:hidden">
                          {fileType}
                        </Badge>
                      )}

                      {fileMime && (
                        <Badge variant="secondary" className="text-slate-400 max-xs:hidden">
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
                                  toast({
                                    title: `Invalid File ${file.name}!`,
                                    description: (
                                      <p>
                                        Allowed files: <strong>{ACCEPTED_MEDIA_TYPES.join(", ")}</strong>
                                      </p>
                                    ),
                                    variant: "destructive",
                                  });
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
                          toast({
                            title: `Invalid File ${file.name}!`,
                            description: (
                              <p>
                                Allowed files: <strong>{ACCEPTED_MEDIA_TYPES.join(", ")}</strong>
                              </p>
                            ),
                            variant: "destructive",
                          });
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
      </article>

      <Button type="submit" className="col-span-12 mt-8 flex w-full rounded-none" form="create-product-form" size="lg">
        Save
      </Button>
    </fieldset>
  );
}

export function CreateNewsForm() {
  const [{ errors, isLoading }, setStatus] = useState<{ errors?: z.ZodIssue[]; isLoading?: boolean }>({});
  const [file, setFile] = useState<File>();

  const MARKDOWN = "**Your article's** here!" as const;

  const [blobUrls, setBlobUrls] = useState<Array<string>>([]);
  const [markdown, setMarkdown] = useState<string>(MARKDOWN);

  const { push } = useRouter();

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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus((prevState) => ({ ...prevState, isLoading: true }));
    const formData = new FormData(event.currentTarget);

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

    const { error, success } = NewsFormSchema.omit({ id: true }).safeParse(initRawData(formData));

    if (success) {
      const result = await createNews(formData);
      if (typeof result === "string")
        toast({
          title: "Failed to create news!",
          description: result,
          variant: "destructive",
        });
      if (typeof result === "object" && !Array.isArray(result)) push(`/dashboard/news/detail/${result.slug}`);
    } else {
      setStatus({ errors: error.errors });
    }

    setStatus((prevState) => ({ ...prevState, isLoading: false }));
  };

  const onDrop = useCallback<(files: Array<File>) => void>((acceptedFiles) => {
    if (!!acceptedFiles.length) {
      setFile(
        Array.from(acceptedFiles).filter((acceptedFile) =>
          new Set<string>(ACCEPTED_IMAGE_MIME_EXTS).has(acceptedFile.type),
        )[0],
      );
    }
  }, []);

  const ErrorMessage = <T extends DataKeys<z.infer<typeof NewsFormSchema>>>({ name }: { name: T }) => (
    <InputFieldMessage schema={NewsFormSchema} errors={errors} name={name} />
  );

  return (
    <fieldset className="mt-8 grid w-full grid-cols-12 gap-4" disabled={isLoading}>
      <form id="create-news-form" onSubmit={submitHandler} className="hidden" />

      <article className="col-span-12 grid grid-cols-4 gap-x-4">
        <h6 className="col-span-4 mb-1 text-lg font-medium lg:col-span-1">News Title</h6>
        <Label htmlFor="title" className="col-span-4 mb-4 lg:order-1 lg:col-span-1">
          <Input
            id="title"
            name="title"
            form="create-news-form"
            className="rounded-none shadow-none"
            placeholder="Title"
          />
          <ErrorMessage name="title" />
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
          <ErrorMessage name="description" />
        </Label>
      </article>

      <article className="col-span-12 grid grid-cols-1 gap-x-4">
        <h6 className="mb-1 text-lg font-medium lg:col-span-1">News Thumbnail</h6>
        <Label htmlFor="thumbnail" className="relative mb-4 lg:order-1 lg:col-span-1">
          <Uploader
            hidden={!!file}
            inputProps={{
              name: "thumbnail",
              form: "create-news-form",
              multiple: true,
              onChange: (e) => {
                const files = e.target.files;
                if (files && !!files.length) {
                  const [image] = files;
                  if (new Set<string>(ACCEPTED_IMAGE_MIME_EXTS).has(image.type)) {
                    setFile(image);
                  } else {
                    toast({
                      title: `Invalid File ${image.name}!`,
                      description: (
                        <p>
                          Allowed files: <strong>{ACCEPTED_IMAGE_EXTS.join(", ")}</strong>
                        </p>
                      ),
                      variant: "destructive",
                    });
                  }
                }
              },
            }}
            options={{
              onDrop,
              accept: { [`${ACCEPTED_IMAGE_MIME_EXTS.join(",")}`]: [] },
            }}
          />

          {file && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 z-30"
                onClick={() => setFile(undefined)}
              >
                <X className="text-slate-400" />
              </Button>
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                classNames={{
                  fallback: {
                    wrapper: "bg-white border rounded border-slate-200",
                  },
                  figure: "w-full aspect-video h-40 rounded hover:cursor-pointer",
                  image: "object-contain p-px",
                }}
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                  (e.target as HTMLElement).requestFullscreen()
                }
              />
            </>
          )}
          <ErrorMessage name="thumbnail" />
        </Label>
      </article>

      <article className="col-span-12">
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
          <ErrorMessage name="content" />
          <ErrorMessage name="images.file" />
          <ErrorMessage name="images.id" />
        </Label>
      </article>

      <Button type="submit" className="col-span-12 mt-8 flex w-full rounded-none" form="create-news-form" size="lg">
        Save
      </Button>
    </fieldset>
  );
}

export function EditProductForm({ product, collection, categories }: EditProductFormProps) {
  const [{ errors, isPending }, setStatus] = useState<{ errors?: z.ZodIssue[]; isPending?: boolean }>({});
  const [files, setFiles] = useState<Required<Array<z.infer<typeof MediaFormSchema>>>>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState(product.tags.map(({ title }) => title));
  const { push } = useRouter();
  const { open } = useSidebar();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus((prevState) => ({ ...prevState, isPending: true }));
    const formData = new FormData(event.currentTarget);

    formData.append("id", product.id);

    files
      .filter(({ media }) => !!media && new Set<string>(ACCEPTED_MEDIA_MIME_TYPES).has(media.type))
      .sort((a, b) => a.order - b.order)
      .forEach(({ title, media }) => {
        if (media) {
          formData.append("media.title", getFileDetails(title).fileName);
          formData.append("media.image", media);
        }
      });

    const { success, error } = ProductFormSchema.omit({ id: true }).safeParse(initRawData(formData));

    if (success) {
      const result = await updateProduct({ formData, collection });
      if (typeof result === "string")
        toast({
          title: "Failed to update product!",
          description: result,
          variant: "destructive",
        });
      if (typeof result === "object" && !Array.isArray(result)) push(`/dashboard/products/${collection}`);
    } else {
      setStatus(() => ({ errors: error.errors }));
    }

    setStatus((prevState) => ({ ...prevState, isPending: false }));
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

  useEffect(() => {
    (async () => {
      const defaultFiles = await Promise.all(
        product.gallery!.medias.map(async ({ title, name, order }) => {
          const blob = await getProductMedia({ slug: product.slug, name });
          if (!blob) throw new Error("Media not found!");
          const media = new File([blob], name, { type: blob.type });
          return { title, name, order, media };
        }),
      );

      setFiles(defaultFiles);
    })();
  }, [product.gallery, product.slug]);

  return (
    <fieldset className="mt-8 grid w-full grid-cols-12 gap-4" disabled={isPending}>
      <form id="create-product-form" onSubmit={submitHandler} className="hidden" />

      <article className="col-span-12">
        <h6 className="mb-1 text-lg font-medium">Product Title</h6>
        <Label htmlFor="title">
          <Input
            id="title"
            name="title"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Title"
            defaultValue={product.title}
          />
          <ErrorMessage name="title" />
        </Label>
      </article>

      <article className="col-span-12 grid grid-cols-6 gap-4">
        <h6 className="col-span-6 -mb-3 line-clamp-1 text-lg font-medium">Product Detail</h6>
        <Label
          htmlFor="categoryId"
          className={cn("col-span-6 flex flex-col lg:col-span-2", { "md:col-span-2": !open })}
        >
          <ComboboxDropdownCategory data={categories} form="create-product-form" defaultSelected={product.categoryId} />
          <ErrorMessage name="categoryId" />
        </Label>

        <Label htmlFor="state" className={cn("col-span-6 xs:col-span-3 lg:col-span-2", { "md:col-span-2": !open })}>
          <Input
            id="state"
            name="state"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Origin"
            defaultValue={product.state}
          />
          <ErrorMessage name="state" />
        </Label>

        <Label htmlFor="color" className={cn("col-span-6 xs:col-span-3 lg:col-span-2", { "md:col-span-2": !open })}>
          <Input
            id="color"
            name="color"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Color"
            defaultValue={product.color}
          />
          <ErrorMessage name="color" />
        </Label>
      </article>

      <article
        className={cn("col-span-12 grid grid-cols-3 gap-4 sm:col-span-9", { "md:col-span-6 lg:col-span-9": open })}
      >
        <h6 className="col-span-3 -mb-3 line-clamp-1 text-lg font-medium">Product Size</h6>
        <Label htmlFor="width" className={cn("col-span-3 xs:col-span-1", { "md:col-span-3 lg:col-span-1": open })}>
          <Input
            id="width"
            name="width"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Width"
            defaultValue={product.width}
          />
          <ErrorMessage name="width" />
        </Label>

        <Label htmlFor="height" className={cn("col-span-3 xs:col-span-1", { "md:col-span-3 lg:col-span-1": open })}>
          <Input
            id="height"
            name="height"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Height"
            defaultValue={product.height}
          />
          <ErrorMessage name="height" />
        </Label>

        <Label htmlFor="length" className={cn("col-span-3 xs:col-span-1", { "md:col-span-3 lg:col-span-1": open })}>
          <Input
            id="length"
            name="length"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Length"
            defaultValue={product.length}
          />
          <ErrorMessage name="length" />
        </Label>
      </article>

      <article className={cn("col-span-12 flex flex-col sm:col-span-3", { "md:col-span-6 lg:col-span-3": open })}>
        <h6 className="mb-1 line-clamp-1 h-fit text-lg font-medium">Product Weight</h6>
        <Label htmlFor="weight">
          <Input
            id="weight"
            name="weight"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Weight"
            defaultValue={product.weight}
          />
          <ErrorMessage name="weight" />
        </Label>
      </article>

      <article className="col-span-12 grid grid-cols-2 gap-4">
        <h6 className="col-span-2 -mb-3 line-clamp-1 text-lg font-medium">Product Rate</h6>
        <Label htmlFor="price" className="col-span-2 xs:col-span-1">
          <Input
            id="price"
            name="price"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Price"
            defaultValue={product.price}
          />
          <ErrorMessage name="price" />
        </Label>

        <Label htmlFor="discount" className="col-span-2 xs:col-span-1">
          <Input
            id="discount"
            name="discount"
            form="create-product-form"
            className="rounded-none shadow-none"
            placeholder="Discount"
            defaultValue={product.discount ?? 0}
          />
          <ErrorMessage name="discount" />
        </Label>
      </article>

      <article className="col-span-12 grid grid-cols-1 gap-x-4">
        <h6 className="-order-2 mb-1 text-lg font-medium">Product Tags</h6>
        <Label htmlFor="tags">
          <Input
            id="tags"
            className="rounded-none shadow-none"
            placeholder="Tags"
            value={selectedTag}
            onChange={(e) => {
              const { value } = e.target;
              const allowedValue = removeUnallowedChars(value);

              if (allowedValue.endsWith(",")) {
                setSelectedTag("");
                setTags(Array.from(new Set([...tags, allowedValue.slice(0, -1)])));
              } else {
                setSelectedTag(allowedValue);
              }
            }}
          />
          <Input hidden type="hidden" className="hidden" name="tags" form="create-product-form" readOnly value={tags} />
          <ul className="flex flex-wrap gap-2 py-2">
            <Mapper
              data={tags}
              render={(tag) => (
                // TODO: Should removing key props after issue fixed by nextjs or react
                <Badge key={tag} variant="secondary" className="flex items-center gap-2">
                  {tag}
                  <Button
                    variant={null}
                    customize="icon"
                    className="size-3.5 p-0"
                    onClick={() => setTags((prevState) => prevState.filter((prev) => prev !== tag))}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              )}
            />
          </ul>
          <ErrorMessage name="tags" />
        </Label>
      </article>

      <article className="col-span-12 grid grid-cols-1 gap-x-4">
        <h6 className="-order-2 mb-1 text-lg font-medium">Product Description</h6>
        <Label htmlFor="description">
          <Textarea
            id="description"
            form="create-product-form"
            name="description"
            className="rounded-none shadow-none"
            placeholder="Description"
            rows={10}
            defaultValue={product.description}
          />
          <ErrorMessage name="description" />
        </Label>
      </article>

      <article className="col-span-12">
        <h6 className="mb-1 text-lg font-medium">Uploaded Images</h6>
        {!!files.length ? (
          <ul className="flex flex-col gap-y-2.5">
            <Mapper
              data={files}
              render={({ title, media }, mediaIndex) => {
                const { fileType, fileMime } = getFileMimeTypes(media?.type ?? "");
                const { fileName } = getFileDetails(title, true);

                return (
                  // TODO: Should removing key props after issue fixed by nextjs or react
                  <li key={mediaIndex} className="flex w-full items-center gap-x-2 border p-2.5">
                    {/* <Button type="button" size="icon" variant="ghost">
                      <GripVertical className="text-slate-400" />
                    </Button> */}

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
                        <Badge variant="secondary" className="text-slate-400 max-xs:hidden">
                          {fileType}
                        </Badge>
                      )}

                      {fileMime && (
                        <Badge variant="secondary" className="text-slate-400 max-xs:hidden">
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
                                  toast({
                                    title: `Invalid File ${file.name}!`,
                                    description: (
                                      <p>
                                        Allowed files: <strong>{ACCEPTED_MEDIA_TYPES.join(", ")}</strong>
                                      </p>
                                    ),
                                    variant: "destructive",
                                  });
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
                          toast({
                            title: `Invalid File ${file.name}!`,
                            description: (
                              <p>
                                Allowed files: <strong>{ACCEPTED_MEDIA_TYPES.join(", ")}</strong>
                              </p>
                            ),
                            variant: "destructive",
                          });
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
      </article>

      <Button type="submit" className="col-span-12 mt-8 flex w-full rounded-none" form="create-product-form" size="lg">
        Save
      </Button>
    </fieldset>
  );
}

export function EditNewsForm({ news, text }: EditNewsFormProps) {
  const [{ errors, isPending }, setStatus] = useState<{ errors?: z.ZodIssue[]; isPending?: boolean }>({});
  const [file, setFile] = useState<File>();

  const [blobUrls, setBlobUrls] = useState<Array<string>>([]);
  const [markdown, setMarkdown] = useState<string>(text);

  const { push } = useRouter();

  const { data: exts } = z.enum(ACCEPTED_IMAGE_EXTS).safeParse(news?.thumbnail?.exts);

  if (!exts) throw new Error(extensionError(ACCEPTED_IMAGE_EXTS, news?.thumbnail?.exts));

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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus((prevState) => ({ ...prevState, isPending: true }));
    const formData = new FormData(event.currentTarget);

    if (file) formData.append("thumbnail", file);

    formData.append("id", news.id);

    if (markdown === text) {
      formData.append("content", text);
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
    }

    const { error, success } = NewsFormSchema.omit({ id: true }).safeParse(initRawData(formData));

    if (success) {
      const result = await updateNews(formData);
      if (typeof result === "string")
        toast({
          title: "Failed to create news!",
          description: result,
          variant: "destructive",
        });
      if (typeof result === "object" && !Array.isArray(result)) push(`/dashboard/news/detail/${result.slug}`);
    } else {
      setStatus({ errors: error.errors });
    }

    setStatus((prevState) => ({ ...prevState, isPending: false }));
  };

  const onDrop = useCallback<(files: Array<File>) => void>((acceptedFiles) => {
    if (!!acceptedFiles.length) {
      setFile(
        Array.from(acceptedFiles).filter((acceptedFile) =>
          new Set<string>(ACCEPTED_IMAGE_MIME_EXTS).has(acceptedFile.type),
        )[0],
      );
    }
  }, []);

  useEffect(() => {
    (async () => {
      const thumbnail = await getNewsThumbnail({ news: news.slug, exts });
      if (thumbnail) setFile(new File([thumbnail], "thumbnail", { type: thumbnail.type }));
    })();
  }, [news.slug, exts]);

  const ErrorMessage = <T extends DataKeys<z.infer<typeof NewsFormSchema>>>({ name }: { name: T }) => {
    return <InputFieldMessage schema={NewsFormSchema} errors={errors} name={name} />;
  };

  return (
    <fieldset className="mt-8 grid w-full grid-cols-12 gap-4" disabled={isPending}>
      <form id="edit-news-form" onSubmit={submitHandler} className="hidden" />

      <article className="col-span-12 grid grid-cols-4 gap-x-4">
        <h6 className="col-span-4 mb-1 text-lg font-medium lg:col-span-1">News Title</h6>
        <Label htmlFor="title" className="col-span-4 mb-4 lg:order-1 lg:col-span-1">
          <Input
            id="title"
            name="title"
            form="edit-news-form"
            className="rounded-none shadow-none"
            placeholder="Title"
            defaultValue={news.title}
          />
          <ErrorMessage name="title" />
        </Label>

        <h6 className="col-span-4 mb-1 text-lg font-medium lg:col-span-3">News Description</h6>
        <Label htmlFor="description" className="col-span-4 lg:order-2 lg:col-span-3">
          <Input
            id="description"
            name="description"
            form="edit-news-form"
            className="rounded-none shadow-none"
            placeholder="Description"
            defaultValue={news.description}
          />
          <ErrorMessage name="description" />
        </Label>
      </article>

      <article className="col-span-12 grid grid-cols-1 gap-x-4">
        <h6 className="mb-1 text-lg font-medium lg:col-span-1">News Thumbnail</h6>
        <Label htmlFor="thumbnail" className="relative mb-4 lg:order-1 lg:col-span-1">
          <Uploader
            hidden={!!file}
            inputProps={{
              name: "thumbnail",
              form: "create-news-form",
              onChange: (e) => {
                const files = e.target.files;
                if (files && !!files.length) {
                  const [image] = files;
                  if (new Set<string>(ACCEPTED_IMAGE_MIME_EXTS).has(image.type)) {
                    setFile(image);
                  } else {
                    toast({
                      title: `Invalid File ${image.name}!`,
                      description: (
                        <p>
                          Allowed files: <strong>{ACCEPTED_IMAGE_EXTS.join(", ")}</strong>
                        </p>
                      ),
                      variant: "destructive",
                    });
                  }
                }
              },
            }}
            options={{
              onDrop,
              accept: { [`${ACCEPTED_IMAGE_MIME_EXTS.join(",")}`]: [] },
            }}
          />

          {file && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 z-30"
                onClick={() => setFile(undefined)}
              >
                <X className="text-slate-400" />
              </Button>
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                classNames={{
                  fallback: {
                    wrapper: "bg-white border rounded border-slate-200",
                  },
                  figure: "w-full aspect-video h-40 rounded hover:cursor-pointer",
                  image: "object-contain p-px",
                }}
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                  (e.target as HTMLElement).requestFullscreen()
                }
              />
            </>
          )}
          <ErrorMessage name="thumbnail" />
        </Label>
      </article>

      <article className="col-span-12">
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
          <ErrorMessage name="content" />
          <ErrorMessage name="images.file" />
          <ErrorMessage name="images.id" />
        </Label>
      </article>

      <Button type="submit" className="col-span-12 mt-8 flex w-full rounded-none" form="edit-news-form" size="lg">
        Save
      </Button>
    </fieldset>
  );
}
