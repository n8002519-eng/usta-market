import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Wrench, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mx-auto shadow-glow-orange-sm">
          <Wrench className="w-10 h-10 rotate-45" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl sm:text-6xl font-black text-brand-500 font-mono tracking-tight">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sahifa topilmadi
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Siz qidirayotgan sahifa ko'chirilgan, o'chirilgan yoki manzili noto'g'ri kiritilgan bo'lishi mumkin.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" icon={Home}>
              Bosh sahifaga qaytish
            </Button>
          </Link>
          <Link to="/masters">
            <Button variant="secondary" size="md">
              Ustalarni ko'rish
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
