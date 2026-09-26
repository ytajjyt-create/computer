import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Lock,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Building,
  Coins,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { CartItem, Order, OrderCustomer } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountCode: string;
  discountAmount: number;
  onOrderSuccess: (order: Order) => void;
  onGoToTracker: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discountCode,
  discountAmount,
  onOrderSuccess,
  onGoToTracker,
}) => {
  if (!isOpen) return null;

  // Checkout form state
  const [formData, setFormData] = useState<OrderCustomer>({
    fullName: 'Alex Mercer',
    email: 'alex.mercer@gmail.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'crypto' | 'wire' | 'apple_pay'>('credit_card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Compute totals
  const subtotal = cart.reduce((acc, item) => {
    const unitPrice = item.product.price + (item.warrantyTier === 'extended' ? 119 : 0);
    return acc + unitPrice * item.quantity;
  }, 0);

  const baseShipping = subtotal > 1000 || discountCode === 'FREESHIP' ? 0 : 35;
  const taxable = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxable * 0.08);
  const total = taxable + baseShipping + tax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `VAL-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingNumber = `FX-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
        1000 + Math.random() * 9000
      )}-US`;

      // Estimated 3 business days from now
      const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        items: [...cart],
        subtotal,
        discount: discountAmount,
        assemblyFee: 0,
        shippingFee: baseShipping,
        tax,
        total,
        customer: formData,
        paymentMethod,
        status: 'hardware_allocated',
        trackingNumber,
        estimatedDelivery: deliveryDate,
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0b101c] border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#070a10]">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-display font-bold text-white uppercase tracking-wider">
              {confirmedOrder ? 'Order Confirmed & Bench Scheduled' : 'Secure Hardware Checkout'}
            </span>
          </div>

          {!confirmedOrder && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1">
          {confirmedOrder ? (
            /* Order Confirmation View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Payment Cleared &amp; Serial Numbers Allocated
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Confirmation sent to{' '}
                  <span className="text-cyan-300 font-mono font-medium">
                    {confirmedOrder.customer.email}
                  </span>
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="text-cyan-400 font-bold">{confirmedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">FedEx Tracking:</span>
                  <span className="text-white font-bold">{confirmedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Est. Dispatch:</span>
                  <span className="text-emerald-400">{confirmedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Total Charged:</span>
                  <span className="text-white font-bold text-sm">
                    ${confirmedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onGoToTracker(confirmedOrder.id);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <Truck className="w-4 h-4" />
                  <span>Open Live Order Tracker</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer & Shipping Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  1. Shipping &amp; Contact Credentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Physical Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  2. Payment Method
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3 rounded-xl border text-xs text-center cursor-pointer transition-colors ${
                      paymentMethod === 'credit_card'
                        ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    Credit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-xl border text-xs text-center cursor-pointer transition-colors ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Lock className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    Apple Pay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-3 rounded-xl border text-xs text-center cursor-pointer transition-colors ${
                      paymentMethod === 'wire'
                        ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    Wire Transfer
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 rounded-xl border text-xs text-center cursor-pointer transition-colors ${
                      paymentMethod === 'crypto'
                        ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Coins className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    USDC / Bitcoin
                  </button>
                </div>

                {paymentMethod === 'credit_card' && (
                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Hardware Subtotal ({cart.length} item kinds)</span>
                  <span className="font-mono text-white tabular-nums">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Code ({discountCode})</span>
                    <span className="font-mono tabular-nums">
                      -${discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Insured Courier Air Dispatch</span>
                  <span className="font-mono text-white tabular-nums">
                    {baseShipping === 0 ? 'FREE' : `$${baseShipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated State &amp; Local Tax</span>
                  <span className="font-mono text-white tabular-nums">
                    ${tax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Authorized Charge</span>
                  <span className="font-mono text-cyan-400 text-base tabular-nums">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Allocating Hardware Serials &amp; Authorizing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm Order · ${total.toLocaleString()}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
