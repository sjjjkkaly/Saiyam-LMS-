import React from 'react';
import { BookOpen, FolderOpen, ArrowRight } from 'lucide-react';

export default function EmptyState({
  title = "No courses published yet",
  description = "Check back soon or check another category. Real courses will appear here once created.",
  icon: Icon = BookOpen,
  actionText,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
