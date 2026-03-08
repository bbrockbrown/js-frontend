import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const SubmitButton = styled.button`
  width: 100%;
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  color: #2e7d32;
  padding: 12px;
  border-radius: 8px;
  background-color: #edf7ed;
  font-size: 0.95rem;
  margin-bottom: 16px;
  text-align: center;
  font-family: var(--font-agenda);
`;

const ErrorText = styled.span`
  color: #c62828;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 12px;
  text-align: center;
`;

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const { requestPasswordReset } = useUser();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Forgot Password</Title>
        <form onSubmit={handleSubmit}>
          {success ? (
            <SuccessMessage>
              Password reset instructions have been sent to your email. Please
              check your inbox.
            </SuccessMessage>
          ) : (
            <>
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
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Password Reset Link'}
              </SubmitButton>
            </>
          )}
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

ForgotPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
