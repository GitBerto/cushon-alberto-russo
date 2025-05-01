'use client';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps {
  padding?: string;
  maxWidth?: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${props => props.maxWidth || '1200px'};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${props => props.padding || theme.spacing.md};
  padding-right: ${props => props.padding || theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-left: ${theme.spacing.sm};
    padding-right: ${theme.spacing.sm};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${theme.spacing.sm};
  margin-right: -${theme.spacing.sm};
`;

interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const Col = styled.div<ColProps>`
  padding-left: ${theme.spacing.sm};
  padding-right: ${theme.spacing.sm};
  width: 100%;

  ${props => props.xs && `
    flex: 0 0 ${(props.xs / 12) * 100}%;
    max-width: ${(props.xs / 12) * 100}%;
  `}

  @media (min-width: ${theme.breakpoints.mobile}) {
    ${props => props.sm && `
      flex: 0 0 ${(props.sm / 12) * 100}%;
      max-width: ${(props.sm / 12) * 100}%;
    `}
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    ${props => props.md && `
      flex: 0 0 ${(props.md / 12) * 100}%;
      max-width: ${(props.md / 12) * 100}%;
    `}
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    ${props => props.lg && `
      flex: 0 0 ${(props.lg / 12) * 100}%;
      max-width: ${(props.lg / 12) * 100}%;
    `}
  }

  @media (min-width: ${theme.breakpoints.wide}) {
    ${props => props.xl && `
      flex: 0 0 ${(props.xl / 12) * 100}%;
      max-width: ${(props.xl / 12) * 100}%;
    `}
  }
`;