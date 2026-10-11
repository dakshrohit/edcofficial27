import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import InfiniteSpiral from "../components/InfiniteSpiral";
import { LiquidGlassCarousel } from "../components/ui/liquid-glass-carousel";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors | EDC NIT Durgapur" },
      {
        name: "description",
        content: "The companies and brands that powered EDC NIT Durgapur's E-Summit.",
      },
    ],
  }),
  component: Sponsors,
});

type SponsorCategory = "All" | "Finance" | "Food & Beverage" | "Media & Tech" | "Retail & Travel";

type Sponsor = {
  name: string;
  category: Exclude<SponsorCategory, "All">;
  mark: string;
  tone: string;
  detail: string;
};

const sponsors: Sponsor[] = [
  { name: "SBI", category: "Finance", mark: "SBI", tone: "lime", detail: "Banking partner" },
  {
    name: "Canara Bank",
    category: "Finance",
    mark: "CB",
    tone: "violet",
    detail: "Banking partner",
  },
  {
    name: "Toyota",
    category: "Retail & Travel",
    mark: "TOYOTA",
    tone: "cream",
    detail: "Mobility partner",
  },
  {
    name: "IndianOil",
    category: "Retail & Travel",
    mark: "IO",
    tone: "red",
    detail: "Energy partner",
  },
  {
    name: "Barbeque Nation",
    category: "Food & Beverage",
    mark: "BBQ",
    tone: "orange",
    detail: "Food partner",
  },
  {
    name: "Unstop",
    category: "Media & Tech",
    mark: "unstop",
    tone: "blue",
    detail: "Opportunity partner",
  },
  {
    name: "Burger King",
    category: "Food & Beverage",
    mark: "BK",
    tone: "yellow",
    detail: "Food partner",
  },
  {
    name: "Pizza Hut",
    category: "Food & Beverage",
    mark: "PH",
    tone: "pink",
    detail: "Food partner",
  },
  {
    name: "eGo",
    category: "Retail & Travel",
    mark: "eG",
    tone: "green",
    detail: "Mobility partner",
  },
  {
    name: "SkillArena",
    category: "Media & Tech",
    mark: "SA",
    tone: "lime",
    detail: "Learning partner",
  },
  {
    name: "ah! ventures",
    category: "Media & Tech",
    mark: "ah!",
    tone: "orange",
    detail: "Venture partner",
  },
  { name: "Nestlé", category: "Food & Beverage", mark: "N", tone: "blue", detail: "Food partner" },
  {
    name: "DigitalOcean",
    category: "Media & Tech",
    mark: "DO",
    tone: "blue",
    detail: "Cloud partner",
  },
  {
    name: "Startup News .fyi",
    category: "Media & Tech",
    mark: ".fyi",
    tone: "pink",
    detail: "Media partner",
  },
  { name: "StockEdge", category: "Finance", mark: "SE", tone: "violet", detail: "Finance partner" },
  {
    name: "Cashify",
    category: "Retail & Travel",
    mark: "₹%",
    tone: "green",
    detail: "Exchange partner",
  },
  {
    name: "Custkart",
    category: "Retail & Travel",
    mark: "CK",
    tone: "green",
    detail: "Commerce partner",
  },
  {
    name: "SIO Studies in Overseas",
    category: "Media & Tech",
    mark: "SIO",
    tone: "violet",
    detail: "Education partner",
  },
  {
    name: "Subway",
    category: "Food & Beverage",
    mark: "SUB",
    tone: "green",
    detail: "Food partner",
  },
  {
    name: "KIA",
    category: "Retail & Travel",
    mark: "KIA",
    tone: "cream",
    detail: "Mobility partner",
  },
  {
    name: "ED Times",
    category: "Media & Tech",
    mark: "ED",
    tone: "violet",
    detail: "Media partner",
  },
  {
    name: "Senco Gold & Diamonds",
    category: "Retail & Travel",
    mark: "SENCO",
    tone: "red",
    detail: "Lifestyle partner",
  },
  {
    name: "Knots",
    category: "Retail & Travel",
    mark: "knots",
    tone: "orange",
    detail: "Lifestyle partner",
  },
  {
    name: "Morvee Hotels",
    category: "Retail & Travel",
    mark: "M",
    tone: "orange",
    detail: "Hospitality partner",
  },
  {
    name: "Digi Life",
    category: "Media & Tech",
    mark: "DIGI",
    tone: "pink",
    detail: "Digital partner",
  },
  {
    name: "India Accelerator",
    category: "Finance",
    mark: "IA",
    tone: "cream",
    detail: "Accelerator partner",
  },
  {
    name: "addo52.com",
    category: "Media & Tech",
    mark: "52",
    tone: "red",
    detail: "Digital partner",
  },
  {
    name: "Lemon Grass",
    category: "Food & Beverage",
    mark: "LG",
    tone: "green",
    detail: "Food partner",
  },
  {
    name: "The London Bakery",
    category: "Food & Beverage",
    mark: "LB",
    tone: "cream",
    detail: "Food partner",
  },
  {
    name: "Between the Bread",
    category: "Food & Beverage",
    mark: "BTB",
    tone: "orange",
    detail: "Food partner",
  },
  {
    name: "PinkPaws",
    category: "Retail & Travel",
    mark: "PINK",
    tone: "pink",
    detail: "Community partner",
  },
  {
    name: "ML",
    category: "Media & Tech",
    mark: "ML",
    tone: "violet",
    detail: "Innovation partner",
  },
];

