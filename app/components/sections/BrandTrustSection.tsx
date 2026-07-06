'use client';

export default function BrandTrustSection({ data }: { data?: any }) {
  return (
    <section className="section" style={{ background: '#F5F0E8' }}>
      <div className="sivili-container text-center">
        <h2 className="section-title mb-4">ทำไมต้องเลือก Sivili?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              icon: '🪵',
              title: 'วัสดุคุณภาพสูง',
              desc: 'คัดสรรวัสดุชั้นดี ไม้แท้ เหล็กกล้า ผ้าพรีเมียม ทนทานนับสิบปี',
            },
            {
              icon: '✏️',
              title: 'ดีไซน์ทันสมัย',
              desc: 'ออกแบบโดยทีมนักออกแบบมืออาชีพ ผสมผสานความคลาสสิกและความทันสมัย',
            },
            {
              icon: '🛡️',
              title: 'รับประกัน 1 ปี',
              desc: 'รับประกันสินค้าทุกชิ้น บริการหลังการขายที่เชื่อถือได้ทั่วประเทศ',
            },
          ].map((item) => (
            <div key={item.title} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1E3A5F', marginBottom: '0.75rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#5B6B7A', lineHeight: 1.7, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
