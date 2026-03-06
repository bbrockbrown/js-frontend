import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styled from 'styled-components';

import { Button } from '@/common/components/atoms/Button';
import { useUser } from '@/common/contexts/UserContext';

import LogoutModal from './LogoutModal';
import CWMF_big_logo from '../../../assets/images/CWMF_big_logo.webp';
import Hamburger from '../../../assets/images/Hamburger.png';
import NavCategory from './NavCategory';
import profileIcon from '../../../assets/images/profile.png';
const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  font-size: 20px;
  background-color: #314552;
`;

const TopAligned = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  width: 100%;
`;

const LogoPlaceholder = styled(Button.Invisible)`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  padding: 0;
  font-size: 1.7rem;
  font-weight: bold;
  font-family: monospace;
  height: 50px;
  gap: 0px;
  justify-content: center;
  align-items: center;
`;

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [toggle, setToggle] = useState(true);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setIsModalOpen(false);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const handleNavToggle = () => {    
    setToggle(!toggle);
    console.log(toggle);
  }
  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  const styleLogo ={
    width: "75%",
    height: "auto",
  }
  const styleHamburger = {
    width: "100%",
    height: "auto",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "none",
  }
  const styleButtonHam = {
    display: "flex",
    width: "100%",
    height: "auto",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
  }
  const logoHamStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "auto",
    background: "none",
    border: "none",
    cursor: "pointer",
    margin: "0",
  }



  return (
    <StyledNav style={{width: toggle ? "17%" : "5%"}}>
      <TopAligned>
        <div style={logoHamStyle}>
          <button onClick={handleNavToggle} style={styleButtonHam}>
                <img src={Hamburger} alt="Hamburger Menu" style={styleHamburger}/>
          </button>
          <LogoPlaceholder onClick={() => navigate('/')}>
            {toggle ? (
              <img src={CWMF_big_logo} alt="CWMF Logo" style={styleLogo}/>
            ) : null}
          </LogoPlaceholder>
        </div>
        <NavCategory name="Dashboard" icon="Dashboard" toggle={toggle}/>
        <NavCategory name="Events" icon="Events" toggle={toggle}/>
        <NavCategory name="Volunteers" icon="Volunteers" toggle={toggle}/>
        <NavCategory name="Registrations" icon="Registrations" toggle={toggle}/>
        <NavCategory name="Acknowledgements" icon="Acknowledgements" toggle={toggle}/>
      </TopAligned>
      {!toggle ? 
      <img src={profileIcon} alt="Profile Icon" style={{width: "30px", height: "30px"}}/>
      :
      user ? (
        <Button.Secondary onClick={handleLogoutClick}>Log Out</Button.Secondary>
      ) : (
        <>
          <Button.Primary onClick={() => navigate('/signup')} style={{width: "100%"}}>
            Sign Up
          </Button.Primary>
          <Button.Secondary onClick={() => navigate('/login')} style={{width: "100%"}}>
            Login
          </Button.Secondary>
        </>
      )} 
      

      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLogout={handleLogoutConfirm}
      />
    </StyledNav>
  );
}
