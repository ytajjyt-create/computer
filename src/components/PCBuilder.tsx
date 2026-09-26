import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Gauge,
  Plus,
  Trash2,
  ShoppingCart,
  Share2,
  Sparkles,
  Sliders,
  RotateCw,
  Box,
  Layers,
  HardDrive,
  Monitor
} from 'lucide-react';
import { Product, CustomPCBuild, CartItem } from '../types';
import { PRODUCTS, PRECONFIGURED_BUILDS } from '../data/products';

interface PCBuilderProps {
  onAddBuildToCart: (build: CustomPCBuild, assemblyOption: 'diy' | 'bench_tested') => void;
  onViewProduct: (product: Product) => void;
}

export const PCBuilder: React.FC<PCBuilderProps> = ({
  onAddBuildToCart,
  onViewProduct,
}) => {
  // Current build selections
  const [selectedCpu, setSelectedCpu] = useState<Product | undefined>(
    PRODUCTS.find((p) => p.id === 'cpu-7800x3d')
  );
  const [selectedCooler, setSelectedCooler] = useState<Product | undefined>(
    PRODUCTS.find((p) => p.id === 'cool-arctic-360')
  );
  const [selectedMb, setSelectedMb] = useState<Product | undefined>(
    PRODUCTS.find((p) => p.id === 'mb-msi-x870e')
  );
  const [selectedRam, setSelectedRam] = useState<Product | undefined>(
    PRODUCTS.find((p) => p.id === 'ram-trident-32')
  );
  const [selectedGpu, setSelectedGpu] = useState<Product | undefined>(
    PRODUCTS.find((p) => p.id === 'gpu-rtx-5080')
  );
  const [selectedStorage, setSelectedStorage] = useState<Product | undefined>(
    PRODUCTS.find((p) => p.id === 'ssd-samsung-990pro-4tb')
  );
  const [selectedCase, setSelectedCase] = useState<Product | undefined>(
    PRODUCTS.find((p) => p.id === 'case-fractal-north')
  );
  const [selectedPsu, setSelectedPsu] = useState<Product | undefined>(
    PRODUCTS.find((p) => p.id === 'psu-corsair-1000')
  );

  // RGB lighting color picker for visual chassis preview
  const [rgbColor, setRgbColor] = useState<string>('#06b6d4'); // Cyan default
  const [assemblyOption, setAssemblyOption] = useState<'diy' | 'bench_tested'>('bench_tested');
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [activeSlotModal, setActiveSlotModal] = useState<string | null>(null);

  // RGB options
  const RGB_PRESETS = [
    { name: 'Valence Cyan', color: '#06b6d4' },
    { name: 'Neon Violet', color: '#a855f7' },
    { name: 'Solar Amber', color: '#f59e0b' },
    { name: 'Toxic Emerald', color: '#10b981' },
    { name: 'Crimson Fury', color: '#ef4444' },
    { name: 'Arctic Ice', color: '#e0f2fe' },
    { name: 'Stealth Blackout', color: '#1e293b' },
  ];

  // Component slot definitions
  const SLOTS = [
    {
      key: 'cpu',
      title: 'Processor (CPU)',
      icon: Cpu,
      current: selectedCpu,
      set: setSelectedCpu,
      category: 'cpu',
    },
    {
      key: 'cooler',
      title: 'CPU Cooling',
      icon: Flame,
      current: selectedCooler,
      set: setSelectedCooler,
      category: 'cooling',
    },
    {
      key: 'mb',
      title: 'Motherboard',
      icon: Layers,
      current: selectedMb,
      set: setSelectedMb,
      category: 'motherboard',
    },
    {
      key: 'ram',
      title: 'System Memory (RAM)',
      icon: Gauge,
      current: selectedRam,
      set: setSelectedRam,
      category: 'ram',
    },
    {
      key: 'gpu',
      title: 'Graphics Card (GPU)',
      icon: Monitor,
      current: selectedGpu,
      set: setSelectedGpu,
      category: 'gpu',
    },
    {
      key: 'storage',
      title: 'Primary Storage (M.2 NVMe)',
      icon: HardDrive,
      current: selectedStorage,
      set: setSelectedStorage,
      category: 'storage',
    },
    {
      key: 'case',
      title: 'Chassis / Case',
      icon: Box,
      current: selectedCase,
      set: setSelectedCase,
      category: 'case',
    },
    {
      key: 'psu',
      title: 'Power Supply Unit (PSU)',
      icon: Zap,
      current: selectedPsu,
      set: setSelectedPsu,
      category: 'psu',
    },
  ];

  // Load a pre-configured enthusiast preset
  const loadPreset = (preset: (typeof PRECONFIGURED_BUILDS)[0]) => {
    setSelectedCpu(PRODUCTS.find((p) => p.id === preset.parts.cpuId));
    setSelectedCooler(PRODUCTS.find((p) => p.id === preset.parts.coolerId));
    setSelectedMb(PRODUCTS.find((p) => p.id === preset.parts.mbId));
    setSelectedRam(PRODUCTS.find((p) => p.id === preset.parts.ramId));
    setSelectedGpu(PRODUCTS.find((p) => p.id === preset.parts.gpuId));
    setSelectedStorage(PRODUCTS.find((p) => p.id === preset.parts.storageId));
    setSelectedCase(PRODUCTS.find((p) => p.id === preset.parts.caseId));
    setSelectedPsu(PRODUCTS.find((p) => p.id === preset.parts.psuId));
    setRgbColor(preset.rgbColor);
  };

  // Build total price
  const partsSubtotal = useMemo(() => {
    return [
      selectedCpu,
      selectedCooler,
      selectedMb,
      selectedRam,
      selectedGpu,
      selectedStorage,
      selectedCase,
      selectedPsu,
    ].reduce((acc, p) => acc + (p?.price || 0), 0);
  }, [
    selectedCpu,
    selectedCooler,
    selectedMb,
    selectedRam,
    selectedGpu,
    selectedStorage,
    selectedCase,
    selectedPsu,
  ]);

  // Assembly fee: $99, waived if subtotal > $2000 or if user chooses DIY
  const assemblyPrice = assemblyOption === 'diy' ? 0 : partsSubtotal > 2000 ? 0 : 99;
  const grandTotal = partsSubtotal + assemblyPrice;

  // Power Consumption & Headroom Calculation
  const estimatedSystemWattage = useMemo(() => {
    const cpuTdp = selectedCpu?.compatibility?.tdpWatts || 120;
    const gpuTdp = selectedGpu?.compatibility?.tdpWatts || 300;
    const baseOverhead = 100; // Motherboard, fans, RAM, SSD, AIO pump
    return cpuTdp + gpuTdp + baseOverhead;
  }, [selectedCpu, selectedGpu]);

  const psuWattage = selectedPsu?.compatibility?.wattageOutput || 0;
  const wattageHeadroom = psuWattage - estimatedSystemWattage;

  // Real-time Compatibility Matrix
  const compatibilityIssues = useMemo(() => {
    const issues: { type: 'error' | 'warning'; message: string }[] = [];

    // 1. Socket check
    if (selectedCpu && selectedMb) {
      const cpuSocket = selectedCpu.compatibility?.socket;
      const mbSocket = selectedMb.compatibility?.socket;
      if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
        issues.push({
          type: 'error',
          message: `Incompatible Socket: Processor uses Socket ${cpuSocket}, but Motherboard uses ${mbSocket}. These physical interfaces do not match.`,
        });
      }
    }

    // 2. Power Supply Check
    if (selectedPsu && psuWattage > 0) {
      if (wattageHeadroom < 0) {
        issues.push({
          type: 'error',
          message: `Critical Power Deficit: Selected power supply (${psuWattage}W) cannot supply the required load (~${estimatedSystemWattage}W peak). System will shut down under full graphics load.`,
        });
      } else if (wattageHeadroom < 100) {
        issues.push({
          type: 'warning',
          message: `Tight Power Margin: Selected PSU leaves only ${wattageHeadroom}W headroom. An 850W+ or 1000W PSU is recommended for transient spikes.`,
        });
      }
    }

    // 3. Form factor check (e.g. Mini ITX case with ATX motherboard)
    if (selectedCase && selectedMb) {
      const mbForm = selectedMb.compatibility?.formFactor;
      const caseForm = selectedCase.compatibility?.formFactor;
      if (caseForm === 'Mini-ITX' && mbForm === 'ATX') {
        issues.push({
          type: 'error',
          message: `Chassis Size Mismatch: ATX Motherboard will not physically fit inside Mini-ITX small-form-factor chassis.`,
        });
      }
    }

    return issues;
  }, [selectedCpu, selectedMb, selectedPsu, psuWattage, wattageHeadroom, estimatedSystemWattage, selectedCase]);

  const isFullyCompatible = compatibilityIssues.filter((i) => i.type === 'error').length === 0;

  // Real-time Estimated Gaming Benchmarks
  const estimatedFps = useMemo(() => {
    let cp77 = 45;
    let wukong = 55;
    let valo = 300;

    if (selectedGpu?.id === 'gpu-rtx-5090') {
      cp77 = 138;
      wukong = 144;
      valo = 750;
    } else if (selectedGpu?.id === 'gpu-rtx-5080') {
      cp77 = 110;
      wukong = 125;
      valo = 680;
    } else if (selectedGpu?.id === 'gpu-rtx-4070ti-super') {
      cp77 = 85;
      wukong = 95;
      valo = 560;
    }

    if (selectedCpu?.id === 'cpu-7800x3d') {
      valo += 80;
    } else if (selectedCpu?.id === 'cpu-ultra-285k') {
      cp77 += 5;
    }

    return { cp77, wukong, valo };
  }, [selectedGpu, selectedCpu]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    const customBuild: CustomPCBuild = {
      cpu: selectedCpu,
      cooler: selectedCooler,
      motherboard: selectedMb,
      ram: selectedRam,
      gpu: selectedGpu,
      storage: selectedStorage,
      case: selectedCase,
      psu: selectedPsu,
      rgbColor: rgbColor,
      assemblyOption: assemblyOption,
    };
    onAddBuildToCart(customBuild, assemblyOption);
  };

  const handleShareBuild = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Presets */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RIG ARCHITECT ENGINE · HARDWARE INTERLOCK VERIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Enthusiast Custom PC Builder
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Configure custom hardware with live electrical wattage calculation and physical socket validation.
          </p>
        </div>

        {/* Quick Pro Templates */}
        <div className="space-y-1.5">
          <div className="text-xs text-slate-400 font-mono">LOAD BENCHMARK TEMPLATES:</div>
          <div className="flex flex-wrap gap-2">
            {PRECONFIGURED_BUILDS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => loadPreset(preset)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: preset.rgbColor }}
                />
                <span>{preset.name.split(' ')[1]}</span>
                <span className="font-mono text-cyan-400 text-[11px] font-semibold">
                  {preset.targetPrice}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Builder Grid: Left Slots, Right Live Chassis Simulation & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: Component Slots (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Compatibility Banner */}
          {compatibilityIssues.length > 0 ? (
            <div className="space-y-2">
              {compatibilityIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                    issue.type === 'error'
                      ? 'bg-red-950/40 border-red-500/40 text-red-200'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <AlertTriangle
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      issue.type === 'error' ? 'text-red-400' : 'text-amber-400'
                    }`}
                  />
                  <div>
                    <span className="font-semibold block">
                      {issue.type === 'error' ? 'Compatibility Alert' : 'System Warning'}
                    </span>
                    <span>{issue.message}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">
                  Hardware Compatibility Verified: Sockets match, dimensions clear, power headroom certified.
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-emerald-400">
                PASSED
              </span>
            </div>
          )}

          {/* Slots List */}
          <div className="space-y-3">
            {SLOTS.map((slot) => {
              const Icon = slot.icon;
              const hasSelection = !!slot.current;

              return (
                <div
                  key={slot.key}
                  className={`p-4 rounded-xl border transition-all ${
                    hasSelection
                      ? 'bg-[#0b101c] border-slate-800 hover:border-slate-700'
                      : 'bg-slate-900/30 border-dashed border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left Icon & Slot Label */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                          {slot.title}
                        </span>
                        {hasSelection ? (
                          <div className="text-sm font-semibold text-white truncate">
                            {slot.current?.name}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500 italic">
                            No component selected
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Price & Slot Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      {hasSelection && (
                        <div className="text-right">
                          <span className="font-mono text-sm font-bold text-white tabular-nums block">
                            ${slot.current?.price.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {slot.current?.brand}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActiveSlotModal(slot.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            hasSelection
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                              : 'bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30'
                          }`}
                        >
                          {hasSelection ? 'Change' : 'Choose Part'}
                        </button>

                        {hasSelection && (
                          <button
                            onClick={() => slot.set(undefined)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 transition-colors"
                            title="Remove component"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick specs pill row if selected */}
                  {hasSelection && slot.current?.specs && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                      {slot.current.specs.slice(0, 3).map((spec, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                          <span className="text-slate-500">{spec.label}:</span>
                          <span className="text-slate-300 font-medium">
                            {spec.value.split('(')[0]}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live Chassis Preview, Wattage, Benchmarks, Cart (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Visual Chassis Showcase */}
          <div className="rounded-2xl bg-[#090e18] border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold block">
                  LIVE CHASSIS SIMULATION
                </span>
                <span className="text-sm font-bold text-white">
                  {selectedCase?.name || 'Dual-Chamber Panoramic'}
                </span>
              </div>

              {/* Lighting Theme Picker */}
              <div className="flex items-center gap-1.5">
                {RGB_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setRgbColor(p.color)}
                    className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                      rgbColor === p.color ? 'scale-125 ring-2 ring-white/60' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: p.color }}
                    title={p.name}
                  />
                ))}
              </div>
            </div>

            {/* Stylized Visual PC Glass Enclosure */}
            <div
              className="relative aspect-[4/3] rounded-xl bg-gradient-to-b from-[#0b101c] to-[#06080e] border border-slate-700/60 p-4 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500"
              style={{
                boxShadow: `0 0 35px -5px ${rgbColor}25`,
              }}
            >
              {/* Internal Ambient Lighting Glow */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-700 blur-2xl"
                style={{
                  background: `radial-gradient(circle at 60% 40%, ${rgbColor}, transparent 70%)`,
                }}
              />

              {/* Top Fan Grille with Animated Lighting */}
              <div className="flex items-center justify-around border-b border-slate-800/80 pb-2">
                {[0, 1, 2].map((fan) => (
                  <div
                    key={fan}
                    className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center relative"
                    style={{ borderColor: `${rgbColor}40` }}
                  >
                    <RotateCw
                      className="w-7 h-7 text-slate-600 animate-spin"
                      style={{
                        animationDuration: '3s',
                        color: rgbColor,
                        filter: `drop-shadow(0 0 4px ${rgbColor})`,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Center Mainboard, AIO Liquid Pump & GPU */}
              <div className="my-auto grid grid-cols-12 gap-3 items-center relative z-10">
                {/* Left: Motherboard VRM & CPU Pump */}
                <div className="col-span-5 bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg text-center space-y-1">
                  <div
                    className="w-10 h-10 mx-auto rounded-full border-2 flex items-center justify-center font-mono text-[9px] font-bold text-white shadow-md"
                    style={{ borderColor: rgbColor }}
                  >
                    32°C
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block truncate">
                    {selectedCooler?.brand || 'AIO PUMP'}
                  </span>
                </div>

                {/* Right: RAM Sticks Glowing */}
                <div className="col-span-7 flex justify-end gap-1.5 pr-2">
                  <div
                    className="w-2.5 h-16 rounded-sm shadow-sm animate-pulse"
                    style={{ backgroundColor: rgbColor }}
                  />
                  <div
                    className="w-2.5 h-16 rounded-sm shadow-sm animate-pulse"
                    style={{ backgroundColor: rgbColor, animationDelay: '150ms' }}
                  />
                </div>

                {/* Bottom: GPU Shroud Mounted */}
                <div className="col-span-12 mt-2 bg-slate-950/90 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: rgbColor }}
                    />
                    <span className="text-xs font-mono font-bold text-white truncate max-w-[170px]">
                      {selectedGpu?.name || 'Discrete Graphics'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                    PCIe 5.0 x16
                  </span>
                </div>
              </div>

              {/* Bottom Power Supply Chamber */}
              <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>PSU: {selectedPsu?.name?.split(' ')[0] || '1000W ATX 3.0'}</span>
                <span className="text-emerald-400">FANS: 1,150 RPM</span>
              </div>
            </div>

            {/* Live Electrical Wattage Bar */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Estimated Power Draw
                </span>
                <span className="font-mono text-white font-bold tabular-nums">
                  ~{estimatedSystemWattage}W / {psuWattage ? `${psuWattage}W PSU` : 'Select PSU'}
                </span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-500 ${
                    wattageHeadroom < 0
                      ? 'bg-red-500'
                      : wattageHeadroom < 150
                      ? 'bg-amber-400'
                      : 'bg-cyan-400'
                  }`}
                  style={{
                    width: psuWattage ? `${Math.min(100, (estimatedSystemWattage / psuWattage) * 100)}%` : '50%',
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Peak Load: ~{estimatedSystemWattage}W</span>
                <span
                  className={
                    wattageHeadroom < 0
                      ? 'text-red-400 font-semibold'
                      : wattageHeadroom < 150
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }
                >
                  {psuWattage
                    ? wattageHeadroom >= 0
                      ? `+${wattageHeadroom}W Safe Headroom`
                      : `${Math.abs(wattageHeadroom)}W Deficit!`
                    : 'Select Power Supply'}
                </span>
              </div>
            </div>

            {/* Estimated Gaming Performance Box */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                SIMULATED GAMING FRAME-RATES
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 truncate">Cyberpunk 4K RT</div>
                  <div className="font-mono text-base font-bold text-cyan-400 tabular-nums">
                    {estimatedFps.cp77} FPS
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 truncate">Wukong 1440p</div>
                  <div className="font-mono text-base font-bold text-sky-400 tabular-nums">
                    {estimatedFps.wukong} FPS
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 truncate">Valorant 1080p</div>
                  <div className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                    {estimatedFps.valo} FPS
                  </div>
                </div>
              </div>
            </div>

            {/* Assembly Option Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-300 font-medium block">
                Assembly &amp; Burn-in Validation
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAssemblyOption('bench_tested')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                    assemblyOption === 'bench_tested'
                      ? 'bg-cyan-950/40 border-cyan-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-slate-100 flex items-center justify-between">
                    <span>White-Glove Test</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {partsSubtotal > 2000 ? 'FREE' : '$99'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-snug">
                    48h Prime95 &amp; FurMark stress test + custom cabling
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAssemblyOption('diy')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                    assemblyOption === 'diy'
                      ? 'bg-cyan-950/40 border-cyan-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-slate-100 flex items-center justify-between">
                    <span>DIY Assembly Kit</span>
                    <span className="font-mono text-emerald-400 font-bold">$0</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-snug">
                    Original sealed boxes + magnetic toolkit &amp; paste
                  </div>
                </button>
              </div>
            </div>

            {/* Pricing Summary & Checkout Actions */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Configuration</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Includes 3-Year Hardware Warranty
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-2xl font-extrabold text-white tabular-nums">
                    ${grandTotal.toLocaleString()}
                  </div>
                  {assemblyPrice > 0 && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      +${assemblyPrice} assembly
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!isFullyCompatible}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFullyCompatible
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {isFullyCompatible ? 'Add Configured Rig to Cart' : 'Resolve Issues to Order'}
                  </span>
                </button>

                <button
                  onClick={handleShareBuild}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                  title="Share or Copy Configuration"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {showShareToast && (
                <div className="p-2 bg-cyan-950/80 border border-cyan-500 text-cyan-300 text-xs text-center rounded-lg font-mono">
                  Build configuration link copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Component Picker Modal */}
      {activeSlotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b101c] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white capitalize">
                  Select {activeSlotModal}
                </h3>
                <p className="text-xs text-slate-400">
                  Choose an enthusiast component matching your socket and power target
                </p>
              </div>
              <button
                onClick={() => setActiveSlotModal(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Items List */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {PRODUCTS.filter(
                (p) => p.category === SLOTS.find((s) => s.key === activeSlotModal)?.category
              ).map((product) => {
                const currentSlot = SLOTS.find((s) => s.key === activeSlotModal);
                const isSelected = currentSlot?.current?.id === product.id;

                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      currentSlot?.set(product);
                      setActiveSlotModal(null);
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/30 border-cyan-500 ring-1 ring-cyan-500/50'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg bg-slate-950 shrink-0 border border-slate-800"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-mono text-cyan-400 uppercase">
                          {product.brand}
                        </div>
                        <div className="text-sm font-semibold text-white truncate">
                          {product.name}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {product.shortDesc}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-base font-bold text-white tabular-nums">
                        ${product.price.toLocaleString()}
                      </div>
                      <button
                        className={`mt-1 px-3 py-1 rounded text-xs font-semibold ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
