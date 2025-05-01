'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { FormGroup, Label, Input, ErrorMessage } from './ui/Input';
import Button from './ui/Button';
import { theme } from '../styles/theme';
import { useInvestment } from '../context/InvestmentContext';

const FormCard = styled(Card)`
  max-width: 600px;
  margin: ${theme.spacing.lg} 0;
`;

const FormContainer = styled.form`
  width: 100%;
`;

const CurrencyInput = styled.div`
  position: relative;
  
  & > input {
    padding-left: 2rem;
  }
  
  &::before {
    content: '£';
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 600;
    color: ${theme.colors.text};
  }
`;

const Summary = styled.div`
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
`;

const SummaryTitle = styled.h4`
  margin-bottom: ${theme.spacing.sm};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xs};
  
  &:last-child {
    margin-bottom: 0;
    padding-top: ${theme.spacing.xs};
    border-top: 1px solid ${theme.colors.border};
    font-weight: 600;
  }
`;

const AllowanceInfo = styled.div<{ $isWarning: boolean }>`
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: ${props => props.$isWarning ? '#fff3cd' : '#d4edda'};
  color: ${props => props.$isWarning ? '#856404' : '#155724'};
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
`;

const ErrorAlert = styled.div`
  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: ${theme.borderRadius.medium};
  font-weight: 500;
`;

interface FormData {
  amount: number;
}

const InvestmentForm: React.FC = () => {
  const router = useRouter();
  const { 
    selectedFund, 
    investmentAmount, 
    setInvestmentAmount, 
    submitInvestment, 
    isLoading,
    remainingAllowance,
    isAllowanceExceeded,
    totalInvested,
    currentIsa,
    error
  } = useInvestment();
  
  const [showSummary, setShowSummary] = useState(false);
  const [exceededAllowance, setExceededAllowance] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    defaultValues: {
      amount: investmentAmount > 0 ? investmentAmount : undefined,
    },
  });

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const watchedAmount = watch('amount');
  
  useEffect(() => {
    if (watchedAmount) {
      setExceededAllowance(isAllowanceExceeded(watchedAmount));
    } else {
      setExceededAllowance(false);
    }
  }, [watchedAmount, isAllowanceExceeded]);

  const onSubmit = async (data: FormData) => {
    setFormError(null);

    if (isAllowanceExceeded(data.amount)) {
      setFormError(`The amount exceeds the available limit of £${remainingAllowance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`);
      return;
    }
    
    setInvestmentAmount(data.amount);
    setShowSummary(true);
  };

  const handleConfirm = async () => {
    setFormError(null);
    try {
      await submitInvestment();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting investment:', error);
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('An error occurred while submitting the investment');
      }
      setShowSummary(false);
    }
  };

  if (!selectedFund) {
    return (
      <FormCard>
        <CardContent>
          <p>Select a fund first to continue</p>
        </CardContent>
      </FormCard>
    );
  }

  if (currentIsa && selectedFund.id !== currentIsa.id) {
    return (
      <FormCard>
        <CardHeader>
          <CardTitle>Incompatible ISA type</CardTitle>
        </CardHeader>
        <CardContent>
          <AllowanceInfo $isWarning={true}>
            You already have a {currentIsa.name} ISA. You cannot invest in a different type of ISA.
          </AllowanceInfo>
          <p style={{ marginTop: theme.spacing.md }}>
            You can only add funds to your existing {currentIsa.name} up to the £25,000 limit.
          </p>
        </CardContent>
      </FormCard>
    );
  }

  if (remainingAllowance <= 0) {
    return (
      <FormCard>
        <CardHeader>
          <CardTitle>ISA limit reached</CardTitle>
        </CardHeader>
        <CardContent>
          <AllowanceInfo $isWarning={true}>
            You have reached the total ISA limit of £25,000. You cannot make further investments.
          </AllowanceInfo>
          <p style={{ marginTop: theme.spacing.md }}>
            You have invested a total of £{totalInvested.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
          </p>
        </CardContent>
      </FormCard>
    );
  }

  return (
    <FormCard>
      <CardHeader>
        <CardTitle>Investment Details</CardTitle>
      </CardHeader>
      <CardContent>
        {formError && (
          <ErrorAlert>
            {formError}
          </ErrorAlert>
        )}
        
        {!showSummary ? (
          <>
            <AllowanceInfo $isWarning={false}>
              Available limit: £{remainingAllowance.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </AllowanceInfo>
            
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label htmlFor="amount">How much would you like to invest?</Label>
                <CurrencyInput>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    $fullWidth
                    $hasError={!!errors.amount || exceededAllowance}
                    {...register('amount', {
                      required: 'This field is required',
                      min: {
                        value: 1,
                        message: 'The minimum investment amount is £1',
                      },
                      validate: {
                        notExceedAllowance: value => 
                          !isAllowanceExceeded(value) || 
                          `The amount exceeds the available limit of £${remainingAllowance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`
                      }
                    })}
                  />
                </CurrencyInput>
                {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
                <p style={{ marginTop: theme.spacing.sm, fontSize: theme.fontSizes.small, color: theme.colors.textSecondary }}>
                  Remember that the total ISA limit is £25,000.
                </p>
              </FormGroup>
              
              <Button 
                type="submit" 
                variant="primary" 
                size="medium" 
                $fullwidth
                disabled={exceededAllowance}
              >
                Continue
              </Button>
            </FormContainer>
          </>
        ) : (
          <div>
            <p>You are about to invest in the following fund:</p>
            
            <Summary>
              <SummaryTitle>Investment Summary</SummaryTitle>
              <SummaryItem>
                <span>Fund:</span>
                <span>{selectedFund.name}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Risk level:</span>
                <span>{selectedFund.riskLevel === 'low' ? 'Low' : selectedFund.riskLevel === 'medium' ? 'Medium' : 'High'}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Annual fee:</span>
                <span>{selectedFund.annualManagementFee}%</span>
              </SummaryItem>
              <SummaryItem>
                <span>Amount to invest:</span>
                <span>£{investmentAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Remaining limit after investment:</span>
                <span>£{(remainingAllowance - investmentAmount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </SummaryItem>
            </Summary>
          </div>
        )}
      </CardContent>
      
      {showSummary && (
        <CardFooter>
          <Button
            variant="outline"
            size="medium"
            onClick={() => setShowSummary(false)}
            style={{ marginRight: theme.spacing.sm }}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Confirm Investment'}
          </Button>
        </CardFooter>
      )}
    </FormCard>
  );
};

export default InvestmentForm;