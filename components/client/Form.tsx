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
