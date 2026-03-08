import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '@/common/contexts/UserContext';
import UserHeader from '@/common/components/navigation/UserHeader';
import AdminHeader from '@/common/components/navigation/AdminHeader';

export default function NavLayout() {
  const context = useContext(UserContext);
  
  const isAdmin = context?.user?.role === 'admin'; // changing which header shows based on wether admin or not

  return (
    <>
      {isAdmin ? <AdminHeader /> : <UserHeader />}
      <main>
        <Outlet /> 
      </main>
    </>
  );
}