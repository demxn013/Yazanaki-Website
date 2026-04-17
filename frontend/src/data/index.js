// Central data aggregator and lookup helpers.
// Every page imports from here so swapping a static JS file for an API
// later is a one-file change.
import { empire } from "./empire";
import { clans } from "./clans";
import { alliances, allianceProcess } from "./alliances";
import { members, memberRoles, memberStatuses } from "./members";
import {
  allianceSystemColumns,
  clansPrinciples,
  philosophy,
} from "./systems";

export {
  empire,
  clans,
  alliances,
  allianceProcess,
  members,
  memberRoles,
  memberStatuses,
  allianceSystemColumns,
  clansPrinciples,
  philosophy,
};

// ---------- Lookups ----------

export function getClan(code) {
  return clans[code] || null;
}

export function getAlliance(code) {
  return alliances[code] || null;
}

// ---------- Derived selectors ----------

export function getCoreClanList() {
  return empire.coreClans.map(getClan).filter(Boolean);
}

export function getAllianceList() {
  return empire.alliances.map(getAlliance).filter(Boolean);
}

export function getMembers() {
  return members;
}

export function getMemberStats() {
  const total = members.length;
  const active = members.filter((m) => m.status === "Active").length;
  const clansRepresented = new Set(members.map((m) => m.clan)).size;
  return { total, active, clansRepresented };
}

// ---------- Stat strip data (landing page) ----------

export function getLandingStats() {
  return [
    { label: "Core Divisions", value: String(empire.coreClans.length) },
    { label: "Active Alliance", value: String(empire.alliances.length) },
    { label: "Governance", value: empire.governance },
  ];
}
