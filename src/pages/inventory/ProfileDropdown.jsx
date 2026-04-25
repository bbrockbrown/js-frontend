import { useEffect, useState } from 'react';

import { useUser } from '@/common/contexts/UserContext';
import { getCurrentCode, setNewCode } from '@/common/utils/volunteerAuth';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: #ffffff;
  border: 1px solid #d6dce8;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(24, 39, 75, 0.16);
  width: 280px;
  padding: 16px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #1a2b4a;
  letter-spacing: 0.3px;
`;

const CodeDisplay = styled.div`
  background: #f0f6ff;
  border: 1px solid #c7d2e3;
  border-radius: 8px;
  padding: 14px 10px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a2b4a;
  text-align: center;
  letter-spacing: 4px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

const GhostButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #c7d2e3;
  border-radius: 6px;
  background: #ffffff;
  color: #1a2b4a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f0f3f8;
  }
`;

const PrimaryButton = styled.button`
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: #2a4d8f;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1e3a6e;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e8ecf2;
  margin: 4px 0;
  width: 100%;
`;

const LogoutButton = styled.button`
  padding: 10px 12px;
  border: 1px solid #dc3545;
  border-radius: 6px;
  background: #ffffff;
  color: #dc3545;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #fef2f2;
  }
`;

const ConfirmBox = styled.div`
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 6px;
  padding: 10px;
  font-size: 13px;
  color: #7c2d12;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ConfirmText = styled.span`
  line-height: 1.4;
`;

const DangerButton = styled(GhostButton)`
  border-color: #dc3545;
  color: #dc3545;

  &:hover {
    background: #fef2f2;
  }
`;

const CopyFeedback = styled.span`
  font-size: 12px;
  color: #16a34a;
  font-weight: 600;
  text-align: center;
`;

export default function ProfileDropdown({ onClose }) {
  const { logout } = useUser();
  const [code, setCode] = useState(() => getCurrentCode());
  const [copied, setCopied] = useState(false);
  const [confirmRegenerate, setConfirmRegenerate] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleGenerate = () => {
    const next = setNewCode();
    setCode(next);
    setCopied(false);
  };

  const handleRegenerate = () => {
    const next = setNewCode();
    setCode(next);
    setConfirmRegenerate(false);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleLogout = async () => {
    onClose();
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <Menu>
      <SectionLabel>Volunteer Access Code</SectionLabel>

      {code ? (
        <>
          <CodeDisplay>{code}</CodeDisplay>
          {copied && <CopyFeedback>Copied to clipboard</CopyFeedback>}
          {confirmRegenerate ? (
            <ConfirmBox>
              <ConfirmText>
                This will invalidate the current code. Continue?
              </ConfirmText>
              <ButtonRow>
                <GhostButton
                  type='button'
                  onClick={() => setConfirmRegenerate(false)}
                >
                  Cancel
                </GhostButton>
                <DangerButton type='button' onClick={handleRegenerate}>
                  Regenerate
                </DangerButton>
              </ButtonRow>
            </ConfirmBox>
          ) : (
            <ButtonRow>
              <GhostButton type='button' onClick={handleCopy}>
                Copy
              </GhostButton>
              <GhostButton
                type='button'
                onClick={() => setConfirmRegenerate(true)}
              >
                Regenerate
              </GhostButton>
            </ButtonRow>
          )}
        </>
      ) : (
        <PrimaryButton type='button' onClick={handleGenerate}>
          Generate Code
        </PrimaryButton>
      )}

      <Divider />

      <LogoutButton type='button' onClick={handleLogout}>
        Log Out
      </LogoutButton>
    </Menu>
  );
}

ProfileDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
};
