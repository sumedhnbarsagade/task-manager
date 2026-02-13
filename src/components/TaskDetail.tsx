import React from 'react';
import { Task } from '@/types';
import { X, Calendar, Clock, AlertCircle, CheckCircle2, Flag } from 'lucide-react';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

export default function TaskDetail({ task, onClose }: TaskDetailProps) {
  const priorityColors = {
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    medium: 'bg-blue-100 text-blue-700 border-blue-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  };

  const statusLabel = task.completed ? 'Completed' : 'In Progress';
  const statusColor = task.completed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200';
  const StatusIcon = task.completed ? CheckCircle2 : AlertCircle;

  return (
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-zinc-100">
        <h2 className="text-xl font-bold text-zinc-900 leading-snug pr-8">
          {task.title}
        </h2>
        <button 
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md hover:bg-zinc-100 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto space-y-6">
        
        {/* Meta Row */}
        <div className="flex flex-wrap gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusColor}`}>
            <StatusIcon size={14} />
            {statusLabel}
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${priorityColors[task.priority]}`}>
            <Flag size={14} />
            <span className="uppercase">{task.priority} Priority</span>
          </div>

          {task.dueDate && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
              <Calendar size={14} />
              {new Date(task.dueDate).toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</h3>
          <div className="text-zinc-700 leading-relaxed whitespace-pre-wrap bg-zinc-50 p-4 rounded-lg border border-zinc-100 min-h-[100px]">
            {task.description || <span className="text-zinc-400 italic">No description provided.</span>}
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center gap-4 text-xs text-zinc-400 pt-4 border-t border-zinc-100">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            Created {new Date(task.createdAt).toLocaleDateString()}
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-300" />
          <div className="font-mono text-[10px] uppercase">ID: {task.id.slice(0, 8)}</div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 font-medium rounded-lg hover:bg-zinc-50 transition-colors shadow-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
