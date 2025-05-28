import { Crew, Allottee, PayrollPeriod, PayrollItem, User, Vessel, Alert } from '../types';

export const crews: Crew[] = [
  {
    id: '1',
    name: 'Juan Dela Cruz',
    rank: 'Captain',
    vessel: 'MV Pacific Voyager',
    contractStatus: 'Active',
    contractStart: '2024-01-15',
    contractEnd: '2025-01-14',
    basicPay: 5000,
    currency: 'USD',
    email: 'juan.delacruz@example.com',
    phone: '+639171234567',
    nationality: 'Filipino',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '2',
    name: 'Maria Santos',
    rank: 'Chief Officer',
    vessel: 'MV Pacific Voyager',
    contractStatus: 'Active',
    contractStart: '2024-02-01',
    contractEnd: '2025-01-31',
    basicPay: 4500,
    currency: 'USD',
    email: 'maria.santos@example.com',
    phone: '+639187654321',
    nationality: 'Filipino',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '3',
    name: 'Pedro Gonzales',
    rank: 'Second Officer',
    vessel: 'MV Atlantic Explorer',
    contractStatus: 'Active',
    contractStart: '2024-03-15',
    contractEnd: '2025-03-14',
    basicPay: 3800,
    currency: 'USD',
    email: 'pedro.gonzales@example.com',
    phone: '+639191122334',
    nationality: 'Filipino',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '4',
    name: 'Anna Reyes',
    rank: 'Chief Engineer',
    vessel: 'MV Atlantic Explorer',
    contractStatus: 'Active',
    contractStart: '2024-01-10',
    contractEnd: '2025-01-09',
    basicPay: 4800,
    currency: 'USD',
    email: 'anna.reyes@example.com',
    phone: '+639195544332',
    nationality: 'Filipino',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '5',
    name: 'Roberto Lim',
    rank: 'Able Seaman',
    vessel: 'MV Pacific Voyager',
    contractStatus: 'Expired',
    contractStart: '2023-05-01',
    contractEnd: '2024-04-30',
    basicPay: 2000,
    currency: 'USD',
    email: 'roberto.lim@example.com',
    phone: '+639199988776',
    nationality: 'Filipino',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '6',
    name: 'Sofia Cruz',
    rank: 'Third Officer',
    vessel: 'MV Indian Star',
    contractStatus: 'Pending',
    contractStart: '2024-06-15',
    contractEnd: '2025-06-14',
    basicPay: 3500,
    currency: 'USD',
    email: 'sofia.cruz@example.com',
    phone: '+639192233445',
    nationality: 'Filipino',
    photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  }
];

export const allottees: Allottee[] = [
  {
    id: '1',
    crewId: '1',
    name: 'Maria Dela Cruz',
    relationship: 'Spouse',
    bank: 'BDO',
    accountNumber: '1234567890',
    amount: 2500,
    percentage: 50
  },
  {
    id: '2',
    crewId: '1',
    name: 'Juan Dela Cruz Jr.',
    relationship: 'Son',
    bank: 'BPI',
    accountNumber: '0987654321',
    amount: 1000,
    percentage: 20
  },
  {
    id: '3',
    crewId: '2',
    name: 'Jose Santos',
    relationship: 'Father',
    bank: 'Metrobank',
    accountNumber: '5678901234',
    amount: 2000,
    percentage: 45
  },
  {
    id: '4',
    crewId: '3',
    name: 'Elena Gonzales',
    relationship: 'Spouse',
    bank: 'BDO',
    accountNumber: '6789012345',
    amount: 1900,
    percentage: 50
  },
  {
    id: '5',
    crewId: '4',
    name: 'Marco Reyes',
    relationship: 'Spouse',
    bank: 'BPI',
    accountNumber: '7890123456',
    amount: 2400,
    percentage: 50
  },
  {
    id: '6',
    crewId: '4',
    name: 'Lisa Reyes',
    relationship: 'Daughter',
    bank: 'Landbank',
    accountNumber: '8901234567',
    amount: 1000,
    percentage: 20
  }
];

