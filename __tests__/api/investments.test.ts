import { availableFunds, getFundById } from '../../lib/mockData';

interface Fund {
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

interface ApiRequest {
  fundId: string;
  amount: number;
}

interface ApiResponse {
  status: number;
  body: { 
    success?: boolean;
    error?: string;
    data?: any;
  };
}

function mockApiInvestment(request: ApiRequest): ApiResponse {
  const { fundId, amount } = request;
  
  if (!fundId) {
    return {
      status: 400,
      body: { error: 'Fund not specified' }
    };
  }
  
  const fund = getFundById(fundId) as Fund | undefined;
  if (!fund) {
    return {
      status: 404, 
      body: { error: 'Fund not found' }
    };
  }
  
  if (!amount || isNaN(amount) || amount <= 0) {
    return {
      status: 400,
      body: { error: 'Invalid amount' }
    };
  }
  
  if (amount > 25000) {
    return {
      status: 400,
      body: { error: 'Amount exceeds ISA limit of £25,000' }
    };
  }
  
  return {
    status: 200,
    body: {
      success: true,
      data: {
        id: 'test-investment-' + Date.now(),
        fundId,
        fundName: fund.name,
        amount,
        date: new Date().toISOString(),
        status: 'completed'
      }
    }
  };
}

describe('Test API with TypeScript mocks', () => {
  it('should contain available funds', () => {
    expect(Array.isArray(availableFunds)).toBe(true);
    expect(availableFunds.length).toBeGreaterThan(0);
  });
  
  it('should find a fund by its ID', () => {
    const firstFund = availableFunds[0];
    const retrieved = getFundById(firstFund.id);
    expect(retrieved).toEqual(firstFund);
  });
  
  it('should accept a valid investment', () => {
    const request: ApiRequest = {
      fundId: availableFunds[0].id,
      amount: 5000
    };
    
    const response = mockApiInvestment(request);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.fundId).toBe(request.fundId);
    expect(response.body.data.amount).toBe(request.amount);
    expect(response.body.data.fundName).toBe(availableFunds[0].name);
  });
  
  it('should reject a non-existent fund', () => {
    const request: ApiRequest = {
      fundId: 'non-existent-fund',
      amount: 5000
    };
    
    const response = mockApiInvestment(request);
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Fund not found');
  });
  
  it('should reject an invalid amount', () => {
    const request: ApiRequest = {
      fundId: availableFunds[0].id,
      amount: -100
    };
    
    const response = mockApiInvestment(request);
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid amount');
  });
  
  it('should reject an amount that exceeds the limit', () => {
    const request: ApiRequest = {
      fundId: availableFunds[0].id,
      amount: 30000
    };
    
    const response = mockApiInvestment(request);
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Amount exceeds ISA limit of £25,000');
  });
});