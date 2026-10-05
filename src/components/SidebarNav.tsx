"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Layers,
  Network,
  Cpu,
  BarChart3,
  Search,
  FileCheck2,
  ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "dataset", label: "Dataset", icon: Layers },
  { id: "graph", label: "Graph Analysis", icon: Network },
  { id: "pipeline", label: "Pipeline", icon: Cpu },
  { id: "transactions", label: "Transactions", icon: Search },
  { id: "model", label: "Model", icon: Layers },
  { id: "evaluation", label: "Evaluation", icon: BarChart3 },
  { id: "summary", label: "Summary", icon: FileCheck2 }
];

export const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden lg:block w-52 shrink-0">
      <div className="sticky top-20 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-1">
        {/* Header */}
        <div className="px-2.5 pt-1 pb-2 border-b border-slate-100 mb-1">
          <div className="text-[11px] font-bold text-slate-900 tracking-tight flex items-center justify-between">
            <span>PI-GNN (ACMP)</span>
            <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
              DEMO
            </span>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
            Navigation
          </div>
        </div>

        {/* Links */}
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                  isActive
                    ? "bg-emerald-50 text-emerald-900 font-bold border border-emerald-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3 h-3 text-emerald-700 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Footer Status */}
        <div className="pt-2.5 mt-2 border-t border-slate-100 px-2.5">
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Demo Ready</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
