// Systems / layers content. Home and Systems pages both read from here.
// Icon names are strings — resolved in the component via a small lookup map
// so this data file stays framework-free (portable to an API later).
export const systems = [
  {
    key: "economy",
    icon: "TrendingUp",
    title: "Economy",
    lead: "Measured trade. Engineered efficiency.",
    points: [
      "Optimized trade pipelines across divisions",
      "Resource flow efficiency as a governance metric",
      "Market awareness, not market speculation",
      "Controlled reinvestment into structural expansion",
    ],
  },
  {
    key: "governance",
    icon: "Landmark",
    title: "Governance",
    lead: "Centralized authority. Structured divisions.",
    points: [
      "Single governance layer across all five divisions",
      "Defined roles for SNU, ANO, ONF, ONA, and KASAII",
      "Internal doctrine reviewed, not improvised",
      "No personality-driven leadership vacuums",
    ],
  },
  {
    key: "alliances",
    icon: "Network",
    title: "Alliances",
    lead: "Contract-based. Scalable by design.",
    points: [
      "Formal written terms over informal understandings",
      "Scalable agreements by faction size and posture",
      "Economic integration without internal absorption",
      "Reviewable clauses, measurable contribution",
    ],
  },
];

// Three-column explanation used on the Alliances page.
export const allianceSystemColumns = [
  {
    icon: "FileSignature",
    title: "Structured Agreements",
    body:
      "All alliances operate under formal, written terms. Nothing verbal. Nothing ambiguous. Each clause is reviewable.",
  },
  {
    icon: "Maximize2",
    title: "Scalable Terms",
    body:
      "Agreements adapt to the allied faction's size, specialization, and posture. Not one-size-fits-all.",
  },
  {
    icon: "Coins",
    title: "Economic Integration",
    body:
      "Controlled integration into trade flows and resource pipelines. Alliance value is measurable, not symbolic.",
  },
];

// Principles shown at the top of the Clans page.
export const clansPrinciples = [
  {
    icon: "Lock",
    title: "Permanent",
    body: "Divisions are fixed. Not replaced. Not absorbed. Not rotated.",
  },
  {
    icon: "Layers",
    title: "Structured",
    body: "Each division holds a clearly defined role within the empire.",
  },
  {
    icon: "ShieldCheck",
    title: "Internal",
    body: "Operating under a single governance layer, not independent clans.",
  },
];

// Philosophy pillars shown on the landing page.
export const philosophy = [
  {
    title: "Systems over personalities.",
    body:
      "Authority runs through structure, not individuals. The empire persists because its systems do.",
  },
  {
    title: "Structure over chaos.",
    body:
      "Every division, every relationship, every decision is placed inside a defined framework.",
  },
  {
    title: "Expansion through control.",
    body:
      "Growth is earned, measured, and retained. Never speculative, never performative.",
  },
];
