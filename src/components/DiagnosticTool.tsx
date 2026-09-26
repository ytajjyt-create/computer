import React, { useState } from 'react';
import {
  Gauge,
  Sparkles,
  Zap,
  ArrowRight,
  Monitor,
  CheckCircle2,
  Cpu,
  Tv,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface DiagnosticToolProps {
  onLoadBuild: (cpuId: string, gpuId: string) => void;
}

export const DiagnosticTool: React.FC<DiagnosticToolProps> = ({ onLoadBuild }) => {
  const [workload, setWorkload] = useState<'4k_gaming' | 'esports' | 'rendering' | 'ai_ml'>('4k_gaming');
  const [resolution, setResolution] = useState<'1080p' | '1440p' | '4k'>('4k');
  const [targetBudget, setTargetBudget] = useState<number>(3500);

  // Recommendations based on selected preferences
  let recCpu = PRODUCTS.find((p) => p.id === 'cpu-ultra-285k')!;
  let recGpu = PRODUCTS.find((p) => p.id === 'gpu-rtx-5090')!;
  let bottleneckScore = '1.2%';
  let bottleneckStatus = 'Zero Bottleneck · Optimal GPU Saturation';
  let balanceDesc = 'Your system will achieve 99% GPU utilization at 4K with ray tracing, backed by 24 high-IPC CPU cores.';

  if (workload === 'esports') {
    recCpu = PRODUCTS.find((p) => p.id === 'cpu-7800x3d')!;
    recGpu = PRODUCTS.find((p) => p.id === 'gpu-rtx-5080')!;
    bottleneckScore = '0.8%';
    bottleneckStatus = 'Optimal Esports Cache Balance';
    balanceDesc = 'The 96MB 3D V-Cache guarantees world-class 1% low frame consistency in Counter-Strike 2 & Valorant.';
  } else if (workload === 'rendering') {
    recCpu = PRODUCTS.find((p) => p.id === 'cpu-9950x')!;
    recGpu = PRODUCTS.find((p) => p.id === 'gpu-rtx-5090')!;
    bottleneckScore = '1.5%';
    bottleneckStatus = 'Maximum Multi-Threaded Throughput';
    balanceDesc = '16 Zen 5 cores combined with 32GB GDDR7 VRAM eliminates tile-rendering bottlenecks in Blender and Octane.';
  } else if (workload === 'ai_ml') {
    recCpu = PRODUCTS.find((p) => p.id === 'cpu-ultra-285k')!;
    recGpu = PRODUCTS.find((p) => p.id === 'gpu-rtx-5090')!;
    bottleneckScore = '1.0%';
    bottleneckStatus = 'Maximum Tensor FLOPS Bandwidth';
    balanceDesc = '32GB VRAM allows local execution of 70B quantized models at full context length with native FP8 precision.';
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-2xl p-6 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
          <Gauge className="w-3.5 h-3.5" />
          <span>VALENCE HARDWARE BOTTLENECK LAB</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Architectural Bottleneck &amp; Synergy Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Prevent under-utilizing your graphics card or over-investing in unused CPU lanes.
          Analyze mathematical silicon synergy for your specific workload.
        </p>
      </div>

      {/* Inputs & Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Interactive Parameters (6 Cols) */}
        <div className="md:col-span-6 bg-[#0b101c] border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Workload */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Primary Computational Workload
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setWorkload('4k_gaming')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                  workload === '4k_gaming'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">4K Path Tracing</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Cyberpunk, Alan Wake 2, UE5.4
                </div>
              </button>

              <button
                type="button"
                onClick={() => setWorkload('esports')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                  workload === 'esports'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">Esports 360Hz+</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Valorant, CS2, Apex Legends
                </div>
              </button>

              <button
                type="button"
                onClick={() => setWorkload('rendering')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                  workload === 'rendering'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">3D Rendering &amp; VFX</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Blender, Houdini, DaVinci Resolve
                </div>
              </button>

              <button
                type="button"
                onClick={() => setWorkload('ai_ml')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                  workload === 'ai_ml'
                    ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">Local LLM &amp; AI</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  PyTorch, Ollama 70B, LoRA Tuning
                </div>
              </button>
            </div>
          </div>

          {/* Resolution */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Target Display Native Resolution
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['1080p', '1440p', '4k'] as const).map((res) => (
                <button
                  type="button"
                  key={res}
                  onClick={() => setResolution(res)}
                  className={`p-2.5 rounded-xl border text-center font-mono cursor-pointer transition-colors ${
                    resolution === res
                      ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {res.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Target Budget Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>TARGET HARDWARE BUDGET</span>
              <span className="text-cyan-400 font-bold tabular-nums">
                ${targetBudget.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1500"
              max="5000"
              step="100"
              value={targetBudget}
              onChange={(e) => setTargetBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Right: Architectural Synergy Recommendation (6 Cols) */}
        <div className="md:col-span-6 bg-[#090e18] border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                CALCULATED SYNERGY
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {bottleneckStatus}
              </span>
            </div>

            {/* Bottleneck Percentage Score Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">
                  THEORETICAL BOTTLENECK
                </span>
                <span className="font-mono text-3xl font-extrabold text-cyan-400 tabular-nums">
                  {bottleneckScore}
                </span>
              </div>
              <div className="text-right text-xs text-slate-400 max-w-[200px]">
                Virtually zero frame latency disparity between CPU instructions and raster render calls.
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {balanceDesc}
            </p>

            {/* Recommended Hardware Blueprint Pair */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                OPTIMAL SILICON PAIRING
              </span>

              {/* CPU Card */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">
                      Recommended CPU
                    </span>
                    <div className="text-xs font-bold text-white truncate">
                      {recCpu.name}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-slate-300 tabular-nums">
                  ${recCpu.price.toLocaleString()}
                </span>
              </div>

              {/* GPU Card */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-cyan-400">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">
                      Recommended GPU
                    </span>
                    <div className="text-xs font-bold text-white truncate">
                      {recGpu.name}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-slate-300 tabular-nums">
                  ${recGpu.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => onLoadBuild(recCpu.id, recGpu.id)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 transition-all"
          >
            <span>Load Synergy Pair into Rig Architect</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
