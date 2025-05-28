import React from 'react';
import { cn } from '../../utils/cn';

interface TabsContextValue {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
}

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className={cn('space-y-4', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div className={cn('flex space-x-1 border-b border-gray-200', className)}>
      {children}
    </div>
  );
};

interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabTrigger: React.FC<TabTriggerProps> = ({ value, children, className }) => {
  const { selectedTab, setSelectedTab } = useTabsContext();
  const isSelected = selectedTab === value;

  return (
    <button
      onClick={() => setSelectedTab(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-all',
        isSelected
          ? 'border-b-2 border-primary text-primary'
          : 'text-gray-500 hover:text-gray-700',
        className
      )}
    >
      {children}
    </button>
  );
};

interface TabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabContent: React.FC<TabContentProps> = ({ value, children, className }) => {
  const { selectedTab } = useTabsContext();
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div className={cn('rounded-md', className)}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabTrigger, TabContent };