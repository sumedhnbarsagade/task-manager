'use client';

import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskItem from './TaskItem';
import { 
  ChevronDown, 
  Plus
} from 'lucide-react';
import { Task } from '@/types';

export default function TaskList() {
  const { tasks } = useTaskContext();

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="w-full pb-20 space-y-8">
      <TaskGroup title="New task" tasks={activeTasks} count={activeTasks.length} />
      <TaskGroup title="Done" tasks={completedTasks} count={completedTasks.length} isCompletedGroup />
    </div>
  );
}

function TaskGroup({ title, tasks, count, isCompletedGroup = false }: { title: string, tasks: Task[], count: number, isCompletedGroup?: boolean }) {
  if (tasks.length === 0 && isCompletedGroup) return null;

  return (
    <div className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden">

        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-100 bg-white sticky top-0 z-10 items-center">
       
          <div className="col-span-12 md:col-span-5 flex items-center">
            <button className="flex items-center gap-2 text-zinc-800 font-bold hover:bg-zinc-50 px-2 py-1 -ml-2 rounded-lg transition-colors">
              <ChevronDown size={18} className="text-zinc-400" />
              {title}
              <span className="bg-zinc-100 text-zinc-500 text-xs font-semibold px-2 py-0.5 rounded-full ml-1">
                {count}
              </span>
            </button>
          </div>
          
    
          <div className="hidden md:block col-span-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
               Status
          </div>
          <div className="hidden md:block col-span-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
               Type
          </div>
          <div className="hidden md:block col-span-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
               Due date
          </div>
          <div className="hidden md:block col-span-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
               Resp.
          </div>
        </div>

        <div>
           {tasks.length > 0 ? (
             tasks.map((task) => <TaskItem key={task.id} task={task} />)
           ) : (
             <div className="py-8 text-center text-zinc-400 text-sm italic bg-zinc-50/50">
               No tasks in this group
             </div>
           )}
        </div>

        {!isCompletedGroup && (
          <div className="px-6 py-3 border-t border-zinc-50 bg-zinc-50/30 hover:bg-zinc-50 transition-colors cursor-pointer group">
             <div className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-600 text-sm font-medium">
               <Plus size={16} />
               Add task
             </div>
          </div>
        )}
    </div>
  )
}
