export interface Fund {
    id: string;
    name: string;
    description: string;
    riskLevel: 'low' | 'medium' | 'high';
    annualManagementFee: number;
    pastPerformance?: {
      oneYear?: number;
      threeYears?: number;
      fiveYears?: number;
    };
  }

  export interface Investment {
    id: string;
    fundId: string;
    amount: number;
    createdAt: string;
    status: 'pending' | 'completed' | 'failed';
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface InvestmentFormData {
    fundId: string;
    amount: number;
  }