export interface Transaction {
  id: string;
  amount: string;
  merchant: string;
  device: string;
  location: string;
  fraudProbability: number;
  prediction: "FRAUD" | "NORMAL";
  risk: "HIGH" | "LOW";
  cardType?: string;
  ip?: string;
  time?: string;
  phaseSeparation?: string;
}

export const TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-104928",
    amount: "$1,284.52",
    merchant: "Online Retail",
    device: "DEVICE-8391",
    location: "United States",
    fraudProbability: 87.4,
    prediction: "FRAUD",
    risk: "HIGH",
    cardType: "Visa Platinum •••• 4129",
    ip: "198.51.100.42",
    time: "14:28:09 UTC",
    phaseSeparation: "V(ϕ) = 0.892 (High Phase Separation)"
  },
  {
    id: "TXN-204817",
    amount: "$142.80",
    merchant: "Retail Store",
    device: "DEVICE-2217",
    location: "India",
    fraudProbability: 8.2,
    prediction: "NORMAL",
    risk: "LOW",
    cardType: "Mastercard •••• 8821",
    ip: "203.0.113.19",
    time: "11:05:42 UTC",
    phaseSeparation: "V(ϕ) = 0.014 (Equilibrium State)"
  },
  {
    id: "TXN-309271",
    amount: "$3,842.10",
    merchant: "Digital Services",
    device: "DEVICE-1128",
    location: "United Kingdom",
    fraudProbability: 72.8,
    prediction: "FRAUD",
    risk: "HIGH",
    cardType: "Amex Corporate •••• 9012",
    ip: "198.51.100.89",
    time: "09:41:03 UTC",
    phaseSeparation: "V(ϕ) = 0.741 (Boundary Sharpness)"
  },
  {
    id: "TXN-441827",
    amount: "$86.40",
    merchant: "Grocery",
    device: "DEVICE-7291",
    location: "India",
    fraudProbability: 4.6,
    prediction: "NORMAL",
    risk: "LOW",
    cardType: "RuPay Classic •••• 1150",
    ip: "203.0.113.88",
    time: "16:18:55 UTC",
    phaseSeparation: "V(ϕ) = 0.003 (Low Energy Ground State)"
  }
];

export const DATASET_STATS = [
  {
    label: "Transactions",
    value: "590,540",
    subtext: "Total recorded real-world transactions",
    badge: "IEEE-CIS Benchmark",
    accent: "emerald"
  },
  {
    label: "Features",
    value: "394",
    subtext: "Tabular, categorical & temporal features",
    badge: "High-Dimensional",
    accent: "indigo"
  },
  {
    label: "Fraud Rate",
    value: "~3.5%",
    subtext: "Severe real-world class imbalance",
    badge: "20,663 Positive Cases",
    accent: "amber"
  },
  {
    label: "Graph Model",
    value: "Heterogeneous",
    subtext: "Multi-relational entity-transaction topology",
    badge: "ACMP Physics Graph",
    accent: "teal"
  }
];

export interface GraphNode {
  id: string;
  name: string;
  type: "normal" | "fraud" | "entity";
  category: "Transaction" | "Device" | "Card" | "Email" | "Address" | "IP" | "Merchant";
  risk?: "HIGH" | "LOW";
  fraudProbability?: number;
  x: number;
  y: number;
  details?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
  animated?: boolean;
}

