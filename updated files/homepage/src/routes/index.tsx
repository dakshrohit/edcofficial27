import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import logoAsset from "@/assets/edc-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "EDC NIT Durgapur | Build What’s Next" },
    { name: "description", content: "NIT Durgapur’s student-led entrepreneurship community. Ideate, innovate and incubate with EDC." },
    { property: "og:title", content: "EDC NIT Durgapur" },
    { property: "og:description", content: "A launchpad for ambitious student founders." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Home,
});

const programs: Array<[string, string, string, string, string]> = [
  ["01", "E-Summit", "Eastern India’s second-largest entrepreneurship fest—three days of bold ideas, fierce pitches and honest conversations.", "https://esummit.edcnitd.co.in", "orange"],
  ["02", "E-Talks", "Unfiltered sessions with founders and leaders who have built, failed, learned and built again.", "", "yellow"],
  ["03", "Startup Expo", "Early-stage ventures meet students, investors and the people who can unlock their next chapter.", "", "red"],
  ["04", "Pitchfest", "A campus Shark Tank where founders pitch professionals for feedback, funding and momentum.", "", "blue"],
  ["05", "Hult Prize", "The campus round of the world’s largest student social-enterprise competition—with a $1M global prize.", "https://hult.edcnitd.co.in", "orange"],
];

