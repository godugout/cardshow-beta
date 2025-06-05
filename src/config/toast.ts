
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { cva } from "class-variance-authority";
import { ToastVariant } from "@/types/toast";

export const toastIconConfig: Record<ToastVariant, string> = {
  default: "Info",
  destructive: "AlertCircle", 
  success: "CheckCircle",
  warning: "AlertTriangle",
  info: "Info"
};

export const toastStyles = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-500 bg-green-50 text-green-900 dark:border-green-400 dark:bg-green-950 dark:text-green-50",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:border-yellow-400 dark:bg-yellow-950 dark:text-yellow-50", 
        info: "border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-50"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const ToastIcons = {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X
};
