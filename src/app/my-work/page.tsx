import type { Metadata } from "next";
import Link from "next/link";
import Carousel, { type CarouselSlide } from "@/components/Carousel";
import ApproachList from "@/components/ApproachList";

export const metadata: Metadata = {
  title: "My Work",
  description:
    "Three case studies: MyLocalGuide, NoLimits, and Fenwick — a travel app, a coaching brand, and a B2B dashboard.",
};

type CaseStudy = {
  id: string;
  viewTransitionName: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  tags: string[];
  description: string;
  livePrototypeUrl?: string;
  slides: CarouselSlide[];
  aspectClassName: string;
  problem: string;
  approach: string[];
  outcome: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "mylocalguide",
    viewTransitionName: "title-mylocalguide",
    eyebrow: "01 — Travel app · Design system",
    title: "MyLocalGuide",
    subtitle:
      "Finding the parts of a city that don't make it into the guidebook.",
    role: "Product Designer",
    year: "2025",
    tags: ["Design systems", "Mobile UI", "0→1", "Travel"],
    description:
      "MyLocalGuide helps travellers find authentic local experiences in the city they're visiting — not the ten photos everyone already has, but the walk, the terrace, the passage a local would actually send you.",
    slides: [
      { src: "/images/mywork/mylocalguide-1.png", alt: "MyLocalGuide onboarding screen" },
      { src: "/images/mywork/mylocalguide-2.png", alt: "MyLocalGuide discover screen" },
      { src: "/images/mywork/mylocalguide-3.png", alt: "MyLocalGuide checkout screen" },
    ],
    aspectClassName: "aspect-[164/388]",
    problem:
      "Most travel apps optimise for booking volume: the same ranked list of \"top attractions\" in every city. I wanted to design for curiosity instead — a product that feels like a well-travelled friend texting you a recommendation, not a search engine.",
    approach: [
      "Built the UI kit and the product side by side in one monorepo, so every component was validated against real screens instead of designed in isolation.",
      "Designed an immersive, full-bleed login and onboarding — the first screen sets the tone: this is a place, not a form.",
      "Structured discovery around curated \"spots\" and city-specific collections rather than a generic search bar, so recommendations feel editorial.",
      "Extended discovery beyond a feed — a map view for browsing spots by area, so exploring a neighborhood doesn't mean scrolling through a list.",
    ],
    outcome:
      "Validated the core premise with a 25-person survey (Google Forms, distributed via Instagram and LinkedIn) before locking the MVP scope. Usability test scenarios are written; sessions are the next step before refining screens further.",
  },
  {
    id: "nolimits",
    viewTransitionName: "title-nolimits",
    eyebrow: "02 — Coaching app · Brand",
    title: "NoLimits",
    subtitle: "A training partner that fits in a pocket, not a gym bag.",
    role: "Product Designer",
    year: "2025",
    tags: ["Brand identity", "Mobile UI", "Coaching"],
    description:
      "NoLimits is a coaching app built for people training on their own terms — a brand and product identity designed to feel personal, disciplined, and a little bit fierce, rather than another generic fitness dashboard.",
    slides: [
      { src: "/images/mywork/nolimits-1.png", alt: "NoLimits exercise screen" },
      { src: "/images/mywork/nolimits-2.png", alt: "NoLimits home dashboard" },
      { src: "/images/mywork/nolimits-3.png", alt: "NoLimits meal plan screen" },
    ],
    aspectClassName: "aspect-[142/338]",
    problem:
      "Coaching apps tend to look either clinical (charts, streaks, guilt) or over-produced (stock athletes, empty motivation). Neither builds trust with someone who's serious about training but doesn't want to be sold to.",
    approach: [
      "Developed the visual identity first — mark, type, and a restrained palette that could carry both the brand and the in-app experience.",
      "Grounded the UI in real training contexts rather than lifestyle photography, keeping the tone direct and unglamorous.",
      "Designed for consistency across brand touchpoints, so the app, the mark, and any printed or social material read as one system.",
    ],
    outcome:
      "A design system carried across the app's core screens — dashboard, workout library, meal plans, weekly check-ins — bringing an existing hi-fi prototype in line with the client's brand for the first time. Plan comparison and payment screens are the next flows in progress.",
  },
  {
    id: "fenwick",
    viewTransitionName: "title-fenwick",
    eyebrow: "03 — B2B · SaaS dashboard",
    title: "Fenwick",
    subtitle:
      "Making expense approval something a manager can do in ten seconds, not ten minutes.",
    role: "Product Designer",
    year: "2026",
    tags: ["SaaS", "Dashboards", "B2B", "0→1"],
    description:
      "Fenwick is an expense-approval dashboard for managers and finance teams — built to surface exactly the context a manager needs (budget left, category, urgency) at the moment of the decision, instead of burying it in a spreadsheet.",
    livePrototypeUrl: "https://fenwick-expense-tool-ldg.vercel.app",
    slides: [
      { src: "/images/mywork/fenwick-1.png", alt: "Fenwick expense detail screen" },
      { src: "/images/mywork/fenwick-2.png", alt: "Fenwick approvals queue screen" },
      { src: "/images/mywork/fenwick-3.png", alt: "Fenwick budget overview screen" },
    ],
    aspectClassName: "aspect-[452/343]",
    problem:
      "Fenwick grew from 60 to 200 people in 18 months. Approvals still ran through Slack threads and shared spreadsheets — averaging 4 days, with spikes to 2 weeks at quarter-end. 15% of requests got lost or forgotten in the process entirely.",
    approach: [
      "Designed a queue that leads with signal, not chronology: over-budget and urgent requests are flagged before a manager even opens them.",
      "Surfaced team budget context — spent vs. total, per city/team — directly inside each request, so approving or rejecting doesn't require leaving the screen to check a separate report.",
      "Built a request history view so a manager can see a requester's pattern (repeat over-budget requests, for example) in one glance.",
      "Added a light/dark theme with two switchable palettes, so the tool fits into different team environments without fighting brand or accessibility needs.",
    ],
    outcome:
      "A working prototype covering the full manager decision loop, designed against the goal of cutting approval time from 4 days to under 24 hours. Tested with mock data at realistic scale — 9 queued requests (€2,991 + £1,055, 3 over budget) and a 20-request history at an 85% approval rate.",
  },
];

