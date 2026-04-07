import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useUser } from '@/common/contexts/UserContext';
import styled from 'styled-components';

import LogoutModal from './LogoutModal';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.35rem 4rem;
  background-color: #ffffff;
  border-bottom: 1px solid #dedede;

  @media (max-width: 1200px) {
    padding: 1rem 1.5rem;
    flex-wrap: wrap;
    gap: 0.8rem 1.2rem;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 1200px) {
    gap: 1.4rem;
  }
`;

const LogoText = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;

  span {
    color: #c79a00;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.9rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.$active ? '#101010' : '#2f2f2f')};
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  font-size: 1.35rem;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  color: #757575;
`;

const BellIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
`;

const VerticalDivider = styled.span`
  width: 1px;
  height: 34px;
  background: #d9d9d9;
`;

const AdminText = styled.span`
  font-size: 1.2rem;
  color: #7b7b7b;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #f4ca25;
  color: #1b1b1b;
  font-weight: 800;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #757575;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #dc3545;
  }
`;

export default function AdminHeader() {
  const { pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setIsModalOpen(false);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <HeaderContainer>
      <LeftSide>
        <LogoText>
          <span>RSAE</span> Admin
        </LogoText>

        <NavLinks>
          <StyledLink to='/' $active={pathname === '/'}>
            Home
          </StyledLink>
          <StyledLink
            to='/dashboard'
            $active={pathname.startsWith('/dashboard')}
          >
            Dashboard
          </StyledLink>
          <StyledLink to='/browse' $active={pathname.startsWith('/browse')}>
            Idea Requests
          </StyledLink>
          <StyledLink
            to='/audit-log'
            $active={pathname.startsWith('/audit-log')}
          >
            Audit Log
          </StyledLink>
        </NavLinks>
      </LeftSide>

      <RightSide>
        <BellIcon aria-label='Notifications'>&#128276;</BellIcon>
        <VerticalDivider aria-hidden='true' />
        {user && (
          <LogoutButton onClick={handleLogoutClick}>Log Out</LogoutButton>
        )}
        <AdminText>Admin 1</AdminText>
        <Avatar>AD</Avatar>
      </RightSide>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLogout={handleLogoutConfirm}
      />
    </HeaderContainer>
  );
}