const startups = [
  ["Kenakata", "A campus marketplace that connected buyers and sellers before evolving into a peer learning platform."],
  ["Calcutta Delights", "A hostel delivery experiment that grew into authentic Bengali sweet delivery across South Kolkata."],
  ["Printex", "Round-the-clock affordable printing inside campus hostels, built around a very real student problem."],
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const slide = (direction: number) => track.current?.scrollBy({ left: direction * Math.min(520, window.innerWidth * 0.82), behavior: "smooth" });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    const onScroll = () => document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    if (!reduced) {
      import("lenis").then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
        const raf = (time: number) => { lenis?.raf(time); frame = requestAnimationFrame(raf); };
        frame = requestAnimationFrame(raf);
      });
    }
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); lenis?.destroy(); };
  }, []);


  return <main className="overflow-hidden bg-background text-foreground">
    <header className="sticky top-0 z-50 border-b-[3px] border-foreground bg-background">
      <div className="mx-auto flex h-[74px] max-w-[1380px] items-center justify-between px-5 lg:px-9">
        <a href="#top" className="flex items-center gap-3" aria-label="EDC home"><img src={logoAsset.url} alt="" className="h-11 w-[94px] border-2 border-foreground bg-foreground object-contain" /><span className="font-display text-xl leading-[.8]">EDC<br /><small className="font-sans text-[9px] font-bold">NIT DURGAPUR</small></span></a>
        <nav className="hidden items-center gap-9 font-display text-lg md:flex" aria-label="Main navigation"><a className="nav-link" href="#about">ABOUT</a><a className="nav-link" href="#programs">EVENTS</a><a className="nav-link" href="#stories">STORIES</a><a className="brutal-button compact" href="https://audition.edcnitd.co.in" target="_blank" rel="noreferrer">JOIN THE CELL <ArrowUpRight size={18} /></a></nav>
        <button className="menu-button md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav className="mobile-menu"><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a><a href="#programs" onClick={() => setMenuOpen(false)}>EVENTS</a><a href="#stories" onClick={() => setMenuOpen(false)}>STORIES</a></nav>}
    </header>

    <section id="top" className="hero-stage">
      <div className="hero-dots" />
      <div className="hero-noise" aria-hidden="true">IDEAS / IMPACT / IDEAS / IMPACT /</div>
      <div className="mx-auto grid min-h-[calc(100svh-74px)] max-w-[1380px] items-center gap-12 px-5 py-14 lg:grid-cols-[1.15fr_.85fr] lg:px-9">
        <div className="relative z-10">
          <div className="sticker sticker-orange">NIT DURGAPUR · EST. 2015</div>
          <h1 className="hero-title"><span>THINK</span><span className="cutout">BIGGER.</span><span>BUILD IT.</span></h1>
          <p className="mt-7 max-w-xl text-lg font-semibold leading-relaxed md:text-xl">The student-led launchpad where curious minds become founders, campus problems become ventures, and ambition gets very real.</p>
          <div className="mt-8 flex flex-wrap gap-4"><a className="brutal-button" href="#programs">SEE WHAT WE BUILD <ArrowRight /></a><a className="brutal-button ghost" href="https://audition.edcnitd.co.in" target="_blank" rel="noreferrer">JOIN US <ArrowUpRight /></a></div>
        </div>
        <div className="hero-collage card-stack" aria-hidden="true" tabIndex={0}>
          <div className="stack-item poster back-poster"><span>IDEATE</span><span>INNOVATE</span><span>INCUBATE</span></div>
          <div className="stack-item poster venture-poster"><span className="poster-index">E! / 002</span><strong>FROM<br />CAMPUS<br />TO COMPANY.</strong><span className="venture-stamp">BUILD / TEST / LAUNCH</span></div>
          <div className="stack-item poster logo-poster"><span className="poster-index">E! / 001</span><img src={logoAsset.url} alt="" /><strong>MAKE<br />SOMETHING<br />MATTER.</strong></div>
          <div className="stack-item tape-note">NO BORING IDEAS ↗</div>
          <div className="stack-item burst">10<br /><small>YEARS</small></div>
        </div>

      </div>
    </section>

    <div className="ticker" aria-hidden="true"><div><span>IDEATE</span><b>✦</b><span>INNOVATE</span><b>✦</b><span>INCUBATE</span><b>✦</b><span>PITCH</span><b>✦</b><span>BUILD</span><b>✦</b><span>IDEATE</span><b>✦</b><span>INNOVATE</span><b>✦</b><span>INCUBATE</span><b>✦</b><span>PITCH</span><b>✦</b><span>BUILD</span><b>✦</b></div></div>

    <section id="about" className="section-space relative bg-background">
      <div className="giant-number">01</div>
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-9">
        <div data-reveal className="reveal relative z-10"><span className="section-kicker">ABOUT EDC</span><h2 className="section-title mt-5">NOT A CLUB.<br /><span className="red-stroke">A MOVEMENT.</span></h2></div>
        <div data-reveal className="reveal delay-1 relative z-10 lg:pt-16"><p className="text-2xl font-semibold leading-snug md:text-4xl">We’re NIT Durgapur’s official entrepreneurship body—run entirely by students who would rather make things happen than wait for permission.</p><div className="stat-strip"><Stat value="2015" label="THE FIRST SPARK" /><Stat value="70+" label="BUILDERS TODAY" /><Stat value="∞" label="WAYS FORWARD" /></div></div>
      </div>
    </section>

    <CraftSection />

    <section className="event-lanyard-section" aria-labelledby="event-lanyards-heading">
      <div className="event-lanyard-heading">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-9">
          <span className="section-kicker">IDEAS IN MOTION / 04</span>
          <h2 id="event-lanyards-heading" className="section-title mt-5">THE EVENTS<br />WE CONDUCT.</h2>
        </div>
      </div>
      <EventLanyardGallery />
    </section>


    <section id="programs" className="section-space border-y-[3px] border-foreground bg-accent">
      <div className="mx-auto max-w-[1380px] px-5 lg:px-9">
        <div data-reveal className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><span className="section-kicker">THE CALENDAR / 02</span><h2 className="section-title mt-5">PRESSURE<br />MAKES IDEAS.</h2></div><div className="flex items-center gap-3"><button className="carousel-button" onClick={() => slide(-1)} aria-label="Previous event"><ArrowLeft /></button><button className="carousel-button" onClick={() => slide(1)} aria-label="Next event"><ArrowRight /></button></div></div>
      </div>
      <div ref={track} className="carousel-track mt-14 pl-[max(1.25rem,calc((100vw-1380px)/2+2.25rem))]">
        {programs.map(([n, name, copy, link, tone], i) => <EventCard key={n} number={n} name={name} copy={copy} link={link} tone={tone} index={i} />)}
      </div>
    </section>

    <section className="manifesto"><div className="manifesto-track">FROM “WHAT IF?”&nbsp; TO “WATCH THIS.”&nbsp; FROM “WHAT IF?”&nbsp; TO “WATCH THIS.”</div><div data-reveal className="reveal manifesto-card"><span>THE E-SUMMIT EFFECT</span><h2>AMBITION,<br />BUT LOUDER.</h2><p>Eastern India’s second-largest entrepreneurship summit turns campus into a collision point for founders, investors, creators and the next impossible idea.</p><a className="brutal-button light" href="https://esummit.edcnitd.co.in" target="_blank" rel="noreferrer">ENTER E-SUMMIT <ArrowUpRight /></a></div></section>

    <section id="stories" className="section-space bg-background">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-9"><div data-reveal className="reveal"><span className="section-kicker">BUILT HERE / 03</span><h2 className="section-title mt-5">SMALL START.<br />REAL IMPACT.</h2></div><div className="startup-grid mt-14">{startups.map(([name, text], i) => <motion.article initial={{ opacity: 0, y: 48, scale: .96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -10, rotate: i % 2 ? 1.2 : -1.2 }} className={`startup-note note-${i + 1}`} key={name}><span>0{i + 1}</span><h3>{name}</h3><p>{text}</p></motion.article>)}</div></div>
    </section>

    <section className="join-section"><div className="join-grid" aria-hidden="true" /><div data-reveal className="reveal relative z-10 mx-auto max-w-[1280px] px-5 lg:px-9"><span className="sticker sticker-light">YOUR MOVE</span><h2>DON’T JUST<br />WATCH IDEAS.<br /><span>BUILD ONE.</span></h2><a className="brutal-button huge" href="https://audition.edcnitd.co.in" target="_blank" rel="noreferrer">JOIN EDC <ArrowUpRight /></a></div></section>

    <footer><div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-9 px-5 py-10 md:flex-row md:items-end lg:px-9"><div><img src={logoAsset.url} alt="EDC NIT Durgapur" className="h-16 bg-foreground object-contain" /><p className="mt-4 text-sm font-semibold">Mahatma Gandhi Avenue, A-Zone<br />Durgapur, West Bengal — 713209</p></div><div className="flex flex-wrap gap-6 font-display text-xl"><a href="https://www.instagram.com/edc.nitd" target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href="https://www.linkedin.com/company/edcnitd/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:edc@nitdgp.ac.in">EMAIL ↗</a></div></div></footer>
  </main>;
}