const categories: SponsorCategory[] = [
  "All",
  "Finance",
  "Food & Beverage",
  "Media & Tech",
  "Retail & Travel",
];

const sponsorDomains: Record<string, string> = {
  SBI: "sbi.co.in",
  "Canara Bank": "canarabank.com",
  Toyota: "toyota.com",
  IndianOil: "iocl.com",
  "Barbeque Nation": "barbequenation.com",
  Unstop: "unstop.com",
  "Burger King": "burgerking.in",
  "Pizza Hut": "pizzahut.co.in",
  eGo: "ego.network",
  SkillArena: "skillarena.in",
  "ah! ventures": "ahventures.in",
  Nestlé: "nestle.com",
  DigitalOcean: "digitalocean.com",
  "Startup News .fyi": "startupnews.fyi",
  StockEdge: "stockedge.com",
  Cashify: "cashify.in",
  Custkart: "custkart.com",
  "SIO Studies in Overseas": "siostudies.com",
  Subway: "subway.com",
  KIA: "kia.com",
  "ED Times": "edtimes.in",
  "Senco Gold & Diamonds": "sencogoldanddiamonds.com",
};

const crispSponsorLogos: Record<string, string> = {
  SBI: `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#000"/><circle cx="400" cy="210" r="112" fill="#164b9b"/><path fill="#fff" d="M400 115a95 95 0 1 0 0 190 95 95 0 0 0 0-190m0 20a75 75 0 1 1 0 150 75 75 0 0 1 0-150"/><path fill="#164b9b" d="M395 112h18v126h-18z"/><text x="400" y="405" fill="#fff" font-family="Arial,sans-serif" font-size="74" font-weight="700" text-anchor="middle">SBI</text></svg>',
  )}`,
  Custkart: `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#111"/><path fill="#ff8a00" d="M174 162h58l88 88-88 88h-58l87-88z"/><text x="386" y="270" fill="#fff" font-family="Arial,sans-serif" font-size="74" font-weight="700">CUSTKART</text><text x="390" y="320" fill="#ff8a00" font-family="Arial,sans-serif" font-size="25" letter-spacing="7">SMART SHOPPING</text></svg>',
  )}`,
  DigitalOcean: "https://api.iconify.design/logos:digital-ocean.svg",
};

const localSponsorLogos: Record<string, string> = {
  SBI: "/sponsor-logos/sbi.png",
  "Canara Bank": "/sponsor-logos/canara-bank.png",
  Toyota: "/sponsor-logos/toyota.png",
  "Barbeque Nation": "/sponsor-logos/barbeque-nation.png",
};

const spiralBrandLogos: Record<string, string> = {
  Toyota: "https://api.iconify.design/simple-icons:toyota.svg?color=%23eb0a1e",
  "Burger King": "https://api.iconify.design/simple-icons:burgerking.svg?color=%23f5a400",
  DigitalOcean: "https://api.iconify.design/simple-icons:digitalocean.svg?color=%230080ff",
  KIA: "https://api.iconify.design/simple-icons:kia.svg?color=%23ffffff",
};

