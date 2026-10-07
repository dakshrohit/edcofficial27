const challenges = [
  ["Trust", "Building credibility with young investors entering financial markets."],
  ["Adoption", "Reducing friction and making financial guidance approachable."],
  ["Positioning", "Establishing a clear identity in a crowded fintech landscape."],
  ["Scalability", "Preparing the MVP for broader mobile-first adoption."],
  ["Monetization", "Structuring a sustainable business and revenue model."],
  ["Growth", "Creating a practical go-to-market strategy for young investors."],
];

const approach = [
  ["Discover", "Understand the product, users, market and business context."],
  ["Diagnose", "Identify gaps in positioning, adoption, trust and scalability."],
  ["Design", "Develop GTM, business model, MVP and positioning strategies."],
  ["Validate", "Translate insights into actionable recommendations for growth and investor readiness."],
];

const frameworks = [
  ["3Cs Analysis", "Customers · Competitors · Company", "bg-lime text-ink"],
  ["AARRR Funnel", "Acquisition · Activation · Retention · Revenue · Referral", "bg-surface text-ink"],
  ["Business Model Canvas", "Mapping the business model and potential revenue architecture.", "bg-electric text-electric-foreground"],
  ["Crowdfunding Readiness", "Structuring the path toward future fundraising and market validation.", "bg-industrial text-electric-foreground"],
];

const deliverables = [
  ["Go-to-Market Strategy", "Audience segmentation, campus-led acquisition and digital growth channels.", "md:col-span-2 bg-lime"],
  ["Business Model Validation", "Evaluation of sustainable monetization and freemium-oriented opportunities.", "bg-surface"],
  ["MVP Strategy", "Recommendations around onboarding, AI nudges, mobile responsiveness and trust signals.", "bg-surface"],
  ["Market Positioning", "Positioning Viniyog ONE around AI-powered financial guidance and behavioral education.", "bg-surface"],
  ["Investor Readiness", "Strategic recommendations supporting future accelerator and funding conversations.", "bg-lime"],
];

const before = ["Early-stage MVP", "Limited product validation", "Trust barrier", "Unstructured growth", "Positioning still evolving"];
const after = ["Clear MVP priorities", "Defined target segments", "Trust-building strategy", "Structured GTM approach", "Clearer market positioning", "Investor-readiness framework"];

const card = "border-[3px] border-ink shadow-hard transition-[transform,box-shadow,background-color] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--ink)]";

function Tag({ children }: { children: React.ReactNode }) {
  return <div className="section-tag">{children}</div>;
}

