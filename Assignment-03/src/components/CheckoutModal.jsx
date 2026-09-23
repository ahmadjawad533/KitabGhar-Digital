import React, { useState } from 'react';

/**
 * ============================================================================
 * CHECKOUT MODAL COMPONENT (CheckoutModal.jsx)
 * ============================================================================
 * Modern checkout flow with campus pickup, promo discount codes, and
 * printable receipt generation.
 * Demonstrates:
 * - Multi-stage transactional modal (Form -> Confirmation Receipt)
 * - Promo code validation logic and state calculation
 * - Form validation with controlled components
 * ============================================================================
 */
function createOrderRecord(formData, cartItems, subtotal, discount, deliveryFee, total) {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return {
    orderId: `KBG-2026-${randomSuffix}`,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    customer: formData,
    items: cartItems,
    subtotal,
    discount,
    deliveryFee,
    total,
  };
}

export default function CheckoutModal({ isOpen, onClose, cartItems = [], onOrderPlaced }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    campus: 'COMSATS Islamabad Campus',
    address: '',
    paymentMethod: 'cod',
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoStatus, setPromoStatus] = useState(null); // { success: boolean, msg: string }
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  if (!isOpen) return null;

  // Calculate items subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    const numeric = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    return sum + numeric * item.quantity;
  }, 0);

  const deliveryFee = formData.campus.includes('Campus') ? 0 : 150;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(subtotal - discountAmount + deliveryFee, 0);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'FA26') {
      setDiscountPercent(20);
      setPromoStatus({ success: true, msg: '🎉 20% FA26 Semester Discount applied!' });
    } else if (code === 'STUDENT50') {
      setDiscountPercent(50);
      setPromoStatus({ success: true, msg: '🎉 50% Special Student Discount applied!' });
    } else {
      setPromoStatus({ success: false, msg: '❌ Invalid coupon code. Try FA26 or STUDENT50' });
    }
  };

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Department / Address is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderDetails = createOrderRecord(
      formData,
      cartItems,
      subtotal,
      discountAmount,
      deliveryFee,
      finalTotal
    );

    setOrderConfirmed(orderDetails);
    if (onOrderPlaced) {
      onOrderPlaced(orderDetails);
    }
  };

  const handleResetAndClose = () => {
    setOrderConfirmed(null);
    setPromoCode('');
    setDiscountPercent(0);
    setPromoStatus(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[140] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity"
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="px-6 py-4 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" aria-hidden="true">
              {orderConfirmed ? '✅' : '🛍️'}
            </span>
            <div>
              <h2 id="checkout-title" className="text-lg font-bold">
                {orderConfirmed ? 'Order Confirmed!' : 'Checkout & Student Delivery'}
              </h2>
              <p className="text-xs text-emerald-100">
                {orderConfirmed ? 'Your receipt has been generated' : `Completing order for ${cartItems.length} items`}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
            onClick={handleResetAndClose}
            aria-label="Close checkout"
          >
            &times;
          </button>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {orderConfirmed ? (
            /* RECEIPT VIEW */
            <div className="space-y-6">
              <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-3">
                  ✓
                </div>
                <h3 className="text-xl font-black text-emerald-950 mb-1">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Your order has been recorded. E-books and audiobooks will be delivered to your student portal immediately, and physical books will be sent to your selected campus.
                </p>
                <div className="inline-block mt-3 px-3 py-1 rounded-full bg-white border border-emerald-300 font-mono text-xs font-bold text-emerald-700">
                  Order ID: {orderConfirmed.orderId}
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Order Details Summary
                </h4>
                <div className="text-xs space-y-1 text-slate-700">
                  <div className="flex justify-between">
                    <span>Recipient:</span>
                    <strong className="text-slate-900">{orderConfirmed.customer.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Email &amp; Phone:</span>
                    <span>{orderConfirmed.customer.email} • {orderConfirmed.customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Location:</span>
                    <span>{orderConfirmed.customer.campus} ({orderConfirmed.customer.address})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="uppercase font-semibold">{orderConfirmed.customer.paymentMethod}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
                  {orderConfirmed.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-slate-600">
                      <span>{it.title} × {it.quantity}</span>
                      <span>{it.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                    <span>Final Amount:</span>
                    <span className="text-emerald-700">${orderConfirmed.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  🖨️ Print Receipt
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
                >
                  Back to Bookstore
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Step 1: Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">1</span>
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="checkout-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. Muhammad Zeeshan"
                      className={`w-full text-xs px-3 py-2 rounded-lg border ${formErrors.fullName ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    />
                    {formErrors.fullName && <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Student / University Email *
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="student@cuilahore.edu.pk"
                      className={`w-full text-xs px-3 py-2 rounded-lg border ${formErrors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    />
                    {formErrors.email && <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="checkout-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="0300-1234567"
                      className={`w-full text-xs px-3 py-2 rounded-lg border ${formErrors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery & Campus Pickup */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">2</span>
                  Delivery &amp; Pickup Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="checkout-campus" className="block text-xs font-semibold text-slate-700 mb-1">
                      Campus / City Hub
                    </label>
                    <select
                      id="checkout-campus"
                      value={formData.campus}
                      onChange={(e) => handleInputChange('campus', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="COMSATS Islamabad Campus">COMSATS Islamabad Campus (Free Pickup)</option>
                      <option value="COMSATS Lahore Campus">COMSATS Lahore Campus (Free Pickup)</option>
                      <option value="COMSATS Abbottabad Campus">COMSATS Abbottabad Campus (Free Pickup)</option>
                      <option value="Home Delivery Across Pakistan">Home Delivery (Standard Rs. 150)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="checkout-address" className="block text-xs font-semibold text-slate-700 mb-1">
                      Department / Room or Street Address *
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="e.g. CS Dept, Lab 3 or Hostel Block B"
                      className={`w-full text-xs px-3 py-2 rounded-lg border ${formErrors.address ? 'border-rose-500 bg-rose-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    />
                    {formErrors.address && <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-bold">3</span>
                  Payment Method
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cod', label: 'Cash on Pickup', icon: '💵' },
                    { id: 'jazzcash', label: 'JazzCash', icon: '📱' },
                    { id: 'easypaisa', label: 'EasyPaisa', icon: '💳' },
                    { id: 'card', label: 'Card / Online', icon: '🏦' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer text-center transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-sm ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={() => handleInputChange('paymentMethod', method.id)}
                        className="sr-only"
                      />
                      <span className="text-xl mb-1">{method.icon}</span>
                      <span className="text-[11px]">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 4: Promo Voucher & Summary */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. FA26)"
                    className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {promoStatus && (
                  <p className={`text-xs ${promoStatus.success ? 'text-emerald-700 font-semibold' : 'text-rose-600'}`}>
                    {promoStatus.msg}
                  </p>
                )}

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery / Campus Pickup:</span>
                    <span>{deliveryFee === 0 ? 'Free (Campus Pickup)' : `Rs. ${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2">
                    <span>Total Amount:</span>
                    <span className="text-emerald-700">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  Confirm &amp; Place Order
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
