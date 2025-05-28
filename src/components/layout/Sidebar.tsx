import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { 
  Ship, 
  Users, 
  Calculator, 
  FileText, 
  BarChart3, 
  FileOutput, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-gray-600 hover:text-primary hover:bg-primary/5'
      )}
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      {label}
    </Link>
  );
};

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const location = useLocation();
  
  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/crew', icon: <Users size={20} />, label: 'Crew Management' },
    { to: '/payroll', icon: <Calculator size={20} />, label: 'Payroll Processing' },
    { to: '/disbursement', icon: <FileText size={20} />, label: 'Disbursement' },
    { to: '/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
    { to: '/documents', icon: <FileOutput size={20} />, label: 'Documents' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];
  
  return (
    <div 
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
        {collapsed ? (
          <Ship className="h-8 w-8 text-primary" />
        ) : (
          <div className="flex items-center">
            <Ship className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold text-gray-900">OneShipping</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={collapsed ? '' : item.label}
              active={location.pathname === item.to}
            />
          ))}
        </nav>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <button className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors",
          collapsed && "justify-center"
        )}>
          <LogOut size={20} className="mr-3" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;