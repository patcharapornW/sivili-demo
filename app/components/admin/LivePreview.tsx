'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LayoutSectionConfig } from '@/lib/layoutConfig';
import Navbar from '../Navbar';
import Footer from '../Footer';

import HeroSection from '../sections/HeroSection';
import TrustBadgesSection from '../sections/TrustBadgesSection';
import CategoriesSection from '../sections/CategoriesSection';
import FeaturedSection from '../sections/FeaturedSection';
import PromoSection from '../sections/PromoSection';
import NewArrivalsSection from '../sections/NewArrivalsSection';
import BrandTrustSection from '../sections/BrandTrustSection';

interface LivePreviewProps {
  items: LayoutSectionConfig[];
  device: 'mobile' | 'desktop';
}

export default function LivePreview({ items, device }: LivePreviewProps) {
  const isMobile = device === 'mobile';

  const renderSection = (config: LayoutSectionConfig) => {
    switch (config.id) {
      case 'hero':
        return <HeroSection />;
      case 'trust_badges':
        return <TrustBadgesSection />;
      case 'categories':
        return <CategoriesSection />;
      case 'featured':
        return <FeaturedSection />;
      case 'promo':
        return <PromoSection />;
      case 'new_arrivals':
        return <NewArrivalsSection />;
      case 'brand_trust':
        return <BrandTrustSection />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-xl overflow-hidden p-4 relative">
      <div 
        className={`bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out border border-gray-300 flex flex-col ${
          isMobile ? 'w-[375px] h-[812px] rounded-[40px] border-8 border-gray-800' : 'w-full h-[800px] rounded-lg'
        }`}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide page-top relative pointer-events-none select-none">
          {/* We use pointer-events-none so links/buttons in preview don't navigate */}
          <Navbar />
          <AnimatePresence initial={false}>
            {items.map((item) => {
              if (!item.visible) return null;
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="w-full relative origin-top"
                >
                  {renderSection(item)}
                </motion.div>
              );
            })}
          </AnimatePresence>
          <Footer />
        </div>
      </div>
      
      {/* Mobile Frame Details (Notch) */}
      {isMobile && (
        <div className="absolute top-[28px] left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-gray-800 rounded-b-xl z-50"></div>
      )}
    </div>
  );
}
