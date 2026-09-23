import React from 'react';

/**
 * ============================================================================
 * CART DRAWER COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 * For Students:
 * - Slide-over shopping cart drawer implemented purely with Tailwind CSS.
 * - Manages shopping cart state, calculated totals, and transitions to checkout.
 * ============================================================================
 */
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) {
  if (!isOpen) return null;

  // Calculate total price from items
  const totalPrice = cartItems.reduce((sum, item) => {
    const numeric = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    return sum + numeric * item.quantity;
  }, 0);

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-[120] bg-slate-950/60 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <header className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" aria-hidden="true">🛒</span>
            <div>
              <h2 id="cart-drawer-title" className="text-lg font-bold tracking-tight">
                Shopping Cart
              </h2>
              <p className="text-xs text-slate-400">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} added
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            &times;
          </button>
        </header>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-4xl mb-4 shadow-inner">
                🛍️
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Your cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Browse our collection of Audiobooks and Unicode literature to add items.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Browse Books
              </button>
            </div>
          ) : (
            <ul className="space-y-3" aria-label="Cart items list">
              {cartItems.map((item) => (
                <li
                  key={item.id || item._id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4
                      className="text-sm font-bold text-slate-900 truncate"
                      dir={item.isRtl ? 'rtl' : 'ltr'}
                      title={item.title}
                    >
                      {item.title}
                    </h4>
                    <span className="text-xs font-semibold text-indigo-700 block mt-0.5">
                      {item.price} each
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Quantity Picker */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
                      <button
                        type="button"
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
                        onClick={() => onUpdateQuantity(item.id || item._id, item.quantity - 1)}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
                        onClick={() => onUpdateQuantity(item.id || item._id, item.quantity + 1)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-sm transition-colors cursor-pointer"
                      onClick={() => onRemoveItem(item.id || item._id)}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <footer className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 font-medium">Estimated Total:</span>
              <span className="text-xl font-black text-slate-900">
                {totalPrice > 0 ? `$${totalPrice.toFixed(2)}` : 'Free / Included'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3.5 py-2.5 border border-slate-300 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                onClick={onClearCart}
              >
                Clear
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 transition-all cursor-pointer text-center"
                onClick={onCheckout}
              >
                Checkout Now
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
