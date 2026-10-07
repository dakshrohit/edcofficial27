import { createFileRoute } from "@tanstack/react-router";
import { CaseStudy } from "@/components/CaseStudy";
import { SprintChart } from "@/components/SprintChart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Consultancy — Entrepreneurship & Development" },
      {
        name: "description",
        content: "Student-led strategy consultancy helping ambitious ideas become defensible, market-ready ventures.",
      },
      { property: "og:title", content: "Consultancy — Entrepreneurship & Development" },
      {
        property: "og:description",
        content: "Bold strategy, customer research, business models, and launch support from E&D Consultancy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConsultancyPage,
});

const services = [
  {
    number: "01",
    title: "Strategy & Framing",
    copy: "Turn fuzzy ideas into a testable, defensible thesis before time and resources are committed.",
    tone: "bg-electric text-electric-foreground md:col-span-3",
  },
  {
    number: "02",
    title: "Market & Customer Research",
    copy: "Interviews, market sizing, and positioning reveal who needs the solution and why.",
    tone: "bg-lime text-ink",
  },
  {
    number: "03",
    title: "Business Model & Pricing",
    copy: "Revenue logic, unit economics, and pricing assumptions built into defensible models.",
    tone: "bg-surface text-ink",
  },
  {
    number: "04",
    title: "Launch & Operations Readiness",
    copy: "Practical go-to-market checklists, first metrics, and operating rhythm.",
    tone: "bg-industrial text-electric-foreground",
  },
];

const stats = [
  ["04+", "Sprints completed"],
  ["100%", "Student-led"],
  ["15+", "Founders helped"],
  ["Trusted", "By club partners"],
];

const process = ["Discover", "Plan", "Build", "Launch"];

