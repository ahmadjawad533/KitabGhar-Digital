import React, { useState } from 'react';
// API mode (temporarily disabled):
// import { useEffect, useCallback } from 'react';
import { INITIAL_BOOKS } from './data/booksData';
// import {
//   fetchPdfBooks,
//   fetchUnicodeBooks,
//   fetchAudiobooks,
//   fetchAllApiBooks
// } from './services/bookService';

// Component Imports
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Controls from './components/Controls';
import BookCard from './components/BookCard';
import BookCardClone from './components/BookCardClone';
import BookModal from './components/BookModal';
import CartDrawer from './components/CartDrawer';
import FeaturesGrid from './components/FeaturesGrid';
import StudentGuideView from './components/StudentGuideView';
import AnalyticsView from './components/AnalyticsView';
import AboutStoreView from './components/AboutStoreView';
import HeroBanner from './components/HeroBanner';
import SiteFooter from './components/SiteFooter';
import Toast from './components/Toast';

// NEW Component Imports
import WishlistDrawer from './components/WishlistDrawer';
import AudioPlayerBar from './components/AudioPlayerBar';
import BookReviewsModal from './components/BookReviewsModal';
import CheckoutModal from './components/CheckoutModal';
import AuthorSpotlight from './components/AuthorSpotlight';
import NewsletterBanner from './components/NewsletterBanner';

/**
 * ============================================================================
 * MAIN APPLICATION COMPONENT (App.jsx)
 * ============================================================================
 * For Students:
 * App.jsx coordinates the data flow and UI state of the bookstore:
 *
 * Currently displays INITIAL_BOOKS locally; API loading below is commented out.
 *
 * 1. REST API Integration (disabled for now):
 *    - PDF Books:     GET /api/books?bookType=PDF&page=1
 *    - Unicode Books: GET /api/books?bookType=UNICODE&page=1
 *    - Audiobooks:    GET /api/audiobooks?page=1
 *    - Single Book:   GET /api/books/:id
 *    - Asset URLs:    http://159.65.157.115/{coverPhotoUri | fileUri | audioFilesUri[0]}
 *
 * 2. Graceful Fallback:
 *    - If the live backend is unreachable (e.g., offline or network blocked),
 *      the app seamlessly falls back to the curated local catalog (`INITIAL_BOOKS`).
 *
 * 3. Reactive State Management:
 *    - `books`: Normalized collection of books from API or fallback.
 *    - `selectedCategory`: Active filter (All, PDF Books, Unicode, Audio, etc.).
 *    - `searchQuery`: Live search term.
 *    - `cart`: Shopping cart items and quantities.
 *    - `activePreviewBook`: Book opened in preview modal.
 * ============================================================================
 */

