import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useRedirect = () => {
  const router = useRouter();

  const redirect = useCallback((path: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  }, [router]);

  const redirectWithDelay = useCallback((path: string, delay: number = 1000, options?: { replace?: boolean }) => {
    setTimeout(() => {
      redirect(path, options);
    }, delay);
  }, [redirect]);

  return {
    redirect,
    redirectWithDelay,
    router
  };
}; 