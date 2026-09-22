import React from 'react';

/**
 * ============================================================================
 * CART DRAWER COMPONENT
 * ============================================================================
 * For Students:
 * - Demonstrates Managing Shopping Cart state in React:
 *   - Array manipulation: updating item quantity, removing items, clearing cart.
 *   - Calculating derived state: total items and total price calculated on the fly.
 * - Sliding drawer UI pattern with a modal backdrop.
 * ============================================================================
 */
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) {
  if (!isOpen) return null;

  // Calculate total price from items
  const totalPrice = cartItems.reduce((sum, item) => {
    // Extract numeric value from price string (e.g., "$18.99" -> 18.99, "Rs. 1,450" -> 1450)
    const numeric = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + numeric * item.quantity;
  }, 0);

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🛒</span>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--secondary)' }}>
              Your Cart ({totalItemsCount})
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            &times;
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛍️</div>
              <h4>Your cart is empty</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
                Browse our collection of Audiobooks and Unicode literature to add items.
              </p>
            </div>
          ) : (
            <ul className="cart-items-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <h4 className="cart-item-title" dir={item.isRtl ? 'rtl' : 'ltr'}>
                      {item.title}
                    </h4>
                    <span className="cart-item-price">{item.price} each</span>
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-picker">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove item"
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
          <div className="cart-drawer-footer">
            <div className="cart-total-row">
              <span>Estimated Total:</span>
              <span className="cart-total-amount">
                {totalPrice > 0 ? `$${totalPrice.toFixed(2)}` : 'Rs. / Free'}
              </span>
            </div>

            <div className="cart-drawer-actions">
              <button
                type="button"
                className="btn-clear-cart"
                onClick={onClearCart}
              >
                Clear Cart
              </button>
              <button
                type="button"
                className="btn-checkout"
                onClick={onCheckout}
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
