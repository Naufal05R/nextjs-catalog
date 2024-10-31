"use client";

import { Form as FormRoot, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";

import { GuestbookFormSchema } from "@/schema/guestbook";
import { ContactFormSchema } from "@/schema/contact";
import { ProductFormSchema } from "@/schema/product";
import { createProduct } from "@/lib/actions/product.action";

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
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
  });

  const onSubmit = async (params: z.infer<typeof ProductFormSchema>) => {
    const data = await createProduct({ params, collection });

    toast({
      title: "Product Created:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <FormRoot {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 grid w-full grid-cols-12 gap-4 text-right">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel htmlFor="title">
                <FormControl>
                  <Input id="title" className="rounded-none shadow-none" placeholder="Product Title" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="state">
                <FormControl>
                  <Input id="state" className="rounded-none shadow-none" placeholder="Product Origin" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="color">
                <FormControl>
                  <Input id="color" className="rounded-none shadow-none" placeholder="Product Color" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="width">
                <FormControl>
                  <Input id="width" className="rounded-none shadow-none" placeholder="Product Width" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="height">
                <FormControl>
                  <Input id="height" className="rounded-none shadow-none" placeholder="Product Height" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="length">
                <FormControl>
                  <Input id="length" className="rounded-none shadow-none" placeholder="Product Length" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="weight">
                <FormControl>
                  <Input id="weight" className="rounded-none shadow-none" placeholder="Product Weight" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="price">
                <FormControl>
                  <Input id="price" className="rounded-none shadow-none" placeholder="Product Price" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="discount">
                <FormControl>
                  <Input id="discount" className="rounded-none shadow-none" placeholder="Product Discount" {...field} />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel htmlFor="description">
                <FormControl>
                  <Textarea
                    id="description"
                    className="rounded-none shadow-none"
                    placeholder="Product Description"
                    rows={10}
                    {...field}
                  />
                </FormControl>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-12 flex w-full rounded-none">
          Save
        </Button>
      </form>
    </FormRoot>
  );
}
