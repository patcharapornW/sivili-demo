'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../components/LanguageProvider';
import { useAuth } from '../../components/AuthProvider';
import { Eye, EyeOff, UserPlus, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function RegisterPage() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    if (form.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (res.ok) {
        await login(form.email, form.password);
        router.push('/');
      } else {
        setError(data.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อได้');
    } finally {
      setLoading(false);
    }
  };

  const strength = (pwd: string) => {
    if (pwd.length === 0) return 0;
    if (pwd.length < 6) return 1;
    if (pwd.length < 10) return 2;
    return 3;
  };
  const pwdStrength = strength(form.password);
  const strengthColors = ['', '#DC2626', '#F59E0B', '#16A34A'];
  const strengthLabels = ['', 'อ่อน', 'ปานกลาง', 'แข็งแกร่ง'];

  return (
    <>
      <Navbar />
      <main className="page-top" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: '#FAFAF8' }}>
        <div className="sivili-container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <div className="card" style={{ padding: '2.5rem' }}>
              {/* Logo */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#1E3A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <span style={{ color: '#D4A96A', fontWeight: 800, fontSize: '1.5rem', fontFamily: 'serif' }}>S</span>
                </div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.25rem', fontFamily: 'Kanit, sans-serif' }}>
                  {t('register_title')}
                </h1>
                <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>สร้างบัญชีใหม่กับ Sivili</p>
              </div>

              {/* Benefits */}
              <div style={{ background: '#EFF4FB', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
                {['รับโปรโมชั่นสมาชิกใหม่ลด 10%', 'ติดตามคำสั่งซื้อได้ง่าย', 'บันทึกรายการโปรด'].map((benefit) => (
                  <div key={benefit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#1E3A5F', marginBottom: '0.35rem' }}>
                    <Check size={14} style={{ color: '#16A34A', flexShrink: 0 }} />
                    {benefit}
                  </div>
                ))}
              </div>

              {error && <div className="alert alert-error mb-4">⚠ {error}</div>}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label">{t('name')}</label>
                  <input type="text" name="name" className="input" required value={form.name} onChange={handleChange} placeholder="ชื่อ-นามสกุล" />
                </div>
                <div>
                  <label className="form-label">{t('email')}</label>
                  <input type="email" name="email" className="input" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="form-label">{t('password')}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPwd ? 'text' : 'password'} name="password" className="input" required
                      value={form.password} onChange={handleChange} placeholder="อย่างน้อย 6 ตัวอักษร"
                      style={{ paddingRight: '2.75rem' }}
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {form.password && (
                    <div style={{ marginTop: '0.4rem' }}>
                      <div style={{ height: '4px', borderRadius: '2px', background: '#EDE5D8', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(pwdStrength / 3) * 100}%`, background: strengthColors[pwdStrength], transition: 'all 0.3s' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: strengthColors[pwdStrength] }}>
                        ความปลอดภัย: {strengthLabels[pwdStrength]}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="form-label">{t('confirm_password')}</label>
                  <input
                    type="password" name="confirm" className="input" required
                    value={form.confirm} onChange={handleChange} placeholder="ยืนยันรหัสผ่าน"
                    style={{ borderColor: form.confirm && form.confirm !== form.password ? '#DC2626' : undefined }}
                  />
                  {form.confirm && form.confirm !== form.password && (
                    <p style={{ fontSize: '0.75rem', color: '#DC2626', marginTop: '0.25rem' }}>รหัสผ่านไม่ตรงกัน</p>
                  )}
                </div>

                <button
                  type="submit" className="btn-primary w-full justify-center"
                  style={{ fontSize: '1rem', padding: '0.75rem', marginTop: '0.5rem' }}
                  disabled={loading}
                >
                  {loading ? 'กำลังสมัคร...' : <><UserPlus size={18} /> {t('register_btn')}</>}
                </button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#5B6B7A' }}>
                {t('have_account')}{' '}
                <Link href="/login" style={{ color: '#1E3A5F', fontWeight: 600, textDecoration: 'none' }}>{t('nav_login')}</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
