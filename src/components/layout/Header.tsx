import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatters';
import { alerts } from '../../data/mockData';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, title }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const unreadAlerts = alerts.filter(alert => alert.status === 'unread').length;
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu size={20} />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
          >
            <Bell size={20} />
            {unreadAlerts > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadAlerts}
              </span>
            )}
          </Button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      alert.status === 'unread' ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-800">{alert.message}</p>
                      {alert.status === 'unread' && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(alert.date)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200">
                <Button variant="link" className="w-full text-center text-sm">
                  View all notifications
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          >
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
              <User size={16} className="text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              Admin User
            </span>
            <ChevronDown size={16} className="ml-1 text-gray-500" />
          </Button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="p-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@oneshipping.com</p>
              </div>
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm px-3 py-2 hover:bg-gray-100"
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm px-3 py-2 hover:bg-gray-100"
                >
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Sign out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;