const sponsorLogoFallback = (sponsor: Sponsor) => {
  const title = sponsor.name.replace(/&/g, "&amp;");
  const mark = sponsor.mark.replace(/&/g, "&amp;");
  const accents: Record<string, string> = {
    lime: "#b5ff00",
    violet: "#b000e8",
    cream: "#f4f0e6",
    red: "#ef4444",
    orange: "#ff9800",
    blue: "#36a8ff",
    yellow: "#ffd400",
    pink: "#ff5ca8",
    green: "#26d07c",
  };
  const accent = accents[sponsor.tone] ?? "#b5ff00";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" rx="24" fill="#111111"/><circle cx="400" cy="240" r="150" fill="${accent}" opacity=".16"/><text x="400" y="250" fill="${accent}" font-family="Arial,sans-serif" font-size="${mark.length > 5 ? 62 : 108}" font-weight="800" text-anchor="middle">${mark}</text><text x="400" y="390" fill="#f4f0e6" font-family="Arial,sans-serif" font-size="28" font-weight="700" letter-spacing="2" text-anchor="middle">${title}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const sponsorLogoSource = (sponsor: Sponsor) =>
  localSponsorLogos[sponsor.name] ??
  crispSponsorLogos[sponsor.name] ??
  sponsorLogoFallback(sponsor);

const sponsorSpiralLogoSource = (sponsor: Sponsor) =>
  spiralBrandLogos[sponsor.name] ??
  localSponsorLogos[sponsor.name] ??
  crispSponsorLogos[sponsor.name] ??
  sponsorLogoFallback(sponsor);

const temporaryCarouselImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559526324-593bc073d938?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=85&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=85&w=900&auto=format&fit=crop",
];

const sponsorCarouselImageSource = (sponsor: Sponsor) =>
  temporaryCarouselImages[sponsors.indexOf(sponsor) % temporaryCarouselImages.length] ??
  sponsorLogoSource(sponsor);

const spiralItems = sponsors.slice(0, 18).map((sponsor) => ({
  src: sponsorSpiralLogoSource(sponsor),
  alt: `${sponsor.name} sponsor logo`,
  name: sponsor.name,
}));

