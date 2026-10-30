import { useState, useReducer, useCallback, useMemo, useEffect } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';

// ──────────────────────────────────────────────
// Favourites Reducer + localStorage persistence
// ──────────────────────────────────────────────

const STORAGE_KEY = 'photo-gallery-favourites';

/**
 * Safely load favourite IDs from localStorage.
 * Returns a Set of favourite photo IDs (as strings).
 */
function loadFavourites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return new Set();

    const parsed = JSON.parse(stored);

    // Validate that the stored data is an array of strings/numbers
    if (!Array.isArray(parsed)) return new Set();

    return new Set(parsed.map(String));
  } catch {
    // If data is corrupt or JSON.parse fails, start fresh
    return new Set();
  }
}

/**
 * Save favourite IDs to localStorage.
 */
function saveFavourites(favourites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favourites]));
  } catch {
    // Silently fail if localStorage is full or unavailable
  }
}

/**
 * Reducer for managing favourite photo IDs.
 * Action type: 'TOGGLE_FAVOURITE' with payload: photoId
 */
function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const newFavourites = new Set(state);
      const id = String(action.payload);

      if (newFavourites.has(id)) {
        newFavourites.delete(id);
      } else {
        newFavourites.add(id);
      }

      return newFavourites;
    }
    default:
      return state;
  }
}

// ──────────────────────────────────────────
// Gallery Component
// ──────────────────────────────────────────

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  // Initialize favourites from localStorage using useReducer
  const [favourites, dispatch] = useReducer(favouritesReducer, null, loadFavourites);

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Sync favourites to localStorage whenever they change
  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

  // Toggle favourite handler
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  }, []);

  // Search handler using useCallback
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Filter photos by author name using useMemo
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;

    const query = searchQuery.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20" role="status">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin" />
        <p className="mt-4 text-gray-500 text-sm">Loading photos…</p>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center" role="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-red-400 mb-3"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <p className="text-red-600 font-medium">Something went wrong</p>
        <p className="text-gray-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by author…"
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search photos by author name"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow duration-200"
          />
        </div>
      </div>

      {/* Empty search results */}
      {filteredPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-gray-300 mb-3"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <p className="text-gray-500 font-medium">No photos found</p>
          <p className="text-gray-400 text-sm mt-1">
            No results for &ldquo;{searchQuery}&rdquo;. Try a different name.
          </p>
        </div>
      ) : (
        /* Photo grid — responsive: 1 col mobile, 2 col tablet, 4 col desktop */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.has(String(photo.id))}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
