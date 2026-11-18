import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, Heart, Briefcase, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

export const MasterCard = ({ master }) => {
  const { favorites, toggleFavorite, openOrderModal, openContactModal } = useApp();
  const isFav = favorites.includes(master.id);

  return (
    <div className="group glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col border border-slate-800 hover:border-brand-500/40 transition-all duration-300">
      {/* Top Banner & Avatar Header */}
      <div className="relative p-5 pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="relative">
            <img
              src={master.avatar}
              alt={master.fullName}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-slate-700/80 group-hover:border-brand-500 transition-colors shadow-md"
              loading="lazy"
            />
            {master.verified && (
              <span
                className="absolute -bottom-1 -right-1 bg-brand-500 text-white p-1 rounded-full shadow-lg"
                title="Tasdiqlangan mutaxassis"
              >
                <CheckCircle2 className="w-3.5 h-3.5 fill-brand-500 text-white" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {master.badge && (
              <Badge variant="orange" size="xs">
                {master.badge}
              </Badge>
            )}
            <button
              onClick={() => toggleFavorite(master.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFav
                  ? 'bg-rose-500/20 text-rose-500 border-rose-500/40'
                  : 'bg-dark-800 text-slate-400 hover:text-white border-slate-700/60 hover:bg-dark-700'
              }`}
              title={isFav ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
              aria-label="Sevimli"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Master Info */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-2">
            <Link
              to={`/masters/${master.id}`}
              className="font-bold text-base sm:text-lg text-white hover:text-brand-400 transition-colors line-clamp-1"
            >
              {master.fullName}
            </Link>
          </div>
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider mt-0.5">
            {master.profession}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{master.city}{master.district ? `, ${master.district}` : ''}</span>
          </div>
        </div>
      </div>

      {/* Middle Stats & Badges */}
      <div className="px-5 py-4 my-2 flex items-center justify-between border-y border-slate-800/80 bg-dark-950/40 text-xs">
        <RatingStars rating={master.rating} count={master.reviewCount} />
        <div className="flex items-center gap-1 text-slate-300 font-medium">
          <Briefcase className="w-3.5 h-3.5 text-brand-400" />
          <span>{master.completedJobs} ta ish</span>
        </div>
      </div>

      {/* Bio snippet */}
      <div className="px-5 pb-3 flex-1">
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {master.bio}
        </p>
      </div>

      {/* Bottom Pricing & Actions */}
      <div className="p-5 pt-3 mt-auto">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">Boshlang'ich narx</span>
          <span className="font-extrabold text-sm sm:text-base text-white text-right">
            {master.startingPrice}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to={`/masters/${master.id}`} className="w-full">
            <Button variant="secondary" size="sm" className="w-full text-xs">
              Profil
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            className="w-full text-xs font-semibold"
            onClick={() => openOrderModal(master)}
          >
            Buyurtma
          </Button>
        </div>
      </div>
    </div>
  );
};
