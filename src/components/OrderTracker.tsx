import React, { useState } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Cpu,
  Flame,
  FileText,
  Package,
  Wrench,
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerProps {
  orders: Order[];
  initialOrderId?: string;
  onExploreStore: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  orders,
  initialOrderId = '',
  onExploreStore,
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId || (orders[0]?.id ?? 'VAL-84920'));

  // Demo fallback order if user has not placed one yet
  const demoOrder: Order = {
    id: 'VAL-84920',
    date: '2026-09-24',
    items: [],
    subtotal: 4299,
    discount: 0,
    assemblyFee: 0,
    shippingFee: 0,
    tax: 343,
    total: 4642,
    customer: {
      fullName: 'Dmitri V.',
      email: 'dmitri.v@valence-labs.io',
      phone: '+1 (555) 890-1234',
      address: '400 Pine Street, Suite 900',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'United States',
    },
    paymentMethod: 'credit_card',
    status: 'bench_testing',
    trackingNumber: 'FX-8491-0392-US',
    estimatedDelivery: '2026-09-28',
  };

  const currentOrder = orders.find(
    (o) => o.id.toLowerCase() === searchInput.trim().toLowerCase()
  ) || demoOrder;

  const STAGES = [
    {
      id: 'processing',
      title: 'Order Authorized & Cleared',
      desc: 'Payment captured and security fraud analysis cleared.',
      date: 'Sep 24, 09:14 AM',
      done: true,
    },
    {
      id: 'hardware_allocated',
      title: 'Component Allocation & Serial Scan',
      desc: 'Physical components hand-picked from ESD-safe storage. Barcode serials recorded in warranty database.',
      date: 'Sep 24, 11:30 AM',
      done: true,
    },
    {
      id: 'bench_testing',
      title: 'White-Glove Assembly & 48h Thermal Stress',
      desc: 'Liquid loop routed, custom cable combs aligned. Running 48-hour continuous Prime95 + FurMark burn-in testing.',
      date: 'Sep 25, 08:00 AM (In Progress)',
      done: currentOrder.status === 'bench_testing' || currentOrder.status === 'packaged' || currentOrder.status === 'dispatched',
      current: currentOrder.status === 'bench_testing',
    },
    {
      id: 'packaged',
      title: 'Precision Foam Mold Suspension',
      desc: 'Instapak custom expanding foam cradles internal graphics card and chassis. ShockWatch sensor affixed.',
      date: 'Pending Burn-in Pass',
      done: currentOrder.status === 'packaged' || currentOrder.status === 'dispatched',
    },
    {
      id: 'dispatched',
      title: 'Dispatched via FedEx Custom Critical Air',
      desc: 'Priority air courier handover with active signature requirement.',
      date: 'Est. Sep 28',
      done: currentOrder.status === 'dispatched',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Header */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            VALENCE ORDER TELEMETRY
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Real-Time Rig Assembly &amp; Transit Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track real-time bench burn-in telemetry, technician logs, and courier dispatch.
          </p>
        </div>

        <div className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. VAL-84920)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-lg pl-9 pr-3 py-2.5 font-mono focus:outline-none focus:border-cyan-500 uppercase"
            />
          </div>
          <button
            onClick={() => {}}
            className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Track
          </button>
        </div>
      </div>

      {/* Order Info & Bench Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: 5-Stage Timeline (7 Cols) */}
        <div className="md:col-span-7 bg-[#0b101c] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-mono text-slate-500">ORDER IDENTIFIER</span>
              <div className="text-lg font-mono font-bold text-white">
                {currentOrder.id}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-slate-500">FEDEX TRACKING</span>
              <div className="text-xs font-mono font-bold text-cyan-400">
                {currentOrder.trackingNumber}
              </div>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {STAGES.map((stage, idx) => (
              <div key={stage.id} className="relative flex items-start gap-4">
                {/* Status Dot */}
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                    stage.current
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 ring-4 ring-cyan-500/20 animate-pulse'
                      : stage.done
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {stage.done ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <h4
                      className={`font-semibold ${
                        stage.current
                          ? 'text-cyan-300 font-bold'
                          : stage.done
                          ? 'text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {stage.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {stage.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Bench Burn-in Telemetry Logs (5 Cols) */}
        <div className="md:col-span-5 space-y-6">
          {/* Bench Telemetry Panel */}
          <div className="bg-[#090e18] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-cyan-400" />
                BENCH BURN-IN TELEMETRY
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Prime95 Small FFTs (CPU):</span>
                  <span className="text-emerald-400 font-bold">67.4°C Peak</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[67%]" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>FurMark 4K 1-Hour (GPU VRAM):</span>
                  <span className="text-emerald-400 font-bold">63.8°C Peak</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[63%]" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>MemTest86 Full Passes:</span>
                  <span className="text-emerald-400 font-bold">4 / 4 (0 Errors)</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-full" />
                </div>
              </div>
            </div>

            {/* Engineer Notes */}
            <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
              <span className="text-slate-500 font-mono block text-[11px]">
                LEAD BENCH TECHNICIAN
              </span>
              <p className="text-slate-300 italic">
                "BIOS flashed to latest AGESA 1.2.0.2. Precision Boost Overdrive curve optimized at -25 all-core. Delta temperatures are exceptional."
              </p>
              <div className="text-[11px] font-mono text-cyan-400 mt-1">
                — Senior Architect Alex K. (Valence Bench Lab #04)
              </div>
            </div>
          </div>

          {/* Shipping Manifest Card */}
          <div className="bg-[#0b101c] border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold block">
              DESTINATION CREDENTIALS
            </span>
            <div className="space-y-1 text-slate-300">
              <div className="font-semibold text-white">
                {currentOrder.customer.fullName}
              </div>
              <div>{currentOrder.customer.address}</div>
              <div>
                {currentOrder.customer.city}, {currentOrder.customer.state}{' '}
                {currentOrder.customer.zipCode}
              </div>
              <div className="text-slate-400">{currentOrder.customer.email}</div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-mono">Total Order Value:</span>
              <span className="text-white font-mono font-bold text-sm">
                ${currentOrder.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
