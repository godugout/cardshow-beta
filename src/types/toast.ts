
import * as React from "react"

export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

export interface ToastProps {
  id?: string;
  variant?: ToastVariant;
  title?: string;
  description?: string;
  action?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
}

export type ToastActionElement = React.ReactElement<{
  altText: string;
  onClick: () => void;
}>;

export interface ToasterToast extends ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
  variant?: ToastVariant;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
}

export interface ToasterToastWithId extends ToasterToast {
  id: string;
  open: boolean;
}

// Create toast function that returns proper ToastProps with required id
export function createToast(props: Omit<ToastProps, 'id'>): ToasterToast {
  const toast: ToasterToast = {
    id: Math.random().toString(36).substring(2, 9),
    ...props
  };
  console.log('Toast:', toast);
  return toast;
}
