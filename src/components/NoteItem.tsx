
import React, { useState } from 'react';
import { Note } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface NoteItemProps {
  note: Note;
  onUpdate: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  
  const handleSave = () => {
    onUpdate(note.id, title, content);
    setIsEditing(false);
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group hover:shadow-md transition-shadow">
        <CardHeader className="pb-2 pt-4 px-4 flex flex-row justify-between items-start">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium focus:outline-none border-b border-input w-full mb-2"
              placeholder="Note title..."
              autoFocus
            />
          ) : (
            <CardTitle className="text-lg">{note.title || "Untitled"}</CardTitle>
          )}
          
          <div className="flex space-x-1">
            {isEditing ? (
              <Button variant="outline" size="sm" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent rounded-full"
                  aria-label="Edit note"
                >
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => onDelete(note.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent rounded-full"
                  aria-label="Delete note"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {isEditing ? (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 min-h-[100px]"
              placeholder="Write your note here..."
            />
          ) : (
            <>
              <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                {note.content || <span className="italic text-muted-foreground/70">No content</span>}
              </div>
              <div className="text-xs text-muted-foreground mt-3">
                {formatDate(note.createdAt)}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NoteItem;
