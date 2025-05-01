'use client';

import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface InputProps {
  $hasError?: boolean;
  $fullWidth?: boolean;
}

const baseInputStyles = css<InputProps>`
  display: block;
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
  padding: 0.5rem 0.75rem;
  font-size: ${theme.fontSizes.medium};
  line-height: 1.5;
  color: ${theme.colors.text};
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${props => (props.$hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${theme.borderRadius.medium};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: ${props => (props.$hasError ? theme.colors.error : theme.colors.primary)};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${props => (props.$hasError ? '#dc3545' : '#0054a6')};
  }

  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
    opacity: 0.6;
  }
`;

export const Input = styled.input<InputProps>`
  ${baseInputStyles}
`;

export const TextArea = styled.textarea<InputProps>`
  ${baseInputStyles}
  resize: vertical;
  min-height: 100px;
`;

export const Select = styled.select<InputProps>`
  ${baseInputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5l-5-5h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 12px 12px;
  padding-right: 2rem;
`;

interface FormGroupProps {
  margin?: string;
}

export const FormGroup = styled.div<FormGroupProps>`
  margin-bottom: ${props => props.margin || theme.spacing.md};
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: ${theme.spacing.xs};
  font-weight: 500;
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.small};
  margin-top: ${theme.spacing.xs};
`;

export default Input;