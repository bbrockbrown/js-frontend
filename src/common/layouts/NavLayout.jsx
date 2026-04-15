import { Outlet } from 'react-router-dom';
import { useUser } from '@/common/contexts/UserContext';

import AdminHeader from '@/common/components/navigation/AdminHeader';
import UserHeader from '@/common/components/navigation/UserHeader';

export default function NavLayout() {
  const {user} = useUser();

  return (
    <>
      {user ? <AdminHeader /> : <UserHeader />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
