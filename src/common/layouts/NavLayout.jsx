import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Sidebar from '@/common/components/atoms/Sidebar';
import NavBar from '@/common/components/navigation/NavBar';
import styled from 'styled-components';

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  background: #f5f5f4;
`;

export default function NavLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage = location.pathname.replace('/', '') || 'dashboard';

  const handleNavigate = (pageId) => {
    navigate(`/${pageId}`);
  };

  return (
    <Layout>
      <NavBar />
      <Body>
        <Sidebar activePage={activePage} onNavigate={handleNavigate} />
        <Outlet />
      </Body>
    </Layout>
  );
}
