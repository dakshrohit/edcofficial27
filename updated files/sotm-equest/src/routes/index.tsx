import { createFileRoute } from "@tanstack/react-router";
import {
  Apple,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Box,
  Candy,
  Clapperboard,
  Code2,
  CookingPot,
  BrainCircuit,
  CircuitBoard,
  Dice5,
  Droplets,
  Factory,
  FlaskConical,
  Gamepad2,
  Leaf,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  Milk,
  Phone,
  Plus,
  QrCode,
  Radio,
  ScanLine,
  Search,
  Shield,
  ShoppingBag,
  TrendingUp,
  Utensils,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { useState, type CSSProperties } from "react";
import edcLogo from "../assets/edc-nitdgp-logo.png.asset.json";
import startupCollage from "../assets/startup-collage.jpg";
import { Button } from "@/components/ui/button";
import { SiteNavigation } from "@/components/site-navigation";
import { WorksWheel } from "@/components/works-wheel";
import { MoltenRingCarousel } from "@/components/molten-ring-carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "E-Quest & Startup of the Month | EDC NIT Durgapur" },
      { name: "description", content: "Discover weekly business quests and EDC NIT Durgapur's Startup of the Month initiative." },
      { property: "og:title", content: "E-Quest & Startup of the Month | EDC NIT Durgapur" },
      { property: "og:description", content: "Bite-sized business knowledge and standout startup stories from EDC NIT Durgapur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Category = "Company Facts" | "Business" | "Fun Facts" | "Technology" | "Miscellaneous" | "Finance";

const quests: { number: number; title: string; category: Category; teaser: string; detail: string }[] = [
  { number: 18, title: "Poison Pill", category: "Finance", teaser: "The corporate defence designed to make a hostile takeover painfully expensive.", detail: "A poison pill lets existing shareholders buy discounted shares, diluting a hostile bidder's stake and making the takeover harder." },
  { number: 17, title: "The Index Effect", category: "Finance", teaser: "What really happens when a company joins a major stock-market index?", detail: "Index-tracking funds must buy newly included shares, often creating a burst of demand, volume and visibility." },
  { number: 16, title: "Inside an IPO", category: "Business", teaser: "The high-stakes journey from private ambition to a public listing.", detail: "An IPO combines audits, regulatory filings, investor roadshows and pricing before shares begin trading publicly." },
  { number: 15, title: "OpenAI's Origin", category: "Technology", teaser: "A research lab, an unusual structure and a technology that changed the conversation.", detail: "OpenAI began in 2015 as a nonprofit research lab before adopting a capped-profit structure to fund increasingly ambitious AI work." },
  { number: 14, title: "Spotify's Freemium Bet", category: "Company Facts", teaser: "How free listening became the funnel for a global subscription giant.", detail: "Spotify paired an ad-supported free tier with premium subscriptions, turning access into a powerful customer-acquisition engine." },
  { number: 13, title: "Google's Name", category: "Company Facts", teaser: "One typo, a vast number and the birth of an internet icon.", detail: "Google's name plays on “googol,” the number 1 followed by 100 zeros—a nod to organizing immense quantities of information." },
  { number: 12, title: "Netflix's Pivot", category: "Company Facts", teaser: "From red envelopes to streaming screens across the world.", detail: "Netflix moved from DVD rentals to streaming in 2007, then used original programming to become a global entertainment company." },
  { number: 11, title: "Nintendo Before Games", category: "Company Facts", teaser: "The gaming legend started with hand-painted playing cards in 1889.", detail: "Nintendo was founded in Kyoto to produce hanafuda cards, experimenting across industries long before electronic games." },
  { number: 10, title: "The IKEA Effect", category: "Company Facts", teaser: "Why we value the furniture we assemble more than the furniture we don't.", detail: "The IKEA effect is a cognitive bias: people assign greater value to things they helped create, even with modest effort." },
  { number: 9, title: "Amul's Cooperative", category: "Company Facts", teaser: "How millions of small producers built one of India's biggest food brands.", detail: "Amul's cooperative model links village societies, district unions and a state federation so producers retain more value." },
  { number: 8, title: "Zomato's First Menu", category: "Company Facts", teaser: "A restaurant discovery giant that began by scanning office lunch menus.", detail: "Zomato started as Foodiebay in 2008, making local restaurant menus searchable before expanding into delivery and services." },
  { number: 7, title: "Apple's Garage Myth", category: "Company Facts", teaser: "The famous origin story is true—but not quite the whole story.", detail: "Apple's garage mattered as an early base, while much of its formative design and business work happened elsewhere." },
  { number: 6, title: "CAPTCHA", category: "Technology", teaser: "A tiny test that helped digitise books while keeping bots at bay.", detail: "Some CAPTCHA systems used human answers to decipher scanned words that optical character recognition could not read." },
  { number: 5, title: "The QR Comeback", category: "Technology", teaser: "Invented for car parts, reborn as an everyday digital doorway.", detail: "QR codes were created in 1994 for tracking automotive components and surged globally with smartphones and contactless services." },
  { number: 4, title: "Bubble Wrap's First Job", category: "Fun Facts", teaser: "The world's favourite packing material began as failed wallpaper.", detail: "Its inventors first imagined textured plastic wallpaper, then greenhouse insulation, before finding the perfect packaging use." },
  { number: 3, title: "Why M&M's Don't Melt", category: "Fun Facts", teaser: "A military need inspired the candy's famous hard shell.", detail: "The shell helped soldiers carry chocolate in warm conditions—the idea behind “melts in your mouth, not in your hand.”" },
  { number: 2, title: "WD-40 Took 40 Tries", category: "Miscellaneous", teaser: "Its product name is also a compact record of persistent experimentation.", detail: "The name stands for Water Displacement, 40th formula—the successful attempt by the team that developed it in 1953." },
  { number: 1, title: "Monopoly's Hidden History", category: "Fun Facts", teaser: "The board game began as a warning about concentrated wealth.", detail: "The Landlord's Game, patented by Elizabeth Magie, was designed to demonstrate the social costs of monopolies." },
];

const filters: { label: "All" | Category; count: number }[] = [
  { label: "All", count: 18 }, { label: "Company Facts", count: 8 }, { label: "Business", count: 1 },
  { label: "Fun Facts", count: 3 }, { label: "Technology", count: 3 }, { label: "Miscellaneous", count: 1 }, { label: "Finance", count: 2 },
];

const faqs = [
  ["How does SoTM give startups visibility?", "Selected startups are featured across EDC NIT Durgapur's student and alumni network, helping founders reach curious talent, collaborators and future customers."],
  ["Where can a startup register?", "Registration links are announced through EDC NIT Durgapur's official channels when each nomination window opens."],
  ["How can students register for internships?", "Students can apply through the opportunity links shared with each selected startup's feature, subject to that company's requirements."],
  ["How is submitted data handled?", "Information is used only to evaluate applications and coordinate the initiative. Private contact details are not published without consent."],
];

const internshipStartups: [string, string, string][] = [
  ["Growcify", "2020", "Helping worldwide SMBs launch online eCommerce setups."],
  ["Papaya Coders Pvt Ltd", "2022", "Custom software creation."],
  ["Akeshya Pvt Ltd", "2022", "Empowering innovative people to turn ideas into reality through technology."],
  ["Woro Media LLP", "2019", "Marketing automation solutions."],
  ["LearnElectronics India", "2020", "Online platform for electronics knowledge and career planning."],
  ["HappiMynd", "2021", "Empowering emotional and mental self-management."],
];

const sotmStartups: [string, string, string][] = [
  ["Bloque Labs Pvt Ltd", "2018", "Creator-centric decentralized social network."],
  ["Earthzy Technology Solutions Pvt Ltd", "2019", "Building sustainable habits and planetary health through innovation."],
  ["Water N Spices Foodsz Pvt Ltd", "2019", "Technology upgrades for traditional food vendors."],
];

const startupIcons: Record<string, LucideIcon> = {
  Growcify: ShoppingBag,
  "Papaya Coders Pvt Ltd": Code2,
  "Akeshya Pvt Ltd": Lightbulb,
  "Woro Media LLP": Megaphone,
  "LearnElectronics India": CircuitBoard,
  HappiMynd: BrainCircuit,
  "Bloque Labs Pvt Ltd": Waypoints,
  "Earthzy Technology Solutions Pvt Ltd": Leaf,
  "Water N Spices Foodsz Pvt Ltd": CookingPot,
};

const questIcons: Record<number, LucideIcon> = {
  18: Shield,
  17: TrendingUp,
  16: Landmark,
  15: Bot,
  14: Radio,
  13: Search,
  12: Clapperboard,
  11: Gamepad2,
  10: Box,
  9: Milk,
  8: Utensils,
  7: Apple,
  6: ScanLine,
  5: QrCode,
  4: Factory,
  3: Candy,
  2: FlaskConical,
  1: Dice5,
};

const questAccentTokens: Record<number, string> = {
  18: "--quest-red", 17: "--quest-teal", 16: "--quest-blue", 15: "--quest-sky",
  14: "--quest-green", 13: "--quest-google-blue", 12: "--quest-netflix",
  11: "--quest-nintendo", 10: "--quest-ikea-blue", 9: "--quest-heritage-red",
  8: "--quest-food-red", 7: "--quest-silver", 6: "--violet", 5: "--quest-qr-teal",
  4: "--quest-pink", 3: "--quest-cocoa", 2: "--quest-gold", 1: "--quest-coral",
};

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className={compact ? "brand-logo is-compact" : "brand-logo"} aria-label="EDC NIT Durgapur home">
      <img src={edcLogo.url} alt="Entrepreneurship Development Cell, NIT Durgapur" />
    </a>
  );
}

