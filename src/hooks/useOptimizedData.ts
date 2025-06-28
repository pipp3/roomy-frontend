'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseOptimizedDataOptions<T> {
  fetchFn: () => Promise<T>;
  dependencies: any[];
  cacheKey?: string;
  cacheDuration?: number; // en milisegundos
  debounceMs?: number;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
}

interface UseOptimizedDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  clearCache: () => void;
}

// Cache simple en memoria
const dataCache = new Map<string, { data: any; timestamp: number }>();

export function useOptimizedData<T>({
  fetchFn,
  dependencies,
  cacheKey,
  cacheDuration = 5 * 60 * 1000, // 5 minutos por defecto
  debounceMs = 300,
  onError,
  onSuccess
}: UseOptimizedDataOptions<T>): UseOptimizedDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchInProgressRef = useRef<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastDepsRef = useRef<string | undefined>(undefined);

  const fetchData = useCallback(async () => {
    if (fetchInProgressRef.current) return;

    fetchInProgressRef.current = true;
    setLoading(true);
    setError(null);

    try {
      // Verificar cache si existe cacheKey
      if (cacheKey) {
        const cached = dataCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < cacheDuration) {
          setData(cached.data);
          setLoading(false);
          fetchInProgressRef.current = false;
          onSuccess?.(cached.data);
          return;
        }
      }

      const result = await fetchFn();
      
      // Guardar en cache
      if (cacheKey) {
        dataCache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
      }

      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
      fetchInProgressRef.current = false;
    }
  }, [fetchFn, cacheKey, cacheDuration, onError, onSuccess]);

  const debouncedFetch = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchData();
    }, debounceMs);
  }, [fetchData, debounceMs]);

  const refetch = useCallback(() => {
    // Limpiar cache para esta key
    if (cacheKey) {
      dataCache.delete(cacheKey);
    }
    fetchData();
  }, [fetchData, cacheKey]);

  const clearCache = useCallback(() => {
    if (cacheKey) {
      dataCache.delete(cacheKey);
    } else {
      dataCache.clear();
    }
  }, [cacheKey]);

  useEffect(() => {
    const depsString = JSON.stringify(dependencies);
    
    // Solo hacer fetch si las dependencias cambiaron
    if (lastDepsRef.current !== depsString) {
      lastDepsRef.current = depsString;
      debouncedFetch();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dependencies, debouncedFetch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache
  };
} 