export function CaseStudy() {
  return (
    <section id="case-study" className="scroll-mt-6 pb-16 sm:pb-20" aria-labelledby="case-title">
      {/* Header */}
      <div className={`scroll-reveal ${card} bg-surface p-6 sm:p-10`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-black uppercase">EDC Case Study / 01</span>
          <span className="text-xs font-black uppercase">// Proof of work</span>
        </div>
        <h2 id="case-title" className="mt-8 break-words font-display text-6xl font-black uppercase leading-[0.85] sm:text-8xl lg:text-[9rem]">
          Viniyog <span className="bg-lime px-2">ONE</span>
        </h2>
        <p className="mt-6 max-w-3xl font-display text-2xl font-black uppercase leading-tight sm:text-4xl">
          Turning financial complexity into confident decisions.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {["Strategic Consulting", "Fintech × Behavioral AI", "2025", "EDC Consulting Group"].map((m) => (
            <li key={m} className="border-2 border-ink bg-canvas px-3 py-1 text-xs font-black uppercase">{m}</li>
          ))}
        </ul>
      </div>

      {/* Brief */}
      <div className="scroll-reveal mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className={`${card} bg-canvas p-6 sm:p-8`}>
          <Tag>// The brief</Tag>
          <p className="mt-4 text-lg font-bold leading-relaxed">
            Viniyog ONE is an early-stage fintech platform using AI-powered behavioral nudges and human guidance to help young investors build financial confidence.
          </p>
        </div>
        <div className={`${card} flex items-center bg-ink p-6 text-electric-foreground sm:p-8`}>
          <p className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
            The challenge wasn't just building a fintech product. <span className="text-lime">It was building trust around it.</span>
          </p>
        </div>
      </div>

      {/* Challenges */}
      <div className="scroll-reveal mt-16">
        <Tag>// The challenge</Tag>
        <h3 className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">Six pressure points</h3>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map(([t, c], i) => (
            <article key={t} className={`${card} group bg-surface p-6 hover:bg-lime`}>
              <div className="font-display text-6xl font-black leading-none transition-transform duration-200 group-hover:translate-x-1">{String(i + 1).padStart(2, "0")}</div>
              <h4 className="mt-6 font-display text-2xl font-black uppercase">{t}</h4>
              <p className="mt-2 font-bold leading-relaxed">{c}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Approach */}
      <div className="scroll-reveal mt-16">
        <Tag>// Our approach</Tag>
        <h3 className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">The EDC framework</h3>
        <ol className="mt-7 grid border-[3px] border-ink bg-surface shadow-hard lg:grid-cols-4">
          {approach.map(([t, c], i) => (
            <li key={t} className={`group relative p-6 transition-colors duration-200 hover:bg-electric hover:text-electric-foreground ${i > 0 ? "border-t-[3px] border-ink lg:border-l-[3px] lg:border-t-0" : ""}`}>
              <div className="font-display text-sm font-black uppercase">Phase {String(i + 1).padStart(2, "0")}</div>
              <h4 className="mt-3 font-display text-3xl font-black uppercase">{t}</h4>
              <p className="mt-3 font-bold leading-relaxed">{c}</p>
              {i < approach.length - 1 && (
                <span aria-hidden="true" className="mt-5 inline-grid size-9 place-items-center border-2 border-ink bg-ink font-black text-electric-foreground">
                  <span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Frameworks */}
      <div className="scroll-reveal mt-16">
        <Tag>// Frameworks we used</Tag>
        <h3 className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">Tools of the trade</h3>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {frameworks.map(([t, c, tone], i) => (
            <article key={t} className={`${card} group relative p-6 sm:p-8 ${tone}`}>
              <span aria-hidden="true" className="absolute right-6 top-6 translate-x-2 text-3xl font-black opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">→</span>
              <div className="inline-block font-display text-5xl font-black transition-transform duration-200 group-hover:scale-110">F{i + 1}</div>
              <h4 className="mt-5 font-display text-2xl font-black uppercase sm:text-3xl">{t}</h4>
              <p className="mt-2 font-bold leading-relaxed">{c}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Deliverables */}
      <div className="scroll-reveal mt-16">
        <Tag>// What we delivered</Tag>
        <h3 className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">Five deliverables</h3>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {deliverables.map(([t, c, tone], i) => (
            <article key={t} className={`${card} p-6 text-ink sm:p-8 ${tone} ${i === 0 ? "md:min-h-64" : ""}`}>
              <span className="text-xs font-black uppercase">D—{String(i + 1).padStart(2, "0")}</span>
              <h4 className={`mt-6 font-display font-black uppercase leading-tight ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl"}`}>{t}</h4>
              <p className="mt-3 max-w-xl font-bold leading-relaxed">{c}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Before / After */}
      <div className="scroll-reveal mt-16">
        <Tag>// Strategic transformation</Tag>
        <div className="mt-7 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
          <div className={`${card} bg-surface p-6 sm:p-8`}>
            <h4 className="font-display text-5xl font-black uppercase">Before</h4>
            <ul className="mt-6 space-y-3">
              {before.map((b) => <li key={b} className="border-b-2 border-ink pb-2 font-bold">✕ {b}</li>)}
            </ul>
          </div>
          <div className="grid place-items-center" aria-hidden="true">
            <span className="grid size-20 place-items-center border-[3px] border-ink bg-ink font-display text-5xl font-black text-lime shadow-hard">
              <span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span>
            </span>
          </div>
          <div className={`${card} bg-lime p-6 sm:p-8`}>
            <h4 className="font-display text-5xl font-black uppercase">After</h4>
            <ul className="mt-6 space-y-3">
              {after.map((a) => <li key={a} className="border-b-2 border-ink pb-2 font-bold">✓ {a}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Impact */}
      <div className={`scroll-reveal mt-16 ${card} bg-electric p-6 text-electric-foreground sm:p-10`}>
        <Tag>// Impact</Tag>
        <p className="mt-4 font-display text-3xl font-black uppercase leading-tight sm:text-5xl">From product idea → growth framework</p>
        <p className="mt-5 max-w-3xl text-lg font-bold leading-relaxed">
          The engagement gave Viniyog ONE a structured strategic foundation spanning product refinement, trust building, customer acquisition, monetization, positioning and investor readiness.
        </p>
        <div className="mt-8 grid border-[3px] border-ink bg-surface text-ink sm:grid-cols-3">
          {[["01", "Month-long engagement"], ["04", "Core strategic frameworks"], ["02", "Primary young-investor segments"]].map(([n, l], i) => (
            <div key={l} className={`p-5 ${i > 0 ? "border-t-[3px] border-ink sm:border-l-[3px] sm:border-t-0" : ""}`}>
              <div className="font-display text-5xl font-black">{n}</div>
              <div className="mt-2 text-xs font-black uppercase">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Snapshot + CTA */}
      <div className="scroll-reveal mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className={`${card} bg-surface p-6 sm:p-8`}>
          <Tag>// Client snapshot</Tag>
          <h4 className="mt-4 font-display text-4xl font-black uppercase">Viniyog ONE</h4>
          <p className="mt-3 text-lg font-bold">"AI-powered financial guidance for India's next generation of investors."</p>
        </div>
        <div className={`${card} flex flex-col justify-between gap-6 bg-ink p-6 text-electric-foreground sm:p-8`}>
          <p className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
            Have a problem worth solving? <span className="text-lime">Let's work on it.</span>
          </p>
          <a href="#contact" className="neo-button self-start bg-lime text-ink">Work with EDC →</a>
        </div>
      </div>
    </section>
  );
}
