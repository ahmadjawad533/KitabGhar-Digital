import React from 'react';

/**
 * ============================================================================
 * STUDENT GUIDE VIEW COMPONENT
 * ============================================================================
 * An interactive educational view built with Tailwind CSS explaining
 * React Architecture, Component Hierarchy, and Tailwind utility concepts.
 * ============================================================================
 */
export default function StudentGuideView({ onSwitchToCatalog }) {
  const concepts = [
    {
      title: '1. State-Driven Component Mounting',
      icon: '🔄',
      tag: 'React State',
      color: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
      description:
        'Notice how clicking the buttons in the banner swaps out the entire view! In React, this is achieved by storing `activeTab` in parent state (App.jsx) and conditionally rendering components: `{activeTab === "guide" && <StudentGuideView />}`.',
    },
    {
      title: '2. Tailwind Utility-First Workflow',
      icon: '🎨',
      tag: 'Tailwind CSS',
      color: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400',
      description:
        'Instead of switching back and forth between JSX and external CSS stylesheets, Tailwind allows you to apply styling directly in your markup using atomic classes like `flex`, `p-6`, `rounded-2xl`, and `hover:shadow-lg`.',
    },
    {
      title: '3. Props & Event Callbacks',
      icon: '⚡',
      tag: 'Architecture',
      color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
      description:
        'Parent components pass down data via props (like `books`, `cartCount`) and pass down function callbacks (like `onAddToCart`, `onSelectTab`) so children can trigger state updates in the parent.',
    },
    {
      title: '4. REST API Integration & Fallback',
      icon: '🌐',
      tag: 'Async Data',
      color: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
      description:
        'The bookstore connects to live backend endpoints (`/api/books`, `/api/audiobooks`). If the server is offline, a graceful fallback mechanism loads a curated local catalog from `booksData.js`.',
    },
  ];

  return (
    <div className="py-8">
      {/* View Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 mb-3">
          🎓 Learning Lab
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Web Technologies: Architecture &amp; Tailwind Guide
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          This view was loaded dynamically by clicking the <strong>Student Guide</strong> button in the Navigation Banner! Here are the core concepts being demonstrated:
        </p>
      </div>

      {/* Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {concepts.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{item.icon}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${item.color}`}>
                {item.tag}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Code Demonstration Snippet */}
      <div className="bg-slate-900 rounded-2xl p-6 text-slate-200 shadow-lg border border-slate-800 mb-8">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            <span className="text-xs text-slate-400 font-mono ml-2">App.jsx (Conditional Rendering Pattern)</span>
          </div>
          <span className="text-xs text-indigo-400 font-mono">React 19 + Tailwind</span>
        </div>
        <pre className="font-mono text-xs overflow-x-auto text-emerald-300">
{`// 1. Declare State in Parent (App.jsx)
const [activeTab, setActiveTab] = useState('catalog');

// 2. Conditionally Mount Components into the DOM
{activeTab === 'catalog'   && <BookCatalogView books={filteredBooks} />}
{activeTab === 'guide'     && <StudentGuideView />}
{activeTab === 'analytics' && <AnalyticsView />}
{activeTab === 'about'     && <AboutStoreView />}`}
        </pre>
      </div>

      {/* Call to action */}
      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToCatalog}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
        >
          <span>← Return to Book Catalog</span>
        </button>
      </div>
    </div>
  );
}
