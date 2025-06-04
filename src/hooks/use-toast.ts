
import { useState } from "react";
import { Toast, ToasterToast } from "@/types/toast";

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  const toast = (toast: Toast) => {
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, toast.duration || 3000);
  };

  const dismiss = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return {
    toasts,
    toast,
    dismiss
  };
}
