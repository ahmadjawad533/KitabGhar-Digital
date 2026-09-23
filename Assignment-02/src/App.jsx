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
import Controls from './components/Controls';
import BookCard from './components/BookCard';
import BookCardClone from './components/BookCardClone';
import BookModal from './components/BookModal';
import CartDrawer from './components/CartDrawer';
import FeaturesGrid from './components/FeaturesGrid';
import SiteFooter from './components/SiteFooter';
import Toast from './components/Toast';

import './App.css';

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
    setCart([]);
    setIsCartOpen(false);
    showToast('🎉 Thank you for your order! (Demo checkout completed)');
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
    <div className="app-layout">
      {/* 1. Header with Live Status & Cart Trigger */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        apiStatus={apiStatus}
        onRefresh={handleManualRefresh}
      />


      {/* 2. Sub-Header Navigation Bar (Sample Header with 5 Views) */}
      {/* <SubHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          showToast(`Switched view to: ${tab.toUpperCase()}`);
        }}
        bookCount={filteredBooks.length}
        cartCount={totalCartCount}
      /> */}

      {/* 3. Main Content Container (Dynamically Switched by activeTab) */}

      <main className="main-container">
        {/* VIEW 1: BOOK CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <>
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


                 <BookCardClone />  

            {/* Dynamic Section Header */}
            <div className="section-header">
              <h2 className="section-title">
                <span>{categoryIcons[selectedCategory] || '📚'}</span>{' '}
                {selectedCategory === 'All' ? 'All Books' : selectedCategory}
              </h2>
              <span className="results-badge">
                {loading ? 'Connecting to API...' : `Showing ${filteredBooks.length} ${filteredBooks.length === 1 ? 'book' : 'books'}`}
              </span>
            </div>

            {/* Loading Spinner / State */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔄</div>
                <h3>Loading Books from Server...</h3>
                <p style={{ fontSize: '0.9rem', marginTop: '6px' }}>
                  Fetching endpoints: <code>/api/books</code> &amp; <code>/api/audiobooks</code>
                </p>
              </div>
            ) : filteredBooks.length > 0 ? (
              <section className="book-grid" aria-label="Book collection">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id || book._id}
                    book={book}
                    onPreview={setActivePreviewBook}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </section>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>No Books Found</h3>
                <p>
                  No books match "{searchQuery}" in {selectedCategory}.
                </p>
                <button
                  type="button"
                  className="btn-add"
                  style={{ marginTop: '14px', display: 'inline-flex' }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Reset Search &amp; Filters
                </button>
              </div>
            )}
            {/* Separate array-and-map example; catalog filters do not affect it. */}
            
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
        {/* Uncomment and import StudentGuideView to enable this view */}
        {/* {activeTab === 'guide' && (
          <StudentGuideView onSwitchToCatalog={() => setActiveTab('catalog')} />
        )} */}

        {/* VIEW 4: REAL-TIME STORE ANALYTICS */}
        {/* Uncomment and import AnalyticsView to enable this view */}
        {/* {activeTab === 'analytics' && (
          <AnalyticsView
            books={books}
            cart={cart}
            apiStatus={apiStatus}
          />
        )} */}

        {/* VIEW 5: ABOUT STORE & TECH STACK */}
        {/* Uncomment and import AboutStoreView to enable this view */}
        {/* {activeTab === 'about' && (
          <AboutStoreView />
        )} */}
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

      {/* 7. Action Toast Notification */}
      <Toast message={toastMessage} />

      {/* 8. Site Footer */}
      <SiteFooter
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />
    </div>
  );
}
