import { NextResponse } from 'next/server';
import { availableFunds } from '../../../lib/mockData';
import type { Investment } from '../../../models/types';

let deposits: Investment[] = [];

const TOTAL_ISA_ALLOWANCE = 25000;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.fundId || data.amount === undefined) {
      return NextResponse.json({ 
        error: 'Required fields missing', 
        details: { fundId: !!data.fundId, amount: data.amount !== undefined } 
      }, { status: 400 });
    }

    const fund = availableFunds.find(f => f.id === data.fundId);
    if (!fund) {
      return NextResponse.json({ 
        error: 'Fund not found',
        details: { requestedFundId: data.fundId, availableFunds: availableFunds.map(f => f.id) }
      }, { status: 404 });
    }
    
    const amount = typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount;
    
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ 
        error: 'Invalid investment amount',
        details: { amount, parsed: parseFloat(data.amount) }
      }, { status: 400 });
    }
    
    const totalDeposited = deposits.reduce((sum, dep) => sum + dep.amount, 0);
    
    if (totalDeposited + amount > TOTAL_ISA_ALLOWANCE) {
      return NextResponse.json({ 
        error: `Investment exceeds ISA limit. You can invest a maximum of £${(TOTAL_ISA_ALLOWANCE - totalDeposited).toLocaleString()}`,
        details: { totalDeposited, newAmount: amount, limit: TOTAL_ISA_ALLOWANCE, remaining: TOTAL_ISA_ALLOWANCE - totalDeposited }
      }, { status: 400 });
    }
    
    if (deposits.length > 0 && deposits[0].fundId !== data.fundId) {
      const existingFund = availableFunds.find(f => f.id === deposits[0].fundId);
      return NextResponse.json({ 
        error: `You already have a ${existingFund?.name || 'existing'} ISA. You cannot change ISA type.`,
        details: { currentFundId: deposits[0].fundId, requestedFundId: data.fundId }
      }, { status: 400 });
    }
    
    const newDeposit: Investment = {
      id: `dep_${Date.now()}`,
      fundId: data.fundId,
      amount: amount,
      createdAt: new Date().toISOString(),
      status: 'completed',
    };
    
    deposits.push(newDeposit);
    
    return NextResponse.json({ 
      success: true, 
      data: newDeposit 
    });
  } catch (error) {
    console.error('Error while creating deposit:', error);
    return NextResponse.json({ 
      error: 'An internal error occurred',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  
  return NextResponse.json({ 
    success: true, 
    data: deposits,
    meta: {
      totalInvested: deposits.reduce((sum, dep) => sum + dep.amount, 0),
      remainingAllowance: TOTAL_ISA_ALLOWANCE - deposits.reduce((sum, dep) => sum + dep.amount, 0),
      currentFundId: deposits.length > 0 ? deposits[0].fundId : null
    }
  });
}