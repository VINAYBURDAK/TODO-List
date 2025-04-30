
import React from 'react';
import { ListCheck, BookText } from 'lucide-react';
import { TabType } from '@/types';

interface EmptyStateProps {
  type: TabType;
  onClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="bg-muted rounded-full p-4 mb-4">
        {type === 'tasks' ? (
          <ListCheck className="h-10 w-10 text-muted-foreground" />
        ) : (
          <BookText className="h-10 w-10 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-xl font-medium mb-2">No {type === 'tasks' ? 'tasks' : 'notes'} yet</h3>
      <p className="text-muted-foreground mb-6 text-center">
        {type === 'tasks' 
          ? 'Create your first task to get started.'
          : 'Create your first note to get started.'}
      </p>
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
      >
        Create {type === 'tasks' ? 'Task' : 'Note'}
      </button>
    </div>
  );
};

export default EmptyState;
