import React from "react";

const statusStyles = {
  Active: "badge-active",
  Reserve: "text-secondary border-line bg-elevated border rounded-full inline-flex items-center gap-1.5 text-[11px] tracking-[0.22em] uppercase px-2.5 py-1",
  Inactive: "text-muted border-line bg-background border rounded-full inline-flex items-center gap-1.5 text-[11px] tracking-[0.22em] uppercase px-2.5 py-1",
};

const roleStyles = {
  Leader: "text-primary",
  Officer: "text-primary",
  Member: "text-secondary",
  Initiate: "text-muted",
};

export default function MemberRow({ member, index = 0 }) {
  const { empireId, username, clan, role, status } = member;
  const statusClass = statusStyles[status] || statusStyles.Inactive;
  const roleClass = roleStyles[role] || "text-secondary";

  return (
    <tr
      data-testid={`member-row-${empireId}`}
      className="border-t border-line hover:bg-elevated/40 transition-colors duration-150"
    >
      <td className="px-5 py-4 font-mono text-[13px] text-accent tracking-[0.08em]">
        {empireId}
      </td>
      <td className="px-5 py-4 text-[14px] text-primary">{username}</td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-2 text-[12px] text-secondary tracking-[0.22em] uppercase">
          <span className="w-1 h-1 rounded-full bg-accent" />
          {clan}
        </span>
      </td>
      <td className={`px-5 py-4 text-[13px] ${roleClass}`}>{role}</td>
      <td className="px-5 py-4">
        {status === "Active" ? (
          <span className="badge-active">
            <span className="pulse" />
            {status}
          </span>
        ) : (
          <span className={statusClass}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {status}
          </span>
        )}
      </td>
    </tr>
  );
}
