import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #dfdfdf;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  overflow: hidden; /* Keeps the gold border radius clean */
  margin-bottom: 2rem;
`;

const CategoryAccentBar = styled.div`
  background-color: #f4ca25; /* Gold accent line on the left */
  width: 8px;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 700;
`;

const CategoryBadge = styled.span`
  background-color: rgba(255, 185, 185, 0.5); /* Health & Wellness color from your plugin */
  color: #bd3c3c;
  padding: 0.3rem 1rem;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const VoteCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4d4d4d;
  font-weight: 600;
`;

const Description = styled.p`
  color: #333;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limits text to 3 lines with an ellipsis */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e7e7e7;
  padding-top: 1rem;
  margin-top: 0.5rem;
`;

const DateText = styled.span`
  color: #7f7f7f;
  font-weight: 600;
  font-size: 0.9rem;
`;

const CommentButton = styled.button`
  background: none;
  border: none;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #f4ca25;
  }
`;

export default function ProposalEntry({ title, category, description, date, votes, onCommentClick }) {
  return (
    <CardContainer>
      <CategoryAccentBar />
      <ContentContainer>
        <HeaderRow>
          <TitleGroup>
            <Title>{title}</Title>
            <CategoryBadge>{category}</CategoryBadge> 
          </TitleGroup>
          <VoteCount>
            <span>👍</span> {votes} Votes
          </VoteCount>
        </HeaderRow>
        
        <Description>{description}</Description>
        
        <FooterRow>
          <DateText>📅 {date}</DateText>
          <CommentButton onClick={onCommentClick}>
            Comment <span>💬</span>
          </CommentButton>
        </FooterRow>
      </ContentContainer>
    </CardContainer>
  );
}