export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: number;
    createdAt: number;
    priority: 'low' | 'medium' | 'high';
}

export type TaskFilter = 'all' | 'active' | 'completed';
export type TaskSort = 'date-desc' | 'date-asc' | 'priority-desc' | 'priority-asc';

export interface TaskContextType {
    tasks: Task[];
    addTask: (title: string, description?: string, priority?: Task['priority'], dueDate?: number) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    filter: TaskFilter;
    setFilter: (filter: TaskFilter) => void;
    sort: TaskSort;
    setSort: (sort: TaskSort) => void;
    filteredTasks: Task[];
}
