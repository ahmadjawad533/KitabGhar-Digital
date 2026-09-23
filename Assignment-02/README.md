# KitabGhar Digital — React Bookstore (Student & Teacher Guide)

Welcome to **KitabGhar Digital**! This application is designed for **Web Technologies (FA26)** to demonstrate how a modern web application bridges **Semantic HTML5/CSS3** (Week 1) with **Component-Driven React and Live REST APIs** (Week 2).

---

## 🎯 Lecture Topic: Why Clear HTML Tags are Used in JSX

> [!IMPORTANT]
> ### 👨‍🏫 Teacher's Guide: Explaining "HTML Tags vs. Custom JSX Tags" to Students
>
> When students look at `App.jsx` and the component files, they often wonder:
> **"Why do some tags look like `<BookCard />` and `<Header />`, while inside them we write `<article>`, `<header>`, `<button>`, and `<p>`?"**
>
> Here are the 3 core principles to explain in class:

### 1. Capitalized Names vs. Lowercase Names (React Convention)
In React JSX:
- **Lowercase tags** (e.g. `<header>`, `<main>`, `<section>`, `<article>`, `<button>`, `<input>`, `<h1>`, `<p>`, `<span>`) represent **Native HTML elements**.
  - When the compiler (Vite / Babel / SWC) sees `<article>`, it converts it to:
    ```javascript
    React.createElement('article', null, ...) // Creates a real DOM element
    ```
- **Uppercase (Capitalized) tags** (e.g. `<Header />`, `<BookCard />`, `<Controls />`, `<BookModal />`, `<HeroBanner />`) represent **Custom React Components**.
  - When the compiler sees `<BookCard />`, it converts it to a function call:
    ```javascript
    React.createElement(BookCard, { book: bookData }) // Calls your component function
    ```
- If you accidentally write `<bookCard />` (lowercase), React will search for an HTML element called `<bookCard>`, which does not exist in standard HTML!

### 2. Semantic HTML vs. "Div Soup"
- Many beginners write React code using only `<div>` tags for everything:
  ```jsx
  /* ❌ Bad Practice: "Div Soup" - No semantic meaning */
  <div className="header">
    <div className="card">
      <div className="btn" onClick={...}>Click Me</div>
    </div>
  </div>
  ```
- In our project, we use **Clear, Semantic HTML5 Tags**:
  ```jsx
  /* ✅ Clean Professional Practice: Semantic HTML */
  <header className="site-header">
    <article className="book-card">
      <button type="button" className="btn-add" onClick={...}>Add</button>
    </article>
  </header>
  ```
- **Why this matters for students**:
  1. **Accessibility (a11y)**: Screen readers for visually impaired users rely on `<header>`, `<nav>`, `<article>`, and `<button>` to navigate.
  2. **Keyboard Navigation**: Native `<button>` elements automatically respond to `Enter` and `Space` keys and support the `disabled` attribute. A `<div>` does not!
  3. **SEO & Browser Performance**: Search engines index pages much higher when semantic landmarks are used.
  4. **Connecting Week 1 to Week 2**: Students don't discard HTML when learning React; React is simply JavaScript returning HTML!

### 3. Component Composition: Outer Layer vs. Inner Layer
- In **`App.jsx`** (Outer Layout), students see clean high-level building blocks:
  ```jsx
  <Header />
  <HeroBanner />
  <Controls />
  <BookCard />
  <CartDrawer />
  ```
- Inside **`BookCard.jsx`** (Inner Implementation), students find the actual HTML elements:
  ```jsx
  <article className="book-card">
    <div className="card-cover">...</div>
    <div className="card-body">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <button className="btn-add">Add to Cart</button>
    </div>
  </article>
  ```
This teaches students **Separation of Concerns**: `App.jsx` manages state and layout, while individual components define the exact HTML markup and local behavior.

---

## 🌐 Live REST API Endpoints Integrated

The application integrates with the live server at `http://159.65.157.115`:

| Resource | HTTP Endpoint | Description |
| :--- | :--- | :--- |
| **PDF Books** | `GET /api/books?bookType=PDF&page=1` | Returns official downloadable PDF books |
| **Unicode Books** | `GET /api/books?bookType=UNICODE&page=1` | Returns searchable UTF-8 / Nastaleeq Urdu literature |
| **Audiobooks** | `GET /api/audiobooks?page=1` | Returns studio-narrated audiobooks with MP3 stream URLs |
| **Single Book Details** | `GET /api/books/:id` | Returns complete details and chapter metadata for a book |
| **Cover Photo** | `GET http://159.65.157.115/{coverPhotoUri}` | Cover image URL (encoded for Urdu text & spaces) |
| **Book PDF File** | `GET http://159.65.157.115/{fileUri}` | PDF document for viewing or downloading |
| **Audio MP3 File** | `GET http://159.65.157.115/{audioFilesUri[0]}` | Streamable MP3 audio track played directly in browser |

---

## 📁 Project Architecture & Component Tree

```text
myreactjsapp/
├── index.html              # HTML shell & Google Fonts (Amiri, Noto Nastaliq Urdu, Inter)
├── package.json            # Dependencies & npm scripts
└── src/
    ├── main.jsx            # React root entry point (createRoot)
    ├── App.jsx             # Main Application Component (holds state & API loader)
    ├── App.css             # Component styling, animations & theme colors
    ├── index.css           # Global CSS variables & typography
    ├── constants.js        # API endpoints and safe URL builder helper (getAssetUrl)
    ├── services/
    │   └── bookService.js  # Fetch functions & API normalization layer
    ├── data/
    │   └── booksData.js    # Curated offline dataset (Audio, Unicode, Web, Prog, Science)
    └── components/
        ├── Header.jsx       # Top navbar with live API connection indicator & Cart widget
        ├── HeroBanner.jsx   # Header banner with interactive category quick pills
        ├── Controls.jsx     # Search input bar + Category filter buttons
        ├── BookCard.jsx     # Book card with API image covers, PDF links, and gradients
        ├── BookModal.jsx    # Quick preview modal with real HTML5 Audio Player & PDF download
        ├── CartDrawer.jsx   # Slide-over shopping cart drawer with quantity & total calculation
        ├── FeaturesGrid.jsx # 4-column store highlights grid
        ├── SiteFooter.jsx   # Footer with category navigation links
        └── Toast.jsx        # Floating feedback alert notification
```

---

## 🚀 Running the Project

1. Navigate to the project directory:
   ```bash
   cd "2-WeekTwo/myreactjsapp"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.
