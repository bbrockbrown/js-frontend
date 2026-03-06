import styled from 'styled-components';

const ButtonBase = styled.button`
  font-size: 0.8em;
  padding: 8px 20px;
  border-radius: 5px;
  border: solid 1px var(--text);
  color: var(--text);
  cursor: pointer;
`;

const ButtonPrimary = styled(ButtonBase)`
  background-color: #E1A56D;
  border-color: #E1A56D;
  color: var(--white);
  font-weight: bold;
`;

const ButtonSecondary = styled(ButtonBase)`
  background-color: var(--secondary-lightgrey);
  border-color: var(--text);
`;

const ButtonTransparent = styled(ButtonBase)`
  background-color: transparent;
`;

const ButtonInvisible = styled(ButtonBase)`
  background-color: transparent;
  border-color: transparent;
`;
const ButtonNavy = styled(ButtonBase)`
  background-color: #314552;
  color: var(--white);
  font-weight: bold;
  font-size: 1.1em;
`;
const ButtonNav = styled(ButtonBase)`
  font-size: 0.7em;
  background-color: #314552;
  color: var(--white);
  font-weight: bold;
  width: 100%;
  height: 45px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: left;
  &:hover {
    background-color: #3a4e5c;
  }
`;
export const Button = {
  Primary: ButtonPrimary,
  Secondary: ButtonSecondary,
  Transparent: ButtonTransparent,
  Invisible: ButtonInvisible,
  Navy: ButtonNavy,
  Nav: ButtonNav,
};