export const GRAPH_NODES: GraphNode[] = [
  // Fraudulent Transactions
  {
    id: "TXN-104928",
    name: "TXN-104928",
    type: "fraud",
    category: "Transaction",
    risk: "HIGH",
    fraudProbability: 87.4,
    x: 230,
    y: 130,
    details: "High-value purchase flagged with card-device mismatch and rapid IP hopping."
  },
  {
    id: "TXN-309271",
    name: "TXN-309271",
    type: "fraud",
    category: "Transaction",
    risk: "HIGH",
    fraudProbability: 72.8,
    x: 480,
    y: 110,
    details: "Digital services checkout using disposable domain email and proxy routing."
  },
  {
    id: "TXN-782914",
    name: "TXN-782914",
    type: "fraud",
    category: "Transaction",
    risk: "HIGH",
    fraudProbability: 91.2,
    x: 180,
    y: 330,
    details: "Repeated authorization attempt clustered near flagged device node."
  },

  // Normal Transactions
  {
    id: "TXN-204817",
    name: "TXN-204817",
    type: "normal",
    category: "Transaction",
    risk: "LOW",
    fraudProbability: 8.2,
    x: 520,
    y: 350,
    details: "In-store POS transaction with verified geolocation and stable card token."
  },
  {
    id: "TXN-441827",
    name: "TXN-441827",
    type: "normal",
    category: "Transaction",
    risk: "LOW",
    fraudProbability: 4.6,
    x: 710,
    y: 330,
    details: "Routine merchant grocery transaction consistent with behavioral baseline."
  },
  {
    id: "TXN-512903",
    name: "TXN-512903",
    type: "normal",
    category: "Transaction",
    risk: "LOW",
    fraudProbability: 5.1,
    x: 670,
    y: 190,
    details: "Recurring subscription payment authenticated through regular residential IP."
  },

  // Entities
  {
    id: "DEVICE-8391",
    name: "DEVICE-8391",
    type: "entity",
    category: "Device",
    x: 320,
    y: 220,
    details: "Hardware fingerprint linked to multiple high-velocity checkout attempts."
  },
  {
    id: "DEVICE-2217",
    name: "DEVICE-2217",
    type: "entity",
    category: "Device",
    x: 580,
    y: 260,
    details: "Verified mobile device with clean history and single account association."
  },
  {
    id: "CARD-4129",
    name: "Card •••• 4129",
    type: "entity",
    category: "Card",
    x: 130,
    y: 210,
    details: "Visa Platinum card issued by financial institution."
  },
  {
    id: "EMAIL-PROTON",
    name: "user@proton.me",
    type: "entity",
    category: "Email",
    x: 390,
    y: 70,
    details: "Encrypted privacy email domain with zero prior transaction history."
  },
  {
    id: "IP-198",
    name: "IP 198.51.100.42",
    type: "entity",
    category: "IP",
    x: 330,
    y: 350,
    details: "Data center proxy IP address with elevated subnet anomaly score."
  },
  {
    id: "MERCHANT-ONLINE",
    name: "Online Retail",
    type: "entity",
    category: "Merchant",
    x: 150,
    y: 70,
    details: "High-volume e-commerce payment gateway endpoint."
  },
  {
    id: "MERCHANT-STORE",
    name: "Retail Store",
    type: "entity",
    category: "Merchant",
    x: 440,
    y: 400,
    details: "Physical POS merchant located in commercial district."
  },
  {
    id: "ADDR-0941",
    name: "Addr #0941",
    type: "entity",
    category: "Address",
    x: 620,
    y: 110,
    details: "Registered card billing postal region."
  }
];

export const GRAPH_EDGES: GraphEdge[] = [
  { source: "TXN-104928", target: "DEVICE-8391", relation: "used_device", animated: true },
  { source: "TXN-104928", target: "CARD-4129", relation: "billed_to" },
  { source: "TXN-104928", target: "MERCHANT-ONLINE", relation: "paid_to" },
  { source: "TXN-104928", target: "EMAIL-PROTON", relation: "registered_email" },
  { source: "TXN-782914", target: "CARD-4129", relation: "billed_to" },
  { source: "TXN-782914", target: "IP-198", relation: "routed_via", animated: true },
  { source: "TXN-782914", target: "DEVICE-8391", relation: "used_device" },
  { source: "TXN-309271", target: "EMAIL-PROTON", relation: "registered_email" },
  { source: "TXN-309271", target: "DEVICE-8391", relation: "device_overlap", animated: true },
  { source: "TXN-309271", target: "ADDR-0941", relation: "billing_addr" },
  { source: "TXN-204817", target: "DEVICE-2217", relation: "used_device" },
  { source: "TXN-204817", target: "MERCHANT-STORE", relation: "in_store_at" },
  { source: "TXN-204817", target: "IP-198", relation: "subnet_neighbor" },
  { source: "TXN-441827", target: "DEVICE-2217", relation: "used_device" },
  { source: "TXN-441827", target: "MERCHANT-STORE", relation: "in_store_at" },
  { source: "TXN-512903", target: "ADDR-0941", relation: "billing_addr" },
  { source: "TXN-512903", target: "DEVICE-2217", relation: "auth_token" }
];

