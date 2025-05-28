export interface Crew {
  id: string;
  name: string;
  rank: string;
  vessel: string;
  contractStatus: 'Active' | 'Expired' | 'Pending';
  contractStart: string;
  contractEnd: string;
  basicPay: number;
  currency: 'USD' | 'PHP';
  email: string;
  phone: string;
  nationality: string;
  photo?: string;
}

export interface Allottee {
  id: string;
  crewId: string;
  name: string;
  relationship: string;
  bank: string;
  accountNumber: string;
  amount: number;
  percentage: number;
}

export interface PayrollPeriod {
  id: string;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Processing' | 'Completed';
  exchangeRate: number;
  totalAmount: number;
  crewCount: number;
}

export interface PayrollItem {
  id: string;
  crewId: string;
  periodId: string;
  basicPay: number;
  overtimePay: number;
  hazardPay: number;
  otherAllowances: number;
  sssDeduction: number;
  phicDeduction: number;
  hdmfDeduction: number;
  taxDeduction: number;
  otherDeductions: number;
  netPay: number;
  allotmentTotal: number;
  onboardPay: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Payroll Officer' | 'Finance Officer' | 'Crew';
  avatar?: string;
}

export interface Vessel {
  id: string;
  name: string;
  type: string;
  crewCount: number;
}

export interface Alert {
  id: string;
  type: 'contract' | 'payroll' | 'document';
  message: string;
  date: string;
  status: 'read' | 'unread';
}