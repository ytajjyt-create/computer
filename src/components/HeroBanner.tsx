import React from 'react';
import { ArrowRight, Wrench, Shield, Zap, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface HeroBannerProps {
  onStartBuilder: () => void;
  onExplorePrebuilts: () => void;
  flagshipProduct: Product;
  onViewProduct: (product: Product) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartBuilder,
  onExplorePrebuilts,
  flagshipProduct,
  onViewProduct,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#090e18] via-[#070a10] to-[#070a10] border-b border-slate-800/80 pt-10 pb-16">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BLACKWELL ARCHITECTURE &amp; ZEN 5 HYPER-TUNED</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              Precision Silicon. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Uncompromising Frame Times.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              From hand-tested RTX 5090 hardline liquid loops to custom AM5 battleboxes.
              Every workstation is validated with 48 hours of Prime95 and FurMark thermal stress.
            </p>

            {/* Unboxed Metadata Trust Bar (Anti-slop zero pill rule) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>48h MemTest86 &amp; Thermal Burn-in</span>
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>3-Year Direct Replacement Warranty</span>
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                <span>0.00% Dead Pixel Guarantee</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartBuilder}
                className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all shadow-lg shadow-cyan-500/25 group cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform" />
                <span>Open Custom PC Architect</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExplorePrebuilts}
                className="px-6 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Browse Ready-to-Ship Rigs
              </button>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/60 p-5 shadow-2xl overflow-hidden group">
              <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={flagshipProduct.image}
                  alt={flagshipProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Specs Overlay badge */}
                <div className="absolute top-3 left-3 bg-[#070a10]/80 backdrop-blur-md border border-cyan-500/30 px-2.5 py-1 rounded text-[11px] font-mono text-cyan-300">
                  FLAGSHIP 2026 BENCHMARK KING
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-xs font-mono text-cyan-400 tracking-wider">
                    {flagshipProduct.brand}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {flagshipProduct.name}
                  </h3>
                </div>
              </div>

              {/* Specs preview */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-slate-800 pt-3">
                <div>
                  <span className="text-slate-400 block text-[11px]">Primary GPU</span>
                  <span className="text-slate-200 font-semibold">RTX 5090 32GB GDDR7</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Processor</span>
                  <span className="text-slate-200 font-semibold">Ultra 9 285K 24-Core</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Cyberpunk 4K RT</span>
                  <span className="text-cyan-400 font-mono font-bold">138 FPS (Ultra)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Direct Price</span>
                  <span className="text-white font-mono font-bold text-sm">
                    ${flagshipProduct.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  In Stock · Ready to dispatch
                </span>
                <button
                  onClick={() => onViewProduct(flagshipProduct)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  View Rig Sheet &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
