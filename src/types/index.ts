
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export type TabType = 'tasks' | 'notes';
