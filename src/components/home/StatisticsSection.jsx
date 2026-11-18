import React from 'react';
import { Users, CheckCircle, Star, MapPin, Zap } from 'lucide-react';

export const StatisticsSection = () => {
  const stats = [
    {
      value: '1,200+',
      label: 'Tasdiqlangan ustalar',
      desc: 'Shaxsi va tajribasi tekshirilgan',
      icon: Users,
    },
    {
      value: '15,400+',
      label: 'Bajarilgan ishlar',
      desc: 'Muvaffaqiyatli yakunlangan buyurtmalar',
      icon: CheckCircle,
    },
    {
      value: '98.6%',
      label: 'Mamnun mijozlar',
      desc: 'Ijobiy baholangan xizmatlar ulushi',
      icon: Star,
    },
    {
      value: '14 ta',
      label: 'Viloyat va shaharlar',
      desc: 'Butun O\'zbekiston bo\'ylab qamrov',
      icon: MapPin,
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-brand-500/20 shadow-premium relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-brand-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`flex flex-col items-center text-center ${index > 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
