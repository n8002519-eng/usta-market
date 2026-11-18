import React from 'react';
import { Search, RotateCcw, SlidersHorizontal, MapPin, Tag, Star, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../../data/categoriesData';
import { CITIES } from '../../data/citiesData';

export const MasterFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCity,
  onCityChange,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  totalResults
}) => {
  const isFiltered = searchQuery || selectedCategory !== 'all' || selectedCity !== 'Barcha shaharlar' || minRating > 0 || sortBy !== 'recommended';

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 mb-8">
      {/* Top Search Bar & Counter */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Usta ismi yoki mutaxassisligi bo'yicha qidiring..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Tozalash
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <span className="text-xs text-slate-400">
            Topildi: <strong className="text-brand-400">{totalResults} ta usta</strong>
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-400 transition-colors bg-dark-800 px-3 py-2 rounded-xl border border-slate-700 hover:border-brand-500/50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Filtrlarni tozalash
            </button>
          )}
        </div>
      </div>

      {/* Filter Row: Category, City, Min Rating, Sort */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
        {/* Category Select */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Soha / Kategoriya
          </label>
          <div className="relative">
            <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-dark-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="all">Barcha sohalar (10 ta)</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City Select */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Shahar / Hudud
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-dark-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none cursor-pointer"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Minimal Reyting
          </label>
          <div className="relative">
            <Star className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={minRating}
              onChange={(e) => onMinRatingChange(Number(e.target.value))}
              className="w-full pl-9 pr-8 py-2 bg-dark-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none cursor-pointer"
            >
              <option value={0}>Barcha reytinglar</option>
              <option value={4.5}>4.5 va undan yuqori ★</option>
              <option value={4.8}>4.8 va undan yuqori ★</option>
              <option value={4.9}>4.9+ (Eng sara ustalar) ★</option>
            </select>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Saralash
          </label>
          <div className="relative">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-dark-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="recommended">Tavsiya etilgan</option>
              <option value="rating-desc">Eng yuqori reyting</option>
              <option value="jobs-desc">Ko'p ish bajarganlar</option>
              <option value="price-asc">Narx: Arzondan qimmatga</option>
              <option value="price-desc">Narx: Qimmatdan arzonga</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
