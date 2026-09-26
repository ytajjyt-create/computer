import React, { useState } from 'react';
import { Cpu, ShoppingCart, SlidersHorizontal, Search, X, Check, Truck, ShieldCheck, ExternalLink } from 'lucide-react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  compareList: Product[];
  setIsCompareOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  compareList,
  setIsCompareOpen,
  searchQuery,
  setSearchQuery,
  allProducts,
  onSelectProduct,
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => {
    const base = item.product.price * item.quantity;
    const warranty = item.warrantyTier === 'extended' ? 119 * item.quantity : 0;
    return acc + base + warranty;
  }, 0);

  const searchResults = searchQuery.trim().length > 1
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#070a10]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-cyan-950/60 border-b border-cyan-500/20 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <Truck className="w-3.5 h-3.5" />
              Free Insured Air Courier & 48h Stress-Testing on Rigs &gt; $2,000
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              Use promo code <span className="font-mono text-cyan-300 font-semibold">BUILDER10</span> for 10% off custom configurations
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              3-Year Direct Warranty
            </span>
            <button
              onClick={() => setActiveTab('tracker')}
              className="hover:text-cyan-400 transition-colors text-xs"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('store')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                VALENCE
              </span>
              <span className="block text-[10px] tracking-widest text-cyan-400/80 font-mono -mt-1 font-semibold">
                HIGH PERFORMANCE PC
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('store')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'store'
                  ? 'border-cyan-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Hardware Store
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'builder'
                  ? 'border-cyan-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>PC Rig Architect</span>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                LIVE COMPATIBILITY
              </span>
            </button>
            <button
              onClick={() => setActiveTab('prebuilts')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'prebuilts'
                  ? 'border-cyan-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Pre-Built Rigs
            </button>
            <button
              onClick={() => setActiveTab('laptops')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'laptops'
                  ? 'border-cyan-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Laptops
            </button>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-3.5 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'diagnostics'
                  ? 'border-cyan-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Bottleneck Lab
            </button>
            <a
              href="https://www.amazon.in/Zebronics-Keyboard-Multimedia-Ergonomic-Multicolor/dp/B0GFVBSB2C?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=AJ6SIZC8YQDZX&th=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-sm font-medium transition-colors border-b-2 border-transparent text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
              title="Zebronics Keyboard Project Link"
            >
              <span>Project Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
          {/* Live Search */}
          <div className="relative w-full max-w-xs hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search RTX 5090, AM5, DDR5..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full bg-slate-900/90 border border-slate-800 text-xs text-slate-200 rounded-lg pl-9 pr-8 py-2 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div
                className="absolute left-0 right-0 mt-2 bg-[#0d131f] border border-slate-700/80 rounded-lg shadow-2xl p-2 z-50 divide-y divide-slate-800/60"
                onMouseLeave={() => setShowSearchDropdown(false)}
              >
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setShowSearchDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-slate-800/60 rounded text-left transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded bg-slate-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-slate-200 truncate">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>{product.brand}</span>
                        <span>·</span>
                        <span className="font-mono text-cyan-400">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Compare Button */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className="relative p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            title="Hardware Comparison Matrix"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-cyan-500 text-[#070a10] text-[11px] font-bold rounded-full flex items-center justify-center font-mono">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs transition-all shadow-md shadow-cyan-900/30"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline font-mono font-semibold">
              ${cartSubtotal.toLocaleString()}
            </span>
            {totalCartCount > 0 && (
              <span className="w-5 h-5 bg-white text-slate-900 font-mono text-[11px] font-extrabold rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto scrollbar-none px-4 py-2 border-t border-slate-800/60 gap-2 bg-[#090d16]">
        <button
          onClick={() => setActiveTab('store')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded font-medium ${
            activeTab === 'store' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
          }`}
        >
          Store
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded font-medium flex items-center gap-1 ${
            activeTab === 'builder' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
          }`}
        >
          <span>PC Builder</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        </button>
        <button
          onClick={() => setActiveTab('prebuilts')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded font-medium ${
            activeTab === 'prebuilts' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
          }`}
        >
          Pre-Builts
        </button>
        <button
          onClick={() => setActiveTab('laptops')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded font-medium ${
            activeTab === 'laptops' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
          }`}
        >
          Laptops
        </button>
        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded font-medium ${
            activeTab === 'diagnostics' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
          }`}
        >
          Bottleneck Tool
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-3 py-1 text-xs whitespace-nowrap rounded font-medium ${
            activeTab === 'tracker' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
          }`}
        >
          Track Order
        </button>
        <a
          href="https://www.amazon.in/Zebronics-Keyboard-Multimedia-Ergonomic-Multicolor/dp/B0GFVBSB2C?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=AJ6SIZC8YQDZX&th=1"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 text-xs whitespace-nowrap rounded font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <span>Project Link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </header>
  );
};
