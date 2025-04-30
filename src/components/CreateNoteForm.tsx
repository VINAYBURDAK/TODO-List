
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CreateNoteFormProps {
  onCreateNote: (title: string, content: string) => void;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ onCreateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      onCreateNote(title.trim(), content.trim());
      setTitle('');
      setContent('');
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 border rounded-lg p-4 animate-fade-in">
      {isExpanded ? (
        <>
          <Input 
            type="text" 
            placeholder="Note title..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
          />
          <Textarea 
            placeholder="Write your note here..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-3 min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!title.trim() && !content.trim()}
            >
              Save Note
            </Button>
          </div>
        </>
      ) : (
        <div 
          className="flex items-center gap-2 cursor-text p-2" 
          onClick={() => setIsExpanded(true)}
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Create a new note...</span>
        </div>
      )}
    </form>
  );
};

export default CreateNoteForm;
