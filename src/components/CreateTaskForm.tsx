
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface CreateTaskFormProps {
  onCreateTask: (title: string, dueDate?: number) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [dueDate, setDueDate] = useState<string>('');
  const [dueTime, setDueTime] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      let dueDateTimestamp: number | undefined = undefined;
      
      if (dueDate && dueTime) {
        // Combine date and time into a timestamp
        const dateTimeString = `${dueDate}T${dueTime}`;
        dueDateTimestamp = new Date(dateTimeString).getTime();
      }
      
      onCreateTask(title.trim(), dueDateTimestamp);
      setTitle('');
      setDueDate('');
      setDueTime('');
      setShowDateTimePicker(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div className="flex gap-2">
        <Input 
          type="text" 
          placeholder="Add a new task..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow"
        />
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={() => setShowDateTimePicker(!showDateTimePicker)}
          className={showDateTimePicker ? "bg-primary/10" : ""}
        >
          <Clock className="h-4 w-4" />
        </Button>
        <Button type="submit" disabled={!title.trim()}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      {showDateTimePicker && (
        <div className="flex flex-col sm:flex-row gap-2 animate-fade-in">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">Due Time</label>
            <Input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateTaskForm;
