"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

type SonnerProps = React.ComponentProps<typeof Toaster>;

export const Sonner = ({ ...props }: SonnerProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Toaster
      theme={theme as SonnerProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-slate-950 dark:group-[.toaster]:text-slate-50 dark:group-[.toaster]:border-slate-800",
          description: "group-[.toast]:text-slate-500 dark:group-[.toast]:text-slate-400",
          actionButton:
            "group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50 dark:group-[.toast]:bg-slate-50 dark:group-[.toast]:text-slate-900",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 dark:group-[.toast]:bg-slate-800 dark:group-[.toast]:text-slate-400",
        },
      }}
      {...props}
    />
  );
};

export const DashboardSonner = ({ ...props }: SonnerProps) => {
  return <Toaster closeButton richColors visibleToasts={5} position="top-center" {...props} />;
};
