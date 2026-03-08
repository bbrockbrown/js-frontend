import React from 'react';
import styled from 'styled-components';

// --- STYLED COMPONENTS ---

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* Darkens the background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensures it sits on top of the navbar */
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 24px;
  width: 90%;
  max-width: 860px;
  max-height: 85vh; /* Prevents it from being taller than the screen */
  overflow-y: auto; /* Adds a scrollbar if the content is too long */
  padding: 3rem;
  position: relative;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #a0a0a0;
  cursor: pointer;
  
  &:hover {
    color: #1a1a1a;
  }
`;

const HeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
`;

const MetaText = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: #7f7f7f;
`;

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const MainProposalBox = styled.div`
  background-color: #fafafa;
  border: 1.5px solid #dfdfdf;
  border-radius: 16px;
  padding: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1a1a1a;
  margin-bottom: 3rem;
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

const CommentCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e7e7e7;
`;

const CommentUser = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommentText = styled.p`
  margin: 0;
  color: #333;
  line-height: 1.5;
`;

const LeaveThoughtInput = styled.input`
  width: 100%;
  padding: 1.2rem;
  border-radius: 16px;
  border: 1.5px solid #dfdfdf;
  background-color: #fafafa;
  font-size: 1rem;
  margin-top: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #E2B853;
  }
`;

// --- COMPONENT LOGIC ---

export default function ProposalModal({ proposalData, onClose }) {
  if (!proposalData) return null;

  return (
    <Overlay onClick={onClose}>
      
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>

        <HeaderGroup>
          <div>
            <Title>{proposalData.title}</Title>
            <MetaText>User 123</MetaText>
          </div>
          <StatBlock>
            <MetaText style={{ color: '#000', fontWeight: 'bold' }}>{proposalData.date}</MetaText>
            <span style={{ color: '#E2B853', fontWeight: 'bold' }}>👍 {proposalData.votes} Votes</span>
          </StatBlock>
        </HeaderGroup>

        <MainProposalBox>
          {proposalData.description}
        </MainProposalBox>

        <CommentsSection>
          <SectionTitle>Comments</SectionTitle>
          
          <CommentCard> {/* would use actual data eventually i think */}
            <div>
              <CommentUser>👤 Anonymous Resident</CommentUser>
              <CommentText>This is such a good idea!!</CommentText>
            </div>
            <StatBlock>
              <MetaText style={{ fontSize: '0.9rem' }}>Mon Feb 16</MetaText>
              <span style={{ color: '#E2B853', fontWeight: 'bold' }}>10 🤍</span>
            </StatBlock>
          </CommentCard>

          <CommentCard>
            <div>
              <CommentUser>👤 Anonymous Resident</CommentUser>
              <CommentText>I completely agree, this would help the neighborhood immensely.</CommentText>
            </div>
            <StatBlock>
              <MetaText style={{ fontSize: '0.9rem' }}>Tue Feb 17</MetaText>
              <span style={{ color: '#E2B853', fontWeight: 'bold' }}>4 🤍</span>
            </StatBlock>
          </CommentCard>

          <LeaveThoughtInput type="text" placeholder="Leave your thoughts..." />
        </CommentsSection>

      </ModalContent>
    </Overlay>
  );
}