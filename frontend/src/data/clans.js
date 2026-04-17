// Core division detail records, keyed by code.
// The Clans page does NOT hardcode this list — it reads empire.coreClans
// and hydrates each code through getClan().
export const clans = {
  SNU: {
    code: "SNU",
    name: "SNU",
    role: "Operational Core",
    label: "Permanent Division",
    locked: true,
    description:
      "Directs internal operations across divisions. Maintains the command cadence that holds the empire together under a single strategic posture.",
  },
  ANO: {
    code: "ANO",
    name: "ANO",
    role: "Internal Governance",
    label: "Permanent Division",
    locked: true,
    description:
      "Oversees governance protocols, internal doctrine, and the enforcement of structural rules across all divisions.",
  },
  ONF: {
    code: "ONF",
    name: "ONF",
    role: "Economic Infrastructure",
    label: "Permanent Division",
    locked: true,
    description:
      "Controls trade pipelines, resource flow, and market positioning. Translates controlled expansion into measurable economic output.",
  },
  ONA: {
    code: "ONA",
    name: "ONA",
    role: "Strategic Analysis",
    label: "Permanent Division",
    locked: true,
    description:
      "Maps the wider landscape, monitors external movement, and produces the intelligence picture used to direct expansion.",
  },
  KASAII: {
    code: "KASAII",
    name: "KASAII",
    role: "Perimeter Control",
    label: "Permanent Division",
    locked: true,
    description:
      "Holds defensive structure and perimeter integrity. Responds to external pressure within the framework of empire doctrine.",
  },
};
