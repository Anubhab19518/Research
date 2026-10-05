"use client";

import React from "react";
import { RESEARCH_SUMMARY } from "@/data/pignnData";
import { ShieldCheck } from "lucide-react";

export const ResearchSummary: React.FC = () => {
  return (
    <section id="summary" className="py-6 pb-12">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Project Overview
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs text-slate-500 font-medium">Research Paper Benchmark</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Research Summary
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1 leading-relaxed">
          Synthesis of empirical results, core physics mechanisms, and hardware execution profile.
        </p>
      </div>

      {/* Bento Grid: Specifications Table (8 Cols) + Video Demo Guide (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Specification Table Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Core Specifications
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Paper-Reported Results
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Dataset</span>
                <span className="font-bold text-slate-900">{RESEARCH_SUMMARY.dataset}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Approach</span>
                <span className="font-bold text-slate-900">{RESEARCH_SUMMARY.approach}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Model</span>
                <span className="font-bold text-emerald-800">{RESEARCH_SUMMARY.model}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Physics Mechanism</span>
                <span className="font-bold text-teal-800">{RESEARCH_SUMMARY.physicsMechanism}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Task</span>
                <span className="font-bold text-slate-900">{RESEARCH_SUMMARY.task}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Hardware</span>
                <span className="font-mono font-bold text-slate-900">{RESEARCH_SUMMARY.hardware}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-emerald-50/60 px-3 -mx-3 rounded-lg">
                <span className="font-semibold text-emerald-900">Paper-Reported ROC-AUC</span>
                <span className="font-mono font-extrabold text-emerald-800 text-base">
                  {RESEARCH_SUMMARY.paperReportedRocAuc}
                </span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-teal-50/60 px-3 -mx-3 rounded-lg">
                <span className="font-semibold text-teal-900">Paper-Reported PR-AUC</span>
                <span className="font-mono font-extrabold text-teal-800 text-base">
                  {RESEARCH_SUMMARY.paperReportedPrAuc}
                </span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Paper-Reported Precision</span>
                <span className="font-mono font-bold text-slate-800">{RESEARCH_SUMMARY.paperReportedPrecision}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Paper-Reported Recall</span>
                <span className="font-mono font-bold text-slate-800">{RESEARCH_SUMMARY.paperReportedRecall}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Paper-Reported F1</span>
                <span className="font-mono font-bold text-slate-800">{RESEARCH_SUMMARY.paperReportedF1}</span>
              </div>

              <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-semibold text-slate-500">Paper-Reported Accuracy</span>
                <span className="font-mono font-bold text-slate-800">{RESEARCH_SUMMARY.paperReportedAccuracy}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Graph Dynamics: Reaction-Diffusion Message Passing</span>
            <span className="font-mono">PI-GNN Framework</span>
          </div>
        </div>

        {/* Video Presentation Flow Helper Card */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Demo Recording Guide
              </span>
            </div>

            <h4 className="text-base font-bold tracking-tight mb-2">
              Presentation Script Flow
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Suggested sequence for your 2–3 minute video presentation:
            </p>

            <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside font-medium">
              <li>
                <span className="text-white">Hero:</span> Introduce problem &amp; PI-GNN (ACMP)
              </li>
              <li>
                <span className="text-white">Dataset:</span> 590K records &amp; 3.5% imbalance
              </li>
              <li>
                <span className="text-white">Graph:</span> Click <span className="text-rose-400 font-mono">TXN-104928</span> &amp; <span className="text-emerald-400 font-mono">TXN-204817</span>
              </li>
              <li>
                <span className="text-white">Pipeline:</span> Highlight ACMP message passing
              </li>
              <li>
                <span className="text-white">Live Demo:</span> Click &quot;Analyze Transaction&quot;
              </li>
              <li>
                <span className="text-white">Evaluation:</span> Conclude with paper metrics (ROC-AUC {RESEARCH_SUMMARY.paperReportedRocAuc}, PR-AUC {RESEARCH_SUMMARY.paperReportedPrAuc})
              </li>
            </ol>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Video Target: 2–3 Mins</span>
            <span className="text-emerald-400 font-semibold">Frontend Demo</span>
          </div>
        </div>
      </div>
    </section>
  );
};
