'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { useCart } from './CartProvider';
import { useAuth } from './AuthProvider';
import { LOCALE_LABELS, LOCALE_FLAGS, type Locale } from '@/lib/i18n';
import {
  ShoppingCart, Heart, User, Menu, X, ChevronDown,
  Globe, LogOut, Settings, Home, Grid, Package
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar({ isBuilder = false }: { isBuilder?: boolean }) {
  const { locale, setLocale, t } = useLanguage();
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUserOpen(false);
    router.push('/');
  };

  return (
    <>
      {/* Fixed Navbar */}
      <header
        className={`${isBuilder ? 'sticky' : 'fixed'} top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-[0_2px_16px_rgba(30,58,95,0.1)]'
            : 'bg-white/95 backdrop-blur-md border-b border-[#EDE5D8]'
        }`}
        style={{ height: 'var(--navbar-h)' }}
      >
        <nav className="sivili-container h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" style={{ textDecoration: 'none' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#1E3A5F' }}>
              <span style={{ color: '#D4A96A', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'serif' }}>S</span>
            </div>
            <div className="hidden sm:block">
              <div style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#1E3A5F', lineHeight: 1 }}>
                Sivili
              </div>
              <div style={{ fontSize: '0.6rem', color: '#7AABD9', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Furniture
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/', label: t('nav_home') },
              { href: '/catalog', label: t('nav_catalog') },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`btn-ghost text-sm font-medium ${pathname === link.href ? 'text-[#1E3A5F] bg-[#EFF4FB]' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Language Switcher */}
            <div className="relative">
              <button
                className="btn-ghost text-sm flex items-center gap-1"
                onClick={() => { setLangOpen(!langOpen); setUserOpen(false); }}
                aria-label="Language"
              >
                <Globe size={18} />
                <span className="hidden sm:inline">{LOCALE_FLAGS[locale]}</span>
                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-[#EDE5D8] overflow-hidden z-50"
                  style={{ minWidth: '150px' }}
                >
                  {(Object.keys(LOCALE_LABELS) as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocale(loc); setLangOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#EFF4FB] flex items-center gap-2 transition-colors"
                      style={{ color: locale === loc ? '#1E3A5F' : '#5B6B7A', fontWeight: locale === loc ? 600 : 400 }}
                    >
                      <span>{LOCALE_FLAGS[loc]}</span>
                      <span>{LOCALE_LABELS[loc]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="btn-ghost relative" aria-label="Wishlist">
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="btn-ghost relative" aria-label="Cart">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  style={{ background: '#1E3A5F', fontSize: '0.7rem' }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => { setUserOpen(!userOpen); setLangOpen(false); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#EFF4FB] transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: '#1E3A5F' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-[#1E3A5F]">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className={`hidden md:block transition-transform ${userOpen ? 'rotate-180' : ''}`} style={{ color: '#5B6B7A' }} />
                </button>
                {userOpen && (
                  <div
                    className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-[#EDE5D8] overflow-hidden z-50"
                    style={{ minWidth: '180px' }}
                  >
                    <div className="px-4 py-3 border-b border-[#EDE5D8]">
                      <div className="font-semibold text-sm text-[#1E3A5F]">{user.name}</div>
                      <div className="text-xs text-[#9CA3AF] truncate">{user.email}</div>
                    </div>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#EFF4FB] transition-colors"
                        style={{ color: '#1E3A5F', textDecoration: 'none' }}
                        onClick={() => setUserOpen(false)}
                      >
                        <Settings size={16} />
                        {t('nav_admin')}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[#FEF2F2] transition-colors text-left"
                      style={{ color: '#DC2626' }}
                    >
                      <LogOut size={16} />
                      {t('nav_logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-sm py-2 px-4 hidden sm:flex">
                {t('nav_login')}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="btn-ghost md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="overlay md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu md:hidden ${mobileOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE5D8]">
          <div style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#1E3A5F' }}>
            Sivili Furniture
          </div>
          <button className="btn-ghost p-1" onClick={() => setMobileOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="px-4 py-4 space-y-1">
          {[
            { href: '/', label: t('nav_home'), icon: <Home size={18} /> },
            { href: '/catalog', label: t('nav_catalog'), icon: <Grid size={18} /> },
            { href: '/cart', label: t('nav_cart'), icon: <ShoppingCart size={18} /> },
            { href: '/wishlist', label: t('nav_wishlist'), icon: <Heart size={18} /> },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#EFF4FB] transition-colors"
              style={{ color: '#1E3A5F', textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 500 }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {!user && (
            <div className="pt-4 space-y-2">
              <Link href="/login" className="btn-primary w-full justify-center">
                {t('nav_login')}
              </Link>
              <Link href="/register" className="btn-secondary w-full justify-center">
                {t('nav_register')}
              </Link>
            </div>
          )}

          {user && (
            <div className="pt-4 border-t border-[#EDE5D8]">
              <div className="px-3 py-2 text-sm text-[#5B6B7A]">
                {t('nav_account')}: <span className="font-semibold text-[#1E3A5F]">{user.name}</span>
              </div>
              {isAdmin && (
                <Link href="/admin" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#EFF4FB]" style={{ color: '#1E3A5F', textDecoration: 'none' }}>
                  <Settings size={18} />
                  {t('nav_admin')}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#FEF2F2] text-left"
                style={{ color: '#DC2626', fontSize: '0.9375rem', fontWeight: 500 }}
              >
                <LogOut size={18} />
                {t('nav_logout')}
              </button>
            </div>
          )}

          {/* Language in mobile */}
          <div className="pt-4 border-t border-[#EDE5D8]">
            <div className="text-xs font-semibold text-[#9CA3AF] px-3 mb-2 uppercase tracking-wider">ภาษา / Language</div>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(LOCALE_LABELS) as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className="py-2 px-1 rounded-lg text-xs flex flex-col items-center gap-1 transition-colors"
                  style={{
                    background: locale === loc ? '#1E3A5F' : '#F5F0E8',
                    color: locale === loc ? 'white' : '#1E3A5F',
                    fontWeight: locale === loc ? 600 : 400,
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{LOCALE_FLAGS[loc]}</span>
                  <span>{LOCALE_LABELS[loc]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(langOpen || userOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => { setLangOpen(false); setUserOpen(false); }}
        />
      )}
    </>
  );
}
