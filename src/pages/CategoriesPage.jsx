import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categoriesData';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';
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
  ArrowRight, 
  Check, 
  Sparkles,
  Search
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

export const CategoriesPage = () => {
  const { openOrderModal } = useApp();
  const [search, setSearch] = useState('');

  const filteredCategories = CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
    c.popularTasks.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Katalog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-3">
            Barcha xizmat kategoriyalari
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            10 ta asosiy soha bo'yicha saralangan eng yaxshi ustalar. O'zingizga kerakli xizmat turini tanlang.
          </p>

          {/* Search in categories */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Kategoriya yoki xizmat nomini yozing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-850 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCategories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Wrench;

            return (
              <div
                key={cat.id}
                className="group rounded-3xl glass-card border border-slate-800 hover:border-brand-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              >
                {/* Background image blur strip */}
                <div 
                  className="absolute top-0 right-0 w-1/3 h-full opacity-10 group-hover:opacity-20 transition-opacity bg-cover bg-center pointer-events-none"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />

                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all shadow-glow-orange-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Boshlang'ich</span>
                      <span className="text-sm sm:text-base font-bold text-white">{cat.startingPrice}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {cat.shortDesc}
                  </p>

                  {/* Popular Tasks Pills */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Ko'p so'raladigan vazifalar:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.popularTasks.map((task) => (
                        <span
                          key={task}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-dark-900 text-slate-300 border border-slate-700/60 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-brand-400" />
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-400 font-medium">
                    Faol ustalar: <strong className="text-white">{cat.count}+ ta</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openOrderModal({ profession: cat.name, startingPrice: cat.startingPrice })}
                      className="text-xs"
                    >
                      Tezkor buyurtma
                    </Button>
                    <Link to={`/masters?category=${cat.slug}`}>
                      <Button variant="primary" size="sm" className="text-xs">
                        Ustalarni ko'rish
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
