
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CreateTaskFormProps {
  onCreateTask: (title: string) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input 
        type="text" 
        placeholder="Add a new task..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" disabled={!title.trim()}>
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </form>
  );
};

export default CreateTaskForm;