const partnerMarks = [
  <svg key="orbit" viewBox="0 0 32 32" className="size-7" aria-hidden="true">
    <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="16" cy="16" r="3" fill="currentColor" />
  </svg>,
  <svg key="stack" viewBox="0 0 32 32" className="size-7" aria-hidden="true">
    <path d="M4 6h24v7H4zM4 19h15v7H4z" fill="currentColor" />
  </svg>,
  <svg key="peak" viewBox="0 0 32 32" className="size-7" aria-hidden="true">
    <path d="M3 26 12 6l5 11 4-8 8 17h-7l-2-5-3 5h-5l-1-4-2 4H3Z" fill="currentColor" />
  </svg>,
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function ConsultancyPage() {
  return (
    <div className="min-h-screen bg-canvas font-body text-ink selection:bg-lime selection:text-ink">
      <div className="overflow-hidden border-b-2 border-ink bg-electric py-2 text-electric-foreground" aria-label="Announcement">
        <div className="announcement-track flex w-max whitespace-nowrap text-xs font-extrabold uppercase">
          {[0, 1].map((copy) => (
            <span key={copy} className="px-7">
              // E&amp;D Consultancy Division&nbsp; • &nbsp;Spring Issues&nbsp; • &nbsp;4-Week Strategy Sprints
            </span>
          ))}
        </div>
      </div>

      <header className="border-b-2 border-ink bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="E and D Consultancy home">
            <span className="grid size-10 place-items-center border-2 border-ink bg-ink font-display text-sm text-electric-foreground">E&amp;D</span>
            <span className="hidden text-sm font-black uppercase sm:block">Consultancy</span>
          </a>
          <nav className="flex items-center gap-2 sm:gap-3" aria-label="Primary navigation">
            <a href="#services" className="neo-nav hidden bg-surface sm:inline-flex">Services</a>
            <a href="#process" className="neo-nav hidden bg-surface md:inline-flex">Process</a>
            <a href="#case-study" className="neo-nav hidden bg-surface lg:inline-flex">Case study</a>
            <a href="#contact" className="neo-button bg-lime text-ink">
              Book a consultation <ArrowIcon />
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]" aria-labelledby="page-title">
          <div className="enter-card neo-card flex min-h-[520px] flex-col justify-between bg-canvas p-5 sm:p-8 lg:p-10">
            <div>
              <h1 id="page-title" className="mt-8 max-w-[11ch] font-display text-5xl font-black uppercase leading-[0.92] sm:text-6xl lg:text-7xl">
                Strategize bold. Build fast. Launch now.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed sm:text-xl">
                A student-led strategy consultancy turning fuzzy ideas into defensible, market-ready models.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="neo-button bg-electric text-electric-foreground">Start a sprint <ArrowIcon /></a>
              <a href="#services" className="neo-button bg-surface text-ink">Explore services</a>
            </div>
          </div>

          <div className="enter-card delay-1 neo-card flex min-w-0 items-center justify-center bg-electric p-8" aria-label="Interactive sprint allocation chart">
            <SprintChart />
          </div>
        </section>

        <section className="scroll-reveal mt-7 grid border-2 border-ink bg-surface sm:grid-cols-2 lg:grid-cols-4" aria-label="Consultancy statistics">
          {stats.map(([value, label], index) => (
            <div key={label} className={`stat-cell p-5 sm:p-6 ${index > 0 ? "border-t-2 border-ink sm:border-t-0 sm:[&:nth-child(odd)]:border-l-2 lg:border-l-2" : ""} ${index === 2 ? "sm:border-t-2 lg:border-t-0" : ""}`}>
              <div className="font-display text-4xl font-black uppercase leading-none">{value}</div>
              <div className="mt-2 text-xs font-black uppercase">{label}</div>
              {index === 3 && (
                <div className="mt-4 flex w-full flex-row items-center justify-around gap-4" aria-label="Partner logo placeholders">
                  {partnerMarks.map((mark, markIndex) => (
                    <span key={markIndex} className="partner-mark grid size-9 place-items-center" aria-hidden="true">{mark}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <section id="services" className="scroll-reveal scroll-mt-6 py-16 sm:py-20" aria-labelledby="services-title">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="section-tag">// What we solve</div>
              <h2 id="services-title" className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">Service offerings</h2>
            </div>
            <p className="max-w-sm text-sm font-semibold leading-relaxed">Built for founders who need clear decisions, not more noise.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className={`lift-card relative min-h-[280px] border-2 border-ink p-6 shadow-hard ${service.tone}`}>
                <a href="#contact" className="arrow-button absolute right-5 top-5" aria-label={`Discuss ${service.title}`}><ArrowIcon /></a>
                <div className="flex h-full flex-col justify-between pr-14">
                  <span className="font-display text-xl font-black">{service.number}.</span>
                  <div className="mt-14">
                    <h3 className="max-w-[16ch] font-display text-2xl font-black uppercase leading-tight sm:text-3xl">{service.title}</h3>
                    <p className="mt-4 max-w-xl text-base font-bold leading-relaxed">{service.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="scroll-reveal scroll-mt-6 pb-16 sm:pb-20" aria-labelledby="process-title">
          <div className="section-tag">// How it moves</div>
          <h2 id="process-title" className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">Engagement process</h2>
          <ol className="mt-7 grid border-2 border-ink bg-surface md:grid-cols-4">
            {process.map((step, index) => (
              <li key={step} className={`process-step group flex min-h-32 items-center justify-between gap-4 p-5 ${index > 0 ? "border-t-2 border-ink md:border-l-2 md:border-t-0" : ""}`}>
                <span className="font-display text-xl font-black uppercase">{String(index + 1).padStart(2, "0")} {step}</span>
                <span className="process-arrow"><ArrowIcon /></span>
              </li>
            ))}
          </ol>
        </section>

        <CaseStudy />

        <section id="contact" className="scroll-reveal neo-card scroll-mt-6 bg-lime p-6 sm:p-9" aria-labelledby="contact-title">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="section-tag">// Your next four weeks</div>
              <h2 id="contact-title" className="mt-4 max-w-[17ch] font-display text-4xl font-black uppercase leading-none sm:text-5xl">Bring the challenge. Leave with a plan.</h2>
            </div>
            <a href="mailto:entrepreneurship.development@college.edu?subject=Consultancy%20enquiry" className="neo-button shrink-0 bg-ink text-electric-foreground">Book a consultation <ArrowIcon /></a>
          </div>
        </section>
      </main>

      <footer className="mt-14 border-t-2 border-ink bg-ink text-electric-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs font-black uppercase sm:px-6 lg:px-8">
          <span>E&amp;D Consultancy Division</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}