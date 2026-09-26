import React from 'react';
import { Cpu, ShieldCheck, Truck, Headphones, Wrench, ExternalLink } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigateTab }) => {
  return (
    <footer className="bg-[#05070c] border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Trust Bar */}
      <div className="border-b border-slate-800/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="font-semibold text-white">3-Year Direct Warranty</div>
              <div className="text-[11px] text-slate-500">Comprehensive hardware parts &amp; labor</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="font-semibold text-white">48h Stress Burn-In</div>
              <div className="text-[11px] text-slate-500">Prime95 &amp; FurMark thermal stress test</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="font-semibold text-white">Insured Foam Packaging</div>
              <div className="text-[11px] text-slate-500">Expanding foam interior support</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="font-semibold text-white">Direct Engineer Support</div>
              <div className="text-[11px] text-slate-500">Lifetime technical assistance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#090d16] rounded-[6px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider text-white">
              VALENCE COMPUTERS
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Architects of high-performance custom computers, liquid cooling loops, and professional workstation hardware. Every system is hand-tested in Seattle, Washington.
          </p>

          <div className="text-[11px] text-slate-500 font-mono">
            ESD-SAFE ISO 9001:2026 ASSEMBLY FACILITY
          </div>
        </div>

        {/* Store Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            HARDWARE STORE
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onSelectCategory('cpu')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Desktop Processors (AM5 &amp; LGA1851)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('gpu')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                GeForce RTX 5090 &amp; 5080 Series
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('storage')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                PCIe Gen5 NVMe Solid State Drives
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('cooling')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                360mm AIO Liquid Coolers
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('monitors')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                QD-OLED 240Hz Displays
              </button>
            </li>
          </ul>
        </div>

        {/* Systems & Builder */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            SYSTEMS &amp; LABS
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigateTab('builder')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Custom Rig Architect
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('prebuilts')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Valence Sovereign Flagships
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('laptops')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Dual-Mode Mini-LED Laptops
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('diagnostics')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Bottleneck &amp; Synergy Tool
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('tracker')}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Live Bench Telemetry Tracker
              </button>
            </li>
            <li>
              <a
                href="https://www.amazon.in/Zebronics-Keyboard-Multimedia-Ergonomic-Multicolor/dp/B0GFVBSB2C?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=AJ6SIZC8YQDZX&th=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                title="Zebronics Keyboard Project"
              >
                <span>Zebronics Ergonomic Keyboard Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </div>

        {/* Support & Warranty */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            SUPPORT &amp; POLICIES
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>Zero Dead-Pixel Guarantee</li>
            <li>Advance RMA Replacement</li>
            <li>White-Glove Burn-in Standard</li>
            <li>FedEx Priority Signature</li>
            <li>Technical Service Hotline</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800/60 py-6 text-center text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} VALENCE COMPUTING LABS INC. All rights reserved.</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Terms of Assembly</span>
            <span>·</span>
            <span>Privacy Standard</span>
            <span>·</span>
            <span>Hardware Warranty Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
