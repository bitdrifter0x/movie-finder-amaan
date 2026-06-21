'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();

  return (
    <nav style={{
      background: 'rgba(10,10,15,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 60,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="display-font" style={{ fontSize: 28, color: 'var(--accent)', letterSpacing: 2 }}>
            CINESEEK
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { href: '/', label: 'Browse' },
            { href: '/favorites', label: '★ Favorites' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              textDecoration: 'none',
              padding: '6px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: path === href ? '#000' : 'var(--muted)',
              background: path === href ? 'var(--accent)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
