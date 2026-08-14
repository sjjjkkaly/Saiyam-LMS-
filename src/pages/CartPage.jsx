import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/common/EmptyState';
import { Trash2, Tag, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, subtotal, discount, total, coupon, applyCoupon, removeCoupon } = useCart();
  const { API_BASE, token } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    if (!token) {
      setCouponError('Please log in to apply coupon codes.');
      return;
    }

    setLoading(true);
    setCouponError('');
    setCouponSuccess('');

    fetch(`${API_BASE}/coupons/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        code: couponInput.trim(),
        cart_amount: subtotal
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.coupon) {
          applyCoupon(data.coupon);
          setCouponSuccess(data.message);
          setCouponInput('');
        } else {
          setCouponError(data.error || 'Failed to apply coupon.');
        }
      })
      .catch(() => setCouponError('Error evaluating coupon.'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-slate-500 text-sm">Review your selected courses before proceeding to secure checkout.</p>
      </div>

      {cart.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Explore our course catalog and add courses to your cart to begin learning."
          icon={ShoppingBag}
          actionText="Explore Courses"
          onAction={() => navigate('/courses')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map(course => (
              <div key={course.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{course.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">Instructor: {course.instructor_name || 'Saiyam Jain'}</p>
                    <span className="text-xs font-bold text-blue-600 mt-1 inline-block">{course.course_level}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{course.sale_price > 0 ? course.sale_price : course.price}
                  </span>
                  <button
                    onClick={() => removeFromCart(course.id)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Remove Course"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Apply Coupon</label>
                {coupon ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-800 uppercase">{coupon.code}</span>
                      <p className="text-emerald-600">Saved ₹{coupon.discount_amount}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER COUPON"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 text-slate-900 text-xs rounded-xl border border-slate-200 uppercase font-bold focus:outline-hidden focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-xs text-rose-500 font-medium">{couponError}</p>}
                {couponSuccess && <p className="text-xs text-emerald-600 font-medium">{couponSuccess}</p>}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-900 font-extrabold text-lg pt-3 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-blue-600">₹{total}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md text-center block flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
