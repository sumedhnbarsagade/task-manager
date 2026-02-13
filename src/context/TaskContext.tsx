'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskContextType, TaskFilter, TaskSort } from '@/types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sort, setSort] = useState<TaskSort>('date-desc');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Failed to parse tasks from localStorage', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = (title: string, description?: string, priority: Task['priority'] = 'medium', dueDate?: number) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      priority,
      dueDate,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'date-asc':
          return a.createdAt - b.createdAt;
        case 'priority-asc': 
           const priorityMapAsc: Record<string, number> = { low: 1, medium: 2, high: 3 };
           return priorityMapAsc[a.priority] - priorityMapAsc[b.priority];
        case 'priority-desc': 
           const priorityMapDesc: Record<string, number> = { low: 1, medium: 2, high: 3 };
           return priorityMapDesc[b.priority] - priorityMapDesc[a.priority];
        case 'date-desc':
        default:
          return b.createdAt - a.createdAt;
      }
    });

  if (!isLoaded) {
    return null; 
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        updateTask,
        filter,
        setFilter,
        sort,
        setSort,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
