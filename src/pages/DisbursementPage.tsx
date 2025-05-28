import React, { useState } from 'react';
import { FileText, Download, Send, CheckCircle, Filter, Banknote, Upload, RefreshCw, ChevronDown, Ship, DollarSign} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { formatCurrency, formatDate } from '../utils/formatters';
import { payrollPeriods, payrollItems, allottees } from '../data/mockData';

export const crews = [
  { id: 'c1', name: 'Juan Dela Cruz' },
  { id: 'c2', name: 'Maria Santos' },
  // …etc
];

const DisbursementPage: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState(payrollPeriods[0].id);
  
  const selectedPayrollPeriod = payrollPeriods.find(p => p.id === selectedPeriod);
  
  // Group allottees by bank
  const allotteesGroupedByBank = allottees.reduce((acc, allottee) => {
    const bank = allottee.bank;
    if (!acc[bank]) {
      acc[bank] = [];
    }
    acc[bank].push(allottee);
    return acc;
  }, {} as Record<string, typeof allottees>);
  
  // Calculate totals
  const totalAllotments = payrollItems.reduce((sum, item) => sum + item.allotmentTotal, 0);
  const totalOnboardPay = payrollItems.reduce((sum, item) => sum + item.onboardPay, 0);
  const grandTotal = totalAllotments + totalOnboardPay;
  
  // Filter allottees by selected bank
  const filteredAllottees = selectedBank === 'all' 
    ? allottees 
    : allottees.filter(a => a.bank === selectedBank);
  
  // Past disbursements dummy data
  const pastDisbursements = [
    { id: '1', date: '2024-05-31', filename: 'disbursement-may-2024.dat', status: 'Completed' },
    { id: '2', date: '2024-04-30', filename: 'disbursement-apr-2024.dat', status: 'Completed' },
    { id: '3', date: '2024-03-31', filename: 'disbursement-mar-2024.dat', status: 'Completed' }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disbursement & Compliance</h1>
          <p className="text-gray-500 mt-1">Manage remittances and generate bank files</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Send size={16} className="mr-2" />
            Process New Disbursement
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Disbursement Summary - {selectedPayrollPeriod ? formatDate(selectedPayrollPeriod.endDate) : 'Current Period'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payroll Period
                  </label>
                  <select 
                    className="form-select rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 focus:ring-opacity-50 w-full"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    {payrollPeriods.map(period => (
                      <option key={period.id} value={period.id}>
                        {formatDate(period.startDate)} - {formatDate(period.endDate)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Bank
                  </label>
                  <select 
                    className="form-select rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 focus:ring-opacity-50 w-full"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    <option value="all">All Banks</option>
                    <option value="BDO">BDO</option>
                    <option value="BPI">BPI</option>
                    <option value="Metrobank">Metrobank</option>
                    <option value="Landbank">Landbank</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Confirmation
                </Button>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate .DAT File
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Allotments</p>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(totalAllotments)}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Banknote size={20} className="text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Onboard Pay</p>
                      <p className="text-2xl font-bold text-secondary">{formatCurrency(totalOnboardPay)}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Ship size={20} className="text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Grand Total</p>
                      <p className="text-2xl font-bold">{formatCurrency(grandTotal)}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign size={20} className="text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Allottee Disbursement Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crew Name</TableHead>
                    <TableHead>Allottee Name</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAllottees.map((allottee) => {
                    const payrollItem = payrollItems.find(
                      (item) => item.crewId === allottee.crewId
                    );
                    const crewName = payrollItem 
                      ? crews.find(c => c.id === payrollItem.crewId)?.name 
                      : 'Unknown';
                    
                    return (
                      <TableRow key={allottee.id}>
                        <TableCell className="font-medium">{crewName}</TableCell>
                        <TableCell>{allottee.name}</TableCell>
                        <TableCell>{allottee.relationship}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Banknote size={14} className="text-gray-500 mr-2" />
                            {allottee.bank}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono">
                            {allottee.accountNumber.replace(/(\d{4})(\d{4})(\d{4})(\d*)/, '$1-$2-$3-$4')}
                          </span>
                        </TableCell>
                        <TableCell>{formatCurrency(allottee.amount)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle size={12} className="mr-1" /> Ready
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Bank Totals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(allotteesGroupedByBank).map(([bank, bankAllottees]) => {
                  const bankTotal = bankAllottees.reduce((sum, allottee) => sum + allottee.amount, 0);
                  
                  return (
                    <Card key={bank}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">{bank}</p>
                            <p className="text-xl font-bold">{formatCurrency(bankTotal)}</p>
                            <p className="text-xs text-gray-500 mt-1">{bankAllottees.length} allottees</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download size={14} className="mr-1" />
                            Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Disbursement History</CardTitle>
            <Button variant="outline" size="sm">
              View All
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastDisbursements.map((disbursement) => {
                  // Find the matching payroll period
                  const period = payrollPeriods.find(p => formatDate(p.endDate) === disbursement.date);
                  
                  return (
                    <TableRow key={disbursement.id}>
                      <TableCell className="font-medium">{disbursement.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText size={14} className="text-gray-500 mr-2" />
                          {disbursement.filename}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {disbursement.status}
                        </span>
                      </TableCell>
                      <TableCell>{formatCurrency(period?.totalAmount || 0)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="ml-auto">
              <Download className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DisbursementPage;