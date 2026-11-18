import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, CheckCircle2, Shield, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { CITIES } from '../../data/citiesData';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('Barcha shaharlar');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.append('query', query.trim());
    if (city !== 'Barcha shaharlar') params.append('city', city);
    navigate(`/masters?${params.toString()}`);
  };

  const quickCategories = [
    { label: 'Santexnik', slug: 'santexnik' },
    { label: 'Elektrik', slug: 'elektrik' },
    { label: 'Konditsioner', slug: 'konditsioner-ustasi' },
    { label: 'Mebel ustasi', slug: 'mebel-ustasi' },
    { label: 'Quruvchi', slug: 'quruvchi' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-28">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>O'zbekistondagi #1 Ishonchli Ustalar Platformasi</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Ishonchli ustalar <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-amber-400 bg-clip-text text-transparent">
                bir joyda!
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Santexnik, elektrik, mebel ustasi va boshqa 10+ soha mutaxassislarini oson toping. Narxlar shaffof, sharhlar real, xizmat kafolatlangan.
            </p>

            {/* Comprehensive Search Bar */}
            <form
              onSubmit={handleSearch}
              className="p-2 sm:p-2.5 rounded-2xl glass-card border border-slate-700/80 shadow-premium flex flex-col sm:flex-row items-stretch gap-2"
            >
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  placeholder="Qanday usta yoki xizmat kerak? (masalan: santexnik)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-3 py-3 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="sm:border-l border-slate-800 relative flex items-center sm:w-48">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-9 pr-6 py-3 bg-transparent text-xs sm:text-sm text-white focus:outline-none appearance-none cursor-pointer"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c} className="bg-dark-900 text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="shrink-0 px-6 py-3 text-sm font-bold shadow-glow-orange-sm"
              >
                Topish
              </Button>
            </form>

            {/* Quick chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Ommabop:</span>
              {quickCategories.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => navigate(`/masters?category=${item.slug}`)}
                  className="px-3 py-1 rounded-xl bg-dark-800/80 hover:bg-brand-500/20 text-slate-300 hover:text-brand-300 border border-slate-700/60 hover:border-brand-500/40 transition-colors text-xs"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-lg sm:text-2xl font-black text-white">1,200+</div>
                <div className="text-[11px] text-slate-400">Tekshirilgan usta</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-black text-brand-400">15,000+</div>
                <div className="text-[11px] text-slate-400">Bajarilgan buyurtma</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-black text-amber-400">4.9 ★</div>
                <div className="text-[11px] text-slate-400">O'rtacha baho</div>
              </div>
            </div>

          </div>

          {/* Right Visual Card Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Feature Image Card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl glass-card">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                  alt="Usta Market mutaxassisi"
                  className="w-full h-96 sm:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

                {/* Overlaid Card Info */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-card border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-semibold text-emerald-400">Hozir faol ustalar</span>
                    </div>
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.95
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Jamshid Rahimov — 9 yillik tajribali usta
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    "Har bir mijoz xonadonida o'z uyimdek sifatli va xavfsiz ishlayman."
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Verified */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-2xl glass-card border border-slate-700/80 shadow-xl flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Kafolat</div>
                  <div className="text-[10px] text-slate-400">Har bir buyurtmaga</div>
                </div>
              </div>

              {/* Floating Badge 2: Quick response */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 p-3 rounded-2xl glass-card border border-slate-700/80 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">15 daqiqada</div>
                  <div className="text-[10px] text-slate-400">Usta javobi</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
