import type { Metadata } from 'next';
import { LanguageProvider } from './components/LanguageProvider';
import { CartProvider } from './components/CartProvider';
import { AuthProvider } from './components/AuthProvider';
import { WishlistProvider } from './components/WishlistProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sivili Furniture — เฟอร์นิเจอร์คุณภาพสำหรับบ้านที่คุณรัก',
  description: 'ร้านจำหน่ายเฟอร์นิเจอร์คุณภาพสูง ดีไซน์ทันสมัย ราคาเป็นธรรม สำหรับทุกห้องในบ้านคุณ | Premium quality furniture for your home.',
  keywords: 'เฟอร์นิเจอร์, furniture, โซฟา, เตียง, โต๊ะ, ตู้, Sivili',
  openGraph: {
    title: 'Sivili Furniture',
    description: 'เฟอร์นิเจอร์คุณภาพสำหรับบ้านที่คุณรัก',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Noto+Serif+Thai:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
              </WishlistProvider>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
