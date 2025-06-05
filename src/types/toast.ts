
export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

