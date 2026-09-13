import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mechanic → barista → designer. The route here, and the habits that came with it.",
};

const TIMELINE = [
  {
    year: "2018",
    title: "Mechanic",
    text: "Started fixing cars. Learned to diagnose a problem by listening for what's actually wrong, not what's easiest to blame.",
  },
  {
    year: "2025",
    title: "Barista, Toronto",
    text: "Moved to Toronto, pulled espresso for a living. Learned how much a good system matters when you have ninety seconds and a line out the door.",
  },
  {
    year: "2026",
    title: "Product Designer",
    text: "Taught myself design and front-end by building real things — a travel app, a coaching brand, a B2B dashboard. Haven't stopped.",
  },
  {
    year: "Now",
    title: "Looking for the next problem",
    text: "Open to product design roles — in-house, agency, or research-leaning. Early career, but not new to figuring things out under pressure.",
  },
];

const HABITS = [
  {
    title: "Fix the actual problem",
    text: "A car doesn't run because it \"needs a service\" — it runs because one specific part failed. I design the same way: find the real constraint before touching the UI.",
  },
  {
    title: "Systems over heroics",
    text: "A busy espresso bar doesn't survive on talent alone, it survives on a repeatable system. I'd rather ship a solid pattern than a clever one-off screen.",
  },
  {
    title: "Show the work, not just the outcome",
    text: "I came into design from outside the industry. I care about being legible about how I got to a decision, not just presenting a polished result.",
  },
];

const SKILLS = [
  "Product design",
  "Design systems",
  "Prototyping",
  "User research",
  "Figma",
  "Claude / Claude Code / Claude Design",
  "0→1 products",
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <div className="flex flex-col items-center px-5 md:px-8">
        <div className="grid w-full max-w-[1024px] grid-cols-1 md:grid-cols-[1fr_224px] gap-8 md:gap-14 pt-16 pb-10 md:pt-20">
          <div>
            <p className="page-eyebrow font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
              About
            </p>
            <h1 className="page-title pt-2 font-display text-[30px] md:text-[48px] leading-[1.2] md:leading-[60px] tracking-[1.2px]">
              Three jobs, one habit: pay attention to what&apos;s actually
              broken.
            </h1>
            <p className="max-w-[576px] pt-5 text-[15px] md:text-[16px] leading-[26px] text-muted">
              I&apos;m always chasing new inspiration — music, film, sport,
              fashion, tech. Nothing bores me more than doing nothing —
              pretty un-Italian of me.
              <br />
              <br />
              In my free time you&apos;ll find me playing beach volleyball
              with the music cranked up, or completely absorbed hunting for
              the best accessory for the phone that holds my entire life —
              fifth coffee of the day in hand.
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <div className="relative h-[220px] w-full max-w-[320px] overflow-hidden rounded-2xl md:h-[354px] md:w-[218px]">
              <Image
                src="/images/about/luigi-portrait.png"
                alt="Portrait of Luigi De Giorgi"
                fill
                sizes="(min-width: 768px) 218px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* The route here */}
      <div className="flex flex-col items-center border-t border-ink/10 px-5 md:px-8">
        <div className="w-full max-w-[1024px] py-16 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
            The route here
          </p>
          <h2 className="pt-2 font-display text-[24px] md:text-[30px] leading-[1.2] md:leading-[36px] tracking-[0.75px]">
            Mechanic → Barista → Designer
          </h2>

          {/* Desktop: connected line. Mobile: stacked blocks, no line. */}
          <div className="mt-10 flex flex-col gap-8 md:gap-10 md:border-l md:border-ink/15 md:pl-8">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <span className="hidden md:block absolute -left-[37px] top-[6px] h-2.5 w-2.5 rounded-full bg-accent" />
                <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
                  {item.year}
                </p>
                <h3 className="pt-1 font-display text-[18px] md:text-[20px] leading-[1.4] tracking-[0.5px]">
                  {item.title}
                </h3>
                <p className="max-w-[576px] pt-2 text-[15px] md:text-[16px] leading-[26px] text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How I work */}
      <div className="flex flex-col items-center border-t border-ink/10 bg-card-dark">
        <div className="w-full max-w-[1024px] px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-[#c4b5fd]">
            How I work
          </p>
          <h2 className="pt-2 font-display text-[24px] md:text-[30px] leading-[1.2] md:leading-[36px] tracking-[0.75px] text-bg">
            Habits I brought with me from the shop floor.
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {HABITS.map((habit) => (
              <div
                key={habit.title}
                className="border-t border-bg/15 pt-5"
              >
                <h3 className="font-display text-[18px] leading-[1.4] tracking-[0.45px] text-bg">
                  {habit.title}
                </h3>
                <p className="pt-2 text-[14px] leading-[22.75px] text-bg/70">
                  {habit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col items-center border-t border-ink/10 bg-card-dark">
        <div className="w-full max-w-[1024px] px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-[#c4b5fd]">
            Skills
          </p>
          <h2 className="pt-2 font-display text-[24px] md:text-[30px] leading-[1.2] md:leading-[36px] tracking-[0.75px] text-bg">
            Tools I reach for.
          </h2>
          <div className="mt-10 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded bg-bg/[0.08] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.8px] text-bg/85"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-[1024px] flex-col items-start gap-4 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
              Curious about the work?
            </p>
            <h2 className="pt-2 font-display text-[24px] md:text-[30px] leading-[1.2] md:leading-[36px] tracking-[0.75px]">
              See what I&apos;ve built so far.
            </h2>
          </div>
          <Link
            href="/my-work"
            className="w-full md:w-auto rounded px-5 py-3 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-bg bg-ink"
          >
            View my work
          </Link>
        </div>
      </div>
    </div>
  );
}
