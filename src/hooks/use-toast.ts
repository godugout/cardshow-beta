
import { useState } from "react";
import { Toast, ToasterToast, createToast } from "@/types/toast";

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  const toast = (toastData: Toast) => {
    const toastWithId = createToast({
      title: toastData.title as string,
      description: toastData.description as string,
      variant: toastData.variant,
      duration: toastData.duration,
      id: toastData.id
    });
    
    setToasts(prev => [...prev, toastWithId]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastWithId.id));
    }, toastWithId.duration || 3000);
    
    return toastWithId;
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

// Export the toast function for direct use
export const toast = (toastData: Omit<Toast, 'id'>) => {
  const toastWithId = createToast({
    title: toastData.title as string,
    description: toastData.description as string,
    variant: toastData.variant,
    duration: toastData.duration
  });
  
  // This is a standalone function that creates a toast object
  // Components should use the useToast hook instead
  return toastWithId;
};
