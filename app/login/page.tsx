'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../components/LanguageProvider';
import { useAuth } from '../components/AuthProvider';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) {
      router.push('/');
    } else {
      setError(res.error || 'เกิดข้อผิดพลาด');
    }
  };

  const quickFill = (role: 'admin' | 'customer') => {
    if (role === 'admin') { setEmail('admin@sivili.com'); setPassword('admin1234'); }
    else { setEmail('somchai@example.com'); setPassword('user1234'); }
  };

  return (
    <>
      <Navbar />
      <main className="page-top" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: '#FAFAF8' }}>
        <div className="sivili-container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            {/* Card */}
            <div className="card" style={{ padding: '2.5rem' }}>
              {/* Logo */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#1E3A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <span style={{ color: '#D4A96A', fontWeight: 800, fontSize: '1.5rem', fontFamily: 'serif' }}>S</span>
                </div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.25rem', fontFamily: 'Kanit, sans-serif' }}>
                  {t('login_title')}
                </h1>
                <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>ยินดีต้อนรับสู่ Sivili Furniture</p>
              </div>

              {/* Demo Quick Fill */}
              <div style={{ background: '#EFF4FB', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#5B6B7A', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  🧪 ทดสอบเร็ว:
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => quickFill('customer')} className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                    ลูกค้า
                  </button>
                  <button type="button" onClick={() => quickFill('admin')} className="btn-primary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                    แอดมิน
                  </button>
                </div>
              </div>

              {error && (
                <div className="alert alert-error mb-4">
                  ⚠ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">{t('email')}</label>
                  <input
                    type="email" className="input" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="form-label">{t('password')}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPwd ? 'text' : 'password'} className="input" required
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ paddingRight: '2.75rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
                    >
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  style={{ fontSize: '1rem', padding: '0.75rem', marginTop: '0.5rem' }}
                  disabled={loading}
                >
                  {loading ? (
                    'กำลังเข้าสู่ระบบ...'
                  ) : (
                    <><LogIn size={18} /> {t('login_btn')}</>
                  )}
                </button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#5B6B7A' }}>
                {t('no_account')}{' '}
                <Link href="/register" style={{ color: '#1E3A5F', fontWeight: 600, textDecoration: 'none' }}>
                  {t('nav_register')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
