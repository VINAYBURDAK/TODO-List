
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabType } from '@/types';
import { ListCheck, BookText } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="container py-6 mb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">TaskHaven</h1>
        <div className="rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground">
          {new Date().toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabType)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-4 w-full md:w-[400px]">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ListCheck className="h-4 w-4" />
            <span>Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <BookText className="h-4 w-4" />
            <span>Notes</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
};

export default Header;
