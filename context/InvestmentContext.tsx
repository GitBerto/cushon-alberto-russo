'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Investment, Fund } from '../models/types';
import { availableFunds } from '../lib/mockData';

interface InvestmentContextType {
  selectedFund: Fund | null;
  deposits: Investment[];
  totalInvested: number;
  remainingAllowance: number;
  currentIsa: Fund | null;
  investmentAmount: number;
  setSelectedFund: (fund: Fund | null) => void;
  setInvestmentAmount: (amount: number) => void;
  submitInvestment: () => Promise<Investment>;
  isLoading: boolean;
  error: string | null;
  isAllowanceExceeded: (additionalAmount: number) => boolean;
}

const TOTAL_ISA_ALLOWANCE = 25000;
const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

interface InvestmentProviderProps {
  children: ReactNode;
}

export const InvestmentProvider: React.FC<InvestmentProviderProps> = ({ children }) => {
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [deposits, setDeposits] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const currentIsa = deposits.length > 0 
    ? availableFunds.find(fund => fund.id === deposits[0].fundId) || null 
    : null;
  
  const totalInvested = deposits.reduce((total, deposit) => total + deposit.amount, 0);
  const remainingAllowance = TOTAL_ISA_ALLOWANCE - totalInvested;
  const isAllowanceExceeded = (additionalAmount: number): boolean => {
    if (typeof additionalAmount !== 'number' || isNaN(additionalAmount)) {
      console.warn('isAllowanceExceeded called with a non-numeric value:', additionalAmount);
      return false;
    }
    return totalInvested + additionalAmount > TOTAL_ISA_ALLOWANCE;
  };
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch('/api/investments');
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.data)) {
            setDeposits(data.data);
          }
        }
      } catch (error) {
        console.error('Error loading deposits:', error);
      }
    };

    fetchDeposits();
  }, []);

  const submitInvestment = async (): Promise<Investment> => {
    setError(null);
    
    if (!selectedFund) {
      const errorMsg = 'No fund selected';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    if (!investmentAmount || investmentAmount <= 0) {
      const errorMsg = 'Invalid investment amount';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    if (currentIsa && currentIsa.id !== selectedFund.id) {
      const errorMsg = `You already have a ${currentIsa.name} ISA. You cannot change the ISA type.`;
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    if (isAllowanceExceeded(investmentAmount)) {
      const errorMsg = `The investment exceeds the total ISA limit of £${TOTAL_ISA_ALLOWANCE.toLocaleString()}`;
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setIsLoading(true);

    try {
      console.log('Sending POST request with:', {
        fundId: selectedFund.id,
        amount: investmentAmount,
      });
      
      const response = await fetch('/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fundId: selectedFund.id,
          amount: investmentAmount,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      if (!data.success || !data.data) {
        throw new Error('Invalid response from server');
      }
      
      const newDeposit = data.data as Investment;

      setDeposits(prevDeposits => [...prevDeposits, newDeposit]);
      
      setIsLoading(false);
      return newDeposit;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const value = {
    selectedFund,
    deposits,
    totalInvested,
    remainingAllowance,
    currentIsa,
    investmentAmount,
    setSelectedFund,
    setInvestmentAmount,
    submitInvestment,
    isLoading,
    error,
    isAllowanceExceeded,
  };

  return (
    <InvestmentContext.Provider value={value}>
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = (): InvestmentContextType => {
  const context = useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};