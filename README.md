# movie-finder-amaan

A Movie Discovery App built with Next.js and the OMDb API.

## Live Demo
[movie-finder-amaan.vercel.app](https://movie-finder-amaan.vercel.app)

## Features
- Browse popular movies in a responsive 12-per-page grid
- Search movies by title with debounced live results
- Manual pagination (Next / Previous) — no infinite scroll
- Movie detail page with overview, genres, runtime, and rating
- Favorites persisted in localStorage across sessions
- Loading, error, and empty states handled throughout

## Getting Started

### 1. Clone the repo
\```bash
git clone https://github.com/bitdrifter0x/movie-finder-amaan.git
cd movie-finder-amaan
\```

### 2. Install dependencies
\```bash
npm install
\```

### 3. Add your OMDb API key
Create a `.env.local` file in the project root:
\```
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
\```
Get a free key at [omdbapi.com](https://www.omdbapi.com/apikey.aspx).

### 4. Run locally
\```bash
npm run dev
\```
Open [http://localhost:3000](http://localhost:3000).

## Data Source
[OMDb API](https://www.omdbapi.com/) — The Open Movie Database free public API.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- OMDb REST API
