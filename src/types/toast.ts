
import { ReactNode } from "react";

export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info" | "error";

export interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToasterToastWithId extends ToasterToast {
  id: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type ToastActionElement = React.ReactElement<{
  altText: string;
  onClick: () => void;
}>;

// Toast creation function
export interface CreateToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastActionElement;
}

export function createToast(options: CreateToastOptions): ToasterToast {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: options.title,
    description: options.description,
    variant: options.variant || 'default',
    duration: options.duration,
    action: options.action,
  };
}
