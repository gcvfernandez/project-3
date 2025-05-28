import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Users,
  DollarSign,
  CalendarDays,
  AlertTriangle,
  Ship,
  ChevronRight,
  Award
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { formatCurrency, formatDate, getStatusColor } from '../utils/formatters';
import { payrollPeriods, crews, vessels, alerts } from '../data/mockData';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
}> = ({ title, value, icon, trend }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs ${trend.positive ? 'text-green-500' : 'text-red-500'} mt-1`}>
            {trend.positive ? '↑' : '↓'} {trend.value} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardPage: React.FC = () => {
  const activeCrew = crews.filter(crew => crew.contractStatus === 'Active').length;
  const pendingCrew = crews.filter(crew => crew.contractStatus === 'Pending').length;
  const expiredCrew = crews.filter(crew => crew.contractStatus === 'Expired').length;
  
  const lastPayroll = payrollPeriods.find(period => period.status === 'Completed');
  const nextPayroll = payrollPeriods.find(period => period.status === 'Draft');
  
  const unreadAlerts = alerts.filter(alert => alert.status === 'unread').length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Crew"
          value={activeCrew}
          icon={<Users size={18} className="text-primary" />}
          trend={{ value: '3 crew', positive: true }}
        />
        <StatCard
          title="Last Payroll Total"
          value={formatCurrency(lastPayroll?.totalAmount || 0)}
          icon={<DollarSign size={18} className="text-primary" />}
          trend={{ value: '2.5%', positive: true }}
        />
        <StatCard
          title="Next Payroll Date"
          value={nextPayroll ? formatDate(nextPayroll.endDate) : 'N/A'}
          icon={<CalendarDays size={18} className="text-primary" />}
        />
        <StatCard
          title="Alerts"
          value={unreadAlerts.toString()}
          icon={<AlertTriangle size={18} className="text-primary" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Vessels Status</CardTitle>
            <Link to="/crew">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vessel Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Crew Count</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vessels.map((vessel) => (
                  <TableRow key={vessel.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Ship size={16} className="text-gray-500 mr-2" />
                        {vessel.name}
                      </div>
                    </TableCell>
                    <TableCell>{vessel.type}</TableCell>
                    <TableCell>{vessel.crewCount}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" size="sm" className="text-xs">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Recent Payrolls</CardTitle>
            <Link to="/payroll">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Crew Count</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollPeriods.slice(0, 4).map((period) => (
                  <TableRow key={period.id}>
                    <TableCell className="font-medium">
                      {formatDate(period.endDate)}
                    </TableCell>
                    <TableCell>{period.crewCount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(period.status)}`}>
                        {period.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(period.totalAmount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button className="ml-auto">
              <span>Run New Payroll</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Crew Status</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                <span className="text-xs text-gray-500">Active</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                <span className="text-xs text-gray-500">Pending</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                <span className="text-xs text-gray-500">Expired</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-green-500">{activeCrew}</div>
                    <div className="text-sm text-gray-500">Active</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-yellow-500">{pendingCrew}</div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-red-500">{expiredCrew}</div>
                    <div className="text-sm text-gray-500">Expired</div>
                  </div>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 float-left" 
                    style={{ width: `${(activeCrew / crews.length) * 100}%` }}
                  ></div>
                  <div 
                    className="h-full bg-yellow-500 float-left" 
                    style={{ width: `${(pendingCrew / crews.length) * 100}%` }}
                  ></div>
                  <div 
                    className="h-full bg-red-500 float-left" 
                    style={{ width: `${(expiredCrew / crews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="mr-2">
              <Award className="mr-2 h-4 w-4" />
              Top Performers
            </Button>
            <Button variant="outline" className="mr-2">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Reports
            </Button>
            <Link to="/crew">
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Manage Crew
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;