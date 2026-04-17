import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { empire } from "../data";

const linkBase =
  "relative text-[14px] tracking-tight text-primary hover:text-accent transition-colors duration-150";
const linkActive = "text-primary";

function DesktopLink({ to, testId, children }) {
  return (
    <NavLink
      to={to}
      data-testid={testId}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? linkActive : ""}`
      }
    >
      {({ isActive }) => (
        <span className="relative inline-block">
          {children}
          {isActive && <span className="nav-active-marker" aria-hidden />}
        </span>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="global-navbar"
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-line"
    >
      <div className="max-w-container mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link
          to="/"
          data-testid="brand-wordmark"
          className="flex items-center gap-3"
        >
          <span className="inline-block w-[22px] h-[22px] rounded-[6px] border border-line relative overflow-hidden">
            <span className="absolute inset-[3px] rounded-[3px] bg-accent/90" />
            <span className="absolute inset-[7px] rounded-[2px] bg-background" />
          </span>
          <span className="text-[15px] font-semibold tracking-[0.22em] text-primary">
            YAZANAKI
          </span>
          <span className="hidden md:inline text-[11px] tracking-[0.28em] text-muted border-l border-line pl-3 ml-1">
            EMPIRE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <DesktopLink to="/clans" testId="nav-clans-link">
            Clans
          </DesktopLink>
          <DesktopLink to="/alliances" testId="nav-alliances-link">
            Alliances
          </DesktopLink>
          <DesktopLink to="/registry" testId="nav-registry-link">
            Registry
          </DesktopLink>
        </nav>

        <div className="flex items-center gap-3">
          <a
            data-testid="nav-discord-button"
            href={empire.discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden sm:inline-flex"
          >
            Discord
          </a>
          <button
            data-testid="nav-mobile-toggle"
            className="md:hidden p-2 rounded-[10px] border border-line text-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="md:hidden border-t border-line bg-background"
        >
          <div className="max-w-container mx-auto px-6 py-4 flex flex-col gap-4">
            <NavLink
              onClick={() => setOpen(false)}
              to="/clans"
              data-testid="nav-mobile-clans"
              className={linkBase}
            >
              Clans
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/alliances"
              data-testid="nav-mobile-alliances"
              className={linkBase}
            >
              Alliances
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/registry"
              data-testid="nav-mobile-registry"
              className={linkBase}
            >
              Registry
            </NavLink>
            <a
              data-testid="nav-mobile-discord"
              href={empire.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Discord
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
