
import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import CreateTaskForm from './CreateTaskForm';
import EmptyState from './EmptyState';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  onCreateTask: (title: string) => void;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onCreateTask,
  onToggleComplete,
  onDeleteTask,
}) => {
  const { toast } = useToast();
  
  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    onDeleteTask(id);
    
    if (task) {
      toast({
        description: `"${task.title}" has been deleted`,
      });
    }
  };

  // Sort tasks: incomplete first, then by creation date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
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
