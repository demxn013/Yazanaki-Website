export const EMPIRE = {
  name: "Yazanaki Empire",
  tagline:
    "A structured multi-division system built on control, economy, and expansion.",
};

export const CORE_DIVISIONS = [
  {
    code: "SNU",
    name: "SNU",
    role: "Operational Core",
    description:
      "Directs internal operations across divisions. Maintains the command cadence that holds the empire together under a single strategic posture.",
  },
  {
    code: "ANO",
    name: "ANO",
    role: "Internal Governance",
    description:
      "Oversees governance protocols, internal doctrine, and the enforcement of structural rules across all divisions.",
  },
  {
    code: "ONF",
    name: "ONF",
    role: "Economic Infrastructure",
    description:
      "Controls trade pipelines, resource flow, and market positioning. Translates controlled expansion into measurable economic output.",
  },
  {
    code: "ONA",
    name: "ONA",
    role: "Strategic Analysis",
    description:
      "Maps the wider landscape, monitors external movement, and produces the intelligence picture used to direct expansion.",
  },
  {
    code: "KASAII",
    name: "KASAII",
    role: "Perimeter Control",
    description:
      "Holds defensive structure and perimeter integrity. Responds to external pressure within the framework of empire doctrine.",
  },
];

export const ALLIANCES = [
  {
    code: "EXC",
    name: "Excalibur",
    label: "Allied Faction",
    status: "Active",
    description:
      "Independent external faction operating under a structured agreement with the Yazanaki Empire. Not governed internally.",
  },
];

export const ALLIANCE_OPTIONS = {
  size: ["Small", "Medium", "Large"],
  specialization: ["PvP", "Economy", "Hybrid"],
  alliance_type: ["Non-Aggression", "Trade Partnership", "Full Alliance"],
  contribution_capacity: ["Low", "Moderate", "High", "Strategic"],
};
