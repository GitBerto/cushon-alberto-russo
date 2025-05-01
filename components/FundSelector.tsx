'use client';

import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { theme } from '../styles/theme';
import { Fund } from '../models/types';
import { useInvestment } from '../context/InvestmentContext';

interface FundCardProps {
  $isSelected: boolean;
}

const FundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FundCard = styled(Card)<FundCardProps>`
  cursor: pointer;
  border: 2px solid ${props => props.$isSelected ? theme.colors.primary : 'transparent'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.boxShadow.medium};
  }
`;

const RiskIndicator = styled.div<{ $risklevel: 'low' | 'medium' | 'high' }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
  margin-top: ${theme.spacing.sm};
  background-color: ${props => {
    switch (props.$risklevel) {
      case 'low':
        return '#d4edda';
      case 'medium':
        return '#fff3cd';
      case 'high':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.$risklevel) {
      case 'low':
        return '#155724';
      case 'medium':
        return '#856404';
      case 'high':
        return '#721c24';
      default:
        return '#383d41';
    }
  }};
`;

const FeeInfo = styled.div`
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.textSecondary};
`;

const PerformanceInfo = styled.div`
  margin-top: ${theme.spacing.md};
  font-size: ${theme.fontSizes.small};
`;

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xs};
`;

const PerformanceItem = styled.div`
  text-align: center;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.background};
`;

const PerformanceLabel = styled.div`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.textSecondary};
`;

const PerformanceValue = styled.div<{ $ispositive: boolean }>`
  font-weight: 600;
  color: ${props => props.$ispositive ? '#28a745' : '#dc3545'};
`;

const FundSelector: React.FC<{ funds: Fund[] }> = ({ funds }) => {
  const { selectedFund, setSelectedFund } = useInvestment();

  const handleSelectFund = (fund: Fund) => {
    setSelectedFund(fund);
  };

  return (
    <div>
      <h2>Select a fund</h2>
      <p>Choose a fund to invest in for your ISA. Currently you can select only one fund.</p>
      
      <FundGrid>
        {funds.map((fund) => (
          <FundCard 
            key={fund.id} 
            $isSelected={selectedFund?.id === fund.id}
            onClick={() => handleSelectFund(fund)}
          >
            <CardHeader>
              <CardTitle>{fund.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{fund.description}</p>
              <RiskIndicator $risklevel={fund.riskLevel}>
                Risk level: {fund.riskLevel === 'low' ? 'Low' : fund.riskLevel === 'medium' ? 'Medium' : 'High'}
              </RiskIndicator>
              <FeeInfo>
                Annual management fee: {fund.annualManagementFee}%
              </FeeInfo>

              {fund.pastPerformance && (
                <PerformanceInfo>
                  <div>Past performance:</div>
                  <PerformanceGrid>
                    {fund.pastPerformance.oneYear !== undefined && (
                      <PerformanceItem>
                        <PerformanceLabel>1 year</PerformanceLabel>
                        <PerformanceValue $ispositive={fund.pastPerformance.oneYear >= 0}>
                          {fund.pastPerformance.oneYear > 0 ? '+' : ''}{fund.pastPerformance.oneYear}%
                        </PerformanceValue>
                      </PerformanceItem>
                    )}
                    {fund.pastPerformance.threeYears !== undefined && (
                      <PerformanceItem>
                        <PerformanceLabel>3 years</PerformanceLabel>
                        <PerformanceValue $ispositive={fund.pastPerformance.threeYears >= 0}>
                          {fund.pastPerformance.threeYears > 0 ? '+' : ''}{fund.pastPerformance.threeYears}%
                        </PerformanceValue>
                      </PerformanceItem>
                    )}
                    {fund.pastPerformance.fiveYears !== undefined && (
                      <PerformanceItem>
                        <PerformanceLabel>5 years</PerformanceLabel>
                        <PerformanceValue $ispositive={fund.pastPerformance.fiveYears >= 0}>
                          {fund.pastPerformance.fiveYears > 0 ? '+' : ''}{fund.pastPerformance.fiveYears}%
                        </PerformanceValue>
                      </PerformanceItem>
                    )}
                  </PerformanceGrid>
                </PerformanceInfo>
              )}
            </CardContent>
          </FundCard>
        ))}
      </FundGrid>
    </div>
  );
};

export default FundSelector;