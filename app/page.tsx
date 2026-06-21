'use client';
import { useState, useEffect, useCallback } from 'react';
import { fetchPopular, searchMovies, Movie, MovieResponse } from '@/lib/tmdb';
import { useFavorites } from '@/lib/useFavorites';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';

const PAGE_SIZE = 12;

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const load = useCallback(async (q: string, p: number) => {
    setLoading(true);
    setError('');
    try {
      let data: MovieResponse;
      if (q.trim()) {
        data = await searchMovies(q, p);
      } else {
        data = await fetchPopular(p);
      }
      // Enforce exactly 12 per page
      setMovies(data.results.slice(0, PAGE_SIZE));
      setTotalPages(data.total_pages);
    } catch (e) {
      setError('Something went wrong. Please check your API key or try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      load(query, 1);
    }, 400);
    return () => clearTimeout(t);
  }, [query, load]);

  useEffect(() => {
    load(query, page);
  }, [page]);

  const toggleFav = (movie: Movie) => {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      {/* Hero */}
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <h1 className="display-font" style={{ fontSize: 'clamp(48px, 8vw, 88px)', color: 'var(--accent)', letterSpacing: 4, lineHeight: 1 }}>
          DISCOVER MOVIES
        </h1>
        <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: 15 }}>
          Browse popular titles or search for anything
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto 40px' }}>
        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 18 }}>⌕</span>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%', padding: '14px 14px 14px 46px',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, color: 'var(--text)', fontSize: 16,
            outline: 'none', fontFamily: 'Inter, sans-serif',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 18
          }}>✕</button>
        )}
      </div>

      {/* States */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <div style={{
            width: 48, height: 48, border: '4px solid var(--border)',
            borderTopColor: 'var(--accent)', borderRadius: '50%',
            margin: '0 auto 20px', animation: 'spin 0.8s linear infinite'
          }} />
          <p>Loading movies...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!loading && error && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ fontSize: 40 }}>⚠️</p>
          <p style={{ color: 'var(--danger)', marginTop: 12, fontSize: 16 }}>{error}</p>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ fontSize: 40 }}>🎬</p>
          <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 16 }}>
            No movies found for <strong style={{ color: 'var(--text)' }}>&quot;{query}&quot;</strong>. Try a different title.
          </p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          {query && (
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
              Showing results for <strong style={{ color: 'var(--accent)' }}>&quot;{query}&quot;</strong>
            </p>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 20,
          }}>
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={isFavorite(movie.id)}
                onToggleFav={toggleFav}
              />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => { setPage(p => p - 1); window.scrollTo(0, 0); }}
            onNext={() => { setPage(p => p + 1); window.scrollTo(0, 0); }}
          />
        </>
      )}

      {/* Footer */}
      <footer style={{
        marginTop: 64, borderTop: '1px solid var(--border)', paddingTop: 24,
        textAlign: 'center', color: 'var(--muted)', fontSize: 13,
      }}>
        Designed & coded with ♡ by Amaan Hasan © 2026.
      </footer>
    </div>
  );
}
