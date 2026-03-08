import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  span { color: #E2B853; } /* Gold RSAE text */
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1a1a1a;
  font-weight: 500;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Avatar = styled.div`
  background-color: #E2B853;
  color: black;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export default function AdminHeader() {
  return (
    <HeaderContainer>
      <LogoText><span>RSAE</span> Admin</LogoText>

      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/browse">Idea Requests</StyledLink> 
        <StyledLink to="/audit-log">Audit Log</StyledLink>
      </NavLinks>

      <ProfileSection>
        <span>🔔</span>
        <span style={{ borderLeft: '1px solid #ccc', paddingLeft: '1.5rem' }}>Admin 1</span>
        <Avatar>AD</Avatar>
      </ProfileSection>
    </HeaderContainer>
  );
}