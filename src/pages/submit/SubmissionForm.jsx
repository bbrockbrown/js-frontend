import React, { useState } from 'react';
import styled from 'styled-components';

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  background-color: #fffdfa;
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  text-align: center;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  width: 100%;
  max-width: 900px;
  padding: 4rem 5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  color: #000000;
`;

const inputStyles = `
  background-color: #fafafa;
  border: 1px solid #dfdfdf;
  border-radius: 15px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #E2B853; /* RSAE Gold focus ring */
  }
`;

const StyledSelect = styled.select`${inputStyles}`;
const StyledTextArea = styled.textarea`
  ${inputStyles}
  min-height: 130px;
  resize: vertical;
`;
const StyledInput = styled.input`${inputStyles}`;

const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 3rem 0 2rem 0;
`;

const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;

const PrivateBadge = styled.span`
  background-color: #f0f6ff;
  color: #4376ed;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  
  /* Makes them stack on small screens */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DividerLine = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 2.5rem 0;
`;

const ToggleGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 1rem;
  background-color: ${props => (props.$active ? '#E2B853' : '#ffffff')};
  color: ${props => (props.$active ? '#000000' : '#333333')};
  border: 1px solid ${props => (props.$active ? '#E2B853' : '#dfdfdf')};
  border-radius: 15px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => (props.$active ? '#d1a742' : '#fafafa')};
  }
`;

const PrivacyNotice = styled.div`
  background-color: #fff6d1;
  border: 1px solid #ffda4b;
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 3rem;
  color: #555;
  line-height: 1.5;
`;

// --- COMPONENT RENDER ---

export default function SubmissionForm() {
  // state for relation toggles
  const [relation, setRelation] = useState('No Relation');

  return (
    <PageWrapper>
      <PageTitle>Community Proposal Submission Form</PageTitle>
      
      <FormContainer>
        {/* CATEGORY */}
        <FormGroup>
          <Label>Select the category that fits the best:</Label>
          <StyledSelect defaultValue="">
            <option value="" disabled>Choose a category...</option>
            <option value="housing">Housing</option>
            <option value="health">Health & Wellness</option>
            <option value="economic">Economic Development</option>
            <option value="arts">Arts & Culture</option>
            <option value="education">Education</option>
          </StyledSelect>
        </FormGroup>

        {/* DESCRIPTION */}
        <FormGroup>
          <Label>Describe your idea in detail:</Label>
          <StyledTextArea placeholder="Keep your ideas clear and actionable for the best community support." />
        </FormGroup>

        {/* PERSONAL INFO SECTION */}
        <SectionDivider>
          <SectionHeader>Your Information</SectionHeader>
          <PrivateBadge>🔒 Private / Internal Use Only</PrivateBadge>
        </SectionDivider>

        <InputRow>
          <FormGroup style={{ flex: 1, marginBottom: 0 }}>
            <Label style={{ fontSize: '1rem', color: '#666' }}>Full Name</Label>
            <StyledInput type="text" placeholder="Jane Doe" />
          </FormGroup>
          <FormGroup style={{ flex: 1, marginBottom: 0 }}>
            <Label style={{ fontSize: '1rem', color: '#666' }}>Email Address</Label>
            <StyledInput type="email" placeholder="jane@example.com" />
          </FormGroup>
        </InputRow>

        <DividerLine />

        {/* RELATION TOGGLES */}
        <FormGroup>
          <Label style={{ textAlign: 'center' }}>Relation to Evanston</Label>
          <ToggleGroup>
            <ToggleButton 
              type="button"
              $active={relation === 'No Relation'} 
              onClick={() => setRelation('No Relation')}
            >
              No Relation
            </ToggleButton>
            <ToggleButton 
              type="button"
              $active={relation === 'Former Resident'} 
              onClick={() => setRelation('Former Resident')}
            >
              Former Resident
            </ToggleButton>
            <ToggleButton 
              type="button"
              $active={relation === 'Current Resident'} 
              onClick={() => setRelation('Current Resident')}
            >
              Current Resident
            </ToggleButton>
          </ToggleGroup>
        </FormGroup>

        {/* PRIVACY NOTICE */}
        <PrivacyNotice>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <strong>Privacy Notice:</strong> Your contact details are never shared publicly. 
            They are only used only for verification by the admin team. Ideas are reviewed 
            for transparency and community standards before being posted.
          </div>
        </PrivacyNotice>

        {/* SUBMIT BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: '#E2B853', color: 'black', padding: '1rem 3rem', fontSize: '1.2rem' }}>
            Submit Proposal
          </button>
        </div>

      </FormContainer>
    </PageWrapper>
  );
}