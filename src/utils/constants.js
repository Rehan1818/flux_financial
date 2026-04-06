// ─── Category config ──────────────────────────────────────────────────────────
export const CATS = {
  Food:      { color:"#2d4fff", bg:"#ebedff", text:"#1a2db0", darkBg:"#12163a", darkText:"#7b8fff" },
  Transport: { color:"#1a6b44", bg:"#e8f5ee", text:"#135233", darkBg:"#0d2b1e", darkText:"#4caf7d" },
  Housing:   { color:"#7a5200", bg:"#fef3d8", text:"#5a3d00", darkBg:"#2b1e00", darkText:"#e0b060" },
  Health:    { color:"#9b2222", bg:"#fce8e8", text:"#721818", darkBg:"#2b0e0e", darkText:"#e07070" },
  Shopping:  { color:"#5b2d8e", bg:"#f0e8fc", text:"#421e6a", darkBg:"#1e0f33", darkText:"#c084fc" },
  Salary:    { color:"#1a6b44", bg:"#e8f5ee", text:"#135233", darkBg:"#0d2b1e", darkText:"#4caf7d" },
  Freelance: { color:"#2d4fff", bg:"#ebedff", text:"#1a2db0", darkBg:"#12163a", darkText:"#7b8fff" },
  Other:     { color:"#7a7870", bg:"#f0ede4", text:"#5a5850", darkBg:"#252320", darkText:"#888478" },
};

// ─── Default seed data ────────────────────────────────────────────────────────
export const DEFAULT_TX = [
  { id:1,  date:"2026-04-01", description:"Salary deposit",    category:"Salary",    type:"income",  amount:85000 },
  { id:2,  date:"2026-04-02", description:"Grocery mart",      category:"Food",      type:"expense", amount:3200  },
  { id:3,  date:"2026-04-02", description:"Metro card top-up", category:"Transport", type:"expense", amount:500   },
  { id:4,  date:"2026-03-28", description:"Freelance project", category:"Freelance", type:"income",  amount:22000 },
  { id:5,  date:"2026-03-25", description:"Apartment rent",    category:"Housing",   type:"expense", amount:18000 },
  { id:6,  date:"2026-03-20", description:"Doctor visit",      category:"Health",    type:"expense", amount:1500  },
  { id:7,  date:"2026-03-15", description:"Online shopping",   category:"Shopping",  type:"expense", amount:4200  },
  { id:8,  date:"2026-03-14", description:"Restaurant dinner", category:"Food",      type:"expense", amount:1800  },
  { id:9,  date:"2026-03-01", description:"Salary deposit",    category:"Salary",    type:"income",  amount:85000 },
  { id:10, date:"2026-02-28", description:"Gym membership",    category:"Health",    type:"expense", amount:2000  },
  { id:11, date:"2026-02-20", description:"Freelance payment", category:"Freelance", type:"income",  amount:15000 },
  { id:12, date:"2026-02-15", description:"Apartment rent",    category:"Housing",   type:"expense", amount:18000 },
  { id:13, date:"2026-02-10", description:"Grab fare",         category:"Transport", type:"expense", amount:800   },
  { id:14, date:"2026-02-05", description:"Groceries",         category:"Food",      type:"expense", amount:2900  },
  { id:15, date:"2026-01-31", description:"Salary deposit",    category:"Salary",    type:"income",  amount:85000 },
];

// ─── localStorage keys ────────────────────────────────────────────────────────
export const LS_KEY   = "flux_tx_v2";
export const LS_THEME = "flux_theme";
export const LS_ROLE  = "flux_role";

// ─── Theme tokens ─────────────────────────────────────────────────────────────
export const LIGHT = {
  ink:"#0f0e0c",   ink2:"#3a3832",  ink3:"#7a7870",
  paper:"#faf8f3", paper2:"#f0ede4", paper3:"#e6e2d8",
  green:"#1a6b44", greenBg:"#e8f5ee", greenText:"#135233",
  red:"#9b2222",   redBg:"#fce8e8",   redText:"#721818",
  amber:"#7a5200", amberBg:"#fef3d8", amberText:"#5a3d00",
  accent:"#2d4fff", accentBg:"#ebedff", accentText:"#1a2db0",
  border:"#d8d4c8",
};

export const DARK = {
  ink:"#f0ede4",   ink2:"#c8c4b8",  ink3:"#888478",
  paper:"#141310", paper2:"#1e1c18", paper3:"#252320",
  green:"#4caf7d", greenBg:"#0d2b1e", greenText:"#4caf7d",
  red:"#e07070",   redBg:"#2b0e0e",   redText:"#e07070",
  amber:"#e0b060", amberBg:"#2b1e00", amberText:"#e0b060",
  accent:"#7b8fff", accentBg:"#12163a", accentText:"#7b8fff",
  border:"#2e2c28",
};
