import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, Mail, MapPin, Send, ShieldCheck, Clock, Award } from 'lucide-react';
import { CATEGORIES } from '../../data/categoriesData';

export const Footer = () => {
  return (
    <footer className="bg-dark-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Tekshirilgan ustalar</h4>
              <p className="text-xs text-slate-400 mt-0.5">Barcha mutaxassislar tajribasi va shaxsi tekshirilgan.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">15 daqiqada tezkor javob</h4>
              <p className="text-xs text-slate-400 mt-0.5">Ustalar tezkor qo'ng'iroq va kelishuvga tayyor.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900/60 border border-slate-800 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Sifat va kafolat</h4>
              <p className="text-xs text-slate-400 mt-0.5">Bajarilgan har bir ish uchun mijozlar sharhi va kafolat.</p>
            </div>
          </div>
        </div>

        {/* 4 Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-glow-orange-sm">
                <Wrench className="w-5 h-5 -rotate-12" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                USTA<span className="text-brand-500">MARKET</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              O'zbekistondagi eng yirik va qulay servis platformasi. Santexnik, elektrik, mebel ustasi, maishiy texnika ta'miri va boshqa ko'plab xizmatlarni oson toping.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-brand-400" />
                <a href="tel:+998712000000" className="hover:text-white transition-colors">
                  +998 (71) 200-00-00 (Qo'llab-quvvatlash)
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Send className="w-4 h-4 text-brand-400" />
                <a href="https://t.me/ustamarket_uz" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  @ustamarket_uz (Telegram Bot)
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>O'zbekiston, Toshkent shahri, Amir Temur shoh ko'chasi 107B</span>
              </div>
            </div>
          </div>

          {/* Categories (1 col) */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Ommabop xizmatlar
            </h5>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/masters?category=${cat.slug}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories col 2 */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Boshqa sohalar
            </h5>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES.slice(6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/masters?category=${cat.slug}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="text-brand-400 hover:text-brand-300 font-semibold">
                  Barcha kategoriyalar →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links & Platform */}
          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Foydalanuvchiga
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/masters" className="hover:text-white transition-colors">
                  Barcha ustalar
                </Link>
              </li>
              <li>
                <Link to="/become-master" className="hover:text-white transition-colors">
                  Usta bo'lib ro'yxatdan o'tish
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Mening buyurtmalarim
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=favorites" className="hover:text-white transition-colors">
                  Saqlangan ustalar
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Admin boshqaruv paneli
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} USTA MARKET. O'zbekistondagi ishonchli xizmatlar bozori.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Foydalanish qoidalari</span>
            <span className="hover:text-slate-400 cursor-pointer">Maxfiylik siyosati</span>
            <span className="hover:text-slate-400 cursor-pointer">Xavfsizlik</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
