
import { API_ENDPOINTS, getAssetUrl } from '../constants';

/**
 * ============================================================================
 * BOOK SERVICE - REST API INTEGRATION & NORMALIZATION
 * ============================================================================
 * For Students:
 * - This service handles network requests to the backend REST API:
 *   1. PDF Books:     GET /api/books?bookType=PDF&page=1
 *   2. Unicode Books: GET /api/books?bookType=UNICODE&page=1
 *   3. Audiobooks:    GET /api/audiobooks?page=1
 *   4. Single Book:   GET /api/books/:id
 * 
 * - Normalization:
 *   Backend APIs often return raw database schemas with properties like `_id`,
 *   `fileUri`, `coverPhotoUri`, `audioFilesUri`. We convert them into a uniform
 *   structure that our React components can display easily.
 * ============================================================================
 */

/**
 * Normalizes an API response item into a unified Book object for our UI.
 */
export function normalizeApiBook(item, type = 'book') {
  const isAudio = type === 'audio' || !!(item.audioFilesUri && item.audioFilesUri.length);
  const isUnicode = item.bookType === 'UNICODE';
  const isPdf = item.bookType === 'PDF';

  // Determine category display name
  let category = 'PDF Books';
  if (isAudio) category = 'Audio Books';
  else if (isUnicode) category = 'Unicode Books';

  const authorName = item.author?.name || (typeof item.author === 'string' ? item.author : 'Unknown Author');
  const title = item.title || 'Untitled Book';
  const isRtl = /[\u0600-\u06FF]/.test(title);

  // Card theme gradients
  let coverTheme = 'cover-prog';
  if (isAudio) coverTheme = 'cover-audio';
  else if (isUnicode) coverTheme = 'cover-unicode';
  else if (isPdf) coverTheme = 'cover-web';

  const coverUrl = getAssetUrl(item.coverPhotoUri);
  const pdfUrl = getAssetUrl(item.fileUri);
  const audioUrl = item.audioFilesUri?.[0] ? getAssetUrl(item.audioFilesUri[0]) : null;

  const formatPill = isAudio ? '🎧 MP3 Audio' : (isUnicode ? '🔤 UTF-8 Text' : '📄 PDF Document');
  const pillTag = isAudio
    ? (item.narrator ? `🎙️ ${item.narrator}` : 'Audiobook')
    : (isUnicode ? 'نستعلیق یونی کوڈ' : 'مکمل دستاویز');

  return {
    id: item._id,
    _id: item._id,
    title,
    author: isAudio && item.narrator ? `🎙️ صداکاری: ${item.narrator} • ${authorName}` : authorName,
    rawAuthor: authorName,
    narrator: item.narrator || '',
    category,
    coverTheme,
    coverPhotoUri: item.coverPhotoUri,
    coverUrl,
    fileUri: item.fileUri,
    pdfUrl,
    audioFilesUri: item.audioFilesUri || [],
    audioUrl,
    chapters: item.chapters || [],
    formatPill,
    pillTag,
    rating: item.averageRating ? `★ ${item.averageRating.toFixed(1)}` : '★ 4.8',
    description:
      item.description ||
      (isAudio
        ? 'صوتی کتاب برائے سماعت بذریعہ لائیو اسٹریمنگ۔'
        : isUnicode
        ? 'مستند یونی کوڈ ایڈیشن، مکمل قابلِ تلاش اور کاپی کرنے کی سہولت کے ساتھ۔'
        : 'ڈیجیٹل پی ڈی ایف ایڈیشن برائے مطالعہ و ڈاؤن لوڈ۔'),
    metaChips: [
      isAudio ? '🎧 Live Audio' : (isUnicode ? '🔤 Unicode Nastaliq' : '📄 PDF Document'),
      item.isArabic ? 'العربية' : 'اردو (Urdu)',
      item.chapters?.length ? `${item.chapters.length} Chapters` : 'Full Edition'
    ],
    price: isPdf ? 'Free' : (isAudio ? 'Rs. 1,200' : 'Rs. 950'),
    priceSubtitle: isPdf ? 'Open Access PDF' : (isAudio ? 'Audiobook Stream' : 'Unicode E-Book'),
    isAudio,
    isRtl,
    isFromApi: true,
    previewExcerpt: isAudio
      ? `🎧 Live Audiobook stream ready. Narrated by ${item.narrator || 'Ali'}. Listen directly via the player below.`
      : item.chapters?.length
      ? `فہرستِ ابواب:\n• ${item.chapters.join('\n• ')}`
      : 'یہ کتاب لائیو سرور پر دستیاب ہے۔ مکمل متن دیکھنے یا ڈاؤن لوڈ کرنے کے لیے نیچے دیے گئے بٹن کا استعمال کریں۔'
  };
}

