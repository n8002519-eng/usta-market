import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = SearchX,
  title = "Ma'lumot topilmadi",
  description = "Qidiruv parametrlarini o'zgartirib ko'ring yoki filtrlarni tozalang.",
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 glass-card rounded-2xl border border-slate-800 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
