import React, { useState } from 'react';
import { Calculator, DollarSign, RefreshCw, Save, Send, ChevronDown, Info, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Tabs, TabsList, TabTrigger, TabContent } from '../components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { formatCurrency } from '../utils/formatters';
import { crews, payrollItems, allottees } from '../data/mockData';

const PayrollProcessingPage: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState(56.8);
  const [payrollDate, setPayrollDate] = useState('2024-06-30');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Payroll Details</CardTitle>
            <div className="text-sm text-gray-500">June 2024</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payroll Date
                  </label>
                  <Input
                    type="date"
                    value={payrollDate}
                    onChange={(e) => setPayrollDate(e.target.value)}
                    className="w-44"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exchange Rate (USD to PHP)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <DollarSign size={14} />
                    </span>
                    <Input
                      type="number"
                      value={exchangeRate}
                      onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                      className="pl-9 w-44"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
              <Button>
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Payroll
              </Button>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList>
                <TabTrigger value="details">Details</TabTrigger>
                <TabTrigger value="allotments">Allotments</TabTrigger>
                <TabTrigger value="adjustments">Adjustments</TabTrigger>
              </TabsList>
              
              <TabContent value="details" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crew Name</TableHead>
                      <TableHead>Basic Pay (USD)</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Pay (USD)</TableHead>
                      <TableHead>Net Pay (PHP)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollItems.map((item) => {
                      const crew = crews.find((c) => c.id === item.crewId);
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {crew?.name}
                          </TableCell>
                          <TableCell>{formatCurrency(item.basicPay)}</TableCell>
                          <TableCell>{formatCurrency(item.overtimePay)}</TableCell>
                          <TableCell>
                            {formatCurrency(
                              item.sssDeduction +
                                item.phicDeduction +
                                item.hdmfDeduction +
                                item.taxDeduction +
                                item.otherDeductions
                            )}
                          </TableCell>
                          <TableCell>{formatCurrency(item.netPay)}</TableCell>
                          <TableCell>
                            {formatCurrency(item.netPay * exchangeRate, 'PHP')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabContent>
              
              <TabContent value="allotments" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crew Name</TableHead>
                      <TableHead>Allottee 1</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Allottee 2</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Onboard Pay</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollItems.map((item) => {
                      const crew = crews.find((c) => c.id === item.crewId);
                      const crewAllottees = allottees.filter((a) => a.crewId === item.crewId);
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{crew?.name}</TableCell>
                          <TableCell>{crewAllottees[0]?.name || '-'}</TableCell>
                          <TableCell>
                            {crewAllottees[0]
                              ? formatCurrency(crewAllottees[0].amount)
                              : '-'}
                          </TableCell>
                          <TableCell>{crewAllottees[1]?.name || '-'}</TableCell>
                          <TableCell>
                            {crewAllottees[1]
                              ? formatCurrency(crewAllottees[1].amount)
                              : '-'}
                          </TableCell>
                          <TableCell>{formatCurrency(item.onboardPay)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabContent>
              
              <TabContent value="adjustments" className="mt-4">
                <div className="flex justify-between mb-4">
                  <div className="text-sm font-medium text-gray-700">
                    Add adjustments, bonuses, or deductions for specific crew members
                  </div>
                  <Button size="sm">Add Adjustment</Button>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                  <div className="flex items-start">
                    <Info size={16} className="text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">No Adjustments</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        There are no adjustments for this payroll period. You can add bonuses,
                        deductions, or other adjustments using the button above.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crew Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No adjustments found
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Payroll Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Crew</div>
                <div className="text-2xl font-bold">{payrollItems.length}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Basic Pay</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    payrollItems.reduce((sum, item) => sum + item.basicPay, 0)
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Deductions</div>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(
                    payrollItems.reduce(
                      (sum, item) =>
                        sum +
                        item.sssDeduction +
                        item.phicDeduction +
                        item.hdmfDeduction +
                        item.taxDeduction +
                        item.otherDeductions,
                      0
                    )
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Net Pay</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    payrollItems.reduce((sum, item) => sum + item.netPay, 0)
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Allotments</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    payrollItems.reduce((sum, item) => sum + item.allotmentTotal, 0)
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Onboard Pay</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    payrollItems.reduce((sum, item) => sum + item.onboardPay, 0)
                  )}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Exchange Rate (USD to PHP)</div>
                <div className="text-xl font-medium">
                  1 USD = {exchangeRate.toFixed(2)} PHP
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Payroll
                </Button>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Recalculate
                </Button>
                <Button variant="secondary" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Process Remittances
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Payslips
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Compliance Check</CardTitle>
          <Button variant="outline" size="sm">
            Run Compliance Check
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-green-800">SSS Compliance</h4>
              <p className="text-sm text-green-700 mt-1">All crew members have proper SSS deductions.</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-green-800">PHIC Compliance</h4>
              <p className="text-sm text-green-700 mt-1">All PhilHealth deductions are compliant.</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-green-800">HDMF Compliance</h4>
              <p className="text-sm text-green-700 mt-1">All Pag-IBIG deductions are compliant.</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-green-800">80% Remittance Rule</h4>
              <p className="text-sm text-green-700 mt-1">All remittances follow POEA/DMW requirements.</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-green-800">Tax Compliance</h4>
              <p className="text-sm text-green-700 mt-1">All tax deductions are calculated correctly.</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-green-800">Allottee Validation</h4>
              <p className="text-sm text-green-700 mt-1">All allottee information is valid and complete.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollProcessingPage;