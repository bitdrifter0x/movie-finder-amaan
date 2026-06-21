'use client';
import { useFavorites } from '@/lib/useFavorites';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites();

  const toggleFav = (movie: typeof favorites[0]) => {
    isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <h1 className="display-font" style={{ fontSize: 'clamp(40px, 7vw, 72px)', color: 'var(--accent)', letterSpacing: 4, marginBottom: 8 }}>
        YOUR FAVORITES
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: 40, fontSize: 15 }}>
        {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
      </p>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ fontSize: 40 }}>⭐</p>
          <p style={{ color: 'var(--muted)', marginTop: 16, fontSize: 16 }}>No favorites yet.</p>
          <Link href="/" style={{
            display: 'inline-block', marginTop: 20, padding: '10px 28px',
            background: 'var(--accent)', color: '#000', borderRadius: 8,
            textDecoration: 'none', fontWeight: 700, fontSize: 14,
          }}>
            Browse Movies
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 20,
        }}>
          {favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFav={isFavorite(movie.id)}
              onToggleFav={toggleFav}
            />
          ))}
        </div>
      )}
    </div>
  );
}
