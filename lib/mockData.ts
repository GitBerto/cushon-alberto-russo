import { Fund } from '../models/types';

export const availableFunds: Fund[] = [
  {
    id: 'cushon-equities',
    name: 'Cushon Equities Fund',
    description: 'A fund that primarily invests in shares of large global companies, designed to offer long-term capital growth.',
    riskLevel: 'high',
    annualManagementFee: 0.75,
    pastPerformance: {
      oneYear: 8.2,
      threeYears: 24.5,
      fiveYears: 42.1,
    },
  },
  {
    id: 'cushon-balanced',
    name: 'Cushon Balanced Fund',
    description: 'A balanced fund that invests in a mix of stocks and bonds to offer moderate growth with reduced volatility.',
    riskLevel: 'medium',
    annualManagementFee: 0.6,
    pastPerformance: {
      oneYear: 5.4,
      threeYears: 16.8,
      fiveYears: 28.3,
    },
  },
  {
    id: 'cushon-bonds',
    name: 'Cushon Bonds Fund',
    description: 'A fund that primarily invests in government and corporate bonds to generate income with lower volatility compared to stocks.',
    riskLevel: 'low',
    annualManagementFee: 0.45,
    pastPerformance: {
      oneYear: 2.8,
      threeYears: 8.5,
      fiveYears: 14.2,
    },
  },
  {
    id: 'cushon-esg',
    name: 'Cushon ESG Fund',
    description: 'A fund that invests in companies with strong environmental, social, and governance credentials, focused on sustainable investments.',
    riskLevel: 'medium',
    annualManagementFee: 0.8,
    pastPerformance: {
      oneYear: 7.1,
      threeYears: 21.3,
      fiveYears: 36.5,
    },
  },
];

export const getFundById = (id: string): Fund | undefined => {
  return availableFunds.find(fund => fund.id === id);
};