export const payrollPeriods: PayrollPeriod[] = [
  {
    id: '1',
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    status: 'Completed',
    exchangeRate: 56.5,
    totalAmount: 19600,
    crewCount: 4
  },
  {
    id: '2',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    status: 'Completed',
    exchangeRate: 56.2,
    totalAmount: 19500,
    crewCount: 4
  },
  {
    id: '3',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    status: 'Completed',
    exchangeRate: 55.8,
    totalAmount: 19200,
    crewCount: 4
  },
  {
    id: '4',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    status: 'Draft',
    exchangeRate: 56.8,
    totalAmount: 0,
    crewCount: 5
  }
];

export const payrollItems: PayrollItem[] = [
  {
    id: '1',
    crewId: '1',
    periodId: '1',
    basicPay: 5000,
    overtimePay: 500,
    hazardPay: 250,
    otherAllowances: 100,
    sssDeduction: 200,
    phicDeduction: 150,
    hdmfDeduction: 100,
    taxDeduction: 400,
    otherDeductions: 50,
    netPay: 4950,
    allotmentTotal: 3500,
    onboardPay: 1450
  },
  {
    id: '2',
    crewId: '2',
    periodId: '1',
    basicPay: 4500,
    overtimePay: 400,
    hazardPay: 225,
    otherAllowances: 75,
    sssDeduction: 180,
    phicDeduction: 135,
    hdmfDeduction: 90,
    taxDeduction: 350,
    otherDeductions: 45,
    netPay: 4400,
    allotmentTotal: 2000,
    onboardPay: 2400
  },
  {
    id: '3',
    crewId: '3',
    periodId: '1',
    basicPay: 3800,
    overtimePay: 300,
    hazardPay: 190,
    otherAllowances: 60,
    sssDeduction: 150,
    phicDeduction: 115,
    hdmfDeduction: 80,
    taxDeduction: 280,
    otherDeductions: 40,
    netPay: 3685,
    allotmentTotal: 1900,
    onboardPay: 1785
  },
  {
    id: '4',
    crewId: '4',
    periodId: '1',
    basicPay: 4800,
    overtimePay: 450,
    hazardPay: 240,
    otherAllowances: 90,
    sssDeduction: 190,
    phicDeduction: 145,
    hdmfDeduction: 95,
    taxDeduction: 380,
    otherDeductions: 45,
    netPay: 4725,
    allotmentTotal: 3400,
    onboardPay: 1325
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@oneshipping.com',
    role: 'Admin',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '2',
    name: 'Payroll Manager',
    email: 'payroll@oneshipping.com',
    role: 'Payroll Officer',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '3',
    name: 'Finance Manager',
    email: 'finance@oneshipping.com',
    role: 'Finance Officer',
    avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  }
];

export const vessels: Vessel[] = [
  {
    id: '1',
    name: 'MV Pacific Voyager',
    type: 'Container Ship',
    crewCount: 3
  },
  {
    id: '2',
    name: 'MV Atlantic Explorer',
    type: 'Bulk Carrier',
    crewCount: 2
  },
  {
    id: '3',
    name: 'MV Indian Star',
    type: 'Tanker',
    crewCount: 1
  },
  {
    id: '4',
    name: 'MV Mediterranean Dream',
    type: 'Cruise Ship',
    crewCount: 0
  }
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'contract',
    message: 'Roberto Lim\'s contract has expired.',
    date: '2024-04-30',
    status: 'unread'
  },
  {
    id: '2',
    type: 'payroll',
    message: 'June 2024 payroll is ready for processing.',
    date: '2024-06-01',
    status: 'unread'
  },
  {
    id: '3',
    type: 'document',
    message: 'Certificate of Employment requested by Juan Dela Cruz.',
    date: '2024-05-28',
    status: 'read'
  },
  {
    id: '4',
    type: 'contract',
    message: 'Sofia Cruz\'s contract is pending approval.',
    date: '2024-05-25',
    status: 'read'
  }
];