export const PIPELINE_STAGES = [
  {
    step: "01",
    title: "IEEE-CIS Data",
    subtitle: "Raw Transaction Ingestion",
    description: "590,540 real-world transaction records with 394 attributes including card types, device IDs, time deltas, and fraud tags.",
    tag: "Input Stage"
  },
  {
    step: "02",
    title: "Feature Processing",
    subtitle: "Embedding & Normalization",
    description: "Numerical scaling, missingness indicator injection, categorical entity embeddings, and temporal cyclical encoding.",
    tag: "Preprocessing"
  },
  {
    step: "03",
    title: "Transaction Graph",
    subtitle: "Heterogeneous Adjacency",
    description: "Constructs multi-relational graph topology linking transactions through shared devices, IP addresses, cards, and emails.",
    tag: "Topology"
  },
  {
    step: "04",
    title: "PI-GNN",
    subtitle: "Physics-Informed GNN",
    description: "Physics-Informed Graph Neural Network encoding topological structure and non-linear feature interactions.",
    tag: "Core Model"
  },
  {
    step: "05",
    title: "ACMP Message Passing",
    subtitle: "Allen-Cahn Dynamics",
    description: "Allen-Cahn Message Passing (ACMP) with reaction-diffusion dynamics: prevents oversmoothing and preserves sharp fraud cluster boundaries.",
    tag: "PDE Message Passing"
  },
  {
    step: "06",
    title: "Fraud Probability",
    subtitle: "Calibrated Risk Scoring",
    description: "Sigmoid projection yielding calibrated fraud probability indicating anomalous phase separation risk.",
    tag: "Decision Output"
  }
];

export const ARCHITECTURE_LAYERS = [
  {
    name: "Input Features",
    dim: "394 dimensions",
    type: "Tabular & Topological",
    description: "Multi-modal transaction attributes concatenated with entity categorical signatures."
  },
  {
    name: "Feature Encoder",
    dim: "Linear projection + activation",
    type: "Dense Projection",
    description: "Projects high-dimensional sparse inputs into compact latent representation space."
  },
  {
    name: "ACMP Layer 1",
    dim: "Physics-Informed Message Passing",
    type: "Allen-Cahn PDE",
    description: "Applies reaction-diffusion message passing ∂u/∂t = d·Δu - f'(u) with double-well potential."
  },
  {
    name: "Layer Normalization",
    dim: "LayerNorm(128)",
    type: "Stabilization",
    description: "Preserves gradient scale and stabilizes feature variance across heterogeneous nodes."
  },
  {
    name: "ACMP Layer 2",
    dim: "Physics-Informed Message Passing",
    type: "Allen-Cahn PDE",
    description: "Second-order spatial boundary propagation to capture multi-hop fraud ring relationships."
  },
  {
    name: "Layer Normalization",
    dim: "LayerNorm(128)",
    type: "Stabilization",
    description: "Residual aggregation preserving layer representations."
  },
  {
    name: "Fraud Classifier",
    dim: "MLP Classification Head",
    type: "Classification Head",
    description: "Non-linear scoring module mapping latent node states to fraud probability."
  },
  {
    name: "Fraud Probability",
    dim: "p ∈ [0, 1]",
    type: "Sigmoid Output",
    description: "Calibrated risk score thresholded for decision support and alerts."
  }
];

/**
 * AUTHORITATIVE RESEARCH PAPER METRICS FOR PROPOSED PI-GNN (ACMP)
 * Exact paper-reported values:
 * ROC-AUC    = 0.9150
 * PR-AUC     = 0.5340
 * Precision  = 0.3580
 * Recall     = 0.6510
 * F1 Score   = 0.4621
 * Accuracy   = 0.9625
 */