function Index() {
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const visibleQuests = activeFilter === "All" ? quests : quests.filter((quest) => quest.category === activeFilter);

  return (
    <main id="top" className="site-shell">
      <SiteNavigation />

      <section id="sotm" className="sotm-section scroll-mt-20">
        <div className="sotm-grid-lines" aria-hidden="true" />
        <div className="orbit-mark orbit-one" aria-hidden="true"><span /></div>
        <div className="orbit-mark orbit-two" aria-hidden="true"><span /></div>
        <div className="section-shell sotm-shell">
          <div className="system-row">
            <span>System status: active</span>
            <span>EDC / SOTM / 2026</span>
            <span>Founders × talent</span>
          </div>
          <div className="sotm-intro">
            <div>
              <p className="section-kicker">01 / START-UP OF THE MONTH</p>
              <h1>STARTUP OF<br /><span>THE MONTH</span></h1>
            </div>
            <div className="sotm-copy">
              <p>SoTM puts ambitious ventures in the spotlight—building startup culture on campus, tapping into alumni success, and connecting students with meaningful internships.</p>
              <a href="#startups" className="text-action">Explore the archive <ArrowDownRight size={20} /></a>
            </div>
          </div>
          <div className="sotm-feature">
            <figure className="collage-frame">
              <img src={startupCollage} alt="Student founders collaborating around a laptop in an energetic editorial collage" width={1408} height={912} />
              <figcaption>NODE: EDC_NITDGP / LIVE</figcaption>
            </figure>
            <aside className="feature-rail">
              <span>2026</span><strong>IDEAS<br />ACTION<br />IMPACT</strong><small>Campus innovation signal</small>
            </aside>
          </div>

          <div id="pillars" className="pillar-grid scroll-mt-28">
            {[
              ["01", "Vision", "A campus where entrepreneurship is a visible, credible and achievable path."],
              ["02", "Inspiration", "Real founder stories that turn distant success into something students can picture."],
              ["03", "Mission", "Create lasting bridges between founders, alumni insight and student talent."],
            ].map(([number, title, copy]) => <article key={title} className="pillar"><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>

          <div id="startups" className="startup-showcase scroll-mt-28">
            <div id="internships" className="roster-block scroll-mt-28">
              <div className="roster-heading">
                <p className="section-kicker">02 / FOUNDERS × TALENT</p>
                <h2>Internship Fair<br />Startups</h2>
                <span>06 companies</span>
              </div>
              <WorksWheel items={internshipStartups.map(([title]) => ({ title }))} renderItem={index => {
                const startup = internshipStartups[index];
                if (!startup) return null;
                const [name, year, description] = startup;
                return (
                  <article className={`startup-card startup-tone-${index % 3}`} style={{ "--startup-index": index } as CSSProperties} key={name}>
                    <div className="startup-graphic" aria-hidden="true">
                      {(() => {
                        const StartupIcon = startupIcons[name] ?? Box;
                        return <StartupIcon className="startup-icon" strokeWidth={1.6} />;
                      })()}
                      <span className="startup-monogram">{name.split(" ").map((word) => word[0]).join("").slice(0, 3)}</span>
                      <span className="startup-signal">EDC / IF / {String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="startup-content">
                      <div className="startup-meta"><span>IF-{String(index + 1).padStart(2, "0")}</span><strong>{year}</strong></div>
                      <h3>{name}</h3>
                      <p>{description}</p>
                    </div>
                  </article>
                );
              }} />
            </div>

            <div className="roster-block sotm-roster">
              <div className="roster-heading">
                <p className="section-kicker">03 / THE SPOTLIGHT</p>
                <h2>SoTM<br />Startups</h2>
                <span>03 companies</span>
              </div>
              <div className="startup-grid sotm-grid">
                {sotmStartups.map(([name, year, description], index) => (
                  <article className={`startup-card startup-tone-${(index + 1) % 3}`} style={{ "--startup-index": index + 6 } as CSSProperties} key={name}>
                    <div className="startup-graphic" aria-hidden="true">
                      {(() => {
                        const StartupIcon = startupIcons[name] ?? Box;
                        return <StartupIcon className="startup-icon" strokeWidth={1.6} />;
                      })()}
                      <span className="startup-monogram">{name.split(" ").map((word) => word[0]).join("").slice(0, 3)}</span>
                      <span className="startup-signal">EDC / ST / {String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="startup-content">
                      <div className="startup-meta"><span>ST-{String(index + 1).padStart(2, "0")}</span><strong>{year}</strong></div>
                      <h3>{name}</h3>
                      <p>{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="faq-wrap">
            <div><p className="section-kicker">04 / THE FINE PRINT</p><h2>Questions,<br />answered.</h2></div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="faq-item">
                  <summary><span>0{index + 1}</span><strong>{question}</strong><Plus className="faq-plus" size={24} /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="chapter-transition" aria-label="Transition to E-Quest">
        <div className="transition-track">
          <span>E-QUEST LOG ACTIVE&nbsp; // &nbsp;18 STORIES ONLINE&nbsp; // &nbsp;THINK FAST&nbsp; // &nbsp;</span>
          <span aria-hidden="true">E-QUEST LOG ACTIVE&nbsp; // &nbsp;18 STORIES ONLINE&nbsp; // &nbsp;THINK FAST&nbsp; // &nbsp;</span>
        </div>
      </div>

      <section id="equest" className="equest-section scroll-mt-20">
        <div className="equest-grid-lines" aria-hidden="true" />
        <div className="section-shell equest-shell">
          <div className="equest-hero">
            <div className="equest-index"><span>/ MODULE 02</span><small>EDC NITDGP<br />QUEST ENGINE</small></div>
            <div className="equest-title-block">
              <div className="eyebrow"><span className="pulse-dot" /> Your weekly dose of quests</div>
              <h2 className="display-title">E—QUEST</h2>
              <p>Big business ideas. Strange company stories. Zero jargon. One sharp read at a time.</p>
              <a href="#quest-grid" className="primary-action">Explore all 18 <ArrowDownRight size={22} /></a>
            </div>
            <div className="hero-poster" aria-hidden="true">
              <div className="poster-cross">+</div>
              <div className="poster-copy">THINK<br />FAST.</div>
              <div className="poster-stamp">18 STORIES<br />ONLINE</div>
              <span className="poster-star">✦</span>
            </div>
          </div>

          <div id="quest-grid" className="quest-archive scroll-mt-28">
            <div className="section-heading">
              <div><p className="section-kicker">05 / THE ARCHIVE</p><h2>Pick your rabbit hole.</h2></div>
              <p>{visibleQuests.length.toString().padStart(2, "0")} STORIES ON DECK</p>
            </div>
            <div className="filter-bar" aria-label="Filter E-Quests by category">
              {filters.map((filter) => (
                <Button variant="ghost" key={filter.label} type="button" className={activeFilter === filter.label ? "filter-pill is-active" : "filter-pill"} onClick={() => { setActiveFilter(filter.label); setExpanded(null); }} aria-pressed={activeFilter === filter.label}>
                  {filter.label} <span>{filter.count}</span>
                </Button>
              ))}
            </div>
            <MoltenRingCarousel key={activeFilter} brand="E-Quest archive" items={visibleQuests.map(quest => ({ title: quest.title, number: quest.number, meta: quest.category, accentToken: questAccentTokens[quest.number] ?? "--violet" }))} renderItem={index => {
                const quest = visibleQuests[index];
                if (!quest) return null;
                const isOpen = expanded === quest.number;
                const QuestIcon = questIcons[quest.number] ?? Droplets;
                return (
                  <article className={`quest-card quest-theme-${quest.number} card-tone-${index % 3}`} style={{ "--card-index": index } as CSSProperties} key={quest.number}>
                    <div className="quest-card-top">
                      <span className="quest-number">{String(quest.number).padStart(2, "0")}</span>
                      <span className="category-badge">{quest.category}</span>
                    </div>
                    <div className="quest-graphic" aria-hidden="true">
                      <span className="quest-watermark">{String(quest.number).padStart(2, "0")}</span>
                      <QuestIcon className="quest-icon" strokeWidth={1.7} />
                      <span className="quest-scan-code">EQ/{quest.number}/26</span>
                      <span className="quest-barcode" />
                    </div>
                    <div className="quest-copy">
                      <div className="quest-label"><span>EDC FIELD NOTE</span><span>ISSUE {String(19 - quest.number).padStart(2, "0")}</span></div>
                      <h3>{quest.title}</h3>
                      <p>{quest.teaser}</p>
                      {isOpen && <p className="quest-detail">{quest.detail}</p>}
                      <Button variant="ghost" type="button" className="read-more" onClick={() => setExpanded(isOpen ? null : quest.number)} aria-expanded={isOpen}>
                        {isOpen ? "Close file" : "Open file"} <ArrowUpRight size={18} />
                      </Button>
                    </div>
                  </article>
                );
              }} />
          </div>
        </div>
      </section>

      <footer id="contact" className="footer scroll-mt-20">
        <div className="section-shell py-20">
          <div className="footer-lead"><p>Have an idea?</p><h2>LET'S MAKE<br />SOME NOISE.</h2><a href="mailto:edcnitd.official@gmail.com" className="footer-action">Start a conversation <ArrowUpRight size={28} /></a></div>
          <div className="footer-grid">
            <div><p className="footer-label">Find us</p><a href="https://maps.google.com/?q=Mahatma+Gandhi+Avenue+A-Zone+Durgapur+West+Bengal+713209" target="_blank" rel="noreferrer"><MapPin size={20} /> Mahatma Gandhi Avenue, A-Zone,<br />Durgapur, West Bengal 713209</a></div>
            <div><p className="footer-label">Talk to us</p><a href="tel:+917007647720"><Phone size={20} /> +91 70076 47720 — Sanvie Singhal</a><a href="mailto:edcnitd.official@gmail.com"><Mail size={20} /> edcnitd.official@gmail.com</a></div>
            <div><p className="footer-label">Useful links</p><div className="footer-links"><a href="#top">Home</a><a href="#startups">Startups</a><a href="#internships">Internships</a><a href="#equest">E-Quest</a><a href="#sotm">SoTM</a><a href="#contact">Our Team</a><a href="https://iic.mic.gov.in/" target="_blank" rel="noreferrer">IIC ↗</a></div></div>
          </div>
          <div className="footer-bottom"><BrandLogo /><p>Made with ❤️ by Web-Team © 2026 EDC. All Rights Reserved.</p><a href="#top" aria-label="Back to top">TOP ↑</a></div>
        </div>
      </footer>
    </main>
  );
}