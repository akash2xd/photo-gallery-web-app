import { useState, useEffect } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to fetch photos from the Picsum Photos API.
 * Returns photos array, loading state, and error state.
 * Handles cleanup on unmount via AbortController.
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Don't set error state if the request was intentionally aborted
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch photos');
        }
      } finally {
        // Only update loading if not aborted
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    // Cleanup: abort the fetch request on unmount
    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}

