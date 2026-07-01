'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../components/LanguageProvider';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];
const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price));

function CatalogContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'default');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const applyFilters = useCallback(() => {
    let result = [...PRODUCTS];
    if (category) result = result.filter((p) => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.nameTh.includes(q) || p.nameEn.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (searchParams.get('featured') === 'true') result = result.filter((p) => p.isFeatured);

    switch (sort) {
      case 'price_asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break;
      case 'newest':     result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew)); break;
    }
    setProducts(result);
  }, [category, search, selectedBrands, minPrice, maxPrice, sort, searchParams]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const clearFilters = () => {
    setSearch(''); setCategory(''); setSort('default');
    setMinPrice(0); setMaxPrice(MAX_PRICE); setSelectedBrands([]);
    router.push('/catalog');
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const activeFiltersCount = [
    category, ...selectedBrands,
    minPrice > 0 ? '1' : '',
    maxPrice < MAX_PRICE ? '1' : '',
  ].filter(Boolean).length;

  const FilterPanel = () => (
    <aside className="filter-sidebar">
      <div className="flex items-center justify-between mb-5">
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1E3A5F', margin: 0 }}>{t('filter_title')}</h3>
        {activeFiltersCount > 0 && (
          <button onClick={clearFilters} className="text-xs font-semibold" style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer' }}>
            {t('filter_clear')} ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="form-label">{t('filter_category')}</label>
        <div className="space-y-1 mt-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <button
            onClick={() => setCategory('')}
            style={{
              textAlign: 'left', padding: '0.4rem 0.6rem', borderRadius: '0.375rem', border: 'none',
              background: !category ? '#EFF4FB' : 'transparent', color: !category ? '#1E3A5F' : '#5B6B7A',
              fontWeight: !category ? 600 : 400, cursor: 'pointer', fontSize: '0.875rem',
            }}
          >
            ทั้งหมด
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                textAlign: 'left', padding: '0.4rem 0.6rem', borderRadius: '0.375rem', border: 'none',
                background: category === cat.id ? '#EFF4FB' : 'transparent',
                color: category === cat.id ? '#1E3A5F' : '#5B6B7A',
                fontWeight: category === cat.id ? 600 : 400, cursor: 'pointer', fontSize: '0.875rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <span>{cat.icon}</span> {t(cat.nameKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-5">
        <label className="form-label">{t('filter_price')}</label>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#5B6B7A', marginBottom: '0.5rem' }}>
          <span>฿{minPrice.toLocaleString()}</span>
          <span>฿{maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range" min={0} max={MAX_PRICE} step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#1E3A5F' }}
        />
      </div>

      {/* Brand */}
      <div>
        <label className="form-label">{t('filter_brand')}</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
          {BRANDS.map((brand) => (
            <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#5B6B7A' }}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                style={{ width: '16px', height: '16px', accentColor: '#1E3A5F' }}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <Navbar />
      <main className="page-top">
        {/* Header */}
        <div style={{ background: '#EFF4FB', borderBottom: '1px solid #D6E4F5', padding: '2rem 0' }}>
          <div className="sivili-container">
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.25rem' }}>
              {t('nav_catalog')}
            </h1>
            <p style={{ color: '#5B6B7A', fontSize: '0.9rem', margin: 0 }}>
              {products.length} {t('items')} · {category ? t(`cat_${category}`) : 'ทั้งหมด'}
            </p>
          </div>
        </div>

        <div className="sivili-container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
          {/* Search + Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                className="input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder={t('search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <select
                className="select"
                style={{ minWidth: '180px' }}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">{t('sort_default')}</option>
                <option value="price_asc">{t('sort_price_asc')}</option>
                <option value="price_desc">{t('sort_price_desc')}</option>
                <option value="rating">{t('sort_rating')}</option>
                <option value="newest">{t('sort_newest')}</option>
              </select>
              {/* Mobile Filter Toggle */}
              <button
                className="btn-secondary lg:hidden flex items-center gap-2"
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal size={16} />
                {t('filter_title')}
                {activeFiltersCount > 0 && (
                  <span className="badge badge-navy" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block" style={{ width: '240px', flexShrink: 0 }}>
              <FilterPanel />
            </div>

            {/* Product Grid */}
            <div style={{ flex: 1 }}>
              {products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9CA3AF' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <p style={{ fontSize: '1rem' }}>{t('no_products')}</p>
                  <button onClick={clearFilters} className="btn-secondary mt-4">{t('filter_clear')}</button>
                </div>
              ) : (
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {filterOpen && (
          <>
            <div className="overlay lg:hidden" onClick={() => setFilterOpen(false)} />
            <div
              style={{
                position: 'fixed', right: 0, top: 0, bottom: 0, width: '85%', maxWidth: '320px',
                background: 'white', zIndex: 50, overflowY: 'auto', padding: '1.5rem',
                boxShadow: '-4px 0 24px rgba(30,58,95,0.15)',
                transform: filterOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1E3A5F', margin: 0 }}>{t('filter_title')}</h3>
                <button onClick={() => setFilterOpen(false)} className="btn-ghost p-1">
                  <X size={20} />
                </button>
              </div>
              <FilterPanel />
              <button className="btn-primary w-full mt-4" onClick={() => setFilterOpen(false)}>
                {t('filter_apply')} ({products.length} {t('items')})
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  );
}
