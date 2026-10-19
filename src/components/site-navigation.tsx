import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import edcLogo from "@/assets/edc-nitdgp-logo.png.asset.json";

const links: [string, string][] = [
  ["Home", "#top"],
  ["Startups", "#startups"],
  ["Internships", "#internships"],
  ["EDC", "#sotm"],
  ["E-Quest", "#equest"],
  ["SoTM", "#sotm"],
  ["Our Team", "#contact"],
  ["IIC", "https://iic.mic.gov.in/"],
];

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="floating-nav" aria-label="Primary navigation">
      <a
        href="#top"
        className="brand-logo is-compact"
        aria-label="EDC NIT Durgapur home"
        onClick={() => {
          setOpen(false);
          setActive("Home");
        }}
      >
        <img src={edcLogo.url} alt="Entrepreneurship Development Cell, NIT Durgapur" />
      </a>
      <Button
        ref={toggle}
        variant="ghost"
        size="icon"
        className="nav-menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      <nav id="site-navigation" className={`nav-content ${open ? "is-open" : ""}`}>
        <div className="nav-main-links">
          {links.map(([label, href]) => (
            <Button
              asChild
              variant="ghost"
              className={`nav-link ${active === label ? "is-current" : ""}`}
              key={label}
            >
              <a
                href={href}
                aria-current={active === label ? "location" : undefined}
                target={href.startsWith("https") ? "_blank" : undefined}
                rel={href.startsWith("https") ? "noreferrer" : undefined}
                onClick={() => {
                  setOpen(false);
                  setActive(label);
                }}
              >
                {label}
                {label === "IIC" && <ArrowUpRight />}
              </a>
            </Button>
          ))}
        </div>
        <div className="nav-account-links">
          <Button asChild variant="ghost" className="nav-link nav-login">
            <a
              href="mailto:edcnitd.official@gmail.com?subject=EDC%20Login"
              onClick={() => setOpen(false)}
            >
              Login
            </a>
          </Button>
          <Button asChild className="nav-link nav-register">
            <a
              href="mailto:edcnitd.official@gmail.com?subject=EDC%20Registration"
              onClick={() => setOpen(false)}
            >
              Register <ArrowUpRight />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
