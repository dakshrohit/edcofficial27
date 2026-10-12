import { Link } from "@tanstack/react-router";
import { SITE_NAV } from "@/data/site";

export function SiteNav({ onNavigate, footer = false }: { onNavigate?: () => void; footer?: boolean }) {
  return <nav aria-label={footer ? "Footer navigation" : "Main navigation"} className={footer ? "footer-links" : "site-links"}>
    {SITE_NAV.map(item => item.href === "/" ?
      <Link key={item.label} to="/" aria-current="page" onClick={onNavigate} className="nav-link nav-active">{item.label}</Link> :
      item.href ? <a key={item.label} href={item.href} onClick={onNavigate} className="nav-link">{item.label}</a> :
        <span key={item.label} aria-disabled="true" title="Destination not yet configured" className="nav-link nav-unavailable">{item.label}</span>)}
  </nav>;
}