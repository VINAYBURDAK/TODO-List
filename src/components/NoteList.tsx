
import React from 'react';
import { Note } from '@/types';
import NoteItem from './NoteItem';
import CreateNoteForm from './CreateNoteForm';
import EmptyState from './EmptyState';
import { useToast } from '@/components/ui/use-toast';

interface NoteListProps {
  notes: Note[];
  onCreateNote: (title: string, content: string) => void;
  onUpdateNote: (id: string, title: string, content: string) => void;
  onDeleteNote: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const { toast } = useToast();
  
  const handleDeleteNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    onDeleteNote(id);
    
    if (note) {
      toast({
        description: `Note "${note.title || 'Untitled'}" has been deleted`,
      });
    }
  };

  // Sort notes by creation date (newest first)
  const sortedNotes = [...notes].sort((a, b) => b.createdAt - a.createdAt);
  
  return (
    <div className="mb-6 w-full">
      <CreateNoteForm onCreateNote={onCreateNote} />
      
      {notes.length === 0 ? (
        <EmptyState type="notes" onClick={() => {}} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onUpdate={onUpdateNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
