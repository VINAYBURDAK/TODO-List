
import React, { useEffect } from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import CreateTaskForm from './CreateTaskForm';
import EmptyState from './EmptyState';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  onCreateTask: (title: string, dueDate?: number) => void;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onExpireTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onCreateTask,
  onToggleComplete,
  onDeleteTask,
  onExpireTask,
}) => {
  const { toast } = useToast();
  
  // Check for expired tasks every minute
  useEffect(() => {
    const checkExpiredTasks = () => {
      const now = Date.now();
      tasks.forEach(task => {
        if (task.dueDate && now > task.dueDate && !task.isExpired) {
          onExpireTask(task.id);
          toast({
            description: `Task "${task.title}" has expired`,
            variant: "destructive"
          });
        }
      });
    };
    
    // Check once immediately
    checkExpiredTasks();
    
    // Then set up interval
    const intervalId = setInterval(checkExpiredTasks, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [tasks, onExpireTask, toast]);
  
  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    onDeleteTask(id);
    
    if (task) {
      toast({
        description: `"${task.title}" has been deleted`,
      });
    }
  };

  // Sort tasks: unexpired first, then incomplete, then by creation date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    // Expired tasks go last
    if (!!a.isExpired !== !!b.isExpired) {
      return a.isExpired ? 1 : -1;
    }
    // Then incomplete tasks first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by due date if both have due dates
    if (a.dueDate && b.dueDate) {
      return a.dueDate - b.dueDate;
    }
    // Tasks with due dates go before tasks without
    if (a.dueDate || b.dueDate) {
      return a.dueDate ? -1 : 1;
    }
    // Finally by creation date (newest first)
    return b.createdAt - a.createdAt;
  });
  
  return (
    <div className="mb-6 w-full">
      <CreateTaskForm onCreateTask={onCreateTask} />
      
      {tasks.length === 0 ? (
        <EmptyState type="tasks" onClick={() => {}} />
      ) : (
        <AnimatePresence>
          <motion.div layout className="space-y-2">
            <AnimatePresence>
              {sortedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={handleDeleteTask}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default TaskList;
