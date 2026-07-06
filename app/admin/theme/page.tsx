'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { LayoutSectionConfig, defaultLayoutConfig } from '@/lib/layoutConfig';
import { Save, Palette, Plus, X, Edit } from 'lucide-react';
import BuilderSectionWrapper from '../../components/admin/BuilderSectionWrapper';
import { useThemeContext } from '../../components/ThemeContext';

// Import sections
import HeroSection from '../../components/sections/HeroSection';
import TrustBadgesSection from '../../components/sections/TrustBadgesSection';
import CategoriesSection from '../../components/sections/CategoriesSection';
import FeaturedSection from '../../components/sections/FeaturedSection';
import PromoSection from '../../components/sections/PromoSection';
import NewArrivalsSection from '../../components/sections/NewArrivalsSection';
import BrandTrustSection from '../../components/sections/BrandTrustSection';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ThemeBuilderPage() {
  const { layout, setLayout, themeSettings, setThemeSettings, updateSectionData } = useThemeContext();
  const [isClient, setIsClient] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [selectedSection, setSelectedSection] = useState<LayoutSectionConfig | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires 5px movement before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLayout(
        arrayMove(
          layout,
          layout.findIndex((item) => item.id === active.id),
          layout.findIndex((item) => item.id === over.id)
        )
      );
    }
  };

  const toggleVisibility = (id: string) => {
    setLayout(layout.map((item) => item.id === id ? { ...item, visible: !item.visible } : item));
  };

  const handleMoveUp = (id: string) => {
    const idx = layout.findIndex((item) => item.id === id);
    if (idx > 0) setLayout(arrayMove(layout, idx, idx - 1));
  };

  const handleMoveDown = (id: string) => {
    const idx = layout.findIndex((item) => item.id === id);
    if (idx < layout.length - 1) setLayout(arrayMove(layout, idx, idx + 1));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem('sivili_theme_layout', JSON.stringify(layout));
      localStorage.setItem('sivili_theme_settings', JSON.stringify(themeSettings));
      setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 500);
    } catch (e) {
      console.error('Error saving:', e);
      setSaveStatus('idle');
    }
  };

  const renderSection = (config: LayoutSectionConfig) => {
    switch (config.type) {
      case 'hero': return <HeroSection data={config.data} />;
      case 'trust_badges': return <TrustBadgesSection data={config.data} />;
      case 'categories': return <CategoriesSection data={config.data} />;
      case 'featured': return <FeaturedSection data={config.data} />;
      case 'promo': return <PromoSection data={config.data} />;
      case 'new_arrivals': return <NewArrivalsSection data={config.data} />;
      case 'brand_trust': return <BrandTrustSection data={config.data} />;
      default: return null;
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex h-[calc(100vh-56px)] md:h-screen overflow-hidden bg-gray-50">
      
      {/* Sidebar Controls */}
      <div className="w-[350px] bg-white border-r border-gray-200 flex flex-col h-full z-20 shadow-xl overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <h2 className="font-bold text-lg text-[#1E3A5F]">Visual Builder</h2>
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-[#1E3A5F] hover:bg-[#2B5EA7] rounded-md transition-colors disabled:opacity-70 shadow-sm"
          >
            <Save size={16} />
            {saveStatus === 'saving' ? 'กำลังบันทึก...' : saveStatus === 'saved' ? 'บันทึกแล้ว!' : 'Publish'}
          </button>
        </div>

        {/* Global Settings */}
        {!selectedSection ? (
          <div className="p-5">
            <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
              <Palette size={18} className="text-blue-500" /> Global Theme Colors
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">สีหลัก (Primary Color)</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={themeSettings.primaryColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                    className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                  />
                  <input 
                    type="text" 
                    value={themeSettings.primaryColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                    className="flex-1 border border-gray-300 rounded px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">ใช้สำหรับปุ่ม, ลิงก์, และไฮไลท์</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">สีรอง (Secondary Color)</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={themeSettings.secondaryColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                    className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                  />
                  <input 
                    type="text" 
                    value={themeSettings.secondaryColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                    className="flex-1 border border-gray-300 rounded px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">สีพื้นหลัง (Background)</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={themeSettings.backgroundColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, backgroundColor: e.target.value})}
                    className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                  />
                  <input 
                    type="text" 
                    value={themeSettings.backgroundColor} 
                    onChange={(e) => setThemeSettings({...themeSettings, backgroundColor: e.target.value})}
                    className="flex-1 border border-gray-300 rounded px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-100 shadow-sm">
              <p><strong>วิธีแก้ไขเนื้อหา:</strong> เลื่อนเมาส์ไปที่บริเวณหน้าเว็บด้านขวา แล้วคลิกไอคอน ✏️ เพื่อแก้ไขรูปภาพหรือข้อความในบล็อกนั้น หรือลากไอคอนจุด 6 จุด เพื่อสลับตำแหน่งได้เลย</p>
            </div>
          </div>
        ) : (
          /* Section Editor Form */
          <div className="p-5 flex-1 bg-gray-50 shadow-inner">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> 
                แก้ไข {selectedSection.type}
              </h3>
              <button onClick={() => setSelectedSection(null)} className="text-gray-400 hover:text-gray-800 bg-white shadow-sm border border-gray-200 p-1.5 rounded-full transition-all hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>

            {selectedSection.type === 'hero' && (
              <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm font-medium text-gray-800 border-b pb-2">สไลด์ที่ 1</p>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">ลิงก์รูปภาพ (Image URL)</label>
                  <input 
                    type="text" 
                    value={selectedSection.data?.slides?.[0]?.image || ''} 
                    onChange={(e) => {
                      const newSlides = [...(selectedSection.data?.slides || [])];
                      if(newSlides.length > 0) newSlides[0] = { ...newSlides[0], image: e.target.value };
                      updateSectionData(selectedSection.id, { slides: newSlides });
                      setSelectedSection(prev => prev ? {...prev, data: {...prev.data, slides: newSlides}} : null);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://..."
                  />
                  {selectedSection.data?.slides?.[0]?.image && (
                    <img src={selectedSection.data.slides[0].image} alt="Preview" className="mt-2 w-full h-24 object-cover rounded" />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">หัวข้อ (Title)</label>
                  <textarea 
                    value={selectedSection.data?.slides?.[0]?.title || ''} 
                    onChange={(e) => {
                      const newSlides = [...(selectedSection.data?.slides || [])];
                      if(newSlides.length > 0) newSlides[0] = { ...newSlides[0], title: e.target.value };
                      updateSectionData(selectedSection.id, { slides: newSlides });
                      setSelectedSection(prev => prev ? {...prev, data: {...prev.data, slides: newSlides}} : null);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">คำบรรยาย (Subtitle)</label>
                  <textarea 
                    value={selectedSection.data?.slides?.[0]?.subtitle || ''} 
                    onChange={(e) => {
                      const newSlides = [...(selectedSection.data?.slides || [])];
                      if(newSlides.length > 0) newSlides[0] = { ...newSlides[0], subtitle: e.target.value };
                      updateSectionData(selectedSection.id, { slides: newSlides });
                      setSelectedSection(prev => prev ? {...prev, data: {...prev.data, slides: newSlides}} : null);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {selectedSection.type === 'promo' && (
              <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">ป้ายกำกับ (Badge)</label>
                  <input 
                    type="text" 
                    value={selectedSection.data?.badge || ''} 
                    onChange={(e) => {
                      updateSectionData(selectedSection.id, { badge: e.target.value });
                      setSelectedSection(prev => prev ? {...prev, data: {...prev.data, badge: e.target.value}} : null);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">หัวข้อ (Title)</label>
                  <textarea 
                    value={selectedSection.data?.title || ''} 
                    onChange={(e) => {
                      updateSectionData(selectedSection.id, { title: e.target.value });
                      setSelectedSection(prev => prev ? {...prev, data: {...prev.data, title: e.target.value}} : null);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">คำบรรยาย (Subtitle)</label>
                  <textarea 
                    value={selectedSection.data?.subtitle || ''} 
                    onChange={(e) => {
                      updateSectionData(selectedSection.id, { subtitle: e.target.value });
                      setSelectedSection(prev => prev ? {...prev, data: {...prev.data, subtitle: e.target.value}} : null);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">ข้อความปุ่ม (Button)</label>
                  <input 
                    type="text" 
                    value={selectedSection.data?.buttonText || ''} 
                    onChange={(e) => {
                      updateSectionData(selectedSection.id, { buttonText: e.target.value });
                      setSelectedSection(prev => prev ? {...prev, data: {...prev.data, buttonText: e.target.value}} : null);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}
            
            {/* Generic Title/Subtitle Form for other sections */}
            {['categories', 'featured', 'new_arrivals', 'brand_trust'].includes(selectedSection.type) && (
              <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">หัวข้อ (Title)</label>
                  <input 
                    type="text" 
                    value={selectedSection.data?.title || ''} 
                    onChange={(e) => {
                      updateSectionData(selectedSection.id, { title: e.target.value });
                      setSelectedSection(prev => prev ? {...prev, data: {...prev.data, title: e.target.value}} : null);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                {selectedSection.type !== 'brand_trust' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">คำบรรยาย (Subtitle)</label>
                    <input 
                      type="text" 
                      value={selectedSection.data?.subtitle || ''} 
                      onChange={(e) => {
                        updateSectionData(selectedSection.id, { subtitle: e.target.value });
                        setSelectedSection(prev => prev ? {...prev, data: {...prev.data, subtitle: e.target.value}} : null);
                      }}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[#E5E7EB] shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)]">
        <div className="w-full min-h-full bg-[var(--bg-color)] mx-auto relative page-top shadow-2xl transition-colors duration-500">
          
          <div className="pointer-events-none">
            <Navbar isBuilder={true} />
          </div>
          
          <div className="min-h-screen pb-20">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={layout.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                {layout.map((item) => (
                  <BuilderSectionWrapper
                    key={item.id}
                    section={item}
                    isBuilderMode={true}
                    onEdit={setSelectedSection}
                    onToggleVisibility={toggleVisibility}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                  >
                    {renderSection(item)}
                  </BuilderSectionWrapper>
                ))}
              </SortableContext>
            </DndContext>
          </div>
          
          <div className="pointer-events-none mt-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
