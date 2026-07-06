export type LayoutSectionType = 'hero' | 'trust_badges' | 'categories' | 'featured' | 'promo' | 'new_arrivals' | 'brand_trust';

export interface LayoutSectionConfig {
  id: string; // unique identifier
  type: LayoutSectionType;
  visible: boolean;
  data?: any; // flexible for now, can be strongly typed later
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

export const defaultThemeSettings: ThemeSettings = {
  primaryColor: '#D4A96A',
  secondaryColor: '#1E3A5F',
  backgroundColor: '#FAFAF8',
};

export const defaultLayoutConfig: LayoutSectionConfig[] = [
  { 
    id: 'hero_1', type: 'hero', visible: true, 
    data: {
      slides: [
        {
          id: 'slide_1',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=90',
          title: 'เฟอร์นิเจอร์ระดับพรีเมียม',
          subtitle: 'ยกระดับความหรูหราให้บ้านของคุณ',
        },
        {
          id: 'slide_2',
          image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=90',
          title: 'ห้องนอนสุดหรู\nสำหรับการพักผ่อนที่สมบูรณ์แบบ',
          subtitle: 'เตียงและเฟอร์นิเจอร์ห้องนอนคุณภาพพรีเมียม',
        }
      ]
    } 
  },
  { id: 'trust_badges_1', type: 'trust_badges', visible: true, data: {} },
  { id: 'categories_1', type: 'categories', visible: true, data: { title: 'เลือกซื้อตามหมวดหมู่', subtitle: 'เลือกเฟอร์นิเจอร์ตามห้องที่คุณต้องการ' } },
  { id: 'featured_1', type: 'featured', visible: true, data: { title: 'สินค้าแนะนำ', subtitle: 'คัดสรรสินค้าคุณภาพเพื่อคุณ' } },
  { 
    id: 'promo_1', type: 'promo', visible: true, 
    data: {
      badge: '🎉 โปรโมชั่นพิเศษ',
      title: 'จัดส่งฟรีทั่วประเทศ\nเมื่อซื้อครบ ฿5,000',
      subtitle: 'ใช้โค้ด SIVILI2026 รับส่วนลดเพิ่มอีก 10% สำหรับสมาชิกใหม่',
      buttonText: 'ช้อปเลย'
    } 
  },
  { id: 'new_arrivals_1', type: 'new_arrivals', visible: true, data: { title: 'สินค้ามาใหม่', subtitle: 'สินค้ามาใหม่ ล่าสุดในร้าน' } },
  { id: 'brand_trust_1', type: 'brand_trust', visible: true, data: { title: 'ทำไมต้องเลือก Sivili?' } },
];

export const sectionNames: Record<LayoutSectionType, string> = {
  hero: 'Hero Banner',
  trust_badges: 'Trust Badges (จุดเด่นบริการ)',
  categories: 'หมวดหมู่สินค้า',
  featured: 'สินค้าแนะนำ',
  promo: 'โปรโมชั่นแบนเนอร์',
  new_arrivals: 'สินค้ามาใหม่',
  brand_trust: 'เหตุผลที่เลือกเรา (Brand Trust)',
};
