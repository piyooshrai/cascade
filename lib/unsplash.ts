/**
 * Unsplash API integration for slide images
 * Free tier: 50 requests/hour
 */

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';

export async function fetchUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('UNSPLASH_ACCESS_KEY not configured, skipping image fetch');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      console.error('Unsplash API error:', response.status);
      return null;
    }

    const data = await response.json();
    return data.urls.regular; // Returns optimized image URL
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return null;
  }
}

/**
 * Fetch multiple images in parallel
 */
export async function fetchMultipleUnsplashImages(queries: string[]): Promise<(string | null)[]> {
  return Promise.all(queries.map(query => fetchUnsplashImage(query)));
}
