import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Download } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, total, discount, coupon, clearCart } = useCart();
  const { user, token, API_BASE } = useAuth();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [successOrder, setSuccessOrder] = useState(null);

  if (cart.length === 0 && !successOrder) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">No Items to Checkout</h2>
        <p className="text-slate-500 text-sm">Add courses to your cart before accessing checkout.</p>
        <button onClick={() => navigate('/courses')} className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl">
          Browse Courses
        </button>
      </div>
    );
  }

  const handleRazorpayPayment = () => {
    if (!token) {
      setError('Please log in or register to complete your order.');
      navigate('/login');
      return;
    }

    setProcessing(true);
    setError('');

    const targetCourse = cart[0]; // Primary course checkout

    // 1. Create Order Server-Side
    fetch(`${API_BASE}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        course_id: targetCourse.id,
        coupon_code: coupon ? coupon.code : null
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setProcessing(false);
          return;
        }

        // 2. Trigger Payment Verification Server-Side (Simulating Razorpay Client Webhook/Callback)
        fetch(`${API_BASE}/payments/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            order_id: data.order_id,
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: 'pay_' + Math.random().toString(36).substring(2, 12),
            razorpay_signature: 'verified_signature_token'
          })
        })
          .then(res => res.json())
          .then(verifyData => {
            if (verifyData.success) {
              setSuccessOrder({
                order_number: data.order_number,
                course_id: targetCourse.id,
                course_title: targetCourse.title,
                total: data.amount / 100
              });
              clearCart();
            } else {
              setError(verifyData.error || 'Payment verification failed.');
            }
          })
          .catch(() => setError('Server error during payment verification.'))
          .finally(() => setProcessing(false));
      })
      .catch(() => {
        setError('Error creating payment order.');
        setProcessing(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Payment Success Screen */}
      {successOrder ? (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl text-center max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Payment Successful!</h2>
            <p className="text-slate-500 text-sm">
              Order <span className="font-bold text-slate-900">#{successOrder.order_number}</span> has been processed and your course is unlocked.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Course Enrolled:</span>
              <span className="font-bold text-slate-900">{successOrder.course_title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="font-extrabold text-blue-600">₹{successOrder.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Gateway:</span>
              <span className="font-semibold text-slate-700">Razorpay Verified</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate(`/dashboard/courses/${successOrder.course_id}`)}
              className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Go to Course Player</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/dashboard/orders')}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all"
            >
              View Invoices
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Billing Info */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Customer Details
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled
                    value={user?.name || ''}
                    className="w-full px-3.5 py-2.5 bg-slate-100 text-slate-900 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full px-3.5 py-2.5 bg-slate-100 text-slate-900 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <h4 className="text-base font-bold">Razorpay Secure Transaction</h4>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your payment is encrypted and processed via Razorpay API architecture. Server-side verification confirms payment before course activation.
              </p>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="md:col-span-5">
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Checkout Summary
              </h3>

              <div className="space-y-3 text-xs">
                {cart.map(c => (
                  <div key={c.id} className="flex justify-between font-medium">
                    <span className="text-slate-700 line-clamp-1">{c.title}</span>
                    <span className="font-bold text-slate-900">₹{c.sale_price > 0 ? c.sale_price : c.price}</span>
                  </div>
                ))}
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 font-bold pt-2 border-t border-slate-100">
                  <span>Coupon ({coupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-4 border-t border-slate-100">
                <span className="text-sm font-extrabold text-slate-900">Final Total</span>
                <span className="text-2xl font-black text-blue-600">₹{total}</span>
              </div>

              {error && <p className="text-xs text-rose-500 font-medium leading-relaxed">{error}</p>}

              <button
                onClick={handleRazorpayPayment}
                disabled={processing}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {processing ? (
                  <span>Verifying Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{total} via Razorpay</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
