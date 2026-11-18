import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { Wrench, Sparkles, UserPlus, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const { openOrderModal } = useApp();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-brand-500/30 shadow-premium bg-gradient-to-br from-dark-850 via-dark-900 to-dark-950">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold border border-brand-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Ustalarga keng imkoniyatlar
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Siz ham o'z sohangizning ustasimisiz?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                USTA MARKET portalida bepul ro'yxatdan o'ting, o'z profilingizni yarating va har kuni O'zbekistonning turli burchaklaridan yuzlab real buyurtmalarni qabul qiling.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link to="/become-master" className="w-full">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-sm font-bold shadow-glow-orange"
                  icon={UserPlus}
                >
                  Usta bo'lib ro'yxatdan o'tish
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="lg"
                className="w-full text-sm font-semibold"
                onClick={() => openOrderModal()}
              >
                Xizmatga buyurtma berish
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