/**
 * Fetch PDF books from API: GET /api/books?bookType=PDF&page=1
 */
export async function fetchPdfBooks(page = 1) {
  const res = await fetch(`${API_ENDPOINTS.PDF_BOOKS}&page=${page}`);
  if (!res.ok) throw new Error(`HTTP Error ${res.status}: Failed to load PDF books`);
  const json = await res.json();
  const list = Array.isArray(json.data) ? json.data : [];
  return {
    books: list.map((item) => normalizeApiBook(item, 'pdf')),
    metadata: json.metadata || { pagesCount: 1, docsCount: list.length }
  };
}

/**
 * Fetch Searchable / Unicode books from API: GET /api/books?bookType=UNICODE&page=1
 */
export async function fetchUnicodeBooks(page = 1) {
  const res = await fetch(`${API_ENDPOINTS.UNICODE_BOOKS}&page=${page}`);
  if (!res.ok) throw new Error(`HTTP Error ${res.status}: Failed to load Unicode books`);
  const json = await res.json();
  const list = Array.isArray(json.data) ? json.data : [];
  return {
    books: list.map((item) => normalizeApiBook(item, 'unicode')),
    metadata: json.metadata || { pagesCount: 1, docsCount: list.length }
  };
}

/**
 * Fetch Audiobooks from API: GET /api/audiobooks?page=1
 */
export async function fetchAudiobooks(page = 1) {
  const res = await fetch(`${API_ENDPOINTS.AUDIOBOOKS}?page=${page}`);
  if (!res.ok) throw new Error(`HTTP Error ${res.status}: Failed to load audiobooks`);
  const json = await res.json();
  const list = Array.isArray(json.data) ? json.data : [];
  return {
    books: list.map((item) => normalizeApiBook(item, 'audio')),
    metadata: json.metadata || { pagesCount: 1, docsCount: list.length }
  };
}

/**
 * Fetch All Books and Audiobooks in parallel and combine them
 */

export async function fetchAllApiBooks(page = 1) {
  const [pdfResult, unicodeResult, audioResult] = await Promise.allSettled([
    fetchPdfBooks(page),
    fetchUnicodeBooks(page),
    fetchAudiobooks(page)
  ]);

  const allBooks = [];

  if (audioResult.status === 'fulfilled') {
    allBooks.push(...audioResult.value.books);
  }
  if (unicodeResult.status === 'fulfilled') {
    allBooks.push(...unicodeResult.value.books);
  }
  if (pdfResult.status === 'fulfilled') {
    allBooks.push(...pdfResult.value.books);
  }

  // If all failed, throw error
  if (
    pdfResult.status === 'rejected' &&
    unicodeResult.status === 'rejected' &&
    audioResult.status === 'rejected'
  ) {
    throw new Error('Could not connect to live API.');
  }

  return allBooks;
}

/**
 * Fetch Single Book Details from API: GET /api/books/:id
 */
export async function fetchBookDetails(bookId) {
  const res = await fetch(API_ENDPOINTS.SINGLE_BOOK(bookId));
  if (!res.ok) throw new Error(`HTTP Error ${res.status}: Failed to load book details`);
  const json = await res.json();
  return json.book || json;
}