export default function MyWork() {
  return (
    <div>
      {/* Section intro */}
      <div className="flex flex-col items-center px-5 md:px-8">
        <div className="w-full max-w-[1152px] pt-16 pb-6 md:pt-20">
          <p className="page-eyebrow font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
            My Work
          </p>
          <h1 className="page-title pt-2 font-display text-[32px] md:text-[48px] leading-[1.15] md:leading-[60px] tracking-[1.2px] max-w-[672px]">
            Three projects, up close.
          </h1>
          <p className="max-w-[576px] pt-4 text-[15px] md:text-[16px] leading-[26px] text-muted">
            A travel app, a coaching brand, and a B2B dashboard I built
            myself. Different problems, same habit: strip a screen down
            until only the decision the user actually needs to make is
            left.
          </p>
          <nav className="flex flex-wrap gap-2 pt-8">
            {CASE_STUDIES.map((cs) => (
              <a
                key={cs.id}
                href={`#${cs.id}`}
                className="rounded px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.88px] text-muted border border-ink/15"
              >
                {cs.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Case studies */}
      <div className="flex flex-col items-center px-5 md:px-8">
        <div className="w-full max-w-[1152px]">
          {CASE_STUDIES.map((cs, i) => (
            <article
              key={cs.id}
              id={cs.id}
              className={`flex flex-col py-16 md:py-20 scroll-mt-20 ${
                i < CASE_STUDIES.length - 1 ? "border-b border-ink/10" : ""
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[487px_1fr] gap-8 md:gap-16">
                {/* Text column */}
                <div className="flex flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
                    {cs.eyebrow}
                  </p>
                  <h2
                    className="pt-2 font-display text-[28px] md:text-[36px] leading-[1.1] md:leading-[40px] tracking-[0.9px]"
                    style={{ viewTransitionName: cs.viewTransitionName }}
                  >
                    {cs.title}
                  </h2>
                  <p className="pt-3 text-[17px] md:text-[18px] leading-[1.6] md:leading-[29px] text-muted">
                    {cs.subtitle}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-y border-ink/10 py-4 mt-6">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-muted/70">
                        Role
                      </p>
                      <p className="pt-1 text-[14px] text-ink">{cs.role}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-muted/70">
                        Year
                      </p>
                      <p className="pt-1 text-[14px] text-ink">{cs.year}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-ink/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.8px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="pt-6 text-[16px] leading-[26px] text-muted">
                    {cs.description}
                  </p>

                  {cs.livePrototypeUrl && (
                    <a
                      href={cs.livePrototypeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pt-4 font-mono text-[12px] font-bold uppercase tracking-[0.48px] text-accent"
                    >
                      View live prototype →
                    </a>
                  )}
                </div>

                {/* Carousel column */}
                <div>
                  <Carousel
                    slides={cs.slides}
                    aspectClassName={cs.aspectClassName}
                  />
                </div>
              </div>

              {/* Problem / Approach / Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-ink/10 pt-10 mt-12">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
                    The problem
                  </h3>
                  <p className="pt-3 text-[16px] leading-[26px] text-muted">
                    {cs.problem}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
                    The approach
                  </h3>
                  <ApproachList items={cs.approach} />
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
                    The outcome
                  </h3>
                  <p className="pt-3 text-[16px] leading-[26px] text-muted">
                    {cs.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA band */}
      <div className="flex flex-col items-center border-t border-ink/10 bg-card-dark">
        <div className="flex w-full max-w-[1152px] flex-col items-start gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8 md:py-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-[#c4b5fd]">
              Want the details?
            </p>
            <h2 className="pt-2 font-display text-[26px] md:text-[30px] leading-[1.2] md:leading-[36px] tracking-[0.75px] text-bg">
              Happy to walk through the process live.
            </h2>
          </div>
          <Link
            href="/contact"
            className="w-full md:w-auto rounded px-5 py-3 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-ink bg-[#a78bfa]"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
