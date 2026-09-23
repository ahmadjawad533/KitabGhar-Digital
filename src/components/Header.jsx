import React from 'react';

/**
 * Tailwind-styled top bar. Props provide the connection status, cart count,
 * and click handlers; responsive utilities stack the layout on small screens.
 */
export default function Header({
  cartCount,
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist,
  apiStatus,
  onRefresh,
}) {
  const isLive = apiStatus === 'live';
  const statusLabel = isLive ? 'Live API Connected' : apiStatus === 'local' ? 'Local Catalog' : 'Offline / Sample Data';

  return (
    
    <header className="sticky top-0 z-[100] bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_100%)] text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      {/* Important spacing utilities override the existing global CSS reset. */}
      <div className="mx-auto! flex max-w-[1200px] items-center justify-between gap-5 px-6! py-4! max-[769px]:flex-col max-[769px]:text-center">
        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-[10px] border border-white/15 bg-white/10 p-2! text-[2rem] leading-none" aria-hidden="true">
            📚
          </div>
          <div>
            <h1 className="text-[1.5rem] font-extrabold tracking-[-0.5px] text-white">
              KitabGhar
            </h1>
            <p className="text-[0.8rem] text-[#94a3b8]">
              Digital, Audio &amp; Unicode Bookstore
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-[14px]! py-[6px]! text-[0.8rem] font-semibold transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              isLive
                ? 'border-[#10b981]/35 bg-[#10b981]/15 text-[#a7f3d0]'
                : 'border-[#f59e0b]/35 bg-[#f59e0b]/15 text-[#fde68a]'
            }`}
            title={isLive ? 'Connected to http://159.65.157.115' : 'Using local sample catalog'}
            aria-label={`Refresh catalog: ${statusLabel}`}
            onClick={onRefresh}
          >
            <span
              aria-hidden="true"
              className={`inline-block size-2 shrink-0 rounded-full ${
                isLive ? 'bg-[#10b981] shadow-[0_0_8px_#10b981]' : 'bg-[#f59e0b]'
              }`}
            />
            <span>{statusLabel}</span>
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-3.5! py-2! text-[0.85rem] font-semibold text-pink-200 transition-all duration-250 hover:-translate-y-px hover:bg-pink-500/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            onClick={onOpenWishlist}
            title="View Wishlist"
            aria-label={`View wishlist with ${wishlistCount} saved books`}
          >
            <span>❤️ Wishlist</span>
            <span className="rounded-full bg-pink-600 px-2! py-[2px]! text-[0.75rem] font-bold text-white">
              {wishlistCount}
            </span>
          </button>

          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4! py-2! text-[0.9rem] font-semibold text-white transition-all duration-250 hover:-translate-y-px hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            onClick={onOpenCart}
            title="View Cart"
            aria-label={`View shopping cart with ${cartCount} items`}
          >
            <span>🛒 Cart</span>
            <span className="rounded-full bg-[#ef4444] px-2! py-[2px]! text-[0.75rem] font-bold text-white">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
