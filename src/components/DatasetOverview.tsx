"use client";

import React from "react";
import { DATASET_STATS } from "@/data/pignnData";
import { Layers, Sliders, AlertCircle, Share2 } from "lucide-react";

export const DatasetOverview: React.FC = () => {
  const getIcon = (label: string) => {
    switch (label) {
      case "Transactions":
        return <Layers className="w-4 h-4 text-emerald-800" />;
      case "Features":
        return <Sliders className="w-4 h-4 text-indigo-800" />;
      case "Fraud Rate":
        return <AlertCircle className="w-4 h-4 text-amber-800" />;
      case "Graph Model":
        return <Share2 className="w-4 h-4 text-teal-800" />;
      default:
        return <Layers className="w-4 h-4 text-slate-800" />;
    }
  };

  const getAccentBg = (label: string) => {
    switch (label) {
      case "Transactions":
        return "bg-emerald-50 border-emerald-200";
      case "Features":
        return "bg-indigo-50 border-indigo-200";
      case "Fraud Rate":
        return "bg-amber-50 border-amber-200";
      case "Graph Model":
        return "bg-teal-50 border-teal-200";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

  return (
    <section id="dataset" className="py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Benchmark Dataset
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Dataset Overview
          </h3>
        </div>
        <span className="hidden sm:inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
          Vesta / IEEE-CIS Financial Corpus
        </span>
      </div>

      {/* Bento Grid: 4 Equal Height Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DATASET_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${getAccentBg(stat.label)} border flex items-center justify-center`}>
                  {getIcon(stat.label)}
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                  {stat.badge}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                {stat.value}
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3 mt-1">
              {stat.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
