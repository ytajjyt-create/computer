import React from 'react';
import { Star, ShoppingCart, SlidersHorizontal, Check, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
  onToggleCompare,
  isCompared,
}) => {
  // Extract key quick specs from first 3 specs
  const keySpecs = product.specs.slice(0, 3).map((s) => s.value.split('(')[0].trim());

  return (
    <div className="group relative rounded-xl bg-[#0b101b] border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-cyan-950/20">
      {/* Clickable Image & Details Area */}
      <div onClick={() => onViewDetails(product)} className="cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b101b] via-transparent to-transparent opacity-80" />

          {/* Badge (if any) */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded font-medium">
              {product.badge}
            </div>
          )}

          {/* Compare Quick Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-md text-xs transition-colors backdrop-blur-md ${
              isCompared
                ? 'bg-cyan-500 text-slate-950 font-semibold'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700/50'
            }`}
            title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-2.5">
          {/* Brand & Stock */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider font-semibold">
              {product.brand}
            </span>
            <span
              className={`text-[11px] flex items-center gap-1 font-medium ${
                product.stockCount <= 5 ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  product.stockCount <= 5 ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
              />
              {product.stockCount <= 5 ? `Only ${product.stockCount} left` : 'In Stock'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Unboxed Metadata Specs Line (Anti-slop zero-pill) */}
          <div className="text-[11px] text-slate-400 line-clamp-1 leading-normal">
            {keySpecs.map((spec, i) => (
              <React.Fragment key={i}>
                <span>{spec}</span>
                {i < keySpecs.length - 1 && (
                  <span className="mx-1.5 text-slate-600" aria-hidden="true">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="ml-1 text-slate-200 font-mono font-medium">
                {product.rating.toFixed(2)}
              </span>
            </div>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 text-[11px]">
              {product.reviewsCount} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Price & Add to Cart */}
      <div className="p-4 pt-0 mt-auto border-t border-slate-800/60 flex items-center justify-between gap-3">
        <div className="pt-2">
          <div className="text-xs text-slate-500 font-mono">VALENCE DIRECT</div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-white tabular-nums">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-slate-500 line-through tabular-nums">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {product.projectLink && (
            <a
              href={product.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 px-2.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 font-semibold text-xs transition-all border border-cyan-500/30 hover:border-cyan-500 flex items-center gap-1 cursor-pointer shrink-0"
              title="Open Project Link (Amazon)"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Project</span>
            </a>
          )}

          <button
            onClick={() => onAddToCart(product)}
            className="mt-2 px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-semibold text-xs transition-all border border-cyan-500/30 hover:border-cyan-500 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
