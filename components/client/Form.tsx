"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form as FormRoot, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

import Mapper from "@/components/server/Mapper";
import { Eye, EyeOff, GripVertical, ImageUp, Plus, Trash } from "lucide-react";

import { GuestbookFormSchema } from "@/schema/guestbook";
import { ContactFormSchema } from "@/schema/contact";
import { ProductFormSchema } from "@/schema/product";

import { ACCEPTED_IMAGE_MIME_TYPES, ImageFormSchema } from "@/schema/image";
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

export function CreateProductForm({ collection }: { collection: string }) {
  const [images, setImages] = useState<Required<Array<Partial<ReturnType<typeof ImageFormSchema.safeParse>["data"]>>>>(
    [],
  );

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
    },
  });

  const onSubmit = async (params: z.infer<typeof ProductFormSchema>) => {
    console.log(images);
    // const data = await createProduct({ params, collection });
    // toast({
    //   title: "Product Created:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  };

  return (
    <>
      <FormRoot {...productForm}>
        <form onSubmit={productForm.handleSubmit(onSubmit)} className="mt-8 grid w-full grid-cols-12 gap-4">
          <fieldset className="col-span-12">
            <h6 className="mb-1 text-lg font-medium">Product Title</h6>
            <FormField
              control={productForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">
                    <FormControl>
                      <Input id="title" className="rounded-none shadow-none" placeholder="Title" {...field} />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="col-span-12 grid grid-cols-2 gap-x-4">
            <h6 className="col-span-2 mb-1 text-lg font-medium">Product Detail</h6>
            <FormField
              control={productForm.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="state">
                    <FormControl>
                      <Input id="state" className="rounded-none shadow-none" placeholder="Origin" {...field} />
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
                      <Input id="color" className="rounded-none shadow-none" placeholder="Color" {...field} />
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
                      <Input id="width" className="rounded-none shadow-none" placeholder="Width" {...field} />
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
                      <Input id="height" className="rounded-none shadow-none" placeholder="Height" {...field} />
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
                      <Input id="length" className="rounded-none shadow-none" placeholder="Length" {...field} />
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
                      <Input id="weight" className="rounded-none shadow-none" placeholder="Weight" {...field} />
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
                      <Input id="price" className="rounded-none shadow-none" placeholder="Price" {...field} />
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
                      <Input id="discount" className="rounded-none shadow-none" placeholder="Discount" {...field} />
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
            <ul className="flex flex-col gap-y-2.5">
              {!!images && (
                <Mapper
                  data={images}
                  render={({ image }, imageIndex) => (
                    <li className="flex w-full items-center gap-x-2 border p-2.5">
                      <Button type="button" size="icon" variant="ghost">
                        <GripVertical className="text-slate-400" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className={cn({ "opacity-50": true })}
                        onClick={() => console.log(images.find((_, index) => index === imageIndex))}
                      >
                        {image ? <Eye className="text-slate-400" /> : <EyeOff className="text-slate-400" />}
                      </Button>

                      <Label htmlFor={`images.${imageIndex}.title`} className="flex-1">
                        <Input
                          id={`images.${imageIndex}.title`}
                          className="rounded-none border-none shadow-none focus-visible:ring-0"
                          value={images.find((_, index) => index === imageIndex)?.title ?? ""}
                          onChange={(e) => {
                            setImages((prevState) => {
                              return prevState.map((image, index) => {
                                if (index === imageIndex) {
                                  return {
                                    ...image,
                                    title: e.target.value,
                                  };
                                }
                                return image;
                              });
                            });
                          }}
                        />
                      </Label>

                      <div className="flex items-center gap-x-2">
                        <Button asChild type="button" size="icon" variant="ghost">
                          <Label htmlFor={`images.${imageIndex}.image`} className="size-9 hover:cursor-pointer">
                            <Input
                              id={`images.${imageIndex}.image`}
                              className="hidden"
                              type="file"
                              accept={ACCEPTED_IMAGE_MIME_TYPES.join(",")}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setImages((prevState) => {
                                    return prevState.map((image, index) => {
                                      if (index === imageIndex) {
                                        return {
                                          ...image,
                                          title: file.name,
                                          image: file,
                                        };
                                      }
                                      return image;
                                    });
                                  });
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
                          onClick={() => setImages((prevState) => prevState.filter((_, index) => index !== imageIndex))}
                        >
                          <Trash className="text-slate-400" />
                        </Button>
                      </div>
                    </li>
                  )}
                />
              )}

              <li className="flex w-full items-center gap-x-2 border p-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setImages((prevState) => [...prevState, { order: prevState.length }])}
                  onClickCapture={() => console.log(images)}
                >
                  <Plus className="text-slate-400" />
                </Button>
              </li>
            </ul>
          </fieldset>

          <Button type="submit" className="col-span-12 flex w-full rounded-none">
            Save
          </Button>
        </form>
      </FormRoot>
    </>
  );
}
