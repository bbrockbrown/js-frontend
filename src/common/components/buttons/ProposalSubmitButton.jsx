import styled from 'styled-components';

/** Primary CTA — same look in nav and submit form */
const ProposalSubmitButton = styled.button`
  display: flex;
  width: 208px;
  height: 58px;
  padding: 12px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  box-sizing: border-box;
  border: none;
  border-radius: 25px;
  background: #f4ca25;
  color: #000;
  cursor: pointer;
  font: inherit;
  font-weight: 500;
`;

export default ProposalSubmitButton;