export default function App() {
  // -------------------------------------------------------------
  // 1. STATE DECLARATIONS
  // -------------------------------------------------------------
  // Local catalog mode: no network request is needed to display books.
  const books = INITIAL_BOOKS;
  const loading = false;
  const apiStatus = 'local';
  // API state (restore instead of the constants above to re-enable API loading):
  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [apiStatus, setApiStatus] = useState('live');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePreviewBook, setActivePreviewBook] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  // const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'features' | 'guide' | 'analytics' | 'about'
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeAudioBook, setActiveAudioBook] = useState(null);
  const [reviewBook, setReviewBook] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // -------------------------------------------------------------
  // 2. TOAST NOTIFICATION HELPER
  // -------------------------------------------------------------
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // -------------------------------------------------------------
  // 3. API FETCHING LOGIC (Category-Aware)
  // -------------------------------------------------------------
  // API loading and refresh are temporarily disabled.
  // const loadBooksData = useCallback(async () => {
  //   setLoading(true);
  //
  //   try {
  //     let fetchedList = [];
  //
  //     if (selectedCategory === 'PDF Books') {
  //       const res = await fetchPdfBooks(1);
  //       fetchedList = res.books;
  //     } else if (selectedCategory === 'Unicode Books') {
  //       const res = await fetchUnicodeBooks(1);
  //       // Combine with curated Unicode books if API has only 1
  //       const curatedUnicode = INITIAL_BOOKS.filter((b) => b.category === 'Unicode Books');
  //       fetchedList = [...res.books, ...curatedUnicode];
  //     } else if (selectedCategory === 'Audio Books') {
  //       const res = await fetchAudiobooks(1);
  //       // Combine with curated Audiobooks if API has only 1
  //       const curatedAudio = INITIAL_BOOKS.filter((b) => b.category === 'Audio Books');
  //       fetchedList = [...res.books, ...curatedAudio];
  //     } else if (
  //       selectedCategory === 'Web Development' ||
  //       selectedCategory === 'Programming' ||
  //       selectedCategory === 'Science'
  //     ) {
  //       // Use curated curricular subjects
  //       fetchedList = INITIAL_BOOKS.filter((b) => b.category === selectedCategory);
  //     } else {
  //       // 'All': Fetch from API and supplement with curated books
  //       const apiBooks = await fetchAllApiBooks(1);
  //       const curatedTech = INITIAL_BOOKS.filter(
  //         (b) =>
  //           b.category === 'Web Development' ||
  //           b.category === 'Programming' ||
  //           b.category === 'Science'
  //       );
  //       fetchedList = [...apiBooks, ...curatedTech];
  //     }
  //
  //     setBooks(fetchedList);
  //     setApiStatus('live');
  //   } catch (err) {
  //     console.warn('API fetch failed, using offline fallback:', err.message);
  //     setApiStatus('offline');
  //
  //     // Offline fallback to INITIAL_BOOKS
  //     if (selectedCategory === 'All') {
  //       setBooks(INITIAL_BOOKS);
  //     } else {
  //       const filtered = INITIAL_BOOKS.filter((b) => b.category === selectedCategory);
  //       setBooks(filtered.length > 0 ? filtered : INITIAL_BOOKS);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [selectedCategory]);
  //
  // useEffect(() => {
  //   loadBooksData();
  // }, [loadBooksData, refreshTrigger]);
  //
  // const handleManualRefresh = () => {
  //   setRefreshTrigger((prev) => prev + 1);
  //   showToast('↻ Refreshing catalog from live API...');
  // };

  const handleManualRefresh = () => {
    showToast('📚 Showing books from the local catalog.');
  };

  // -------------------------------------------------------------
  // 4. SHOPPING CART HANDLERS
  // -------------------------------------------------------------
  const handleAddToCart = (book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === book.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });

    showToast(`🛒 "${book.title}" added to cart!`);
  };

  const handleUpdateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(bookId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
    showToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared.');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('⚠️ Your shopping cart is empty.');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order) => {
    setCart([]);
    showToast(`🎉 Order ${order.orderId} placed successfully!`);
  };

  // -------------------------------------------------------------
  // WISHLIST HANDLERS
  // -------------------------------------------------------------
  const handleToggleWishlist = (book) => {
    const bookId = book.id || book._id;
    const isSaved = wishlist.some((b) => (b.id || b._id) === bookId);
    if (isSaved) {
      setWishlist((prev) => prev.filter((b) => (b.id || b._id) !== bookId));
      showToast(`Removed "${book.title}" from Wishlist.`);
    } else {
      setWishlist((prev) => [...prev, book]);
      showToast(`❤️ Saved "${book.title}" to Wishlist!`);
    }
  };

  const handleRemoveFromWishlist = (bookId) => {
    setWishlist((prev) => prev.filter((b) => (b.id || b._id) !== bookId));
    showToast('Item removed from wishlist.');
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared.');
  };

  const handleMoveWishlistToCart = (book) => {
    handleAddToCart(book);
    handleRemoveFromWishlist(book.id || book._id);
  };

  // -------------------------------------------------------------
  // AUDIO & REVIEWS HANDLERS
  // -------------------------------------------------------------
  const handlePlayAudio = (book) => {
    setActiveAudioBook(book);
    showToast(`🎧 Now Playing: "${book.title}"`);
  };

  const handleOpenReviews = (book) => {
    setReviewBook(book);
  };

  const handleAddReview = (book) => {
    showToast(`⭐ Review posted for "${book.title}"!`);
  };

  const handleSelectAuthor = (searchTerm) => {
    setSearchQuery(searchTerm);
    setSelectedCategory('All');
    setActiveTab('catalog');
    showToast(`🔍 Showing works by "${searchTerm}"`);
  };

  const handleNewsletterSubscribe = (email, topic) => {
    showToast(`📬 Subscribed ${email} to ${topic} digest!`);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // -------------------------------------------------------------
  // 5. CLIENT-SIDE SEARCH FILTERING
  // -------------------------------------------------------------
  const filteredBooks = books.filter((book) => {
    if (selectedCategory !== 'All' && book.category !== selectedCategory) return false;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    const textToSearch = `${book.title || ''} ${book.author || ''} ${book.category || ''} ${book.description || ''}`.toLowerCase();
    return textToSearch.includes(query);
  });

  // Section Heading Category Icons
  const categoryIcons = {
    'All': '📚',
    'PDF Books': '📄',
    'Unicode Books': '🔤',
    'Audio Books': '🎧',
    'Web Development': '💻',
    'Programming': '⚙️',
    'Science': '🔬'
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-850">
      {/* 1. Header with Live Status, Wishlist & Cart Trigger */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        apiStatus={apiStatus}
        onRefresh={handleManualRefresh}
      />

      {/* 2. Sub-Header Navigation Bar (Switch between 5 Views) */}
      <SubHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          showToast(`Switched view to: ${tab.toUpperCase()}`);
        }}
        bookCount={filteredBooks.length}
        cartCount={totalCartCount}
      />

      {/* 3. Main Content Container (Dynamically Switched by activeTab) */}
      <main className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 flex-1">
        {/* VIEW 1: BOOK CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <>
            {/* Hero Showcase Banner */}
            <HeroBanner onSelectCategory={(cat) => setSelectedCategory(cat)} />

            {/* Real-time Search & Category Filters */}
            <Controls
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery('')}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                showToast(`Filtered by: ${cat}`);
              }}
            />

            {/* Dynamic Section Header */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
                <span>{categoryIcons[selectedCategory] || '📚'}</span>{' '}
                {selectedCategory === 'All' ? 'All Books' : selectedCategory}
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
                {loading ? 'Connecting to API...' : `Showing ${filteredBooks.length} ${filteredBooks.length === 1 ? 'book' : 'books'}`}
              </span>
            </div>

            {/* Loading Spinner / State */}
            {loading ? (
              <div className="text-center py-16 px-4 text-slate-500">
                <div className="text-4xl mb-3 animate-spin">🔄</div>
                <h3 className="text-lg font-bold text-slate-800">Loading Books from Server...</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fetching endpoints: <code className="bg-slate-100 px-1 py-0.5 rounded">/api/books</code> &amp; <code className="bg-slate-100 px-1 py-0.5 rounded">/api/audiobooks</code>
                </p>
              </div>
            ) : filteredBooks.length > 0 ? (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-label="Book collection">
                {filteredBooks.map((book) => {
                  const bookId = book.id || book._id;
                  const isWishlisted = wishlist.some((b) => (b.id || b._id) === bookId);
                  return (
                    <BookCard
                      key={bookId}
                      book={book}
                      onPreview={setActivePreviewBook}
                      onAddToCart={handleAddToCart}
                      isWishlisted={isWishlisted}
                      onToggleWishlist={handleToggleWishlist}
                      onOpenReviews={handleOpenReviews}
                      onPlayAudio={handlePlayAudio}
                    />
                  );
                })}
              </section>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center max-w-md mx-auto my-12 shadow-sm space-y-3">
                <div className="text-5xl select-none" aria-hidden="true">🔍</div>
                <h3 className="text-lg font-bold text-slate-900">No Books Found</h3>
                <p className="text-xs text-slate-500">
                  No books match "{searchQuery}" in {selectedCategory}.
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Reset Search &amp; Filters
                </button>
              </div>
            )}

            {/* NEW COMPONENT: Author Spotlight Showcase */}
            <AuthorSpotlight onSelectAuthor={handleSelectAuthor} />

            {/* In-Class Lecture Demonstration Grid */}
            <BookCardClone />

            {/* NEW COMPONENT: Promotional Newsletter Banner */}
            <NewsletterBanner onSubscribe={handleNewsletterSubscribe} />
          </>
        )}

        {/* VIEW 2: STORE FEATURES & HIGHLIGHTS */}
        {activeTab === 'features' && (
          <div className="py-6">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 mb-2">
                ✨ Store Highlights
              </span>
              <h2 className="text-2xl font-bold text-slate-900">Audiobooks, Unicode &amp; Programming Curricula</h2>
              <p className="text-sm text-slate-500 mt-1">Explore the unique capabilities that make KitabGhar special.</p>
            </div>
            <FeaturesGrid />
          </div>
        )}

        {/* VIEW 3: STUDENT ARCHITECTURE & TAILWIND GUIDE */}
        {activeTab === 'guide' && (
          <StudentGuideView onSwitchToCatalog={() => setActiveTab('catalog')} />
        )}

        {/* VIEW 4: REAL-TIME STORE ANALYTICS */}
        {activeTab === 'analytics' && (
          <AnalyticsView
            books={books}
            cart={cart}
            apiStatus={apiStatus}
          />
        )}

        {/* VIEW 5: ABOUT STORE & TECH STACK */}
        {activeTab === 'about' && (
          <AboutStoreView />
        )}
      </main>

      {/* 5. Quick Preview Modal (with Real Audio Player & PDF Access) */}
      <BookModal
        book={activePreviewBook}
        onClose={() => setActivePreviewBook(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      {/* NEW COMPONENT: Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onClearWishlist={handleClearWishlist}
      />

      {/* NEW COMPONENT: Student & Reader Reviews Modal */}
      <BookReviewsModal
        book={reviewBook}
        onClose={() => setReviewBook(null)}
        onAddReview={handleAddReview}
      />

      {/* NEW COMPONENT: Campus Delivery & Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* NEW COMPONENT: Persistent Mini Audio Player Bar */}
      <AudioPlayerBar
        book={activeAudioBook}
        onClose={() => setActiveAudioBook(null)}
      />

      {/* 7. Action Toast Notification */}
      <Toast message={toastMessage} />

      {/* 8. Site Footer */}
      <SiteFooter
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('catalog');
        }}
      />
    </div>
  );
}
