import { availableFunds, getFundById } from '../../lib/mockData';

describe('Mock Data', () => {
  describe('availableFunds', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(availableFunds)).toBe(true);
      expect(availableFunds.length).toBeGreaterThan(0);
    });

    it('each fund should have the required properties', () => {
      availableFunds.forEach(fund => {
        expect(fund).toHaveProperty('id');
        expect(fund).toHaveProperty('name');
        expect(fund).toHaveProperty('description');
        expect(fund).toHaveProperty('riskLevel');
        expect(fund).toHaveProperty('annualManagementFee');
        expect(typeof fund.id).toBe('string');
        expect(typeof fund.name).toBe('string');
        expect(typeof fund.description).toBe('string');
        expect(['low', 'medium', 'high']).toContain(fund.riskLevel);
        expect(typeof fund.annualManagementFee).toBe('number');
      });
    });

    it('funds should have unique IDs', () => {
      const ids = availableFunds.map(fund => fund.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(availableFunds.length);
    });

    it('funds should have unique names', () => {
      const names = availableFunds.map(fund => fund.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(availableFunds.length);
    });

    it('annual fees should be positive and less than 5%', () => {
      availableFunds.forEach(fund => {
        expect(fund.annualManagementFee).toBeGreaterThan(0);
        expect(fund.annualManagementFee).toBeLessThan(5);
      });
    });

    it('the "Cushon Equities Fund" should exist', () => {
      const equitiesFund = availableFunds.find(fund => fund.name === 'Cushon Equities Fund');
      expect(equitiesFund).toBeDefined();
    });
  });

  describe('getFundById', () => {
    it('should return a valid fund with a valid ID', () => {
      const firstFund = availableFunds[0];
      const retrievedFund = getFundById(firstFund.id);
      
      expect(retrievedFund).toBeDefined();
      expect(retrievedFund).toEqual(firstFund);
    });

    it('should return undefined with an invalid ID', () => {
      const retrievedFund = getFundById('non-existent-fund');
      expect(retrievedFund).toBeUndefined();
    });

    it('should find all available funds by ID', () => {
      availableFunds.forEach(fund => {
        const retrievedFund = getFundById(fund.id);
        expect(retrievedFund).toEqual(fund);
      });
    });
  });

  describe('Fund Performance', () => {
    it('all funds should have past performance data', () => {
      availableFunds.forEach(fund => {
        expect(fund).toHaveProperty('pastPerformance');
        expect(fund.pastPerformance).toBeDefined();
      });
    });

    it('performance data should follow the expected format', () => {
      availableFunds.forEach(fund => {
        const hasPerformanceData = 
          fund.pastPerformance?.oneYear !== undefined || 
          fund.pastPerformance?.threeYears !== undefined || 
          fund.pastPerformance?.fiveYears !== undefined;
          
        expect(hasPerformanceData).toBe(true);
        
        if (fund.pastPerformance?.oneYear !== undefined) {
          expect(typeof fund.pastPerformance.oneYear).toBe('number');
        }
        
        if (fund.pastPerformance?.threeYears !== undefined) {
          expect(typeof fund.pastPerformance.threeYears).toBe('number');
        }
        
        if (fund.pastPerformance?.fiveYears !== undefined) {
          expect(typeof fund.pastPerformance.fiveYears).toBe('number');
        }
      });
    });
  });
});