type DriftWallProps = {
  items: Sponsor[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  speed?: number;
};

function DriftWall({
  items,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  speed = 42,
}: DriftWallProps) {
  const rows = Array.from({ length: columns }, (_, row) =>
    items.filter((_, index) => index % columns === row),
  );

  return (
    <div
      className="drift-wall"
      style={
        {
          "--drift-tile-width": `${tileWidth}px`,
          "--drift-tile-height": `${tileHeight}px`,
          "--drift-gap": `${gap}px`,
          "--drift-speed": `${speed}s`,
        } as React.CSSProperties
      }
      aria-label="Moving wall of E-Summit sponsors"
    >
      <div className="drift-wall-fade" />
      {rows.map((row, rowIndex) => (
        <div className={`drift-row drift-row-${rowIndex % 2}`} key={rowIndex}>
          {[...row, ...row].map((sponsor, index) => (
            <div className="drift-tile" key={`${sponsor.name}-${index}`}>
              <span>{sponsor.category}</span>
              <strong>{sponsor.mark}</strong>
              <small>{sponsor.name}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Sponsors() {
  const [activeCategory, setActiveCategory] = useState<SponsorCategory>("All");
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [spotlightQueue, setSpotlightQueue] = useState([0, 1, 2, 3]);
  const [spotlightDragX, setSpotlightDragX] = useState(0);
  const [spotlightDragY, setSpotlightDragY] = useState(0);
  const [isSpotlightDragging, setIsSpotlightDragging] = useState(false);
  const [isSpotlightSendingBack, setIsSpotlightSendingBack] = useState(false);
  const [spotlightExitX, setSpotlightExitX] = useState(0);
  const [spotlightExitY, setSpotlightExitY] = useState(0);
  const spotlightPointerStart = useRef<number | null>(null);
  const spotlightPointerStartY = useRef<number | null>(null);
  const spotlightDragStart = useRef(0);
  const spotlightDragStartY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".sponsor-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const filteredSponsors = useMemo(
    () =>
      activeCategory === "All"
        ? sponsors
        : sponsors.filter((sponsor) => sponsor.category === activeCategory),
    [activeCategory],
  );
  const moveSpotlight = (direction: number) => {
    if (isSpotlightSendingBack) return;
    setIsSpotlightSendingBack(true);
    window.setTimeout(() => {
      setSpotlightQueue((current) => {
        const next =
          direction > 0
            ? [...current.slice(1), current[0]]
            : [current[current.length - 1], ...current.slice(0, -1)];
        setSpotlightIndex(next[0]);
        return next;
      });
      setSpotlightExitX(0);
      setSpotlightExitY(0);
      setIsSpotlightSendingBack(false);
    }, 620);
  };

  const handleSpotlightPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    spotlightPointerStart.current = event.clientX;
    spotlightPointerStartY.current = event.clientY;
    spotlightDragStart.current = spotlightDragX;
    spotlightDragStartY.current = spotlightDragY;
    setIsSpotlightDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleSpotlightPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (spotlightPointerStart.current === null) return;
    const distance = event.clientX - spotlightPointerStart.current;
    const distanceY = event.clientY - (spotlightPointerStartY.current ?? event.clientY);
    setSpotlightDragX(spotlightDragStart.current + distance);
    setSpotlightDragY(spotlightDragStartY.current + distanceY);
  };

  const handleSpotlightPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = spotlightPointerStart.current;
    const startY = spotlightPointerStartY.current;
    spotlightPointerStart.current = null;
    spotlightPointerStartY.current = null;
    setIsSpotlightDragging(false);
    if (start === null) return;
    const distance = event.clientX - start;
    const distanceY = event.clientY - (startY ?? event.clientY);
    if (Math.abs(distance) > 30) {
      const direction = distance < 0 ? 1 : -1;
      setSpotlightExitX(direction * 320);
      setSpotlightExitY(distanceY * 0.7);
      setSpotlightDragX(0);
      setSpotlightDragY(0);
      moveSpotlight(direction);
    } else if (Math.abs(distanceY) > 30) {
      const direction = distanceY < 0 ? 1 : -1;
      setSpotlightExitX(distance * 0.7);
      setSpotlightExitY(direction * 320);
      setSpotlightDragX(0);
      setSpotlightDragY(0);
      moveSpotlight(direction);
    } else {
      setSpotlightDragX(0);
      setSpotlightDragY(0);
      moveSpotlight(1);
    }
  };

  return (
    <main className="sponsor-page">
      <header className="sponsor-nav">
        <a href="/" className="sponsor-brand" aria-label="Back to EDC home">
          <span className="sponsor-brand-mark">E!</span>
          <span>EDC / NIT DURGAPUR</span>
        </a>
        <nav className="sponsor-nav-links" aria-label="Sponsorship navigation">
          <a href="#archive">Archive</a>
          <a href="#spotlight">Spotlight</a>
          <a href="mailto:edcnitd.official@gmail.com?subject=E-Summit sponsorship">
            Partner with us <ArrowUpRight size={16} />
          </a>
        </nav>
        <a className="sponsor-nav-cta" href="#archive">
          EXPLORE <ArrowDownRight size={18} />
        </a>
      </header>

      <section className="sponsor-hero sponsor-reveal is-visible">
        <div className="sponsor-grid-lines" aria-hidden="true" />
        <div className="sponsor-hero-copy">
          <p className="sponsor-kicker">
            <Sparkles size={15} /> E-SUMMIT / PARTNERS
          </p>
          <h1>
            THE
            <br />
            <span>POWER</span>
            <br />
            BEHIND
            <br />
            <em>THE BIG IDEAS.</em>
          </h1>
          <p className="sponsor-hero-intro">
            A roll call of the brands that showed up, backed bold thinking and helped turn one
            campus into a launchpad.
          </p>
          <a className="sponsor-button" href="#archive">
            MEET THE CREW <ArrowDownRight size={20} />
          </a>
        </div>
        <div className="sponsor-hero-art">
          <InfiniteSpiral
            items={spiralItems}
            animationMode="auto"
            speed={0.28}
            radius={170}
            cardWidth={176}
            cardHeight={176}
            verticalSpacing={136}
            perspective={1000}
            cardRadius={0}
            centerScale={1.2}
            cardsPerTurn={7}
            pauseOnHover
            direction="up"
            rotation={0}
            cardTilt={0}
            imageFit="contain"
            grayscale={1}
          />
        </div>
      </section>

      <div className="sponsor-marquee" aria-hidden="true">
        <span>
          BUILT BY MANY <b>✦</b> BACKED BY BOLDNESS <b>✦</b> BUILT BY MANY <b>✦</b> BACKED BY
          BOLDNESS <b>✦</b>
        </span>
      </div>

      <section className="sponsor-drift-section sponsor-reveal">
        <div className="sponsor-drift-heading">
          <p className="sponsor-kicker">THE WALL / 32 NAMES</p>
          <h2>
            BACKERS
            <br />
            <span>IN MOTION.</span>
          </h2>
          <p>Scroll past the people who helped make the summit move.</p>
        </div>
        <DriftWall items={sponsors} />
      </section>

      <div className="sponsor-marquee sponsor-marquee--backers" aria-hidden="true">
        <span>
          EVERY BIG IDEA NEEDS A BACKER <b>✦</b> THANK YOU, PARTNERS <b>✦</b> EVERY BIG IDEA NEEDS A
          BACKER <b>✦</b> THANK YOU, PARTNERS <b>✦</b>
        </span>
      </div>

      <section id="archive" className="sponsor-archive sponsor-reveal">
        <div className="sponsor-section-heading">
          <div>
            <p className="sponsor-kicker">01 / THE ARCHIVE</p>
            <h2>
              OUR
              <br />
              <span>PARTNERS.</span>
            </h2>
          </div>
          <p className="sponsor-heading-copy">
            Every logo here represents a conversation, a contribution and a little more room for the
            next big idea.
          </p>
        </div>
        <div className="sponsor-filters" role="tablist" aria-label="Filter sponsors by category">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "is-active" : ""}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
            >
              {category}
              <span>
                {category === "All"
                  ? sponsors.length
                  : sponsors.filter((sponsor) => sponsor.category === category).length}
              </span>
            </button>
          ))}
        </div>
        <div className="sponsor-liquid-carousel" aria-label={`${activeCategory} sponsor showcase`}>
          <LiquidGlassCarousel
            items={filteredSponsors.map((sponsor) => ({
              src: sponsorCarouselImageSource(sponsor),
              title: sponsor.name,
              mark: sponsor.mark,
              aspect: 1,
            }))}
            panelHeight={440}
            gap={18}
            background="#111111"
            entry
            className="sponsor-liquid-carousel__canvas"
          />
        </div>
      </section>

      <section id="spotlight" className="sponsor-spotlight sponsor-reveal">
        <div className="spotlight-copy">
          <p className="sponsor-kicker">02 / SPOTLIGHT</p>
          <h2>
            ONE
            <br />
            <span>BIG</span>
            <br />
            THANK
            <br />
            <em>YOU.</em>
          </h2>
          <p>Swipe the stack. The names change; the energy does not.</p>
          <span className="spotlight-count">
            {String(spotlightIndex + 1).padStart(2, "0")} /{" "}
            {String(sponsors.length).padStart(2, "0")}
          </span>
        </div>
        <div
          className={`spotlight-stack${isSpotlightDragging ? " is-dragging" : ""}${
            isSpotlightSendingBack ? " is-sending-back" : ""
          }`}
          onPointerDown={handleSpotlightPointerDown}
          onPointerMove={handleSpotlightPointerMove}
          onPointerUp={handleSpotlightPointerUp}
          onPointerCancel={() => {
            spotlightPointerStart.current = null;
            spotlightPointerStartY.current = null;
            setIsSpotlightDragging(false);
            setSpotlightDragX(0);
            setSpotlightDragY(0);
          }}
          aria-label="Featured sponsor stack"
        >
          {Array.from({ length: 4 }, (_, stackIndex) => {
            const sponsor = sponsors[spotlightQueue[stackIndex]];
            return (
              <div
                className={`spotlight-card sponsor-tone-${sponsor.tone}`}
                key={sponsor.name}
                data-stack-position={stackIndex}
                style={
                  {
                    "--stack-index": stackIndex,
                    "--stack-drag-x": stackIndex === 0 ? `${spotlightDragX}px` : "0px",
                    "--stack-drag-y": stackIndex === 0 ? `${spotlightDragY}px` : "0px",
                    "--stack-exit-x": stackIndex === 0 ? `${spotlightExitX}px` : "0px",
                    "--stack-exit-y": stackIndex === 0 ? `${spotlightExitY}px` : "0px",
                  } as React.CSSProperties
                }
                role={stackIndex === 0 ? "button" : undefined}
                tabIndex={stackIndex === 0 ? 0 : -1}
                aria-label={
                  stackIndex === 0 ? `Show next featured sponsor after ${sponsor.name}` : undefined
                }
              >
                <span className="spotlight-label">
                  FEATURED PARTNER / {sponsor.category.toUpperCase()}
                </span>
                <div className="spotlight-mark">{sponsor.mark}</div>
                <h3>{sponsor.name}</h3>
                <p>Thank you for helping EDC turn ambition into action.</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="sponsor-footer">
        <span>EDC / NIT DURGAPUR</span>
        <strong>
          SEE YOU AT THE NEXT SUMMIT <ArrowUpRight size={22} />
        </strong>
        <a href="/">Back to home</a>
      </footer>
    </main>
  );
}
