'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import FundSelector from '../../components/FundSelector';
import InvestmentForm from '../../components/InvestmentForm';
import { availableFunds } from '../../lib/mockData';

const PageTitle = styled.h1`
  margin-top: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
`;

const PageDescription = styled.p`
  margin-bottom: ${theme.spacing.lg};
  max-width: 800px;
`;

const StepTitle = styled.h2`
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.primary};
  padding-bottom: ${theme.spacing.xs};
  display: inline-block;
`;

const StepDescription = styled.p`
  margin-bottom: ${theme.spacing.md};
`;

const InvestPage = () => {
  return (
    <div>
      <PageTitle>Invest in your ISA</PageTitle>
      <PageDescription>
        The funds we offer through our ISAs have been selected to provide different investment 
        options based on your risk level and financial goals.
      </PageDescription>
      
      <div>
        <StepTitle>Step 1: Select a fund</StepTitle>
        <StepDescription>
          Choose a fund from our range of available options. You can select only one fund 
          at a time, but in the future it will be possible to diversify your investment across multiple funds.
        </StepDescription>
        <FundSelector funds={availableFunds} />
        
        <StepTitle>Step 2: Define the amount</StepTitle>
        <StepDescription>
          Specify how much you want to invest in the selected fund. Remember that the annual limit for 
          ISAs is £25,000, unless it is a transfer from another ISA.
        </StepDescription>
        <InvestmentForm />
      </div>
    </div>
  );
};

export default InvestPage;