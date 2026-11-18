import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categoriesData';
import { 
  Wrench, 
  Zap, 
  Hammer, 
  Armchair, 
  Wind, 
  Tv, 
  Paintbrush, 
  Flame, 
  Car, 
  Monitor,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Wrench,
  Zap,
  Hammer,
  Armchair,
  Wind,
  Tv,
  Paintbrush,
  Flame,
  Car,
  Monitor
};

export const CategoryGrid = () => {
  return (
    <section className="py-16 bg-dark-950/50 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Xizmat yo'nalishlari
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ommabop xizmat toifalari
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Xonadon, hovli va ofisingiz uchun kerakli har qanday mutaxassisni tanlang.
            </p>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors group self-start md:self-auto"
          >
            Barcha kategoriyalarni ko'rish
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (10 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Wrench;

            return (
              <Link
                key={cat.id}
                to={`/masters?category=${cat.slug}`}
                className="group relative p-5 rounded-2xl glass-card glass-card-hover border border-slate-800 hover:border-brand-500/50 flex flex-col justify-between overflow-hidden transition-all duration-300"
              >
                {/* Glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl group-hover:bg-brand-500/15 transition-all" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-dark-800 border border-slate-700/80 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 mb-4 shadow-sm">
                    <IconComponent className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-brand-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-medium text-slate-300">{cat.count}+ usta</span>
                  <span className="text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    {cat.startingPrice}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
