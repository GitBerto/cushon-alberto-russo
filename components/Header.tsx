'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '../styles/theme';
import { Container } from './ui/Container';
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px #E6E6E6;
  padding: ${theme.spacing.md} 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: ${theme.fontSizes.xlarge};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const Nav = styled.nav`
  display: flex;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${theme.fontSizes.large};
  cursor: pointer;
  color: ${theme.colors.primary};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: white;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0 2px 4px #E6E6E6;
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const UserName = styled.span`
  font-weight: 500;
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = {
    name: 'Alberto Russo',
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Link href="/" passHref>
            <Logo as="span">Cushon ISA</Logo>
          </Link>
          
          <Nav>

              <NavLink href="/">Home</NavLink>

              <NavLink href="/invest">Invest</NavLink>

              <NavLink href="/dashboard">Dashboard</NavLink>

          </Nav>
          
          <UserInfo>
            <UserName>{user.name}</UserName>
          </UserInfo>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes size={24} /> :<FaBars size={24} />}
          </MobileMenuButton>
        </HeaderContent>
        
        <MobileMenu $isOpen={mobileMenuOpen}>

            <NavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>


            <NavLink href="/invest" onClick={() => setMobileMenuOpen(false)}>Invest</NavLink>

            <NavLink href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>

        </MobileMenu>
      </Container>
    </HeaderContainer>
  );
};

export default Header;