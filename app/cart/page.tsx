'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../components/LanguageProvider';
import { useCart } from '../components/CartProvider';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { t } = useLanguage();
  const { items, removeItem, updateQty, totalPrice, totalItems } = useCart();

  const shipping = totalPrice >= 5000 ? 0 : 350;

  return (
    <>
      <Navbar />
      <main className="page-top" style={{ minHeight: '70vh' }}>
        <div style={{ background: '#EFF4FB', borderBottom: '1px solid #D6E4F5', padding: '1.5rem 0' }}>
          <div className="sivili-container">
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E3A5F', margin: 0 }}>
              {t('cart_title')}
            </h1>
            <p style={{ color: '#5B6B7A', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
              {totalItems} {t('items')}
            </p>
          </div>
        </div>

        <div className="sivili-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <ShoppingBag size={64} style={{ color: '#D6E4F5', margin: '0 auto 1.5rem' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.5rem' }}>{t('cart_empty')}</h2>
              <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>{t('cart_empty_sub')}</p>
              <Link href="/catalog" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                {t('cart_continue')} <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div style={{ flex: 1 }}>
                <div className="card" style={{ overflow: 'visible' }}>
                  {items.map((item, index) => (
                    <div key={item.id}>
                      <div
                        style={{
                          padding: '1.25rem',
                          display: 'flex',
                          gap: '1rem',
                          alignItems: 'flex-start',
                        }}
                      >
                        {/* Image */}
                        <Link href={`/products/${item.productId}`}>
                          <div style={{ width: '90px', height: '90px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, background: '#F5F0E8' }}>
                            <img src={item.image} alt={item.nameTh} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        </Link>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Link href={`/products/${item.productId}`} style={{ textDecoration: 'none' }}>
                            <h3 style={{ fontWeight: 600, color: '#1E3A5F', fontSize: '0.9375rem', marginBottom: '0.25rem', lineHeight: 1.4 }}>
                              {item.nameTh}
                            </h3>
                          </Link>
                          <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '0.75rem' }}>
                            ฿{item.price.toLocaleString()} / ชิ้น
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div className="qty-stepper">
                              <button onClick={() => updateQty(item.productId, item.quantity - 1)} aria-label="Decrease">
                                <Minus size={14} />
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQty(item.productId, item.quantity + 1)} aria-label="Increase">
                                <Plus size={14} />
                              </button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1E3A5F' }}>
                                ฿{(item.price * item.quantity).toLocaleString()}
                              </span>
                              <button
                                onClick={() => removeItem(item.productId)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', padding: '0.25rem' }}
                                aria-label={t('remove_item')}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < items.length - 1 && <div style={{ height: '1px', background: '#EDE5D8', margin: '0 1.25rem' }} />}
                    </div>
                  ))}
                </div>

                <Link href="/catalog" className="btn-ghost mt-4 inline-flex">
                  ← {t('cart_continue')}
                </Link>
              </div>

              {/* Order Summary */}
              <div style={{ width: '100%', maxWidth: '340px', flexShrink: 0 }}>
                <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: 'calc(var(--navbar-h) + 1rem)' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1E3A5F', marginBottom: '1.25rem' }}>
                    สรุปคำสั่งซื้อ
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: '#5B6B7A' }}>
                      <span>{t('cart_subtotal')} ({totalItems} รายการ)</span>
                      <span>฿{totalPrice.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: '#5B6B7A' }}>
                      <span>{t('cart_shipping')}</span>
                      <span style={{ color: shipping === 0 ? '#065F46' : '#1E3A5F', fontWeight: shipping === 0 ? 600 : 400 }}>
                        {shipping === 0 ? '🎉 ' + t('cart_shipping_free') : `฿${shipping}`}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <div className="alert alert-success" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                        คุณได้รับสิทธิ์จัดส่งฟรี!
                      </div>
                    )}
                    {shipping > 0 && totalPrice < 5000 && (
                      <div className="alert alert-info" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                        ซื้อเพิ่ม ฿{(5000 - totalPrice).toLocaleString()} เพื่อจัดส่งฟรี
                      </div>
                    )}
                  </div>
                  <div style={{ height: '1px', background: '#EDE5D8', marginBottom: '1rem' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.25rem', color: '#1E3A5F', marginBottom: '1.25rem' }}>
                    <span>{t('cart_total')}</span>
                    <span>฿{(totalPrice + shipping).toLocaleString()}</span>
                  </div>
                  <Link href="/checkout" className="btn-primary w-full justify-center" style={{ fontSize: '1rem', padding: '0.875rem' }}>
                    {t('cart_checkout')} <ArrowRight size={18} />
                  </Link>
                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>🔒 ชำระเงินปลอดภัย</span>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>✓ รับประกันคืนเงิน</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
