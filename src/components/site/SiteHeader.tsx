import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EDC } from "@/data/site";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="site-header-frame">
      <Link to="/" className="brand-link" aria-label="EDC NIT Durgapur — Our Team"><img src={EDC.logo} alt="EDC NIT Durgapur" width="110" height="48" /></Link>
      <div className="desktop-navigation"><SiteNav /><Button variant="brand" asChild><a href={EDC.joinUrl}>Join EDC <ArrowUpRight /></a></Button></div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild><Button variant="editorial" size="icon" className="mobile-menu min-h-11 min-w-11" aria-label="Open navigation"><Menu /></Button></SheetTrigger>
        <SheetContent className="mobile-navigation w-full max-w-sm bg-background text-foreground">
          <SheetTitle className="font-display text-4xl uppercase">EDC / NIT Durgapur</SheetTitle>
          <SheetDescription className="sr-only">Website navigation</SheetDescription>
          <SiteNav onNavigate={() => setOpen(false)} />
          <Button variant="brand" asChild className="mt-6 w-full"><a href={EDC.joinUrl}>Join EDC <ArrowUpRight /></a></Button>
        </SheetContent>
      </Sheet>
    </div>
  </header>;
}