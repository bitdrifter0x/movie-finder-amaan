# AI_LOG.md

## Tools Used
- Claude (claude.ai) — used for scaffolding components, writing TypeScript types, and structuring the API utility layer.
- GitHub Copilot — used for autocompleting repetitive JSX patterns in MovieCard and Pagination.

## Best Prompts

**Prompt 1:**
> "Build a TypeScript utility module for the TMDB API that exports typed interfaces for Movie and MovieResponse, and functions for fetchPopular, searchMovies, and fetchMovieDetail. Use the env variable NEXT_PUBLIC_TMDB_API_KEY and throw descriptive errors on non-ok responses."

*Why it worked:* Being specific about the exports, the env var name, and the error-handling behavior prevented the AI from generating a generic, untyped fetch wrapper. It produced exactly the module shape I needed without any rework.

**Prompt 2:**
> "Write a React custom hook called useFavorites that reads/writes to localStorage under the key 'movie-finder-favorites'. It should expose favorites array, addFavorite, removeFavorite, and isFavorite. Handle JSON parse errors silently."

*Why it worked:* Naming the hook, the storage key, and each returned value upfront eliminated ambiguity. The AI didn't invent extra state or unnecessary useCallback wrappers.

**Prompt 3:**
> "Create a Pagination component in Next.js that takes page, totalPages, onPrev, onNext. Disable the Previous button when page <= 1 and Next when page >= totalPages. Cap totalPages at 500 to match TMDB's API limit."

*Why it worked:* Including the TMDB-specific 500-page cap was a detail the AI would never have inferred on its own — prompting with domain constraints produced correct edge-case handling immediately.

## What I Fixed Manually

The AI-generated home page initially used `useEffect` to trigger the search on both `query` and `page` changes with a single effect, which caused a double-fetch on initial load (once for query change and once for page change). I separated the effects: the query effect resets `page` to 1 and calls `load`, while the page effect only fires when `page` changes (and skips the reset). This eliminated the redundant request and a brief flicker in the movie grid on first render.
