import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MasterCard } from '../components/masters/MasterCard';
import { MasterFilters } from '../components/masters/MasterFilters';
import { EmptyState } from '../components/common/EmptyState';
import { Users, Sparkles } from 'lucide-react';

export const MastersPage = () => {
  const { masters } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'Barcha shaharlar');
  const [minRating, setMinRating] = useState(Number(searchParams.get('minRating')) || 0);
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'recommended');

  // Keep state synced with URL params when URL changes
  useEffect(() => {
    const q = searchParams.get('query');
    const cat = searchParams.get('category');
    const c = searchParams.get('city');
    if (q !== null && q !== searchQuery) setSearchQuery(q);
    if (cat !== null && cat !== selectedCategory) setSelectedCategory(cat);
    if (c !== null && c !== selectedCity) setSelectedCity(c);
  }, [searchParams]);

  // Update URL params when filters change
  const updateParams = (newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    const merged = { ...current, ...newParams };

    // Clean empty defaults
    if (!merged.query) delete merged.query;
    if (merged.category === 'all') delete merged.category;
    if (merged.city === 'Barcha shaharlar') delete merged.city;
    if (!merged.minRating || Number(merged.minRating) === 0) delete merged.minRating;
    if (merged.sortBy === 'recommended') delete merged.sortBy;

    setSearchParams(merged);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateParams({ query: val });
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    updateParams({ category: val });
  };

  const handleCityChange = (val) => {
    setSelectedCity(val);
    updateParams({ city: val });
  };

  const handleMinRatingChange = (val) => {
    setMinRating(val);
    updateParams({ minRating: val });
  };

  const handleSortByChange = (val) => {
    setSortBy(val);
    updateParams({ sortBy: val });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCity('Barcha shaharlar');
    setMinRating(0);
    setSortBy('recommended');
    setSearchParams({});
  };

  // Filtered & sorted masters
  const filteredMasters = useMemo(() => {
    return masters
      .filter((master) => {
        // Query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = master.fullName.toLowerCase().includes(q);
          const matchesProf = master.profession.toLowerCase().includes(q);
          const matchesBio = master.bio && master.bio.toLowerCase().includes(q);
          const matchesCity = master.city.toLowerCase().includes(q);
          if (!matchesName && !matchesProf && !matchesBio && !matchesCity) return false;
        }

        // Category match
        if (selectedCategory !== 'all') {
          if (master.categorySlug !== selectedCategory) return false;
        }

        // City match
        if (selectedCity !== 'Barcha shaharlar') {
          if (master.city !== selectedCity) return false;
        }

        // Min rating
        if (minRating > 0) {
          if (master.rating < minRating) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') {
          return b.rating - a.rating;
        }
        if (sortBy === 'jobs-desc') {
          return b.completedJobs - a.completedJobs;
        }
        if (sortBy === 'price-asc') {
          return (a.startingPriceNum || 0) - (b.startingPriceNum || 0);
        }
        if (sortBy === 'price-desc') {
          return (b.startingPriceNum || 0) - (a.startingPriceNum || 0);
        }
        // Recommended: verified first, then rating, then jobs
        return (b.rating * 100 + b.completedJobs) - (a.rating * 100 + a.completedJobs);
      });
  }, [masters, searchQuery, selectedCategory, selectedCity, minRating, sortBy]);

  return (
    <div className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Katalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
            Professional ustalar ro'yxati
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Tajribali va tasdiqlangan ustalar bilan to'g'ridan-to'g'ri aloqa o'rnating yoki buyurtma yuboring.
          </p>
        </div>

        {/* Filter component */}
        <MasterFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          minRating={minRating}
          onMinRatingChange={handleMinRatingChange}
          sortBy={sortBy}
          onSortByChange={handleSortByChange}
          onResetFilters={handleResetFilters}
          totalResults={filteredMasters.length}
        />

        {/* Results Grid or Empty State */}
        {filteredMasters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMasters.map((master) => (
              <MasterCard key={master.id} master={master} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Mos keluvchi ustalar topilmadi"
            description="Kiritilgan parametrlar bo'yicha usta topilmadi. Qidiruv so'zini qisqartiring yoki filtrlarni tozalang."
            actionLabel="Filtrlarni tozalash"
            onAction={handleResetFilters}
          />
        )}

      </div>
    </div>
  );
};
