"use client";

import React, { useState } from "react";
import { TRANSACTIONS, Transaction, MODEL_METRICS } from "@/data/pignnData";
import {
  ChevronDown,
  Loader2,
  DollarSign,
  Store,
  Smartphone,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Cpu
} from "lucide-react";

interface TransactionAnalysisDemoProps {
  selectedTxnId?: string;
}

export const TransactionAnalysisDemo: React.FC<TransactionAnalysisDemoProps> = ({
  selectedTxnId
}) => {
  const [currentId, setCurrentId] = useState<string>("TXN-104928");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analyzedTxn, setAnalyzedTxn] = useState<Transaction | null>(TRANSACTIONS[0]);
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(true);
  const [prevSelectedTxnId, setPrevSelectedTxnId] = useState<string | undefined>(selectedTxnId);

  // Sync external selection if clicked from graph without cascading effect renders
  if (selectedTxnId !== prevSelectedTxnId) {
    setPrevSelectedTxnId(selectedTxnId);
    if (selectedTxnId && TRANSACTIONS.some((t) => t.id === selectedTxnId)) {
      setCurrentId(selectedTxnId);
      const match = TRANSACTIONS.find((t) => t.id === selectedTxnId)!;
      setAnalyzedTxn(match);
      setHasAnalyzed(true);
      setIsLoading(false);
    }
  }

  const selectedData = TRANSACTIONS.find((t) => t.id === currentId) || TRANSACTIONS[0];

  const handleAnalyze = () => {
    setIsLoading(true);
    setHasAnalyzed(false);

    // Realistic demonstration simulation duration (550ms)
    setTimeout(() => {
      setAnalyzedTxn(selectedData);
      setIsLoading(false);
      setHasAnalyzed(true);
    }, 550);
  };

  const isFraud = analyzedTxn?.prediction === "FRAUD";

  return (
    <section id="transactions" className="py-6 scroll-mt-16">
      {/* Section Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Interactive Demonstration
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs text-slate-500 font-medium">Representative Transactions</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Transaction Risk Analysis
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1 leading-relaxed">
          Select a benchmark transaction to run the simulated PI-GNN (ACMP) message passing analysis and inspect calibrated fraud probabilities.
        </p>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Bento: Transaction Selector & Details (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Select Benchmark Transaction
              </label>

              {/* Picker Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {TRANSACTIONS.map((txn) => {
                  const isSelected = txn.id === currentId;
                  const isTxnFraud = txn.prediction === "FRAUD";

                  return (
                    <button
                      key={txn.id}
                      type="button"
                      onClick={() => {
                        setCurrentId(txn.id);
                        setHasAnalyzed(false);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold">{txn.id}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isTxnFraud ? "bg-rose-500" : "bg-emerald-500"
                          }`}
                        />
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          isSelected ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {txn.amount} • {txn.merchant}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dropdown Alternative */}
              <div className="relative">
                <select
                  value={currentId}
                  onChange={(e) => {
                    setCurrentId(e.target.value);
                    setHasAnalyzed(false);
                  }}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 pr-10 focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-colors cursor-pointer"
                >
                  {TRANSACTIONS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.id} — {t.amount} ({t.merchant}, {t.location}) — Target: {t.prediction}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Spec Sheet */}
            <div className="border border-slate-200 bg-slate-50/70 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 mb-3">
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  TRANSACTION SPECIFICATION
                </span>
                <span className="font-mono text-xs font-bold text-slate-900">
                  {selectedData.id}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-500 flex items-center gap-1.5 mb-0.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    Amount
                  </span>
                  <span className="font-bold text-slate-900">{selectedData.amount}</span>
                </div>

                <div>
                  <span className="text-slate-500 flex items-center gap-1.5 mb-0.5">
                    <Store className="w-3.5 h-3.5 text-slate-400" />
                    Merchant
                  </span>
                  <span className="font-bold text-slate-900">{selectedData.merchant}</span>
                </div>

                <div>
                  <span className="text-slate-500 flex items-center gap-1.5 mb-0.5">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                    Device
                  </span>
                  <span className="font-mono font-semibold text-slate-800">
                    {selectedData.device}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 flex items-center gap-1.5 mb-0.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Location
                  </span>
                  <span className="font-semibold text-slate-800">{selectedData.location}</span>
                </div>

                <div>
                  <span className="text-slate-500 mb-0.5 block">Card Token</span>
                  <span className="font-mono text-slate-700">{selectedData.cardType}</span>
                </div>

                <div>
                  <span className="text-slate-500 mb-0.5 block">Gateway IP</span>
                  <span className="font-mono text-slate-700">{selectedData.ip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full py-3.5 px-5 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:bg-slate-400 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Running PI-GNN analysis...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Analyze Transaction</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Representative benchmark transactions evaluated using PI-GNN (ACMP)
            </p>
          </div>
        </div>

        {/* Right Bento: Inference Result (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                PI-GNN Classification Result
              </span>
              <span className="font-mono text-xs text-slate-400">
                {isLoading ? "COMPUTING" : hasAnalyzed ? "OUTPUT READY" : "PENDING"}
              </span>
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-3 animate-pulse">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  Running PI-GNN analysis...
                </h4>
                <p className="text-xs text-slate-500 max-w-xs font-mono">
                  Iterating Allen-Cahn PDE: ∂u/∂t = d·Δu - f&apos;(u)
                </p>
              </div>
            ) : hasAnalyzed && analyzedTxn ? (
              <div className="space-y-4">
                {/* Result Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-extrabold uppercase ${
                      isFraud
                        ? "bg-rose-50 text-rose-800 border border-rose-200"
                        : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {isFraud ? (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    {analyzedTxn.risk} RISK
                  </span>

                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase ${
                      isFraud
                        ? "bg-rose-600 text-white"
                        : "bg-emerald-700 text-white"
                    }`}
                  >
                    {isFraud ? "FRAUDULENT TRANSACTION" : "NORMAL TRANSACTION"}
                  </span>
                </div>

                {/* Fraud Probability Metric */}
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Fraud Probability
                  </div>
                  <div
                    className={`text-5xl font-black tracking-tight ${
                      isFraud ? "text-rose-600" : "text-emerald-700"
                    }`}
                  >
                    {analyzedTxn.fraudProbability.toFixed(1)}%
                  </div>
                </div>

                {/* Progress Bar & Block Graphic */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Safe [0%]</span>
                    <span>Threshold [50%]</span>
                    <span>Anomalous [100%]</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFraud ? "bg-rose-600" : "bg-emerald-600"
                      }`}
                      style={{ width: `${analyzedTxn.fraudProbability}%` }}
                    />
                  </div>
                  {/* Block Graphic: █████████████████░░░ */}
                  <div className="font-mono text-xs tracking-wider text-slate-400 select-none pt-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.round(analyzedTxn.fraudProbability / 5)
                            ? isFraud
                              ? "text-rose-600 font-bold"
                              : "text-emerald-700 font-bold"
                            : "text-slate-200"
                        }
                      >
                        █
                      </span>
                    ))}
                  </div>
                </div>

                {/* Physics Diagnostics */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs space-y-1 font-mono">
                  <div className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider">
                    ACMP Physics Diagnostics
                  </div>
                  <div className="text-slate-800">
                    <span className="text-slate-400">Potential: </span>
                    {analyzedTxn.phaseSeparation}
                  </div>
                  <div className="text-slate-800">
                    <span className="text-slate-400">State: </span>
                    {isFraud ? "Phase boundary triggered (4 hops)" : "Stable ground state (2 hops)"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                Click &quot;Analyze Transaction&quot; to inspect risk metrics.
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Model: {MODEL_METRICS.model}</span>
            <span className="font-mono font-semibold text-emerald-800">
              ROC-AUC: {MODEL_METRICS.rocAuc.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
