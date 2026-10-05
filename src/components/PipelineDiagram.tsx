"use client";

import React, { useState } from "react";
import { PIPELINE_STAGES } from "@/data/pignnData";
import { ChevronRight } from "lucide-react";

export const PipelineDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(4); // Default to ACMP Message Passing

  return (
    <section id="pipeline" className="py-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            System Workflow
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs text-slate-500 font-medium">End-to-End Computational Flow</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          PI-GNN Architecture Pipeline
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1 leading-relaxed">
          The transaction graph is processed through our Physics-Informed GNN using Allen-Cahn message passing to propagate relational features while resisting oversmoothing.
        </p>
      </div>

      {/* Horizontal Pipeline Bento Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        {/* Equal Width 6-Stage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isHighlighted = activeStage === idx;
            const isCore = stage.title === "PI-GNN" || stage.title === "ACMP Message Passing";

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveStage(idx)}
                className={`relative rounded-xl p-3.5 transition-colors cursor-pointer flex flex-col justify-between border ${
                  isHighlighted
                    ? isCore
                      ? "bg-emerald-50 border-emerald-300 shadow-xs"
                      : "bg-slate-50 border-slate-300 shadow-xs"
                    : "bg-slate-50/60 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {/* Arrow connector for desktop */}
                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="w-4 h-4 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      STAGE {stage.step}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        isCore
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {stage.tag}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mb-0.5 leading-snug">
                    {stage.title}
                  </h4>

                  <div className="text-[10px] font-medium text-slate-500 mb-2">
                    {stage.subtitle}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 leading-snug">
                  {stage.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Banner */}
        {activeStage !== null && (
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {PIPELINE_STAGES[activeStage].step}
              </span>
              <div>
                <span className="font-bold text-slate-900">
                  {PIPELINE_STAGES[activeStage].title}:
                </span>{" "}
                <span className="text-slate-600">
                  {PIPELINE_STAGES[activeStage].title === "PI-GNN"
                    ? "Physics-Informed Graph Neural Network"
                    : PIPELINE_STAGES[activeStage].title === "ACMP Message Passing"
                    ? "Allen-Cahn Message Passing (ACMP)"
                    : PIPELINE_STAGES[activeStage].title === "Fraud Probability"
                    ? "Calibrated Fraud Probability Output"
                    : PIPELINE_STAGES[activeStage].description}
                </span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-slate-400 shrink-0">
              Hover to view stage details
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
