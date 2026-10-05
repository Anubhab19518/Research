"use client";

import React, { useState } from "react";
import { ARCHITECTURE_LAYERS } from "@/data/pignnData";
import { ArrowDown } from "lucide-react";

export const ModelArchitecture: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(2); // Default to ACMP Layer 1

  return (
    <section id="model" className="py-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Neural Architecture
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs text-slate-500 font-medium">Deep PI-GNN Layer Topology</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          PI-GNN Architecture
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1 leading-relaxed">
          ACMP introduces physics-inspired interaction dynamics into graph message passing, allowing information to propagate across related transaction entities.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Layer Flow (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Layer Stack Progression
            </span>
            <span className="text-xs font-mono text-slate-400">8 Computational Stages</span>
          </div>

          <div className="space-y-1.5">
            {ARCHITECTURE_LAYERS.map((layer, idx) => {
              const isSelected = selectedLayer === idx;
              const isAcmp = layer.name.includes("ACMP");
              const isClassifier = layer.name.includes("Classifier") || layer.name.includes("Probability");

              return (
                <React.Fragment key={idx}>
                  <div
                    onClick={() => setSelectedLayer(idx)}
                    className={`p-3 rounded-xl border transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? isAcmp
                          ? "bg-emerald-50 border-emerald-300 shadow-xs"
                          : "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-slate-50/70 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[11px] font-bold ${
                          isSelected
                            ? isAcmp
                              ? "bg-emerald-700 text-white"
                              : "bg-slate-700 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div
                          className={`text-xs font-bold ${
                            isSelected && !isAcmp ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {layer.name}
                        </div>
                        <div
                          className={`text-[10px] font-mono ${
                            isSelected && !isAcmp ? "text-slate-300" : "text-slate-500"
                          }`}
                        >
                          {layer.dim}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        isAcmp
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : isClassifier
                          ? "bg-rose-50 text-rose-800 border border-rose-200"
                          : isSelected
                          ? "bg-slate-800 text-slate-200"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {layer.type}
                    </span>
                  </div>

                  {idx < ARCHITECTURE_LAYERS.length - 1 && (
                    <div className="flex justify-center text-slate-300">
                      <ArrowDown className="w-3 h-3" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Layer Inspection & Physics Rationale (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Layer Specification
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Stage {selectedLayer + 1} / 8
                </span>
              </div>

              <div className="mb-3">
                <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                  {ARCHITECTURE_LAYERS[selectedLayer].name}
                </h4>
                <div className="text-xs font-mono text-slate-500">
                  {ARCHITECTURE_LAYERS[selectedLayer].dim}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {ARCHITECTURE_LAYERS[selectedLayer].description}
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 space-y-1 font-mono">
                <div className="text-slate-500 font-sans text-[10px] font-bold uppercase">
                  Computational Role
                </div>
                <div>Category: {ARCHITECTURE_LAYERS[selectedLayer].type}</div>
                <div>Residual Connection: h^(l+1) = h^(l) + Δt·ACMP(h^(l))</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Click any stage in the architecture stack to review implementation parameters.
            </div>
          </div>

          {/* Physics Rationale Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                Physics-Informed Principle
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              &quot;ACMP introduces physics-inspired interaction dynamics into graph message passing, allowing information to propagate across related transaction entities.&quot;
            </p>
            <div className="mt-3 pt-2.5 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-emerald-900 font-mono">
              <span>Allen-Cahn PDE Diffusion</span>
              <span>ε = 0.05, d = 1.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
