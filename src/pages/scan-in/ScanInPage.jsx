import { useNavigate } from 'react-router-dom';

import { Button } from '@/common/components/atoms/Button';
import { useUser } from '@/common/contexts/UserContext';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  color: var(--text);
`;

const Info = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin: 0;
`;

export default function ScanInPage() {
  const navigate = useNavigate();
  const { role, logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <Wrapper>
      <Heading>Scan In (coming soon)</Heading>
      <Info>Logged in as: {role || 'unknown'}</Info>
      <Button.Secondary onClick={handleLogout}>Log Out</Button.Secondary>
    </Wrapper>
  );
}
