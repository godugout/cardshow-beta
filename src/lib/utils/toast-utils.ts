
import { toast } from 'sonner';

export const toastUtils = {
  success: (message: string, description?: string) => {
    if (description) {
      toast.success(message, { description });
    } else {
      toast.success(message);
    }
  },
  error: (message: string, description?: string) => {
    if (description) {
      toast.error(message, { description });
    } else {
      toast.error(message);
    }
  },
  info: (message: string, description?: string) => {
    if (description) {
      toast.info(message, { description });
    } else {
      toast.info(message);
    }
  },
  warning: (message: string, description?: string) => {
    if (description) {
      toast.warning(message, { description });
    } else {
      toast.warning(message);
    }
  }
};

// Named export for compatibility
export { toastUtils as default };
