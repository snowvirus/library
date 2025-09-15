"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    // Only redirect if user is admin and not already on admin pages
    if (!loading && user?.isAdmin && !pathname.startsWith('/admin') && !hasRedirected) {
      setHasRedirected(true);
      router.push('/admin');
    }
  }, [user, loading, pathname, router, hasRedirected]);

  // Reset redirect flag when user changes
  useEffect(() => {
    if (!user) {
      setHasRedirected(false);
    }
  }, [user]);

  return null;
}
