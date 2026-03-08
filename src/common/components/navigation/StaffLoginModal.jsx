import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/common/contexts/UserContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--rsae-cream);
  padding: 2.5rem;
  border-radius: 20px;
  width: 90%;
  max-width: 380px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  font-family: var(--font-agenda);
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--rsae-gold);
  text-align: center;
  font-family: var(--font-agenda);
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: none;
  border-radius: 10px;
  background-color: white;
  font-size: 1rem;
  font-family: var(--font-agenda);
  box-sizing: border-box;

  &::placeholder {
    color: var(--rsae-gold);
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid var(--rsae-gold);
    outline-offset: 2px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const LoginButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background-color: var(--primary-green);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-agenda);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ForgotButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background-color: var(--rsae-light-blue);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-agenda);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.span`
  color: #c62828;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 12px;
  text-align: center;
`;

function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/invalid-credential':
      return 'Email or password is incorrect. Please try again.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}

export default function StaffLoginModal({ isOpen, onClose, onShowForgotPassword }) {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      onClose();
      navigate('/app', { replace: true });
    } catch (err) {
      setError(mapAuthCodeToMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotClick = () => {
    onClose();
    onShowForgotPassword?.();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          {error && <ErrorText>{error}</ErrorText>}
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            required
          />
          <ButtonGroup>
            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </LoginButton>
            <ForgotButton type="button" onClick={handleForgotClick}>
              Forgot Password
            </ForgotButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

StaffLoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onShowForgotPassword: PropTypes.func,
};
