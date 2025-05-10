"use client";

import { toast as sonnerToast, Toaster as Sonner, ExternalToast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

type ToastProps = { message?: string } & ExternalToast;

const toast = {
  ...sonnerToast,
  success: ({ message = "Success", ...props }: ToastProps) =>
    sonnerToast.error(message, {
      ...props,
      position: "top-right",
      classNames: {
        toast: "!bg-green-50 rounded-xl !border-green-100",
        title: "!text-green-900",
        icon: "!text-green-900",
        ...props.classNames,
      },
    }),
  error: ({ message = "Error", ...props }: ToastProps) =>
    sonnerToast.error(message, {
      ...props,
      position: "top-right",
      classNames: {
        toast: "!bg-red-50 rounded-xl !border-red-100",
        title: "!text-red-900",
        icon: "!text-red-900",
        ...props.classNames,
      },
    }),
  info: ({ message = "Info", ...props }: ToastProps) =>
    sonnerToast.error(message, {
      ...props,
      position: "top-right",
      classNames: {
        toast: "!bg-blue-50 rounded-xl !border-blue-100",
        title: "!text-blue-900",
        icon: "!text-blue-900",
        ...props.classNames,
      },
    }),
  warning: ({ message = "Warning", ...props }: ToastProps) =>
    sonnerToast.error(message, {
      ...props,
      position: "top-right",
      classNames: {
        toast: "!bg-yellow-50 rounded-xl !border-yellow-100",
        title: "!text-yellow-900",
        icon: "!text-yellow-900",
        ...props.classNames,
      },
    }),
};

export { Toaster, toast };
