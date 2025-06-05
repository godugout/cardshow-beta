
import * as React from "react"

export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type ToastActionElement = React.ReactElement<any>;

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

// Create toast function
export function createToast(props: ToastProps) {
  // This is a simple implementation - in a real app you'd integrate with your toast system
  console.log('Toast:', props);
}
