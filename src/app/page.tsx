"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SidebarNav } from "@/components/SidebarNav";
import { HeroSection } from "@/components/HeroSection";
import { DatasetOverview } from "@/components/DatasetOverview";
import { TransactionGraph } from "@/components/TransactionGraph";
import { PipelineDiagram } from "@/components/PipelineDiagram";
import { TransactionAnalysisDemo } from "@/components/TransactionAnalysisDemo";
import { ModelArchitecture } from "@/components/ModelArchitecture";
import { ModelEvaluation } from "@/components/ModelEvaluation";
import { ResearchSummary } from "@/components/ResearchSummary";
import { Network, ShieldCheck } from "lucide-react";

export default function Home() {
  const [selectedTxnId, setSelectedTxnId] = useState<string>("TXN-104928");

  const handleRunDemo = () => {
    const el = document.getElementById("transactions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectFromGraph = (txnId: string) => {
    setSelectedTxnId(txnId);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col">
      {/* Top Fixed/Sticky Navigation */}
      <Navbar onRunDemo={handleRunDemo} />

      {/* Main Single Central Content Container (1240px) */}
      <div className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex gap-6 items-start">
          {/* Left Desktop Sidebar Navigation */}
          <SidebarNav />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 space-y-2">
            {/* SECTION 1: HERO / OVERVIEW */}
            <HeroSection onRunDemo={handleRunDemo} />

            {/* SECTION 2: DATASET OVERVIEW */}
            <DatasetOverview />

            {/* SECTION 3: TRANSACTION GRAPH */}
            <TransactionGraph onSelectTransaction={handleSelectFromGraph} />

            {/* SECTION 4: PI-GNN PIPELINE */}
            <PipelineDiagram />

            {/* SECTION 5: LIVE TRANSACTION DEMO */}
            <TransactionAnalysisDemo selectedTxnId={selectedTxnId} />

            {/* SECTION 6: MODEL ARCHITECTURE */}
            <ModelArchitecture />

            {/* SECTIONS 7, 8, 9: MODEL EVALUATION, CLASSIFICATION DIAGNOSTICS, ROC/PR */}
            <ModelEvaluation />

            {/* SECTION 10: RESEARCH SUMMARY */}
            <ResearchSummary />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-700 flex items-center justify-center text-white">
              <Network className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-800">PI-GNN (ACMP) Research Demonstration</span>
            <span>•</span>
            <span>Physics-Informed Graph Neural Network for Fraud Detection</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-500">IEEE-CIS Benchmark</span>
            <span>•</span>
            <span className="text-emerald-800 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Academic Presentation Build
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
