import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../state/CartContext';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cart, fetchCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Delivery address state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const items = cart.items || [];
  const total = items.reduce((sum, item) => {
    const product = item.product;
    const price = product?.price ?? 0;
    const qty = item.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  // Handle Razorpay Payment
  const handleRazorpayPayment = async (deliveryData) => {
    try {
      // 1. Create Razorpay order
      const { data: orderData } = await api.post('/payment/create-order', {
        amount: total
      });

      // Handle Mock/Test Mode
      if (orderData.isMock) {
        toast('⚠️ Running in Test Mode (No Real Payment)', { icon: '🛠️' });

        // Simulate payment success for mock mode
        const mockResponse = {
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_signature: 'mock_signature'
        };

        // Call verification directly
        const { data } = await api.post('/payment/verify', {
          ...mockResponse,
          deliveryAddress: deliveryData
        });

        toast.success(data.message || 'Payment successful! Order placed.');
        await fetchCart();
        navigate('/orders');
        return;
      }

      // 2. Define Razorpay options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'FreshMart',
        description: 'Grocery Order Payment',
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // 3. Verify payment and create order
            const { data } = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              deliveryAddress: deliveryData
            });

            toast.success(data.message || 'Payment successful! Order placed.');
            await fetchCart();
            navigate('/orders');
          } catch (error) {
            toast.error(error.response?.data?.message || 'Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: deliveryData.fullName,
          contact: deliveryData.phone
        },
        theme: {
          color: '#16a34a'
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error('Payment cancelled');
          }
        }
      };

      // 4. Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Failed to initialize payment');
    }
  };

  // Handle COD Order
  const handleCODOrder = async (deliveryData) => {
    try {
      const { data } = await api.post('/orders', {
        deliveryAddress: deliveryData,
        paymentMethod: 'COD'
      });
      toast.success(data.message || 'Order placed successfully');
      await fetchCart();
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    // Validate phone
    if (!/^\d{10}$/.test(phone)) {
      toast.error('Phone must be 10 digits');
      return;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(pincode)) {
      toast.error('Pincode must be 6 digits');
      return;
    }

    const deliveryData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim()
    };

    setLoading(true);

    if (paymentMethod === 'Online') {
      handleRazorpayPayment(deliveryData);
    } else {
      handleCODOrder(deliveryData);
    }
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">Your cart is empty. Add items before checkout.</p>
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="mt-4 text-primary font-semibold hover:underline"
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    pattern="\d{10}"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
                    Complete Address *
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="House no., Street, Landmark"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="State (optional)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-slate-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    pattern="\d{6}"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label
                  className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary"
                  style={{ borderColor: paymentMethod === 'Online' ? '#16a34a' : '#e2e8f0' }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Online"
                    checked={paymentMethod === 'Online'}
                    onChange={() => setPaymentMethod('Online')}
                    className="w-4 h-4 text-primary mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">Pay Online (Razorpay)</div>
                    <p className="text-sm text-slate-500 mt-1">
                      Credit/Debit Card, UPI, Net Banking, Wallets
                    </p>
                  </div>
                </label>

                <label
                  className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary"
                  style={{ borderColor: paymentMethod === 'COD' ? '#16a34a' : '#e2e8f0' }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="w-4 h-4 text-primary mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">Cash on Delivery (COD)</div>
                    <p className="text-sm text-slate-500 mt-1">
                      Pay when your order is delivered
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (paymentMethod === 'Online' ? 'Processing...' : 'Placing order…') : `Place Order${paymentMethod === 'Online' ? ' - Pay ₹' + total : ''}`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-4">
            <h2 className="font-semibold text-slate-800 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => {
                const product = item.product;
                const id = typeof product === 'object' ? product?._id : product;
                const name = product?.name ?? 'Product';
                const price = product?.price ?? 0;
                const qty = item.quantity ?? 0;
                const subtotal = price * qty;

                return (
                  <div key={item._id || id} className="flex gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product?.image || 'https://via.placeholder.com/100'}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${id}`} className="text-sm font-medium text-slate-800 hover:text-primary line-clamp-1">
                        {name}
                      </Link>
                      <p className="text-sm text-slate-500">
                        ₹{price} × {qty}
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        ₹{subtotal}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-slate-800">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
              {paymentMethod === 'Online' && (
                <p className="text-xs text-slate-500 mt-2">
                  🔒 Secure payment powered by Razorpay
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
