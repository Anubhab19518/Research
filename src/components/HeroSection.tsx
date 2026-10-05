"use client";

import React from "react";
import { ArrowRight, Play, Database } from "lucide-react";

interface HeroSectionProps {
  onRunDemo?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRunDemo }) => {
  const scrollToTransactions = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("transactions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    if (onRunDemo) {
      onRunDemo();
    }
  };

  const scrollToGraph = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("graph");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="overview" className="pt-2 pb-6">
      {/* Unified Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Hero Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                <Database className="w-3 h-3 text-slate-600" />
                IEEE-CIS Fraud Detection
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                PI-GNN (ACMP)
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                Allen-Cahn Message Passing
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-1.5 mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                AI-Powered Financial Fraud Detection
              </h1>
              <h2 className="text-lg sm:text-xl font-bold text-emerald-800 tracking-tight">
                Physics-Informed Graph Neural Network
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Detecting suspicious financial transactions by modeling transaction relationships as a graph and incorporating Allen-Cahn-inspired message passing into a Physics-Informed Graph Neural Network.
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-slate-100">
            <a
              href="#transactions"
              onClick={scrollToTransactions}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 shadow-xs transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#graph"
              onClick={scrollToGraph}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <span>Explore Graph</span>
            </a>

            <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Trained &amp; Evaluated on NVIDIA Tesla T4</span>
            </div>
          </div>
        </div>

        {/* Physics-Informed Key Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Physics Formulation
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ACMP PDE
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs text-slate-800 mb-3 space-y-1.5">
              <div className="text-slate-500 text-[10px] font-sans">Allen-Cahn Reaction-Diffusion PDE:</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 overflow-x-auto py-0.5">
                ∂u/∂t = d · Δu − f&apos;(u)
              </div>
              <div className="text-slate-500 text-[10px] font-sans">
                Potential: f(u) = ¼(u² − 1)² (Double-well)
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Standard GNNs suffer from oversmoothing in dense transaction topologies. The Allen-Cahn phase-field potential preserves sharp boundaries between normal transaction communities and fraudulent rings.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-[10px] text-slate-500">Oversmoothing</div>
              <div className="font-bold text-emerald-800">Suppressed</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-[10px] text-slate-500">Phase Separation</div>
              <div className="font-bold text-slate-900">Bistable Energy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
