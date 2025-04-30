
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import NoteList from '@/components/NoteList';
import { TabType, Task, Note } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Toaster } from '@/components/ui/toaster';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);

  // Task management functions
  const handleCreateTask = (title: string, dueDate?: number) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
      dueDate,
      isExpired: false
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleExpireTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isExpired: true } : task
    ));
  };

  // Note management functions
  const handleCreateNote = (title: string, content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title || 'Untitled',
      content,
      createdAt: Date.now()
    };
    setNotes([...notes, newNote]);
  };

  const handleUpdateNote = (id: string, title: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { 
        ...note, 
        title: title || 'Untitled', 
        content 
      } : note
    ));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'tasks' ? (
            <motion.div 
              key="tasks"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <TaskList
                tasks={tasks}
                onCreateTask={handleCreateTask}
                onToggleComplete={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onExpireTask={handleExpireTask}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="notes"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <NoteList
                notes={notes}
                onCreateNote={handleCreateNote}
                onUpdateNote={handleUpdateNote}
                onDeleteNote={handleDeleteNote}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;
