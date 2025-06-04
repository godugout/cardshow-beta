
import { supabase } from './client';

export const storageOperations = {
  uploadImage: async (file: File, path: string): Promise<{data: any, error: any}> => {
    const { data, error } = await supabase.storage
      .from('assets')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) {
      console.error('Error uploading file:', error);
      return { data: null, error };
    }
    
    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('assets')
      .getPublicUrl(path);
      
    return { data: { ...data, url: urlData.publicUrl }, error: null };
  },
  
  deleteImage: async (path: string): Promise<{data: any, error: any}> => {
    return await supabase.storage
      .from('assets')
      .remove([path]);
  }
};
