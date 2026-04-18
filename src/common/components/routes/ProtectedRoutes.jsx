import { Navigate, Outlet } from 'react-router-dom';

import { useUser } from '@/common/contexts/UserContext';
import useIsMobile from '@/common/hooks/useIsMobile';

export function PrivateRoute() {
  return <Outlet />;
}

export function PublicOnlyRoute() {
  return <Outlet />;
}

export function OwnerOnlyRoute() {
  const { role, isLoading } = useUser();

  if (isLoading) return null;
  if (role !== 'owner') return <Navigate to='/login' replace />;
  return <Outlet />;
}

export function AuthenticatedRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;
  if (!user) return <Navigate to='/login' replace />;
  return <Outlet />;
}

export function MobileOnlyRoute() {
  const isMobile = useIsMobile();

  if (!isMobile) return <Navigate to='/login' replace />;
  return <Outlet />;
}
