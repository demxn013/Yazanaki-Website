// Alliance detail records, keyed by code.
// Alliances page reads empire.alliances and hydrates via getAlliance().
export const alliances = {
  Excalibur: {
    code: "Excalibur",
    name: "Excalibur",
    label: "Allied Faction",
    status: "Active",
    relation: "Formal",
    control: "External",
    terms: "Scalable",
    description:
      "Independent external faction operating under a structured agreement with the Yazanaki Empire. Not governed internally.",
  },
};

// Enum options for the Alliance application form (shared with backend validation).
export const allianceOptions = {
  size: ["Small", "Medium", "Large"],
  specialization: ["PvP", "Economy", "Hybrid"],
  alliance_type: ["Non-Aggression", "Trade Partnership", "Full Alliance"],
  contribution_capacity: ["Low", "Moderate", "High", "Strategic"],
};
