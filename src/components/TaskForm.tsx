'use client';

import React, { useState, useEffect } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Plus, X, Calendar } from 'lucide-react';
import { Task } from '@/types';

interface TaskFormProps {
  isModal?: boolean;
  onClose?: () => void;
  initialData?: Task;
}

export default function TaskForm({ isModal = false, onClose, initialData }: TaskFormProps) {
  const { addTask, updateTask } = useTaskContext();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Task['priority']>(initialData?.priority || 'medium');
  const [dueDate, setDueDate] = useState<string>(
    initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
  );
  
  const [isExpanded, setIsExpanded] = useState(isModal || !!initialData);

  useEffect(() => {
    if (isModal || initialData) setIsExpanded(true);
  }, [isModal, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const dueDateTimestamp = dueDate ? new Date(dueDate).getTime() : undefined;

    if (initialData) {
      updateTask(initialData.id, {
        title,
        description,
        priority,
        dueDate: dueDateTimestamp
      });
    } else {
      addTask(title, description, priority, dueDateTimestamp);
    }
    
    resetForm();
    if (!isModal && !initialData) setIsExpanded(false);
    if (onClose) onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  const handleCancel = () => {
    resetForm();
    if (!isModal && !initialData) setIsExpanded(false);
    if (onClose) onClose();
  }

  if (!isExpanded && !isModal && !initialData) {
    return (
      <button 
        onClick={() => setIsExpanded(true)}
        className="text-zinc-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all border border-transparent hover:border-blue-100"
      >
        <Plus size={18} />
        Add a new task...
      </button>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`
        w-full bg-white 
        ${isModal ? '' : 'border border-zinc-200 rounded-xl shadow-lg p-5 animate-in fade-in slide-in-from-top-2 duration-200'}
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wide">
          {initialData ? 'Edit Task' : (isModal ? 'Create New Task' : 'New Task')}
        </h3>
        <button type="button" onClick={handleCancel} className="text-zinc-400 hover:text-zinc-600">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="w-full text-lg font-medium text-zinc-900 placeholder-zinc-300 border-none p-0 outline-none focus:ring-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        
        <textarea
          placeholder="Description"
          className="w-full text-sm text-zinc-600 placeholder-zinc-300 border-none p-0 outline-none resize-none focus:ring-0"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 pt-4 border-t border-zinc-100">
           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
             <div className="flex items-center gap-2">
               {(['low', 'medium', 'high'] as const).map((p) => (
                 <button
                   key={p}
                   type="button"
                   onClick={() => setPriority(p)}
                   className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide transition-all border ${
                     priority === p
                       ? getPriorityStyles(p)
                       : 'bg-white text-zinc-400 border-zinc-200 hover:border-zinc-300'
                   }`}
                 >
                   {p}
                 </button>
               ))}
             </div>
             
             <div className="flex items-center gap-2 text-zinc-500 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-200">
               <Calendar size={14} />
               <input 
                 type="date" 
                 value={dueDate}
                 onChange={(e) => setDueDate(e.target.value)}
                 className="bg-transparent border-none text-xs outline-none text-zinc-600 p-0"
               />
             </div>
           </div>
        
           <div className="flex items-center gap-3 self-end sm:self-auto">
             <button
               type="button"
               onClick={handleCancel}
               className="text-sm text-zinc-500 hover:text-zinc-800"
             >
               Cancel
             </button>
             <button
              type="submit"
              disabled={!title.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
              {initialData ? 'Save Changes' : 'Create'}
             </button>
           </div>
        </div>
      </div>
    </form>
  );
}

function getPriorityStyles(priority: string) {
  switch (priority) {
    case 'high': return 'bg-orange-50 text-orange-600 border-orange-200';
    case 'medium': return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'low': return 'bg-green-50 text-green-600 border-green-200';
    default: return '';
  }
}
