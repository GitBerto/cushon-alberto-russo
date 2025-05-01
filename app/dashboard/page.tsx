'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import DepositsHistory from '../../components/DepositsHistory';
import { Card, CardContent } from '../../components/ui/Card';
import { useInvestment } from '../../context/InvestmentContext';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';

const PageTitle = styled.h1`
  margin-top: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xxl};
`;

const AllowanceCard = styled(Card)<{ $isWarning: boolean }>`
  background-color: ${props => props.$isWarning ? '#fff3cd' : '#d4edda'};
  color: ${props => props.$isWarning ? '#856404' : '#155724'};
  margin-bottom: ${theme.spacing.lg};
`;

const SummarySection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ActionsSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${theme.spacing.lg} 0;
`;

const DashboardPage = () => {
  const { 
    deposits, 
    remainingAllowance, 
    totalInvested,
    currentIsa
  } = useInvestment();

  const hasDeposits = deposits.length > 0;

  const isAllowanceAlmostExhausted = remainingAllowance <= 2000 && remainingAllowance > 0;

  const isAllowanceExhausted = remainingAllowance <= 0;
  
  return (
    <div>
      <PageTitle>Your ISA Dashboard</PageTitle>
      <AllowanceCard $isWarning={isAllowanceAlmostExhausted || isAllowanceExhausted}>
        <CardContent>
          <h3>ISA Limit: £25,000.00</h3>
          <p>
            {isAllowanceExhausted ? (
              'You have reached the total ISA limit. You cannot make further investments.'
            ) : isAllowanceAlmostExhausted ? (
              `Your ISA limit is almost depleted. You still have ${remainingAllowance.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })} available.`
            ) : (
              `You have invested ${totalInvested.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })} of your ISA limit. 
              You still have ${remainingAllowance.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })} available.`
            )}
          </p>
        </CardContent>
      </AllowanceCard>
      
      <DashboardGrid>
        <SummarySection>
          <DepositsHistory />
        </SummarySection>
      </DashboardGrid>
      
      <ActionsSection>
        {!isAllowanceExhausted && (
          <ButtonLink href="/invest">
            {hasDeposits ? 
              `Add funds to your ${currentIsa?.name || 'ISA'}` : 
              'Start investing'}
          </ButtonLink>
        )}
      </ActionsSection>
    </div>
  );
};

export default DashboardPage;