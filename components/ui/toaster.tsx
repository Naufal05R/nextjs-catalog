"use client";

import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import Mapper from "../server/Mapper";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <Mapper
        data={toasts}
        render={({ id, title, description, action, ...props }) => (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )}
      />
      <ToastViewport />
    </ToastProvider>
  );
}
