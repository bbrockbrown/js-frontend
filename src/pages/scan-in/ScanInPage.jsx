import { useEffect, useRef, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import PantryLogo from '@/assets/icons/pantry-logo.svg';
import { useUser } from '@/common/contexts/UserContext';
import { BrowserMultiFormatReader } from '@zxing/browser';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px 32px;
  position: relative;
  background-color: #ffffff;
`;

const BackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2a4d8f;
  color: #ffffff;
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: #1e3a6e;
  }

  svg {
    color: #ffffff;
    stroke: #ffffff;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 56px;
`;

const Logo = styled.img`
  width: 110px;
  height: 110px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  color: #1a2b4a;
  max-width: 280px;
  line-height: 1.3;
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 320px;
  border: none;
  border-top: 1px solid #d6dce8;
  margin: 20px 0 16px;
`;

const SectionWrapper = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const Instruction = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #1a2b4a;
  margin: 0;
  text-align: center;
`;

const CameraFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  overflow: hidden;
  background-color: #0b1220;
  border: 2px solid #2a4d8f;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ReticleOverlay = styled.div`
  position: absolute;
  inset: 14%;
  border: 2px dashed rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  pointer-events: none;
`;

const StatusOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background-color: rgba(11, 18, 32, 0.55);
  color: #ffffff;
  font-size: 0.95rem;
  text-align: center;
  padding: 12px 18px;
  pointer-events: none;
`;

const ErrorText = styled.p`
  margin: 0;
  color: #b00020;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.4;
`;

const OrText = styled.span`
  font-size: 0.85rem;
  color: #6b7280;
  text-transform: lowercase;
  letter-spacing: 0.05em;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  background-color: #2a4d8f;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1e3a6e;
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  background-color: #ffffff;
  color: #2a4d8f;
  border: 1.5px solid #2a4d8f;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #f0f3f8;
  }
`;

const ResultBlock = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #f3f6fb;
  border: 1px solid #c7d2e3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
`;

const ResultLabel = styled.span`
  font-size: 0.85rem;
  color: #4b5563;
`;

const ResultText = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a2b4a;
  word-break: break-all;
`;

export default function ScanInPage() {
  const { logout } = useUser();
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const [scanResult, setScanResult] = useState(null);
  const [cameraStatus, setCameraStatus] = useState('starting');
  const [cameraError, setCameraError] = useState('');

  useEffect(() => {
    if (scanResult) return undefined;

    let cancelled = false;
    let localControls = null;
    const reader = new BrowserMultiFormatReader();

    const start = async () => {
      setCameraStatus('starting');
      setCameraError('');
      try {
        const controls = await reader.decodeFromConstraints(
          { video: { facingMode: { ideal: 'environment' } }, audio: false },
          videoRef.current,
          (result, _err, ctrl) => {
            if (cancelled || !result) return;
            ctrl.stop();
            controlsRef.current = null;
            setScanResult(result.getText());
          }
        );
        if (cancelled) {
          controls.stop();
          return;
        }
        localControls = controls;
        controlsRef.current = controls;
        setCameraStatus('running');
      } catch (err) {
        if (cancelled) return;
        console.error('Scanner start error:', err);
        setCameraStatus('error');
        if (
          err?.name === 'NotAllowedError' ||
          err?.name === 'PermissionDeniedError'
        ) {
          setCameraError(
            'Camera permission was denied. Allow camera access in your browser settings, or add items manually below.'
          );
        } else if (
          err?.name === 'NotFoundError' ||
          err?.name === 'OverconstrainedError' ||
          err?.name === 'DevicesNotFoundError'
        ) {
          setCameraError(
            'No camera was found on this device. You can still add items manually below.'
          );
        } else {
          setCameraError(
            'Camera could not be started. You can still add items manually below.'
          );
        }
      }
    };

    // Defer init to a microtask. In StrictMode, the first effect's cleanup
    // fires before this timer resolves, so cancelled is true and start()
    // never touches the video element. Only the second effect actually
    // initializes, eliminating the play()/load() race.
    const timer = setTimeout(start, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);

      const controls = localControls || controlsRef.current;
      if (controls) {
        try {
          controls.stop();
        } catch {
          // already stopped
        }
      }
      controlsRef.current = null;

      // Force-release the camera so the next mount can attach a fresh stream
      // without colliding with an in-flight play() promise.
      const video = videoRef.current;
      if (video) {
        try {
          video.pause();
        } catch {
          // ignore
        }
        const stream = video.srcObject;
        if (stream && typeof stream.getTracks === 'function') {
          stream.getTracks().forEach((track) => track.stop());
        }
        video.srcObject = null;
      }
    };
  }, [scanResult]);

  const handleBack = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleScanAnother = () => {
    setScanResult(null);
  };

  const handleAddManually = () => {
    // TODO: wire up Item Scanned form in Step 3
    console.log('Add Item(s) Manually clicked');
  };

  return (
    <PageWrapper>
      <BackButton
        type='button'
        onClick={handleBack}
        aria-label='Log out and return to landing'
      >
        <FiArrowLeft size={20} />
      </BackButton>

      <LogoSection>
        <Logo src={PantryLogo} alt='New Trier Township seal' />
        <Title>New Trier Township Food Pantry Check-in System</Title>
      </LogoSection>

      <Divider />

      {scanResult ? (
        <SectionWrapper>
          <ResultBlock>
            <ResultLabel>Barcode detected</ResultLabel>
            <ResultText>{scanResult}</ResultText>
          </ResultBlock>
          <PrimaryButton type='button' onClick={handleScanAnother}>
            Scan another
          </PrimaryButton>
          <SecondaryButton type='button' onClick={handleAddManually}>
            Add Item(s) Manually
          </SecondaryButton>
        </SectionWrapper>
      ) : (
        <SectionWrapper>
          <Instruction>Scan your item to begin</Instruction>
          <CameraFrame>
            <Video ref={videoRef} autoPlay playsInline muted />
            {cameraStatus === 'running' && <ReticleOverlay />}
            {cameraStatus === 'starting' && (
              <StatusOverlay>Starting camera...</StatusOverlay>
            )}
            {cameraStatus === 'error' && (
              <StatusOverlay>Camera unavailable</StatusOverlay>
            )}
          </CameraFrame>
          {cameraError && <ErrorText>{cameraError}</ErrorText>}
          <OrText>or</OrText>
          <SecondaryButton type='button' onClick={handleAddManually}>
            Add Item(s) Manually
          </SecondaryButton>
        </SectionWrapper>
      )}
    </PageWrapper>
  );
}
