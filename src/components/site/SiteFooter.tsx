import { ClientOnly } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import { EDC } from "@/data/site";
import { SiteNav } from "./SiteNav";
import { FooterEyes } from "./FooterEyes";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="page-container">
      <div className="footer-top">
        <section><h2 className="footer-heading">Find us.</h2><div className="mt-5 flex items-start gap-3"><MapPin className="mt-1 size-5 shrink-0 text-primary" /><address className="max-w-xs not-italic leading-relaxed"><span className="block font-bold">EDC, NIT Durgapur</span>{EDC.address}</address></div></section>
        <section><h2 className="footer-heading">Talk to us.</h2><a className="footer-contact" href={`mailto:${EDC.email}`}><Mail />{EDC.email}</a><a className="footer-contact" href="tel:+917007647720"><Phone />{EDC.phone}</a><p className="ml-8 text-xs text-muted-foreground">{EDC.phoneContact}</p></section>
        <section><h2 className="footer-heading">Useful links.</h2><SiteNav footer /></section>
      </div>
      <div className="footer-brand-row">
        <div className="footer-wordmark"><img src={EDC.logo} alt="EDC" width="230" height="105" /><div><p className="font-display text-2xl uppercase leading-tight">Entrepreneurship &<br />Development Cell</p><p className="mt-2 font-mono text-xs uppercase text-primary">NIT Durgapur</p></div></div>
        <ClientOnly><FooterEyes /></ClientOnly>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} EDC NIT Durgapur</p><p>Made with intent. By the WebD team.</p><div className="flex gap-5"><a href={EDC.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight className="inline size-3" /></a><a href={EDC.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight className="inline size-3" /></a></div></div>
    </div>
  </footer>;
}