import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "flex items-center justify-between p-4 border rounded-md shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        destructive: "bg-red-500 text-white border-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Toast.displayName = "Toast";

const ToastActionElement = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("ml-2 text-sm font-medium text-primary hover:underline", className)}
        {...props}
      />
    );
  }
);
ToastActionElement.displayName = "ToastActionElement";

export { Toast, toastVariants, ToastActionElement };