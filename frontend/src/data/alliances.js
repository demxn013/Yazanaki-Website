// Alliance detail records, keyed by code.
// Alliances page reads empire.alliances and hydrates via getAlliance().
// Each alliance is anchored to: a Yazanaki clan contact, a server, and a type.
export const alliances = {
  Excalibur: {
    code: "Excalibur",
    name: "Excalibur",
    label: "Allied Faction",
    status: "Active",
    // New structured fields (replaces Relation / Control / Terms)
    clan: "SNU",
    server: "SV-01",
    type: "Mutual Defense Pact",
    emblem: "/assets/emblems/excalibur.png",
    description:
      "Independent external faction operating under a structured agreement with the Yazanaki Empire. Not governed internally.",
  },
};

// Valid agreement types for alliances (kept minimal, UI reads from here).
export const allianceTypes = [
  "Mutual Defense Pact",
  "Non-Aggression Pact",
  "Full Alliance",
];

// Structured, informational steps shown instead of a form.
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
