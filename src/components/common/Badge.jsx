import React from 'react';

export const Badge = ({
  children,
  variant = 'orange',
  size = 'sm',
  className = '',
  icon: Icon
}) => {
  const sizeClasses = {
    xs: 'text-[11px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  const variantClasses = {
    orange: 'bg-brand-500/15 text-brand-400 border border-brand-500/30',
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    yellow: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    red: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    dark: 'bg-dark-700 text-slate-300 border border-slate-700',
    glass: 'bg-white/10 backdrop-blur-md text-white border border-white/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${sizeClasses[size] || sizeClasses.sm} ${variantClasses[variant] || variantClasses.orange} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
};
