import React, { useMemo, useState } from "react";
import { Search, Users, CircleDot, Layers } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import MemberRow from "../components/MemberRow";
import {
  getMembers,
  getMemberStats,
  empire,
  memberStatuses,
} from "../data";

export default function Members() {
  const allMembers = getMembers();
  const stats = getMemberStats();
  const [query, setQuery] = useState("");
  const [clanFilter, setClanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const clanOptions = useMemo(
    () => ["All", ...empire.coreClans],
    []
  );
  const statusOptions = useMemo(() => ["All", ...memberStatuses], []);

  const filtered = useMemo(() => {
    return allMembers.filter((m) => {
      if (clanFilter !== "All" && m.clan !== clanFilter) return false;
      if (statusFilter !== "All" && m.status !== statusFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        m.username.toLowerCase().includes(q) ||
        m.empireId.toLowerCase().includes(q) ||
        m.clan.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q)
      );
    });
  }, [allMembers, query, clanFilter, statusFilter]);

  const statCards = [
    { icon: Users, label: "Total Registered", value: stats.total },
    { icon: CircleDot, label: "Active", value: stats.active },
    { icon: Layers, label: "Divisions Represented", value: stats.clansRepresented },
  ];

  return (
    <div data-testid="members-page">
      <section className="border-b border-line">
        <div className="max-w-container mx-auto px-6 pt-20 pb-14">
          <SectionHeader
            eyebrow="Registry"
            title="EmpireID — member registry."
            description="Every registered entity carries an EmpireID. The registry is the structural index across all divisions. This is a placeholder — records will sync from the KenzAI bot and backend services once wired."
          />

          <div className="grid sm:grid-cols-3 gap-4 mt-12">
            {statCards.map((s, i) => (
              <div
                key={s.label}
                data-testid={`registry-stat-${i}`}
                className="card-base p-5 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="text-[11px] tracking-[0.26em] text-muted uppercase">
                    {s.label}
                  </div>
                  <div className="text-[30px] font-semibold text-primary tracking-tight mt-2">
                    {s.value}
                  </div>
                </div>
                <div className="w-9 h-9 rounded-[10px] border border-line flex items-center justify-center text-accent shrink-0">
                  <s.icon size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-container mx-auto px-6 py-16">
        {/* Controls */}
        <div
          data-testid="registry-controls"
          className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6"
        >
          <div className="relative flex-1 max-w-md">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              data-testid="registry-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search EmpireID, username, clan…"
              className="input-dark pl-10"
            />
          </div>
          <div className="flex gap-3">
            <select
              data-testid="registry-clan-filter"
              value={clanFilter}
              onChange={(e) => setClanFilter(e.target.value)}
              className="input-dark appearance-none pr-10 cursor-pointer min-w-[160px]"
            >
              {clanOptions.map((c) => (
                <option key={c} value={c}>
                  Clan · {c}
                </option>
              ))}
            </select>
            <select
              data-testid="registry-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-dark appearance-none pr-10 cursor-pointer min-w-[160px]"
            >
              {statusOptions.map((c) => (
                <option key={c} value={c}>
                  Status · {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div
          data-testid="registry-table-wrap"
          className="card-base overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-elevated/40">
            <div className="text-[11px] tracking-[0.28em] text-muted uppercase">
              Registry · {filtered.length} of {allMembers.length}
            </div>
            <div className="text-[11px] tracking-[0.28em] text-muted uppercase">
              Placeholder Data
            </div>
          </div>
          <div className="overflow-x-auto">
            <table
              data-testid="registry-table"
              className="w-full text-left"
            >
              <thead>
                <tr className="text-[11px] tracking-[0.22em] uppercase text-muted">
                  <th className="px-5 py-3 font-medium">Empire ID</th>
                  <th className="px-5 py-3 font-medium">Username</th>
                  <th className="px-5 py-3 font-medium">Clan</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      data-testid="registry-empty"
                      className="px-5 py-16 text-center text-secondary text-[14px]"
                    >
                      No records match the current filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((m, i) => (
                    <MemberRow key={m.empireId} member={m} index={i} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-[12px] text-muted mt-4">
          Source: <code className="text-secondary">/src/data/members.js</code>.
          Swap for an API call in <code className="text-secondary">getMembers()</code> when backend is live.
        </p>
      </section>
    </div>
  );
}
