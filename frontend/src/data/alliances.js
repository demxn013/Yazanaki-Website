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

// Structured, informational steps shown instead of a form.
// Keep these stable — the Alliance Process section reads from here.
export const allianceProcess = [
  {
    step: 1,
    title: "Contact via Discord",
    body:
      "Initiate via the Yazanaki Empire Discord. Direct channels are gated; introductions happen through announced entry points.",
  },
  {
    step: 2,
    title: "Submit faction details",
    body:
      "Provide faction name, size, specialization, and current posture. Submissions outside this structure are not reviewed.",
  },
  {
    step: 3,
    title: "Negotiation",
    body:
      "Terms are discussed against structural fit and contribution capacity. Scalable by size, specialization, and intent.",
  },
  {
    step: 4,
    title: "Agreement finalized",
    body:
      "A written, scalable agreement is established. Integration into trade and coordination layers follows formalization.",
  },
];
