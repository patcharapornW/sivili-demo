'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HeroSection from './components/sections/HeroSection';
import TrustBadgesSection from './components/sections/TrustBadgesSection';
import CategoriesSection from './components/sections/CategoriesSection';
import FeaturedSection from './components/sections/FeaturedSection';
import PromoSection from './components/sections/PromoSection';
import NewArrivalsSection from './components/sections/NewArrivalsSection';
import BrandTrustSection from './components/sections/BrandTrustSection';

import { useThemeContext } from './components/ThemeContext';
import { LayoutSectionConfig } from '@/lib/layoutConfig';

export default function HomePage() {
  const { layout } = useThemeContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderSection = (config: LayoutSectionConfig) => {
    if (!config.visible) return null;

    switch (config.type) {
      case 'hero':
        return <HeroSection key={config.id} data={config.data} />;
      case 'trust_badges':
        return <TrustBadgesSection key={config.id} data={config.data} />;
      case 'categories':
        return <CategoriesSection key={config.id} data={config.data} />;
      case 'featured':
        return <FeaturedSection key={config.id} data={config.data} />;
      case 'promo':
        return <PromoSection key={config.id} data={config.data} />;
      case 'new_arrivals':
        return <NewArrivalsSection key={config.id} data={config.data} />;
      case 'brand_trust':
        return <BrandTrustSection key={config.id} data={config.data} />;
      default:
        return null;
    }
  };

  if (!isClient) return null;

  return (
    <>
      <Navbar />
      <main className="page-top">
        {layout.map(renderSection)}
      </main>
      <Footer />
    </>
  );
}
