
import { useState, useEffect } from 'react';
import { memoryCache, CacheKey, CacheOptions } from '@/lib/memoryCache';

/**
 * React hook for using the memory cache with React components
 * @param key - Cache key
 * @param fetchFn - Function to fetch data if not in cache
 * @param options - Cache options including TTL and offline persistence
 */
export function useMemoryCache<T>(
  key: CacheKey,
  fetchFn: () => Promise<T>,
  options?: CacheOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await memoryCache.getOrFetch<T>(key, fetchFn, options);
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        console.error(`Error in useMemoryCache for key "${key}":`, err);
        
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [key]);
  
  // Function to manually refresh the cache
  const refreshCache = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await memoryCache.remove(key);
      const result = await memoryCache.getOrFetch<T>(key, fetchFn, options);
      setData(result);
    } catch (err) {
      console.error(`Error refreshing cache for key "${key}":`, err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return { data, isLoading, error, refreshCache };
}

export default useMemoryCache;
