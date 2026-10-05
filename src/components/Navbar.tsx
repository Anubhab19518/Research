"use client";

import React from "react";
import { Network, Database, ArrowRight, FileText } from "lucide-react";

interface NavbarProps {
  onRunDemo?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onRunDemo, activeSection = "overview" }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* LEFT: Logo & Project Title */}
          <a href="#overview" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-xs">
              <Network className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-sm">PI-GNN</span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  (ACMP)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Physics-Informed Fraud Detection
              </p>
            </div>
          </a>

          {/* CENTER: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
            <a
              href="#overview"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === "overview"
                  ? "text-emerald-800 bg-emerald-50"
                  : "hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Overview
            </a>
            <a
              href="#dataset"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === "dataset"
                  ? "text-emerald-800 bg-emerald-50"
                  : "hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Dataset
            </a>
            <a
              href="#graph"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === "graph"
                  ? "text-emerald-800 bg-emerald-50"
                  : "hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Graph
            </a>
            <a
              href="#pipeline"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === "pipeline"
                  ? "text-emerald-800 bg-emerald-50"
                  : "hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Pipeline
            </a>
            <a
              href="#transactions"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === "transactions"
                  ? "text-emerald-800 bg-emerald-50 font-bold"
                  : "hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Transactions
            </a>
            <a
              href="#model"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === "model"
                  ? "text-emerald-800 bg-emerald-50"
                  : "hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Model
            </a>
            <a
              href="#evaluation"
              className={`px-2.5 py-1.5 rounded-md transition-colors ${
                activeSection === "evaluation"
                  ? "text-emerald-800 bg-emerald-50"
                  : "hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Evaluation
            </a>
          </nav>

          {/* RIGHT: Badges & Run Demo Action */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
              <FileText className="w-3 h-3 text-slate-500" />
              Research Demo
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
              <Database className="w-3 h-3 text-slate-500" />
              IEEE-CIS Dataset
            </span>

            <a
              href="#transactions"
              onClick={onRunDemo}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 shadow-xs transition-colors cursor-pointer"
            >
              <span>Run Demo</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
