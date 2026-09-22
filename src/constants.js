/**
 * ============================================================================
 * KITABGHAR API CONSTANTS & ASSET URL BUILDER
 * ============================================================================
 * For Students:
 * - Centralizing API endpoints in one file prevents hardcoding URLs across components.
 * - `getAssetUrl` safely constructs full URLs for covers, PDFs, and audio files
 *   by properly encoding special characters (Urdu text, spaces, etc.).
 * ============================================================================
 */

export const API_BASE_URL = 'http://159.65.157.115';

export const API_ENDPOINTS = {
  ALL_BOOKS: `${API_BASE_URL}/api/books`,
  PDF_BOOKS: `${API_BASE_URL}/api/books?bookType=PDF`,
  UNICODE_BOOKS: `${API_BASE_URL}/api/books?bookType=UNICODE`,
  AUDIOBOOKS: `${API_BASE_URL}/api/audiobooks`,
  SINGLE_BOOK: (id) => `${API_BASE_URL}/api/books/${id}`
};

/**
 * Returns a valid full URL for asset paths (covers, pdfs, audio) returned by the API.
 * Encodes special characters (such as Urdu Nastaliq or spaces in filenames) properly.
 * 
 * Example:
 *   Input:  "books/قدس_1707136331502/قدس.png"
 *   Output: "http://159.65.157.115/books/%D9%82%D8%AF%D8%B3_1707136331502/%D9%82%D8%AF%D8%B3.png"
 */
export function getAssetUrl(relativePath) {
  if (!relativePath || typeof relativePath !== 'string') return '';
  const trimmed = relativePath.trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // Clean leading slash if present
  const cleanPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;

  // Encode each URI segment to safely handle spaces and non-ASCII characters
  const encodedSegments = cleanPath.split('/').map((segment) => encodeURIComponent(segment));
  return `${API_BASE_URL}/${encodedSegments.join('/')}`;
}
