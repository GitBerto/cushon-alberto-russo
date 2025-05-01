'use client';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullwidth?: boolean;
  disabled?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        border: 1px solid ${theme.colors.primary};
        &:hover:not(:disabled) {
          background-color: #004080;
          border-color: #004080;
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.secondary};
        &:hover:not(:disabled) {
          background-color: #75b9d4;
          border-color: #75b9d4;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover:not(:disabled) {
          opacity: .8;
        }
      `;
    case 'text':
      return css`
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
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.25rem 0.5rem;
        font-size: ${theme.fontSizes.small};
      `;
    case 'medium':
      return css`
        padding: 0.5rem 1rem;
        font-size: ${theme.fontSizes.medium};
      `;
    case 'large':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: ${theme.fontSizes.large};
      `;
    default:
      return '';
  }
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  
  ${props => getVariantStyles(props.variant || 'primary')}
  ${props => getSizeStyles(props.size || 'medium')}
  
  width: ${props => (props.fullwidth ? '100%' : 'auto')};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 2px 4px #E6E6E6;
  }
`;

export default Button;