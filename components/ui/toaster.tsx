
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport className={cn("fixed bottom-0 right-0 flex flex-col gap-2 p-4")} />
      <Toast>
        <div className="flex items-center justify-between">
          <ToastTitle />
          <ToastClose />
        </div>
        <ToastDescription />
      </Toast>
    </ToastProvider>
  );
}