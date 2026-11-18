import React from 'react';
import { Search, ClipboardCheck, ThumbsUp, ArrowRight } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Usta yoki xizmatni qidiring',
      desc: '10+ soha bo\'yicha shahringizdagi ustalarning profili, sharhlari va narxlarini solishtirib tanlang.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Buyurtmani rasmiylashtiring',
      desc: 'Ismingiz, telefoningiz va ish tafsilotlarini yozib 1 daqiqada bepul buyurtma yuboring.',
      icon: ClipboardCheck,
    },
    {
      number: '03',
      title: 'Xizmatni sifatli qabul qiling',
      desc: 'Usta belgilangan vaqtda yetib keladi va ishni kafolat bilan bajaradi. To\'lov ish yakunida amalga oshiriladi.',
      icon: ThumbsUp,
    },
  ];

  return (
    <section className="py-20 bg-dark-950/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Oddiy va tushunarli
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            USTA MARKET qanday ishlaydi?
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Usta topish va muammolarni hal qilish hech qachon bunchalik oson va xavfsiz bo'lmagan.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-8 rounded-3xl glass-card border border-slate-800 flex flex-col items-start transition-all hover:border-brand-500/40 group"
              >
                {/* Step number badge */}
                <span className="text-3xl font-black text-slate-700 group-hover:text-brand-500/60 transition-colors font-mono mb-4">
                  {step.number}
                </span>

                {/* Icon box */}
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-glow-orange-sm">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