export const MODEL_METRICS = {
  model: "PI-GNN (ACMP)",
  rocAuc: 0.9150,
  prAuc: 0.5340,
  precision: 0.3580,
  recall: 0.6510,
  f1: 0.4621,
  accuracy: 0.9625
};

export const MODEL_METRICS_LIST = [
  {
    key: "ROC-AUC",
    value: MODEL_METRICS.rocAuc.toFixed(4),
    desc: "Area Under Receiver Operating Characteristic",
    badge: "Primary Metric",
    highlight: true,
    benchmarkComparison: "Paper-Reported Result"
  },
  {
    key: "PR-AUC",
    value: MODEL_METRICS.prAuc.toFixed(4),
    desc: "Precision-Recall Area (~3.5% imbalanced data)",
    badge: "Imbalanced Precision",
    highlight: true,
    benchmarkComparison: "Paper-Reported Result"
  },
  {
    key: "Precision",
    value: MODEL_METRICS.precision.toFixed(4),
    desc: "True Positives / Total Predicted Fraud",
    badge: "Paper Result",
    highlight: false,
    benchmarkComparison: "Operational Threshold"
  },
  {
    key: "Recall",
    value: MODEL_METRICS.recall.toFixed(4),
    desc: "True Positives / Total Actual Fraud",
    badge: "Fraud Capture",
    highlight: false,
    benchmarkComparison: "Paper-Reported Result"
  },
  {
    key: "F1 Score",
    value: MODEL_METRICS.f1.toFixed(4),
    desc: "Harmonic mean of Precision and Recall",
    badge: "Balanced F1",
    highlight: false,
    benchmarkComparison: "Paper-Reported Result"
  },
  {
    key: "Accuracy",
    value: MODEL_METRICS.accuracy.toFixed(4),
    desc: "Overall classification accuracy across test set",
    badge: "Paper Result",
    highlight: false,
    benchmarkComparison: "Paper-Reported Result"
  }
];

/**
 * Illustrative curve coordinates consistent with paper headline metrics:
 * ROC-AUC = 0.9150
 * PR-AUC = 0.5340
 */
export const ROC_CURVE_POINTS = [
  { fpr: 0.0, tpr: 0.0 },
  { fpr: 0.02, tpr: 0.42 },
  { fpr: 0.05, tpr: 0.62 },
  { fpr: 0.10, tpr: 0.76 },
  { fpr: 0.15, tpr: 0.84 },
  { fpr: 0.20, tpr: 0.89 },
  { fpr: 0.30, tpr: 0.93 },
  { fpr: 0.40, tpr: 0.955 },
  { fpr: 0.50, tpr: 0.972 },
  { fpr: 0.70, tpr: 0.988 },
  { fpr: 0.85, tpr: 0.995 },
  { fpr: 1.0, tpr: 1.0 }
];

export const PR_CURVE_POINTS = [
  { recall: 0.0, precision: 0.90 },
  { recall: 0.15, precision: 0.79 },
  { recall: 0.30, precision: 0.68 },
  { recall: 0.45, precision: 0.59 },
  { recall: 0.55, precision: 0.51 },
  { recall: 0.651, precision: 0.358 }, // Operating point matching Recall=0.6510, Precision=0.3580
  { recall: 0.75, precision: 0.28 },
  { recall: 0.85, precision: 0.18 },
  { recall: 1.0, precision: 0.035 }
];

export const RESEARCH_SUMMARY = {
  dataset: "IEEE-CIS Fraud Detection",
  approach: "Physics-Informed Graph Neural Network",
  model: "PI-GNN (ACMP)",
  physicsMechanism: "Allen-Cahn Message Passing (ACMP)",
  task: "Financial Fraud Detection",
  hardware: "NVIDIA Tesla T4",
  paperReportedRocAuc: MODEL_METRICS.rocAuc.toFixed(4),
  paperReportedPrAuc: MODEL_METRICS.prAuc.toFixed(4),
  paperReportedPrecision: MODEL_METRICS.precision.toFixed(4),
  paperReportedRecall: MODEL_METRICS.recall.toFixed(4),
  paperReportedF1: MODEL_METRICS.f1.toFixed(4),
  paperReportedAccuracy: MODEL_METRICS.accuracy.toFixed(4)
};
