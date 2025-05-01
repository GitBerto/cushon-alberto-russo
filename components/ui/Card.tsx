'use client';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CardProps {
  padding?: string;
  elevation?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const getElevation = (elevation: 'small' | 'medium' | 'large') => {
  switch (elevation) {
    case 'small':
      return theme.boxShadow.small;
    case 'medium':
      return theme.boxShadow.medium;
    case 'large':
      return theme.boxShadow.large;
    default:
      return theme.boxShadow.small;
  }
};

export const Card = styled.div<CardProps>`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.medium};
  padding: ${props => props.padding || theme.spacing.md};
  box-shadow: ${props => getElevation(props.elevation || 'small')};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  transition: box-shadow 0.3s ease;
`;

export const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.large};
`;

export const CardSubtitle = styled.h4`
  margin: ${theme.spacing.xs} 0 0;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.medium};
  font-weight: normal;
`;

export const CardContent = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
`;

export default Card;