import React from 'react';

export default function LoadingSkeleton({ count = 8 }) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="books-grid">
      {items.map((item) => (
        <div key={item} className="book-card skeleton-card">
          <div className="skeleton-thumb shimmer"></div>
          <div className="card-content">
            <div className="skeleton-line shimmer" style={{ width: '40%', height: '18px', marginBottom: '8px' }}></div>
            <div className="skeleton-line shimmer" style={{ width: '85%', height: '22px', marginBottom: '8px' }}></div>
            <div className="skeleton-line shimmer" style={{ width: '60%', height: '16px', marginBottom: '16px' }}></div>
            <div className="skeleton-line shimmer" style={{ width: '100%', height: '36px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
