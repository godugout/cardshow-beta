
import { useToast } from '@/hooks/use-toast';
import { ToastVariant, createToast } from '@/types/toast';

export const toastUtils = {
  show: (title: string, description?: string, variant: ToastVariant = 'default', duration?: number) => {
    // This is a utility function that can't use hooks directly
    // Instead, we'll create a toast object that can be used by components
    return createToast({
      title,
      description,
      variant,
      duration
    });
  },
  
  success: (title: string, description?: string, duration?: number) => {
    return toastUtils.show(title, description, 'success', duration);
  },
  
  error: (title: string, description?: string, duration?: number) => {
    return toastUtils.show(title, description, 'destructive', duration);
  },
  
  warning: (title: string, description?: string, duration?: number) => {
    return toastUtils.show(title, description, 'warning', duration);
  },
  
  info: (title: string, description?: string, duration?: number) => {
    return toastUtils.show(title, description, 'info', duration);
  }
};

export default toastUtils;
