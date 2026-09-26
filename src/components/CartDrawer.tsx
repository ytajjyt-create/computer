import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  ShoppingBag,
  Wrench,
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (discountCode: string, discountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    type: 'percent' | 'fixed' | 'shipping';
    value: number;
  } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Calculate items subtotal
  const subtotal = cart.reduce((acc, item) => {
    const unitPrice = item.product.price + (item.warrantyTier === 'extended' ? 119 : 0);
    return acc + unitPrice * item.quantity;
  }, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discountAmount = Math.round(subtotal * (appliedPromo.value / 100));
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = Math.min(subtotal, appliedPromo.value);
    }
  }

  // Shipping calculation: Free over $1,000 or if shipping promo applied
  const baseShipping = subtotal > 1000 || appliedPromo?.type === 'shipping' ? 0 : 35;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const estimatedTax = Math.round(taxableAmount * 0.08); // 8% sales tax
  const grandTotal = taxableAmount + baseShipping + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (cleanCode === 'BUILDER10') {
      setAppliedPromo({ code: 'BUILDER10', type: 'percent', value: 10 });
      setPromoError('');
    } else if (cleanCode === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', type: 'shipping', value: 35 });
      setPromoError('');
    } else if (cleanCode === 'CYBERPUNK') {
      setAppliedPromo({ code: 'CYBERPUNK', type: 'fixed', value: 150 });
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try BUILDER10 or FREESHIP');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0b101c] border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#070a10]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-display font-bold text-white">
                Hardware Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                <div className="text-base font-semibold text-slate-300">
                  Your cart is empty
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore custom PC builds, laptops, and ultra-high-speed components to populate your configuration.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 font-medium text-xs transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const isCustomRig = !!item.customBuild;
                const unitPrice =
                  item.product.price + (item.warrantyTier === 'extended' ? 119 : 0);
                const lineTotal = unitPrice * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
                  >
                    <div className="flex gap-3.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                            {item.product.brand}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-500 hover:text-red-400 p-0.5 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-white truncate mt-0.5">
                          {item.product.name}
                        </h4>

                        {item.warrantyTier === 'extended' && (
                          <div className="text-[10px] text-cyan-300 flex items-center gap-1 mt-1 font-mono">
                            <ShieldCheck className="w-3 h-3" />
                            <span>ValGuard 4-Yr Extended Protection (+$119)</span>
                          </div>
                        )}

                        {isCustomRig && (
                          <div className="mt-1.5 p-2 bg-slate-950 rounded border border-slate-800/80 text-[10px] text-slate-300 space-y-0.5 font-mono">
                            <div className="text-cyan-400 font-semibold flex items-center gap-1">
                              <Wrench className="w-3 h-3" />
                              <span>Custom Rig Specification</span>
                            </div>
                            <div className="truncate text-slate-400">
                              CPU: {item.customBuild?.cpu?.name}
                            </div>
                            <div className="truncate text-slate-400">
                              GPU: {item.customBuild?.gpu?.name}
                            </div>
                            <div className="truncate text-slate-400">
                              RAM: {item.customBuild?.ram?.name}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      {/* Quantity Controller */}
                      <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-white px-2.5 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-mono text-sm font-bold text-white tabular-nums">
                        ${lineTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer: Promo Code, Pricing Breakdown, Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#070a10] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (BUILDER10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-lg pl-8 pr-2.5 py-1.5 focus:outline-none focus:border-cyan-500 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Coupon {appliedPromo.code} applied!</span>
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-red-400 font-mono">{promoError}</div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white tabular-nums">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span className="font-mono tabular-nums">
                      -${discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Courier</span>
                  <span className="font-mono text-white tabular-nums">
                    {baseShipping === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      `$${baseShipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-white tabular-nums">
                    ${estimatedTax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Due</span>
                  <span className="font-mono text-cyan-400 text-base tabular-nums">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() =>
                  onCheckout(appliedPromo ? appliedPromo.code : '', discountAmount)
                }
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
