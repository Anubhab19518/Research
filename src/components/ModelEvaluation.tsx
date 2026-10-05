"use client";

import React, { useState } from "react";
import { MODEL_METRICS, MODEL_METRICS_LIST, ROC_CURVE_POINTS, PR_CURVE_POINTS } from "@/data/pignnData";

export const ModelEvaluation: React.FC = () => {
  const [activeChart, setActiveChart] = useState<"roc" | "pr">("roc");

  // Helper to convert normalized ROC points to SVG coordinates (width: 420, height: 250)
  // X: 50 to 380, Y: 215 down to 30
  const getRocPath = () => {
    const minX = 50;
    const maxX = 380;
    const minY = 30;
    const maxY = 215;

    const coords = ROC_CURVE_POINTS.map((pt) => ({
      x: minX + pt.fpr * (maxX - minX),
      y: maxY - pt.tpr * (maxY - minY)
    }));

    return coords.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, "");
  };

  const getPrPath = () => {
    const minX = 50;
    const maxX = 380;
    const minY = 30;
    const maxY = 215;

    const coords = PR_CURVE_POINTS.map((pt) => ({
      x: minX + pt.recall * (maxX - minX),
      y: maxY - pt.precision * (maxY - minY)
    }));

    return coords.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, "");
  };

  return (
    <section id="evaluation" className="py-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Empirical Results
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs text-slate-500 font-medium">IEEE-CIS Test Partition Benchmark</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Model Evaluation
          </h3>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {MODEL_METRICS.model}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1 leading-relaxed">
          Quantitative benchmarking on the IEEE-CIS fraud detection test partition, demonstrating superior discrimination on severe ~3.5% imbalanced fraud topologies.
        </p>
      </div>

      {/* SECTION 14: 6 Metric Cards with Paper-Reported Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-5">
        {MODEL_METRICS_LIST.map((metric, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-4 border transition-colors flex flex-col justify-between ${
              metric.highlight
                ? "bg-emerald-50/50 border-emerald-300 shadow-xs"
                : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {metric.key}
                </span>
                {metric.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                )}
              </div>
              <div
                className={`text-2xl font-black tracking-tight mb-1 ${
                  metric.highlight ? "text-emerald-800" : "text-slate-900"
                }`}
              >
                {metric.value}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
              {metric.desc}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 15 & 16: Classification Performance (5 Cols) + ROC/PR Visualizations (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* SECTION 15: Classification Performance & Diagnostics Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Quantitative Diagnostics
                </span>
                <h4 className="text-base font-bold text-slate-900 tracking-tight">
                  Classification Performance
                </h4>
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Paper Results
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Performance profile for proposed <strong>{MODEL_METRICS.model}</strong> across operational discrimination thresholds.
            </p>

            {/* Performance Indicators Grid */}
            <div className="space-y-2.5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-700">Fraud Recall</div>
                  <div className="text-[10px] text-slate-500">True fraud cases successfully flagged</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-800 font-mono">
                    {(MODEL_METRICS.recall * 100).toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-slate-500">Recall = {MODEL_METRICS.recall.toFixed(4)}</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-700">Precision</div>
                  <div className="text-[10px] text-slate-500">Positive prediction accuracy under 3.5% imbalance</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900 font-mono">
                    {(MODEL_METRICS.precision * 100).toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-slate-500">Precision = {MODEL_METRICS.precision.toFixed(4)}</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-700">Overall Accuracy</div>
                  <div className="text-[10px] text-slate-500">Correct classifications over entire test partition</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900 font-mono">
                    {(MODEL_METRICS.accuracy * 100).toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-slate-500">Accuracy = {MODEL_METRICS.accuracy.toFixed(4)}</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-700">Balanced F1 Score</div>
                  <div className="text-[10px] text-slate-500">Harmonic mean of precision and recall</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-800 font-mono">
                    {MODEL_METRICS.f1.toFixed(4)}
                  </div>
                  <div className="text-[10px] text-slate-500">F1 = {MODEL_METRICS.f1.toFixed(4)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Proposed Model: {MODEL_METRICS.model}</span>
            <span className="font-mono text-emerald-800 font-semibold">ROC-AUC: {MODEL_METRICS.rocAuc.toFixed(4)}</span>
          </div>
        </div>

        {/* SECTION 16: ROC & PR Curve Visualizations */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Performance Curves
                </span>
                <h4 className="text-base font-bold text-slate-900 tracking-tight">
                  {activeChart === "roc" ? "PI-GNN (ACMP) ROC Curve" : "PI-GNN (ACMP) Precision-Recall Curve"}
                </h4>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveChart("roc")}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeChart === "roc"
                      ? "bg-white text-emerald-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ROC Curve ({MODEL_METRICS.rocAuc.toFixed(4)})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChart("pr")}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeChart === "pr"
                      ? "bg-white text-emerald-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  PR Curve ({MODEL_METRICS.prAuc.toFixed(4)})
                </button>
              </div>
            </div>

            {/* Display AUC Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {activeChart === "roc"
                  ? `ROC-AUC = ${MODEL_METRICS.rocAuc.toFixed(4)}`
                  : `PR-AUC = ${MODEL_METRICS.prAuc.toFixed(4)}`}
              </span>
              <span className="text-xs text-slate-500">
                {activeChart === "roc"
                  ? "Demonstrates sharp phase separation across discrimination thresholds"
                  : "Preserves precision under severe ~3.5% imbalanced fraud prevalence"}
              </span>
            </div>

            {/* Static SVG Chart Visualization */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-hidden relative">
              <svg viewBox="0 0 420 250" className="w-full h-auto select-none">
                <defs>
                  <linearGradient id="rocAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#047857" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="prAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f766e" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0.25, 0.5, 0.75, 1.0].map((frac, i) => {
                  const y = 215 - frac * 185;
                  const x = 50 + frac * 330;
                  return (
                    <g key={i}>
                      <line x1="50" y1={y} x2="380" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <line x1={x} y1="30" x2={x} y2="215" stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="42" y={y + 3} textAnchor="end" className="text-[9px] fill-slate-400 font-mono">
                        {frac.toFixed(2)}
                      </text>
                      <text x={x} y="228" textAnchor="middle" className="text-[9px] fill-slate-400 font-mono">
                        {frac.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Axis lines */}
                <line x1="50" y1="215" x2="385" y2="215" stroke="#94a3b8" strokeWidth="1.2" />
                <line x1="50" y1="215" x2="50" y2="25" stroke="#94a3b8" strokeWidth="1.2" />

                {/* Axis titles */}
                <text x="215" y="244" textAnchor="middle" className="text-[10px] font-semibold fill-slate-600">
                  {activeChart === "roc" ? "False Positive Rate (FPR)" : "Recall"}
                </text>
                <text
                  x="-120"
                  y="18"
                  transform="rotate(-90)"
                  textAnchor="middle"
                  className="text-[10px] font-semibold fill-slate-600"
                >
                  {activeChart === "roc" ? "True Positive Rate (TPR)" : "Precision"}
                </text>

                {/* Diagonal baseline for ROC */}
                {activeChart === "roc" && (
                  <line
                    x1="50"
                    y1="215"
                    x2="380"
                    y2="30"
                    stroke="#cbd5e1"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                )}

                {/* Baseline for PR (fraud rate ~3.5%) */}
                {activeChart === "pr" && (
                  <line
                    x1="50"
                    y1={215 - 0.035 * 185}
                    x2="380"
                    y2={215 - 0.035 * 185}
                    stroke="#fca5a5"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                )}

                {/* Fill Area */}
                {activeChart === "roc" ? (
                  <path
                    d={`${getRocPath()} L 380 215 L 50 215 Z`}
                    fill="url(#rocAreaGrad)"
                  />
                ) : (
                  <path
                    d={`${getPrPath()} L 380 215 L 50 215 Z`}
                    fill="url(#prAreaGrad)"
                  />
                )}

                {/* Smooth Curve Stroke */}
                <path
                  d={activeChart === "roc" ? getRocPath() : getPrPath()}
                  fill="none"
                  stroke={activeChart === "roc" ? "#047857" : "#0f766e"}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Key Points */}
                {(activeChart === "roc" ? ROC_CURVE_POINTS : PR_CURVE_POINTS).map((pt, i) => {
                  const x = 50 + ("fpr" in pt ? pt.fpr : pt.recall) * 330;
                  const y = 215 - ("tpr" in pt ? pt.tpr : pt.precision) * 185;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      className={activeChart === "roc" ? "fill-emerald-700" : "fill-teal-700"}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Illustrative curve calibrated to paper-reported test metrics</span>
            <span className="font-mono text-emerald-800 font-bold">
              {activeChart === "roc"
                ? `ROC-AUC: ${MODEL_METRICS.rocAuc.toFixed(4)}`
                : `PR-AUC: ${MODEL_METRICS.prAuc.toFixed(4)}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
