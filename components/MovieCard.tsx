'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/lib/tmdb';

interface Props {
  movie: Movie;
  isFav: boolean;
  onToggleFav: (movie: Movie) => void;
}

export default function MovieCard({ movie, isFav, onToggleFav }: Props) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, border-color 0.2s',
      cursor: 'pointer',
      position: 'relative',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
      (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
    }}>
      {/* Fav button */}
      <button
        onClick={e => { e.preventDefault(); onToggleFav(movie); }}
        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        style={{
          position: 'absolute', top: 10, right: 10, zIndex: 10,
          background: isFav ? 'var(--accent)' : 'rgba(0,0,0,0.6)',
          border: 'none', borderRadius: '50%',
          width: 34, height: 34, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, transition: 'background 0.2s',
        }}
      >
        {isFav ? '★' : '☆'}
      </button>

      <Link href={`/movie/${movie.imdbID ?? movie.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Poster */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '2/3', background: 'var(--surface)' }}>
          {movie.poster_path ? (
            <Image
              src={movie.poster_path}
              alt={movie.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No Poster
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '12px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3, color: 'var(--text)' }}>
            {movie.title}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>{year}</span>
            <span style={{
              background: 'var(--accent)', color: '#000',
              borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 700
            }}>
              ★ {rating}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}