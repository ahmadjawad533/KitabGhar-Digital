# KitabGhar Digital — Assignment #3: Complete Tailwind CSS Migration

Welcome to **Assignment #3** of **KitabGhar Digital** for **Web Technologies (FA26)**.

This assignment marks the complete transition from legacy CSS stylesheets (`App.css`) to a **100% utility-first Tailwind CSS v4 architecture**, while preserving all bookstore features, data layers, interactive state management, and semantic HTML5 structures.

---

## 🎯 Assignment Objectives & Achievements

1. **Complete Tailwind CSS Conversion**:
   - Replaced all custom CSS classes and stylesheets with native Tailwind CSS utilities.
   - Deleted monolithic `App.css`—all styles are now co-located with their components using utility classes.
   - Modern glassmorphism (`backdrop-blur-md`, `bg-slate-900/95`), responsive grid layouts, and color tokens.

2. **Full Responsive Design**:
   - Seamless transitions across Mobile (`<640px`), Tablet (`640px–1024px`), Desktop (`1024px–1280px`), and Large Desktop (`1280px+`).
   - Mobile drawers with slide-over transitions and touch-friendly controls.

3. **Modular & Interactive Component Architecture**:
   - **`WishlistDrawer`**: Slide-over drawer with item removal, count badges, and direct "Move to Cart" workflow.
   - **`AudioPlayerBar`**: Persistent sticky bottom mini audio player with play/pause, scrubbing, speed controls (`1x`, `1.25x`, `1.5x`, `2x`), and volume controls.
   - **`BookReviewsModal`**: Community review system with interactive 1–5 star ratings, breakdown progress meters, and submission forms.
   - **`CheckoutModal`**: Multi-step student checkout flow with campus pickup options, coupon discounts (`FA26`), and printable confirmation receipts.
   - **`AuthorSpotlight`**: Featured classical Urdu and software engineering authors with one-click catalog filtering.
   - **`NewsletterBanner`**: Promotional digest subscription banner with regex validation.
   - **`SubHeader`**: Interactive secondary navigation switching across 5 views (`Book Catalog`, `Store Features`, `Student Guide`, `Store Analytics`, and `About KitabGhar`).

4. **Zero Functionality Lost**:
   - Preserved all state management (Cart, Wishlist, Search, Categories, Audio, Reviews, Modals).
   - Preserved authentic RTL typography for Urdu Nastaliq (`نستعلیق`) and Arabic literature.
   - Maintained offline local catalog fallback alongside live REST API readiness.

---

## 🛠️ Technologies & Tools

- **Framework**: React 19.2 (Functional Components & Hooks)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` 4.3.3)
- **Bundler & Dev Server**: Vite 8.3
- **Linter**: oxlint (Fast Rust-based JavaScript linter)
- **Typography**: Inter, Noto Nastaliq Urdu, Amiri

---

## 📁 Assignment #3 Component Tree

```text
Assignment-03/
├── index.html              # HTML shell & Google Fonts (Inter, Noto Nastaliq, Amiri)
├── package.json            # React 19 & Tailwind CSS v4 dependencies
├── vite.config.js          # Vite configuration with Tailwind CSS plugin
├── README.md               # Assignment #3 guide & documentation
└── src/
    ├── main.jsx            # React root mount (createRoot)
    ├── App.jsx             # 100% Tailwind main application layout & state coordinator
    ├── index.css           # Tailwind v4 import (@import "tailwindcss")
    ├── constants.js        # Safe asset and endpoint helper functions
    ├── data/
    │   └── booksData.js    # Curated offline dataset (Audio, Unicode, Tech)
    ├── services/
    │   └── bookService.js  # Live API fetch & data normalization layer
    └── components/
        ├── Header.jsx           # Tailwind top navigation bar with Wishlist & Cart badges
        ├── SubHeader.jsx        # Tailwind secondary view switcher
        ├── HeroBanner.jsx       # Tailwind hero banner with quick category pills
        ├── Controls.jsx         # Tailwind search bar & category filter buttons
        ├── SearchBar.jsx        # Standalone Tailwind search bar
        ├── BookCard.jsx         # Tailwind book card with gradient themes & actions
        ├── BookCardClone.jsx    # Tailwind demo card grid
        ├── BookModal.jsx        # Tailwind book preview & audio player modal
        ├── CartDrawer.jsx       # Tailwind slide-over shopping cart drawer
        ├── WishlistDrawer.jsx   # Tailwind slide-over saved favorites drawer
        ├── BookReviewsModal.jsx # Tailwind ratings & review submission modal
        ├── CheckoutModal.jsx    # Tailwind checkout dialog & printable receipt
        ├── AudioPlayerBar.jsx   # Tailwind persistent bottom audio player dock
        ├── AuthorSpotlight.jsx  # Tailwind author cards showcase
        ├── NewsletterBanner.jsx # Tailwind email subscription banner
        ├── FeaturesGrid.jsx     # Tailwind responsive highlights grid
        ├── SiteFooter.jsx       # Tailwind footer with quick category links
        ├── Toast.jsx            # Tailwind floating status alert
        ├── LoadingSkeleton.jsx  # Tailwind shimmer loading cards
        ├── Pagination.jsx       # Tailwind pagination controls
        ├── StudentGuideView.jsx # Tailwind student architecture guide
        ├── AnalyticsView.jsx    # Tailwind store metrics & distribution dashboard
        └── AboutStoreView.jsx   # Tailwind about store mission cards
```

---

## 🚀 How to Run Assignment #3

1. Navigate to the `Assignment-03` directory:
   ```bash
   cd Assignment-03
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with yarn:
   yarn install
   ```

3. Start the local Vite development server:
   ```bash
   npm run dev
   # or with yarn:
   yarn dev
   ```

4. Build for production:
   ```bash
   npm run build
   # or with yarn:
   yarn build
   ```

5. Run linter:
   ```bash
   npm run lint
   # or with yarn:
   yarn lint
   ```
