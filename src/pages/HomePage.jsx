import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedMasters } from '../components/home/FeaturedMasters';
import { HowItWorks } from '../components/home/HowItWorks';
import { StatisticsSection } from '../components/home/StatisticsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CTASection } from '../components/home/CTASection';

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <FeaturedMasters />
      <HowItWorks />
      <StatisticsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};
