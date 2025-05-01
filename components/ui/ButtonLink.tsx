'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

// Tipi
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  $fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const StyledLink = styled(Link)<Omit<ButtonLinkProps, 'href' | 'children'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: white;
          border: 1px solid ${theme.colors.primary};
          &:hover:not(:disabled) {
            background-color: #004080;
            border-color: #004080;
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.secondary};
          &:hover:not(:disabled) {
            background-color: #75B9D4;
            border-color: #75B9D4;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          &:hover:not(:disabled) {
            opacity: .8;
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: none;
          &:hover:not(:disabled) {
           opacity: .8;
          }
        `;
      default:
        return '';
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return `
          padding: 0.25rem 0.5rem;
          font-size: ${theme.fontSizes.small};
        `;
      case 'medium':
        return `
          padding: 0.5rem 1rem;
          font-size: ${theme.fontSizes.medium};
        `;
      case 'large':
        return `
          padding: 0.75rem 1.5rem;
          font-size: ${theme.fontSizes.large};
        `;
      default:
        return '';
    }
  }}
  
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 2px 4px #E6E6E6;
  }
`;

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  variant = 'primary',
  size = 'medium',
  $fullWidth = false,
  disabled = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledLink
      href={disabled ? '#' : href}
      variant={variant}
      size={size}
      $fullWidth={$fullWidth}
      disabled={disabled}
      className={className}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      {...props}
    >
      {children}
    </StyledLink>
  );
};

export default ButtonLink;