'use client';
import { useState, useEffect } from 'react';
import { Movie } from './tmdb';

const KEY = 'movie-finder-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const save = (updated: Movie[]) => {
    setFavorites(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.find(f => f.id === movie.id)) {
      save([...favorites, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    save(favorites.filter(f => f.id !== id));
  };

  const isFavorite = (id: number) => favorites.some(f => f.id === id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
