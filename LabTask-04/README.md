# REACTJS PROJECT — LAB TASK 4

**Course**: Class 4th Semester — SP25-BSE-B  
**Date**: 29th September 2026  
**Student Name**: Ahmad Jawad Bandesha  
**Student Email**: iahmadjawad.533@gmail.com  
**Topic**: JavaScript Array Methods in ReactJS + PDF & Unicode Book Handling  
**Key Operations**: `map()`, `filter()`, `find()`, PDF Reader & RTL Unicode Reader  

---

## 🎯 1. Learning Objectives & Core Requirements

1. **`map()` (Task A)**: Dynamically render `BookCard` components from the 15 starter books dataset. Pass props to `BookCard` and enforce `book.id` as the React `key`.
2. **`filter()` (Task B)**: Implement category filter buttons (`All Books`, `PDF Books`, `Unicode Books`, `Poetry Books`, `Programming Books`, `Audio Books`). Display filtered results, active button state, visible count ("Showing X of Y books"), and empty state message.
3. **`find()` (Task C)**: Locate exactly one book by `id` when the "View Details" button is clicked and display its complete details in `BookDetails.jsx`. Handle `undefined` gracefully.
4. **PDF Reader (Task D)**: Dedicated viewer component (`PDFReader.jsx`) that opens the selected book's `pdfUrl`. Includes embedded iframe and download option.
5. **Unicode & RTL Reader (Task E)**: Dedicated reader component (`UnicodeReader.jsx`) for records where `format === 'Unicode'`. Displays Urdu text with Right-To-Left (`dir="rtl"`) layout and `Noto Nastaliq Urdu` font styling.
6. **Availability & Badges**: Disables read/open action buttons when `available === false` (e.g. ID #11) and displays a featured badge when `featured === true`.

---

## 💡 2. Array Methods Comparison (Section 4 Summary)

| Array Method | Purpose in Lab Task 4 | Expected Result | Example Question Answered |
| :--- | :--- | :--- | :--- |
| **`map()`** | Dynamically transforms each book object into a `<BookCard />` React component | Array of JSX elements (`[<BookCard key={1}/>, <BookCard key={2}/>, ...]`) | *How can every book object in the array become a React UI card?* |
| **`filter()`** | Filters array based on category button click (`selectedCategory`) or optional flags (`featured`, `available`) | Sub-array containing zero, one, or many matching books | *Which books belong to `Programming Books`?* |
| **`find()`** | Finds the first matching single book object by `id === selectedBookId` | Exactly **one object** or **`undefined`** if no match | *Which exact book object has `id === 6`?* |

---

## 🧩 3. Component Architecture

```text
LabTask-04/
├── index.html                  # Shell with Google Noto Nastaliq Urdu & Amiri fonts
├── package.json                # Dependencies (@tailwindcss/vite, react, lucide-react)
├── vite.config.js              # Vite + Tailwind CSS v4 setup
├── README.md                   # This student submission report
├── public/
│   └── books/                  # Public sample PDF documents (reactjs-fundamentals.pdf, etc.)
└── src/
    ├── main.jsx                # React root entry point
    ├── index.css               # Global Tailwind CSS imports & font-urdu utilities
    ├── App.jsx                 # Top-level state (selected category, selected book ID, modal states)
    ├── data/
    │   └── booksData.js        # Exact 15 starter books array + categories array
    └── components/
        ├── CategoryButtons.jsx # Category filter buttons mapping using map() + filter stats
        ├── BookList.jsx        # Component array rendering using map() + empty state
        ├── BookCard.jsx        # Individual card with rating, badges, and format action buttons
        ├── BookDetails.jsx     # Single item lookup modal driven by find()
        ├── PDFReader.jsx       # Dedicated PDF viewer using pdfUrl
        ├── UnicodeReader.jsx   # Dedicated Unicode/Urdu text reader (RTL support & Prev/Next navigation)
        └── AudioPlayerModal.jsx# Audio player modal for audio format books
```

---

## 🚀 4. How to Run the Project

1. Navigate to the `LabTask-04` directory:
   ```bash
   cd LabTask-04
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🧪 5. Demonstration Checklist

- [x] `map()` dynamically renders all 15 books with unique `book.id` keys.
- [x] `filter()` filters books array across 6 category buttons.
- [x] `find()` locates individual book objects by `id` for `BookDetails`.
- [x] `PDFReader.jsx` opens sample PDFs via `pdfUrl`.
- [x] `UnicodeReader.jsx` renders Urdu text with `dir="rtl"` and Nastaliq typography.
- [x] Unavailable books (`available === false`) show disabled read/open buttons.
- [x] Featured books (`featured === true`) render a featured badge.
- [x] Responsive layout with Tailwind CSS.