function EventLanyardGallery() {
  const [Gallery, setGallery] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    import("@/components/EventLanyardGallery").then(({ default: component }) => {
      if (active) setGallery(() => component);
    });
    return () => { active = false; };
  }, []);

  return Gallery ? <Gallery /> : <div className="event-lanyard-loading" aria-hidden="true" />;
}

function Stat({ value, label }: { value: string; label: string }) { return <div><strong>{value}</strong><span>{label}</span></div>; }

function EventCard({ number, name, copy, link, tone, index }: { number: string; name: string; copy: string; link: string; tone: string; index: number }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-.5, .5], [7, -7]), { stiffness: 230, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-.5, .5], [-7, 7]), { stiffness: 230, damping: 22 });
  const glareX = useTransform(pointerX, [-.5, .5], [15, 85]);
  const glareY = useTransform(pointerY, [-.5, .5], [15, 85]);

  return <motion.article
    whileHover={{ y: -12, scale: 1.025 }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}
    style={{ rotateX, rotateY, transformPerspective: 900 }}
    onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width - .5);
      pointerY.set((event.clientY - rect.top) / rect.height - .5);
    }}
    onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
    className={`event-card tone-${tone}`}
    data-index={index}
  >
    <motion.span className="event-glare" style={{ left: glareX, top: glareY }} />
    <motion.div initial={{ x: -42, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: .55, delay: index * .08 }} className="event-card-top"><span className="event-number">{number}</span><span className="event-cross">+</span></motion.div>
    <motion.div initial={{ y: 54, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: .65, delay: .12 + index * .08, ease: [.16, 1, .3, 1] }}><h3>{name}</h3><p>{copy}</p>{link && <a href={link} target="_blank" rel="noreferrer">EXPLORE <ArrowUpRight size={19} /></a>}</motion.div>
  </motion.article>;
}

function CraftSection() {
  return <section className="craft-section" aria-labelledby="craft-heading">
    <div className="craft-inner mx-auto max-w-[1380px] px-5 lg:px-9">
      <div className="craft-headline">
        <h2 id="craft-heading">LET’S CRAFT<br />SUCCESS<br />STORIES WITH<br /><span className="circled">YOUR</span><br />IDEAS</h2>
      </div>
      <CraftPaperExperience />
    </div>
  </section>;
}

function CraftPaperExperience() {
  const [Sequence, setSequence] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    import("@/components/CraftPaperSequence").then(({ default: component }) => {
      if (active) setSequence(() => component);
    });
    return () => { active = false; };
  }, []);

  return Sequence ? <Sequence /> : <div className="craft-paper-loading-shell" aria-hidden="true" />;
}
