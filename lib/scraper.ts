/**
 * URL scraper for extracting web content
 * Uses basic text extraction with readability algorithms
 */

export interface ScrapedContent {
  title: string;
  content: string;
  url: string;
}

/**
 * Extract text content from HTML
 */
function extractTextFromHTML(html: string): string {
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Extract title from HTML
 */
function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) {
    return extractTextFromHTML(h1Match[1]);
  }

  return 'Untitled';
}

/**
 * Scrape content from a URL
 */
export async function scrapeURL(url: string): Promise<ScrapedContent> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const title = extractTitle(html);
    let content = extractTextFromHTML(html);

    // Limit content to 5000 characters for API efficiency
    if (content.length > 5000) {
      content = content.substring(0, 5000) + '...';
    }

    return {
      title,
      content,
      url
    };
  } catch (error) {
    throw new Error(`Failed to scrape URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
