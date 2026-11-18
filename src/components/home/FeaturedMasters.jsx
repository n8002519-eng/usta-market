import React from 'react';
import { Link } from 'react-router-dom';
import { MasterCard } from '../masters/MasterCard';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedMasters = () => {
  const { masters } = useApp();

  // Top featured masters (e.g. rating >= 4.85, top 6)
  const featured = masters.slice(0, 6);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Eng yuqori baholangan mutaxassislar
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Tavsiya etilgan eng sara ustalar
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Yuzlab mamnun mijozlar, yuqori reyting va ko'p yillik amaliy tajribaga ega ustalar.
            </p>
          </div>

          <Link
            to="/masters"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors group self-start md:self-auto"
          >
            Barcha ustalarni ko'rish ({masters.length} ta)
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Master Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((master) => (
            <MasterCard key={master.id} master={master} />
          ))}
        </div>

      </div>
    </section>
  );
};
