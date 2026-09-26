import React from 'react';
import { X, Trash2, ShoppingCart, Check, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveProduct,
  onClearAll,
  onAddToCart,
  onViewProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0b101c] border border-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#070a10]">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base sm:text-lg font-display font-bold text-white">
                Hardware Comparison Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Evaluating {products.length} hardware component{products.length === 1 ? '' : 's'} side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {products.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1">
          {products.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <SlidersHorizontal className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">
                Comparison tray is currently empty
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the compare icon on any product card in the store to evaluate physical specs, clock frequencies, and TDP side-by-side.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="py-3 px-3 text-slate-500 font-mono w-44">
                      SPECIFICATION
                    </th>
                    {products.map((p) => (
                      <th key={p.id} className="py-3 px-3 w-64 align-top">
                        <div className="relative group">
                          <button
                            onClick={() => onRemoveProduct(p.id)}
                            className="absolute -top-1 -right-1 p-1 bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 rounded-full transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-32 object-cover rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                            onClick={() => onViewProduct(p)}
                          />
                          <div className="mt-2 font-mono text-[10px] text-cyan-400 uppercase">
                            {p.brand}
                          </div>
                          <div
                            onClick={() => onViewProduct(p)}
                            className="font-bold text-slate-100 line-clamp-2 hover:text-cyan-300 cursor-pointer mt-0.5"
                          >
                            {p.name}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/80">
                  {/* Price */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-950/40">
                      Direct Price
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-3">
                        <span className="font-mono text-base font-bold text-white tabular-nums">
                          ${p.price.toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Stock */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-950/40">
                      Availability
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-3">
                        <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {p.inStock ? `In Stock (${p.stockCount})` : 'Backordered'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Category */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-950/40">
                      Hardware Class
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-3 font-mono text-slate-300 uppercase">
                        {p.category}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-950/40">
                      Rating &amp; Reviews
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-3 font-mono text-amber-400">
                        ★ {p.rating.toFixed(2)} ({p.reviewsCount} reviews)
                      </td>
                    ))}
                  </tr>

                  {/* Socket/Compatibility */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-950/40">
                      Socket / Interface
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-3 text-slate-200 font-mono">
                        {p.compatibility?.socket || p.specs.find((s) => s.label.toLowerCase().includes('socket'))?.value || 'Standard PCIe'}
                      </td>
                    ))}
                  </tr>

                  {/* Thermal / Power */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-950/40">
                      TDP / Rated Power
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-3 text-slate-200 font-mono">
                        {p.compatibility?.tdpWatts ? `${p.compatibility.tdpWatts} Watts` : p.compatibility?.wattageOutput ? `${p.compatibility.wattageOutput} Watts Output` : 'Standard Line'}
                      </td>
                    ))}
                  </tr>

                  {/* Core Summary */}
                  <tr>
                    <td className="py-3 px-3 text-slate-400 font-medium bg-slate-950/40">
                      Primary Architecture
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="py-3 px-3 text-slate-300 text-[11px] leading-relaxed">
                        {p.shortDesc}
                      </td>
                    ))}
                  </tr>

                  {/* Actions Row */}
                  <tr>
                    <td className="py-4 px-3 bg-slate-950/40">Order Actions</td>
                    {products.map((p) => (
                      <td key={p.id} className="py-4 px-3">
                        <button
                          onClick={() => {
                            onAddToCart(p);
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
