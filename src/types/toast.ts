
export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info" | "error";

export interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: ToastVariant;
}
