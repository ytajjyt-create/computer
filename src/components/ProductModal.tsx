import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  SlidersHorizontal,
  Check,
  ShieldCheck,
  Zap,
  Truck,
  MessageSquarePlus,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { Product, Review } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, warrantyTier: 'standard' | 'extended') => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onAddReview: (productId: string, review: Review) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleCompare,
  isCompared,
  onAddReview,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [warrantyTier, setWarrantyTier] = useState<'standard' | 'extended'>('standard');
  const [activeTab, setActiveTab] = useState<'specs' | 'benchmarks' | 'reviews'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  // Review submission state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  const finalUnitPrice = product.price + (warrantyTier === 'extended' ? 119 : 0);
  const totalPrice = finalUnitPrice * quantity;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim(),
      verifiedPurchase: true,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      title: reviewTitle.trim() || 'Verified Performance Review',
      comment: reviewComment.trim(),
    };

    onAddReview(product.id, newRev);
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3500);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0b101c] border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#070a10]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">
              SKU: VAL-{product.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          {/* Main Grid: Image + Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Image Showcase (5 Cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#070a10]/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono px-2.5 py-1 rounded">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Guarantees Box */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-cyan-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>3-Year Direct Valence Hardware Care</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>Next-Day Air Shipping Available</span>
                </div>
              </div>
            </div>

            {/* Product Details (7 Cols) */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {product.fullDesc}
                </p>
              </div>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold">{product.rating.toFixed(2)}</span>
                  <span className="text-slate-400">({product.reviewsCount} customer reviews)</span>
                </div>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  In Stock ({product.stockCount} units available)
                </span>
              </div>

              {/* Warranty Tier Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-300 block">
                  Hardware Protection Plan
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWarrantyTier('standard')}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      warrantyTier === 'standard'
                        ? 'bg-cyan-950/40 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-slate-100 flex items-center justify-between">
                      <span>Standard 2-Yr</span>
                      <span className="font-mono text-emerald-400 font-bold">$0</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Parts &amp; labor replacement
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWarrantyTier('extended')}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      warrantyTier === 'extended'
                        ? 'bg-cyan-950/40 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-slate-100 flex items-center justify-between">
                      <span>ValGuard 4-Yr</span>
                      <span className="font-mono text-cyan-400 font-bold">+$119</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Surge cover + Advance RMA dispatch
                    </div>
                  </button>
                </div>
              </div>

              {/* Price and Cart Row */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-slate-400 font-mono">TOTAL PURCHASE VALUE</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-extrabold text-white tabular-nums">
                      ${totalPrice.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-xs text-slate-500 line-through tabular-nums">
                        ${(product.originalPrice * quantity).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quantity Controller */}
                  <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs text-white px-2 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {product.projectLink && (
                    <a
                      href={product.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 font-semibold text-xs border border-cyan-500/30 hover:border-cyan-500 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Open Amazon Project Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Real Project Link</span>
                    </a>
                  )}

                  {/* Add to Cart */}
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, warrantyTier);
                      onClose();
                    }}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Compare button */}
                  <button
                    onClick={() => onToggleCompare(product)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isCompared
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title={isCompared ? 'Remove from comparison' : 'Compare product'}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Tabs: Technical Specifications, Benchmarks, Reviews */}
          <div className="border-t border-slate-800 pt-5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                  activeTab === 'specs'
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Technical Specifications
              </button>
              {product.benchmarks && product.benchmarks.length > 0 && (
                <button
                  onClick={() => setActiveTab('benchmarks')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                    activeTab === 'benchmarks'
                      ? 'bg-slate-800 text-cyan-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Gaming Benchmarks ({product.benchmarks.length})
                </button>
              )}
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Customer Reviews ({product.reviews.length})
              </button>
            </div>

            {/* Tab 1: Specs Sheet Table */}
            {activeTab === 'specs' && (
              <div className="pt-4">
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-slate-800/80">
                    {product.specs.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-2.5 px-3 font-medium text-slate-400 w-1/3 bg-slate-950/40">
                          {s.label}
                        </td>
                        <td className="py-2.5 px-3 text-slate-200 font-mono font-medium">
                          {s.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 2: Benchmarks */}
            {activeTab === 'benchmarks' && product.benchmarks && (
              <div className="pt-4 space-y-4">
                <p className="text-xs text-slate-400">
                  Benchmarked under ambient 21°C room temperature with clean Windows 11 installation.
                </p>
                <div className="space-y-3">
                  {product.benchmarks.map((b, idx) => {
                    // Maximum benchmark scale reference 300 fps
                    const percent = Math.min(100, (b.fps / 300) * 100);
                    return (
                      <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{b.game}</span>
                          <span className="font-mono text-cyan-400 font-bold tabular-nums">
                            {b.fps} FPS
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>Resolution: {b.resolution}</span>
                          <span>Preset: {b.preset}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Reviews & Write Review */}
            {activeTab === 'reviews' && (
              <div className="pt-4 space-y-6">
                {/* Submit Review Form */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MessageSquarePlus className="w-4 h-4 text-cyan-400" />
                      Write a Verified Customer Review
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="cursor-pointer text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= reviewRating ? 'fill-amber-400' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Alex M.)"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                      className="bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      placeholder="Review Headline"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Share detailed feedback on thermal performance, acoustics, and frame rates..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-cyan-500"
                  />

                  <div className="flex items-center justify-between">
                    {showReviewSuccess ? (
                      <span className="text-xs text-emerald-400 font-mono">
                        ✓ Review posted successfully!
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">
                        Requires verified hardware validation
                      </span>
                    )}

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Publish Review
                    </button>
                  </div>
                </form>

                {/* Existing Reviews */}
                <div className="space-y-3">
                  {product.reviews.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-500">
                      Be the first to review this high-performance component!
                    </div>
                  ) : (
                    product.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{rev.author}</span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] text-emerald-400 font-mono">
                                [VERIFIED BUYER]
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {rev.date}
                          </span>
                        </div>

                        <div className="flex items-center text-amber-400 text-xs gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                          <span className="ml-1 text-slate-300 font-medium">
                            {rev.title}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
