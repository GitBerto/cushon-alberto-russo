'use client';

import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';
import { theme } from '../styles/theme';
import { useInvestment } from '../context/InvestmentContext';
import { getFundById } from '../lib/mockData';
import Link from 'next/link';

const SummaryCard = styled(Card)`
  margin: ${theme.spacing.lg} 0;
`;

const StatusBadge = styled.span<{ status: 'pending' | 'completed' | 'failed' }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
  
  background-color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#fff3cd';
      case 'completed':
        return '#d4edda';
      case 'failed':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  }};
  
  color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#856404';
      case 'completed':
        return '#155724';
      case 'failed':
        return '#721c24';
      default:
        return '#383d41';
    }
  }};
`;

const SummaryTable = styled.div`
  width: 100%;
  margin-top: ${theme.spacing.md};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.div`
  font-weight: 500;
`;

const SummaryValue = styled.div`
  text-align: right;
`;

const SuccessMessage = styled.div`
  margin: ${theme.spacing.md} 0;
  padding: ${theme.spacing.md};
  background-color: #d4edda;
  color: #155724;
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const InvestmentSummary: React.FC = () => {
  const { investment } = useInvestment();
  
  if (!investment) {
    return (
      <SummaryCard>
        <CardContent>
          <p>No investment made. <Link href="/invest">Start investing</Link></p>
        </CardContent>
      </SummaryCard>
    );
  }
  
  const fund = getFundById(investment.fundId);
  
  if (!fund) {
    return (
      <SummaryCard>
        <CardContent>
          <p>Error: Fund not found</p>
        </CardContent>
      </SummaryCard>
    );
  }
  
  return (
    <SummaryCard>
      <CardHeader>
        <CardTitle>Investment Summary</CardTitle>
        <StatusBadge status={investment.status}>
          {investment.status === 'pending' ? 'Pending' : 
           investment.status === 'completed' ? 'Completed' : 'Failed'}
        </StatusBadge>
      </CardHeader>
      
      <CardContent>
        {investment.status === 'completed' && (
          <SuccessMessage>
            Your investment has been processed successfully!
          </SuccessMessage>
        )}
        
        <SummaryTable>
          <SummaryRow>
            <SummaryLabel>Investment ID</SummaryLabel>
            <SummaryValue>{investment.id}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Fund</SummaryLabel>
            <SummaryValue>{fund.name}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Amount invested</SummaryLabel>
            <SummaryValue>£{investment.amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Annual fee</SummaryLabel>
            <SummaryValue>{fund.annualManagementFee}%</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Investment date</SummaryLabel>
            <SummaryValue>{formatDate(investment.createdAt)}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Risk level</SummaryLabel>
            <SummaryValue>{fund.risklevel === 'low' ? 'Low' : fund.risklevel === 'medium' ? 'Medium' : 'High'}</SummaryValue>
          </SummaryRow>
        </SummaryTable>
      </CardContent>
      
      <CardFooter>
        <Link href="/invest" passHref>
          <Button as="a" variant="outline">
            Make another investment
          </Button>
        </Link>
      </CardFooter>
    </SummaryCard>
  );
};

export default InvestmentSummary;