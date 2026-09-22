// 1. A simple JavaScript array: each object describes one sample book.

const otherBooks = [
  {
    id: 1,
    title: 'Everyday Cooking',
    author: 'Sara Ahmed',
    description: 'Simple recipes and kitchen tips for beginners.',
    price: 'Rs. 750',
    icon: '🍳',
  },
  {
    id: 2,
    title: 'A Guide to Gardening',
    author: 'Ali Hassan',
    description: 'Learn to grow flowers, herbs, and vegetables at home.',
    price: 'Rs. 900',
    icon: '🌱',
  },
  {
    id: 3,
    title: 'Travel Journal',
    author: 'Ayesha Khan',
    description: 'Ideas for planning trips and recording your adventures.',
    price: 'Rs. 650',
    icon: '🌍',
  },
  {
    id: 4,
    title: 'Journal',
    author: 'Ali Khan',
    description: 'Ideas for planning trips and recording your adventures.',
    price: 'Rs. 650',
    icon: '🌍',
  }
];

const flag = 'JS Code is easy';

// No props, state, API calls, or filters: just array → map() → cards.
export default function BookCardClone() {
  


  return (

    // JSX section with a heading and a grid of cards. The heading has a bottom margin of 24px (mb-6). The grid has 1 column by default, 2 columns on small screens (sm:grid-cols-2), and 3 columns on large screens (lg:grid-cols-3). Each card is an article element with a border, background color, and shadow. The card contains an icon, title, author, description, and price.
    
    <section className="mt-12!" aria-labelledby="other-books-title">
          {/* mt mean margin top */}
          {/* mb mean margin bottom */}
          {/* HTML root font size is 16px */}
          {/* tailwind default spacing unit is 0.25rem so 0.25x16 = 4px */}
          {/* mt-12 mean 48px */}
          {/* mb-6 mean 24px */}

      <h2 id="other-books-title" className="mb-12! text-2xl font-bold text-slate-900">
        Others Category Books
      </h2>

              {/* sl mean small */}
              {/* lg mean large */}
              {/* xl:grid-cols-4 sets 4 columns at extra-large widths */}

      {/* grid enables Grid; grid-cols-1 sets 1 column; gap-6 adds spacing; sm:grid-cols-2 and lg:grid-cols-3 set 2 and 3 columns at larger widths. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* 3. map() creates one card per book. A unique key identifies each card. */}
        
        {otherBooks.map((book) => (

          <article key={book.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* flex enables Flexbox; h-36 sets height; items-center and justify-center center the icon vertically and horizontally; bg-indigo-100 sets the background; text-5xl sizes the icon. */}
            
            {/* h-36 means 144px */}
            <div className="flex h-36 items-center justify-center bg-indigo-500 text-5xl" aria-hidden="true">
              {book.icon}
            </div>

            {/* flex enables Flexbox; flex-col stacks content vertically; gap-3 spaces items; p-6! adds padding with !important to override the global CSS reset. */}
            {/* gap-3 mean 12px gap and p-6 mean 24px padding */}
            {/* text-xl → extra-large font size: 1.25rem, usually 20px. */}
            <div className="flex flex-col gap-3 p-6!">
              <h3 className="text-2xl font-bold text-slate-800"> {book.title} </h3>
              <p className="text-sm text-slate-400"> By {book.author}</p>
              <p className="text-base text-slate-600">{book.description}</p>
              <p className="text-lg font-semibold text-indigo-600">{flag}</p>
            {/* 
            
            text-indigo-600 (The scale runs from 50 (lightest) to 950 (darkest).)
            
            | Class | Default size |
                  |---|---|
            | `text-sm` | 14px |
            | `text-base` | 16px |
            | `text-lg` | 18px |
            | `text-xl` | 20px |
            | `text-2xl` | 24px |

            These pixel values assume a 16px root font size. For normal-sized text, use text-base.
            
            */}
            
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
