import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { initiatives } from "@/lib/edc-content";
import cover from "@/assets/edc-collage.jpg";
import quest from "@/assets/quest-lightbulb.jpg";
import crowd from "@/assets/crowd.asset.json";
import speaker from "@/assets/speaker.asset.json";
import bizzcup from "@/assets/bizzcup.asset.json";
import logo from "@/assets/logo.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDC NIT Durgapur | Ideate. Innovate. Incubate." },
      {
        name: "description",
        content:
          "The Entrepreneurship Development Cell at NIT Durgapur. Discover E-Summit, our initiatives, and the community turning ideas into impact since 2015.",
      },
      { property: "og:title", content: "EDC NIT Durgapur | Ideate. Innovate. Incubate." },
      {
        property: "og:description",
        content:
          "Student-led ideas. Real-world impact. Meet the Entrepreneurship Development Cell of NIT Durgapur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const links = [
  { label: "HOME", href: "#home" },
  { label: "E-SUMMIT", href: "https://esummit.edcnitd.co.in/" },
  { label: "EVENTS", href: "#events" },
  { label: "SOTM", href: "https://edcnitd.co.in/sotm/" },
  { label: "IIC", href: "#iic" },
];
const photos = [
  { url: crowd.url, title: "The crowd at E-Summit" },
  { url: speaker.url, title: "Aditya Bharadwaj at E-Summit '24" },
  { url: bizzcup.url, title: "BizzCup: our signature fresher’s event" },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const photo = photoIndex === null ? undefined : photos[photoIndex];

  return (
    <div id="home">
      <nav className="masthead" aria-label="Main navigation">
        <div className="page-width masthead-inner">
          <a href="#home" className="flex items-center gap-3" aria-label="EDC NIT Durgapur home">
            <span className="wordmark">EDC NITD</span>
            <span className="hidden xl:block text-xs font-medium">VOL. 2026 / NO. 01</span>
          </a>
          <div className="nav-links">
            {links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="brutal" asChild>
              <a href="mailto:edc@nitdgp.ac.in?subject=Joining%20EDC">JOIN THE CELL</a>
            </Button>
            <Button
              variant="tool"
              size="icon"
              className="md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu md:hidden">
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="https://edcnitd.co.in/team/">OUR TEAM</a>
            <a href="https://edcnitd.co.in/sponsors/">SPONSORS</a>
          </div>
        )}
      </nav>

      <header className="cover">
        <img
          src={cover}
          alt="An editorial collage of invention, architecture, and engineering blueprints"
          className="cover-image"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div className="cover-inner">
          <div>
            <p className="cover-motto">IDEATE. INNOVATE. INCUBATE.</p>
            <h1>
              ENTREPRENEURSHIP
              <br />
              DEVELOPMENT CELL
            </h1>
            <div className="mt-8 flex justify-center gap-4">
              <span className="border-2 border-paper px-4 py-1 text-sm font-medium">
                NIT DURGAPUR
              </span>
              <span className="border-2 border-neon bg-neon px-4 py-1 text-sm font-medium text-ink">
                ESTD. 2015
              </span>
            </div>
          </div>
        </div>
        <div className="cover-bottom">
          <p>
            Building a sustainable entrepreneurial ecosystem in India. Student-led ideas. Real-world
            impact.
          </p>
          <a href="#events" className="cover-scroll flex items-center gap-3">
            SCROLL FOR INTEL <ArrowDown size={22} />
          </a>
        </div>
      </header>

      <main>
        <section id="events" className="section-pad">
          <div className="page-width">
            <div className="section-heading">
              <h2>WHAT WE DO</h2>
              <span className="number">02</span>
            </div>
            <div className="event-grid">
              <article className="event-card card-fest">
                <h3>E-SUMMIT</h3>
                <p>
                  Eastern India’s second-largest entrepreneurship festival. A gathering of founders,
                  investors, and the next generation of innovators.
                </p>
                <ul className="fest-items">
                  <li>STARTUP-EXPO</li>
                  <li>PITCHFEST</li>
                  <li>INTERNSHIP FAIR</li>
                </ul>
                <div className="card-link">
                  <Button variant="editorial" onClick={() => setEventsOpen(true)}>
                    EXPLORE FEST <ArrowRight />
                  </Button>
                </div>
              </article>
              <article className="event-card card-quest" id="equest">
                <h3>E-QUEST</h3>
                <p>
                  Your weekly dose of business ideas. Strange company stories. Zero jargon. One
                  sharp read at a time.
                </p>
                <img
                  src={quest}
                  alt="A bold, block-print lightbulb"
                  className="quest-art"
                  width={1152}
                  height={576}
                  loading="lazy"
                />
                <div className="mt-auto">
                  <Button variant="editorial" asChild>
                    <a href="https://edcnitd.co.in/EQuest/">
                      READ THE ARCHIVE <ArrowUpRight />
                    </a>
                  </Button>
                </div>
              </article>
              <article className="event-card card-iic" id="iic">
                <h3>IIC BODY</h3>
                <p>
                  Innovation and Incubation Council, NIT Durgapur’s very own incubation body,
                  established under the Ministry of Education, Government of India.
                </p>
                <div className="iic-lines">
                  <div>
                    <span>INNOVATION</span>
                    <span className="text-neon">IDEA TO IMPACT</span>
                  </div>
                  <div>
                    <span>INCUBATION</span>
                    <a className="text-neon" href="https://nitdgp.ac.in/iicpage/">
                      MEET THE COUNCIL ↗
                    </a>
                  </div>
                </div>
              </article>
            </div>
            <div className="about-copy" id="about">
              <div>
                <p className="text-xs font-semibold text-punch">THE PEOPLE BEHIND THE IDEAS</p>
                <h3>ABOUT US.</h3>
              </div>
              <p>
                The Entrepreneurship Development Cell, NIT Durgapur is the institution’s official
                entrepreneurship-promoting student body. Through initiatives throughout the year, we
                remain steadfast in our dream of creating a sustainable and diverse entrepreneurial
                ecosystem — bringing generations together to make entrepreneurship a common reality
                in India.
              </p>
            </div>
          </div>
        </section>

        <section className="journey section-pad" id="journey">
          <div className="page-width">
            <div className="journey-intro">
              <div>
                <p className="font-display text-2xl text-neon mb-4">JOURNEY / 03</p>
                <h2>
                  FROM THREE FRIENDS
                  <br />
                  TO A MOVEMENT.
                </h2>
              </div>
              <div>
                <p>
                  In 2015, three friends set out to instil an entrepreneurial culture at NIT
                  Durgapur. Today, the journey continues — one idea, one event, and one connection
                  at a time.
                </p>
                <a
                  href="https://edcnitd.co.in/team/"
                  className="font-display text-xl text-neon inline-flex items-center gap-2"
                >
                  MEET TEAM EDC <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <Button
              variant="tool"
              className="gallery-wide"
              aria-label="View the crowd at E-Summit photo"
              onClick={() => setPhotoIndex(0)}
            >
              <img
                src={crowd.url}
                alt="The crowd at E-Summit"
                width={1600}
                height={900}
                loading="lazy"
              />
              <span className="gallery-caption">THE CROWD / E-SUMMIT</span>
            </Button>
            <div className="gallery-pair">
              <Button
                variant="tool"
                className="gallery-small"
                aria-label="View Aditya Bharadwaj at E-Summit photo"
                onClick={() => setPhotoIndex(1)}
              >
                <img
                  src={speaker.url}
                  alt="Aditya Bharadwaj speaking at E-Summit 2024"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <span className="gallery-caption">E-TALKS / ADITYA BHARADWAJ</span>
              </Button>
              <Button
                variant="tool"
                className="gallery-small"
                aria-label="View BizzCup photo"
                onClick={() => setPhotoIndex(2)}
              >
                <img
                  src={bizzcup.url}
                  alt="Students taking part in BizzCup"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <span className="gallery-tag">BIZZCUP</span>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-paper/30 pt-6">
              <p className="font-display text-3xl">OUR STARTUPS. THEIR NEXT CHAPTER.</p>
              <Button variant="editorial" asChild>
                <a href="https://edcnitd.co.in/sotm/" className="text-neon">
                  STARTUP OF THE MONTH <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-band" id="contact">
        <div className="page-width">
          <div className="footer-grid">
            <div>
              <h3>LOCATE US</h3>
              <address>
                Mahatma Gandhi Avenue, A-Zone,
                <br />
                Durgapur, West Bengal 713209
              </address>
              <div className="mt-6 h-1 w-24 bg-punch" />
            </div>
            <div>
              <h3>COMMUNICATE</h3>
              <p>
                <a href="tel:+917007647720" className="inline-flex items-center gap-2">
                  <Phone size={14} /> +91 70076 47720
                </a>
                <br />
                Sanvie Singhal
              </p>
              <p className="mt-3">
                <a href="mailto:edc@nitdgp.ac.in" className="inline-flex items-center gap-2">
                  <Mail size={14} /> edc@nitdgp.ac.in
                </a>
              </p>
              <div className="mt-6 flex gap-5 text-xs font-semibold">
                <a href="https://edcnitd.co.in/sponsors/">SPONSORS ↗</a>
                <a href="https://edcnitd.co.in/team/">OUR TEAM ↗</a>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3>THE MANIFESTO</h3>
                <p>
                  Ideate. Innovate. Incubate.
                  <br />
                  Entrepreneurship Development Cell.
                  <br />
                  NIT Durgapur.
                </p>
              </div>
              <img
                src={logo.url}
                alt="Entrepreneurship Development Cell NIT Durgapur logo"
                className="mt-6 w-32"
                width={180}
                height={90}
                loading="lazy"
              />
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 EDC. ALL RIGHTS RESERVED.</p>
            <p>MADE WITH LOVE BY WEB-TEAM</p>
            <a href="#home" className="inline-flex gap-2">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </footer>

      <Dialog open={eventsOpen} onOpenChange={setEventsOpen}>
        <DialogContent className="editorial-dialog max-h-[85svh] overflow-y-auto">
          <DialogTitle>FROM IDEA TO IMPACT.</DialogTitle>
          <DialogDescription>Our events and initiatives</DialogDescription>
          <div className="event-list">
            {initiatives.map((event) => (
              <article className="event-list-item" key={event.name}>
                <p className="text-xs font-semibold text-punch">{event.category}</p>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
          <Button variant="brutal" asChild>
            <a href="https://esummit.edcnitd.co.in/">
              VISIT E-SUMMIT <ArrowUpRight />
            </a>
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={photoIndex !== null}
        onOpenChange={(open) => {
          if (!open) setPhotoIndex(null);
        }}
      >
        <DialogContent className="editorial-dialog max-w-4xl">
          <DialogTitle className="pr-6">{photo?.title}</DialogTitle>
          <DialogDescription>EDC NIT Durgapur · A photogenic journey</DialogDescription>
          {photo && (
            <img
              src={photo.url}
              alt={photo.title}
              className="max-h-[60svh] w-full object-contain"
            />
          )}
          <div className="flex justify-between items-center">
            <Button
              variant="tool"
              size="icon"
              aria-label="Previous photo"
              onClick={() => setPhotoIndex((i) => ((i ?? 0) + photos.length - 1) % photos.length)}
            >
              ←
            </Button>
            <span className="font-display text-xl">
              {(photoIndex ?? 0) + 1} / {photos.length}
            </span>
            <Button
              variant="tool"
              size="icon"
              aria-label="Next photo"
              onClick={() => setPhotoIndex((i) => ((i ?? 0) + 1) % photos.length)}
            >
              →
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
