const BASE = 'https://www.omdbapi.com';
const KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export const IMG_BASE = '';
export const IMG_ORIGINAL = '';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  imdbID?: string;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

function omdbToMovie(m: any, index: number): Movie {
  return {
    id: index + 1,
    title: m.Title,
    poster_path: m.Poster !== 'N/A' ? m.Poster : null,
    backdrop_path: null,
    release_date: m.Year ? `${m.Year}-01-01` : '',
    vote_average: m.imdbRating && m.imdbRating !== 'N/A' ? parseFloat(m.imdbRating) : 0,
    overview: m.Plot && m.Plot !== 'N/A' ? m.Plot : '',
    genres: m.Genre && m.Genre !== 'N/A' ? m.Genre.split(', ').map((g: string, i: number) => ({ id: i, name: g })) : [],
    runtime: m.Runtime && m.Runtime !== 'N/A' ? parseInt(m.Runtime) : undefined,
    tagline: undefined,
    imdbID: m.imdbID,
  };
}

const POPULAR_SEARCHES = [
  'avengers', 'batman', 'spider', 'star wars', 'harry potter',
  'fast furious', 'james bond', 'jurassic', 'matrix', 'titanic',
  'inception', 'interstellar'
];

export async function fetchPopular(page = 1): Promise<MovieResponse> {
  const term = POPULAR_SEARCHES[(page - 1) % POPULAR_SEARCHES.length];
  const res = await fetch(`${BASE}/?apikey=${KEY}&s=${encodeURIComponent(term)}&type=movie&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error || 'No results');
  const results = (data.Search || []).slice(0, 12).map(omdbToMovie);
  return {
    results,
    total_pages: 12,
    total_results: parseInt(data.totalResults) || 0,
    page,
  };
}

export async function searchMovies(query: string, page = 1): Promise<MovieResponse> {
  const res = await fetch(`${BASE}/?apikey=${KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`);
  if (!res.ok) throw new Error('Search failed');
  const data = await res.json();
  if (data.Response === 'False') return { results: [], total_pages: 0, total_results: 0, page };
  const results = (data.Search || []).slice(0, 12).map(omdbToMovie);
  const totalResults = parseInt(data.totalResults) || 0;
  return {
    results,
    total_pages: Math.ceil(totalResults / 10),
    total_results: totalResults,
    page,
  };
}

export async function fetchMovieDetail(id: number): Promise<Movie> {
  // id here is imdbID stored via search — we use a workaround via sessionStorage
  // Instead we fetch by imdbID passed as string via a global map
  throw new Error('Use fetchMovieDetailById instead');
}

export async function fetchMovieDetailById(imdbID: string): Promise<Movie> {
  const res = await fetch(`${BASE}/?apikey=${KEY}&i=${imdbID}&plot=full`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  const m = await res.json();
  if (m.Response === 'False') throw new Error(m.Error);
  return omdbToMovie(m, 0);
}
