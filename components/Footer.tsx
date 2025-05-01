'use client';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Container } from './ui/Container';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.lg} 0 ${theme.spacing.md};

`;

const FooterContent = styled.div`
  text-align: center;
  font-size: ${theme.fontSizes.small};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>

        <FooterContent>
          <p>Cushon Test - Alberto Test</p>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer;