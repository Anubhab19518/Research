"use client";

import React, { useState } from "react";
import { GRAPH_NODES, GRAPH_EDGES, GraphNode } from "@/data/pignnData";
import { ArrowRight } from "lucide-react";

interface TransactionGraphProps {
  onSelectTransaction?: (txnId: string) => void;
}

export const TransactionGraph: React.FC<TransactionGraphProps> = ({ onSelectTransaction }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(GRAPH_NODES[0]);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    if (onSelectTransaction && (node.type === "fraud" || node.type === "normal")) {
      onSelectTransaction(node.id);
    }
  };

  const getNode = (id: string) => GRAPH_NODES.find((n) => n.id === id);

  return (
    <section id="graph" className="py-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            Relational Topology
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs text-slate-500 font-medium">Heterogeneous Multi-Graph</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Transaction Graph Representation
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1 leading-relaxed">
          Financial transactions are represented as interconnected entities, enabling the GNN to learn relational patterns associated with fraudulent behavior.
        </p>
      </div>

      {/* Main Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* SVG Graph Canvas Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          {/* Top Bar with Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-emerald-700" />
                <span>Normal transaction</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border border-rose-700" />
                <span>Fraudulent transaction</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 border border-indigo-700" />
                <span>Related entity</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500">
              Interactive • Select node to inspect
            </div>
          </div>

          {/* SVG Canvas with ample padding */}
          <div className="w-full overflow-x-auto py-2">
            <svg
              viewBox="0 0 850 480"
              className="w-full h-auto min-w-[620px] select-none"
              style={{ maxHeight: "420px" }}
            >
              {/* Edges */}
              {GRAPH_EDGES.map((edge, idx) => {
                const src = getNode(edge.source);
                const tgt = getNode(edge.target);
                if (!src || !tgt) return null;

                const isConnectedToSelected =
                  selectedNode && (selectedNode.id === src.id || selectedNode.id === tgt.id);
                const isFraudEdge = src.type === "fraud" || tgt.type === "fraud";

                return (
                  <line
                    key={idx}
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke={
                      isConnectedToSelected
                        ? isFraudEdge
                          ? "#e11d48"
                          : "#047857"
                        : isFraudEdge
                        ? "#fca5a5"
                        : "#cbd5e1"
                    }
                    strokeWidth={isConnectedToSelected ? 2.5 : edge.animated ? 1.8 : 1.2}
                    strokeOpacity={isConnectedToSelected ? 1 : 0.8}
                    className={edge.animated ? "animate-dash-flow" : ""}
                  />
                );
              })}

              {/* Nodes */}
              {GRAPH_NODES.map((node) => {
                const isSelected = selectedNode?.id === node.id;

                let fillClass = "fill-slate-50";
                let strokeColor = "#64748b";
                let nodeRadius = 18;

                if (node.type === "fraud") {
                  fillClass = "fill-rose-50";
                  strokeColor = "#e11d48";
                  nodeRadius = 22;
                } else if (node.type === "normal") {
                  fillClass = "fill-emerald-50";
                  strokeColor = "#047857";
                  nodeRadius = 20;
                } else {
                  fillClass = "fill-indigo-50";
                  strokeColor = "#4f46e5";
                  nodeRadius = 17;
                }

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    {/* Selection indicator ring */}
                    {isSelected && (
                      <circle
                        r={nodeRadius + 6}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />
                    )}

                    {/* Main Node Circle */}
                    <circle
                      r={nodeRadius}
                      className={fillClass}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 2.5 : 1.8}
                    />

                    {/* Node Core Indicator */}
                    {node.type === "fraud" && <circle r={5} fill="#e11d48" />}
                    {node.type === "normal" && <circle r={5} fill="#047857" />}
                    {node.type === "entity" && (
                      <rect x={-4} y={-4} width={8} height={8} rx={1.5} fill="#4f46e5" />
                    )}

                    {/* Node Label */}
                    <text
                      y={nodeRadius + 14}
                      textAnchor="middle"
                      className={`text-[11px] font-sans font-medium select-none ${
                        isSelected ? "fill-slate-950 font-bold" : "fill-slate-700"
                      }`}
                    >
                      {node.name}
                    </text>

                    {/* Category Label */}
                    <text
                      y={nodeRadius + 26}
                      textAnchor="middle"
                      className="text-[9px] font-mono fill-slate-400 select-none uppercase"
                    >
                      {node.category}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Caption */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Dashed lines indicate ACMP relational propagation pathways</span>
            <span className="font-mono text-[11px]">14 Nodes • 17 Relational Edges</span>
          </div>
        </div>

        {/* Selected Node Inspector Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Node Inspector
              </span>
              {selectedNode && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    selectedNode.type === "fraud"
                      ? "bg-rose-50 text-rose-800 border border-rose-200"
                      : selectedNode.type === "normal"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-indigo-50 text-indigo-800 border border-indigo-200"
                  }`}
                >
                  {selectedNode.type}
                </span>
              )}
            </div>

            {selectedNode ? (
              <div className="space-y-3.5">
                <div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {selectedNode.category} Node
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                    {selectedNode.name}
                  </h4>
                </div>

                {/* Explicitly formatted required cards */}
                {selectedNode.id === "TXN-104928" && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-rose-900">
                      <span>Transaction TXN-104928</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white">
                        Risk: HIGH
                      </span>
                    </div>
                    <div className="text-2xl font-black text-rose-700">
                      Fraud probability: 87.4%
                    </div>
                    <p className="text-xs text-rose-800 pt-1 border-t border-rose-200 leading-relaxed">
                      Representative high-risk demo transaction flagged by card-device mismatch and anomalous proxy routing.
                    </p>
                  </div>
                )}

                {selectedNode.id === "TXN-204817" && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                      <span>Transaction TXN-204817</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-700 text-white">
                        Risk: LOW
                      </span>
                    </div>
                    <div className="text-2xl font-black text-emerald-800">
                      Fraud probability: 8.2%
                    </div>
                    <p className="text-xs text-emerald-800 pt-1 border-t border-emerald-200 leading-relaxed">
                      Representative low-risk demo transaction with verified physical POS merchant and consistent device profile.
                    </p>
                  </div>
                )}

                {/* Other nodes */}
                {selectedNode.id !== "TXN-104928" && selectedNode.id !== "TXN-204817" && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                    {selectedNode.fraudProbability !== undefined ? (
                      <>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                          <span>Transaction {selectedNode.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              selectedNode.risk === "HIGH"
                                ? "bg-rose-600 text-white"
                                : "bg-emerald-700 text-white"
                            }`}
                          >
                            Risk: {selectedNode.risk}
                          </span>
                        </div>
                        <div
                          className={`text-2xl font-black ${
                            selectedNode.risk === "HIGH" ? "text-rose-700" : "text-emerald-800"
                          }`}
                        >
                          Fraud probability: {selectedNode.fraudProbability}%
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Entity Profile
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {selectedNode.category}: {selectedNode.name}
                        </div>
                      </>
                    )}
                    <p className="text-xs text-slate-600 pt-1 border-t border-slate-200 leading-relaxed">
                      {selectedNode.details}
                    </p>
                  </div>
                )}

                {/* Contextual Properties */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Degree Coupling</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {selectedNode.type === "entity" ? "Multi-Entity Link" : "3 Entity Edges"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Data Source</span>
                    <span className="font-mono text-slate-700">Presentation Demo Data</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 text-xs">
                Select any node on the graph to inspect details.
              </div>
            )}
          </div>

          {selectedNode && (selectedNode.type === "fraud" || selectedNode.type === "normal") && (
            <div className="pt-3 border-t border-slate-100 mt-2">
              <a
                href="#transactions"
                onClick={() => onSelectTransaction?.(selectedNode.id)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <span>Inspect in Risk Engine</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
