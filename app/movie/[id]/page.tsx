'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchMovieDetailById, Movie } from '@/lib/tmdb';
import { useFavorites } from '@/lib/useFavorites';

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetchMovieDetailById(String(id))
      .then(setMovie)
      .catch(() => setError('Failed to load movie details.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--muted)' }}>
      <div style={{ width: 48, height: 48, border: '4px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      Loading...
    </div>
  );

  if (error || !movie) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <p style={{ color: 'var(--danger)', fontSize: 16 }}>{error || 'Movie not found.'}</p>
      <button onClick={() => router.back()} style={{ marginTop: 20, padding: '10px 24px', background: 'var(--accent)', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', color: '#000' }}>
        ← Go Back
      </button>
    </div>
  );

  const year = movie.release_date?.slice(0, 4);
  const isFav = isFavorite(movie.id);

  return (
    <div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px', position: 'relative' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13, marginBottom: 32, fontFamily: 'Inter, sans-serif' }}>
          ← Back
        </button>

        <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Poster */}
          <div style={{ flexShrink: 0, width: 220, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
            {movie.poster_path ? (
              <Image src={movie.poster_path} alt={movie.title} width={220} height={330} style={{ display: 'block', width: '100%', height: 'auto' }} />
            ) : (
              <div style={{ height: 330, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>No Poster</div>
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <h1 className="display-font" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text)', letterSpacing: 2, lineHeight: 1.1 }}>
              {movie.title}
            </h1>
            {movie.tagline && <p style={{ color: 'var(--accent)', fontStyle: 'italic', marginTop: 8, fontSize: 15 }}>"{movie.tagline}"</p>}

            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
              {year && <span style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 6, fontSize: 13, color: 'var(--muted)' }}>{year}</span>}
              {movie.runtime && <span style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: 6, fontSize: 13, color: 'var(--muted)' }}>{movie.runtime} min</span>}
              <span style={{ background: 'var(--accent)', color: '#000', padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 700 }}>★ {movie.vote_average?.toFixed(1)}</span>
            </div>

            {movie.genres && (
              <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                {movie.genres.map(g => (
                  <span key={g.id} style={{ background: 'var(--border)', color: 'var(--text)', padding: '4px 12px', borderRadius: 20, fontSize: 12 }}>{g.name}</span>
                ))}
              </div>
            )}

            <p style={{ marginTop: 24, color: 'var(--muted)', lineHeight: 1.7, fontSize: 15 }}>
              {movie.overview || 'No overview available.'}
            </p>

            <button
              onClick={() => isFav ? removeFavorite(movie.id) : addFavorite(movie)}
              style={{
                marginTop: 28, padding: '12px 28px',
                background: isFav ? 'transparent' : 'var(--accent)',
                color: isFav ? 'var(--accent)' : '#000',
                border: isFav ? '2px solid var(--accent)' : 'none',
                borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
              }}
            >
              {isFav ? '★ Remove from Favorites' : '☆ Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
