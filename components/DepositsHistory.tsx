'use client';

import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { theme } from '../styles/theme';
import { useInvestment } from '../context/InvestmentContext';
import Link from 'next/link';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${theme.spacing.md};
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.border};
  color: ${theme.colors.textSecondary};
  font-weight: 600;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${theme.colors.background};
  }
  
  &:hover {
    opcity: .8;
  }
`;

const TableCell = styled.td`
  padding: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.border};
`;

const StatusIndicator = styled.span<{ status: 'pending' | 'completed' | 'failed' }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: ${theme.spacing.xs};
  background-color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#ffc107';
      case 'completed':
        return '#28a745';
      case 'failed':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }};
`;

const NoDepositsMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg} 0;
  color: ${theme.colors.textSecondary};
`;

const TotalRow = styled.tr`
  background-color: ${theme.colors.primary};
  color: white;
  font-weight: 600;
`;

const ISAInfoCard = styled.div`
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatCurrency = (amount: number): string => {
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const DepositsHistory: React.FC = () => {
  const { deposits, totalInvested, remainingAllowance, currentIsa } = useInvestment();
  
  if (!deposits || deposits.length === 0) {
    return (
      <Card>
        <CardContent>
          <NoDepositsMessage>
            <p>You haven't made any investments yet.</p>
            <p>
              <Link href="/invest">Start investing</Link> in your ISA.
            </p>
          </NoDepositsMessage>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your ISA Deposits</CardTitle>
      </CardHeader>
      <CardContent>
        {currentIsa && (
          <ISAInfoCard>
            <h3>Your ISA: {currentIsa.name}</h3>
            <p>Risk level: {currentIsa.riskLevel === 'low' ? 'Low' : currentIsa.riskLevel === 'medium' ? 'Medium' : 'High'}</p>
            <p>Annual fee: {currentIsa.annualManagementFee}%</p>
          </ISAInfoCard>
        )}
        
        <div>
          <p><strong>Total ISA limit:</strong> £25,000.00</p>
          <p><strong>Amount invested:</strong> {formatCurrency(totalInvested)}</p>
          <p><strong>Remaining limit:</strong> {formatCurrency(remainingAllowance)}</p>
        </div>
        
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Status</TableHeader>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <TableRow key={deposit.id}>
                <TableCell>{formatDate(deposit.createdAt)}</TableCell>
                <TableCell>{formatCurrency(deposit.amount)}</TableCell>
                <TableCell>
                  <StatusIndicator status={deposit.status} />
                  {deposit.status === 'pending' ? 'Pending' : 
                   deposit.status === 'completed' ? 'Completed' : 'Failed'}
                </TableCell>
              </TableRow>
            ))}
            <TotalRow>
              <TableCell>Total</TableCell>
              <TableCell>{formatCurrency(totalInvested)}</TableCell>
              <TableCell></TableCell>
            </TotalRow>
          </tbody>
        </StyledTable>
      </CardContent>
    </Card>
  );
};

export default DepositsHistory;