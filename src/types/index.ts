
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  dueDate?: number; // Optional due date timestamp
  isExpired?: boolean; // Flag to mark expired tasks
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export type TabType = 'tasks' | 'notes';
