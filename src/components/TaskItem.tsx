
import React from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  // Format the due date if it exists
  const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy h:mm a') : null;
  
  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!task.dueDate) return null;
    
    const now = Date.now();
    if (now > task.dueDate) return "Expired";
    
    const msRemaining = task.dueDate - now;
    const minutesRemaining = Math.floor(msRemaining / (1000 * 60));
    
    if (minutesRemaining < 60) return `${minutesRemaining} min left`;
    
    const hoursRemaining = Math.floor(minutesRemaining / 60);
    if (hoursRemaining < 24) return `${hoursRemaining} hours left`;
    
    const daysRemaining = Math.floor(hoursRemaining / 24);
    return `${daysRemaining} days left`;
  };

  const timeRemaining = getTimeRemaining();
  const isExpired = timeRemaining === "Expired";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center justify-between p-4 border rounded-lg mb-2 group hover:border-primary/30 transition-colors ${
        isExpired ? 'border-destructive/30 bg-destructive/5' : task.completed ? 'bg-muted/20' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <Checkbox 
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          disabled={isExpired}
        />
        <div>
          <label 
            htmlFor={`task-${task.id}`}
            className={`text-md cursor-pointer block ${
              task.completed ? 'line-through text-muted-foreground' : 
              isExpired ? 'text-muted-foreground' : ''
            }`}
          >
            {task.title}
          </label>
          
          {task.dueDate && (
            <div className="flex items-center gap-1 mt-1 text-xs">
              {isExpired ? (
                <span className="flex items-center text-destructive gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Expired ({formattedDueDate})
                </span>
              ) : (
                <span className="flex items-center text-muted-foreground gap-1">
                  <Clock className="h-3 w-3" />
                  {timeRemaining} ({formattedDueDate})
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <button 
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent rounded-full"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </button>
    </motion.div>
  );
};

export default TaskItem;
