import React from 'react';
import { RatingStars } from '../common/RatingStars';
import { Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Azizbek Nurmatov",
      role: "Mijoz",
      city: "Toshkent shahri",
      service: "Santexnika xizmati",
      rating: 5,
      date: "12 Noyabr, 2024",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      comment: "Aristonimiz to'satdan oqib ketganida USTA MARKET orqali Jamshid ustani topdik. 40 daqiqa ichida kelib, yangi ehtiyot qismlari bilan bir zumda tuzatib berdilar. Judayam mamnunmiz!",
    },
    {
      id: 2,
      name: "Gulnoza Azimova",
      role: "Mijoz",
      city: "Samarqand",
      service: "Konditsioner tozalash",
      rating: 5,
      date: "04 Noyabr, 2024",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      comment: "Konditsionerlarimizni yuvdirish uchun buyurtma berdim. Usta maxsus par apparatida mikroblarini yo'qotib, xirurgik darajada toza qilib berdi. Narxi ham juda insofli ekan.",
    },
    {
      id: 3,
      name: "Sarvar Qodirov",
      role: "Mijoz",
      city: "Toshkent shahri",
      service: "Elektromontaj",
      rating: 5,
      date: "28 Oktyabr, 2024",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
      comment: "Yangi uyimizga avtomat shit yig'ish va katta lyustrani o'rnatishni Alisher ustaga topshirdik. Barcha fazalarni tekshirib, xavfsiz qilib ulab berdilar. Ishiga 100% javob beradigan usta!",
    },
  ];

  return (
    <section className="py-20 bg-dark-950/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Mijozlar fikri
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Haqiqiy mijozlar sharhlari
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            O'zbekiston bo'ylab minglab oilalar va biznes egalari o'z ishlarini USTA MARKET ustalari bilan bitirmoqda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-3xl glass-card border border-slate-800 hover:border-brand-500/40 transition-all flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-brand-500/20 absolute top-6 right-6 group-hover:text-brand-500/40 transition-colors" />

              <div>
                <RatingStars rating={r.rating} showNumber={false} className="mb-4" />
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{r.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    {r.city} • <span className="text-brand-400">{r.service}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
