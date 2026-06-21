'use client';

interface Props {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ page, totalPages, onPrev, onNext }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 40 }}>
      <button
        onClick={onPrev}
        disabled={page <= 1}
        style={{
          padding: '10px 28px',
          background: page <= 1 ? 'var(--border)' : 'var(--accent)',
          color: page <= 1 ? 'var(--muted)' : '#000',
          border: 'none', borderRadius: 8,
          fontWeight: 700, fontSize: 14, cursor: page <= 1 ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        ← Previous
      </button>

      <span style={{ color: 'var(--muted)', fontSize: 14 }}>
        Page <strong style={{ color: 'var(--text)' }}>{page}</strong> of <strong style={{ color: 'var(--text)' }}>{Math.min(totalPages, 500)}</strong>
      </span>

      <button
        onClick={onNext}
        disabled={page >= Math.min(totalPages, 500)}
        style={{
          padding: '10px 28px',
          background: page >= Math.min(totalPages, 500) ? 'var(--border)' : 'var(--accent)',
          color: page >= Math.min(totalPages, 500) ? 'var(--muted)' : '#000',
          border: 'none', borderRadius: 8,
          fontWeight: 700, fontSize: 14,
          cursor: page >= Math.min(totalPages, 500) ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Next →
      </button>
    </div>
  );
}
