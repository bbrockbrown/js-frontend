import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Button } from '@/common/components/atoms/Button';
import { useUser } from '@/common/contexts/UserContext';

import LogoutModal from './LogoutModal';

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.25rem 2rem;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  font-family: var(--font-agenda);
`;

const LogoLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  justify-self: start;
`;

const LogoImg = styled.img`
  height: 58px;
  width: auto;
  display: block;
`;

const NavTitle = styled.span`
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--rsae-gold);
  justify-self: center;
`;

const NavRight = styled.div`
  display: flex;
  gap: 10px;
  justify-self: end;
`;

const StaffLoginBtn = styled(Button.Secondary)`
  padding: 10px 24px;
  border-radius: 10px;
  background-color: var(--rsae-light-blue) !important;
  border-color: var(--rsae-light-blue) !important;
  color: white !important;
`;

const PublicViewLink = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  color: #4a5568;
  cursor: pointer;
  font-family: var(--font-agenda);
  font-weight: 500;

  &:hover {
    color: var(--rsae-gold);
  }
`;

export default function NavBar() {
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
    <StyledNav>
      <LogoLink onClick={() => navigate('/')}>
        <LogoImg src="/rsae-logo.png" alt="RSAE" />
      </LogoLink>
      <NavTitle>Staff Portal</NavTitle>
      <NavRight>
        <PublicViewLink onClick={() => navigate('/')}>
          Public View
        </PublicViewLink>
        {user ? (
          <Button.Secondary onClick={handleLogoutClick}>Log Out</Button.Secondary>
        ) : (
          <>
            <Button.Primary onClick={() => navigate('/app/signup')}>
              Sign Up
            </Button.Primary>
            <StaffLoginBtn onClick={() => navigate('/app/login')}>
              Login
            </StaffLoginBtn>
          </>
        )}
      </NavRight>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLogout={handleLogoutConfirm}
      />
    </StyledNav>
  );
}
