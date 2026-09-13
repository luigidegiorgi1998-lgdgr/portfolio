import Image from "next/image";
import Link from "next/link";
import ViewTransitionLink from "@/components/ViewTransitionLink";

const SHELF_TAGS = [
  "Product design",
  "Design systems",
  "Prototyping",
  "User research",
  "Figma",
];

export default function Home() {
  return (
    <div className="flex flex-col min-[1100px]:flex-row gap-8 min-[1100px]:gap-16 px-5 md:px-16 py-12 md:py-24">
      {/* Hero */}
      <section className="w-full min-[1100px]:w-[480px] shrink-0">
        <p className="page-eyebrow font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
          Luigi De Giorgi
        </p>
        <p className="page-eyebrow font-mono text-[11px] uppercase tracking-[0.88px] text-muted/60 pt-1">
          Product Designer
        </p>
        <h1 className="page-title font-display text-[34px] md:text-[68px] leading-[1.1] md:leading-[74px] tracking-[1.5px] pt-5">
          Hi. I&apos;m Luigi, and you probably don&apos;t know me.
        </h1>
        <p className="pt-6 text-[15px] md:text-[18px] leading-[1.6] text-muted">
          8 years ago I started fixing cars. Last year I was making coffee in
          Toronto. Today I&apos;m a product designer.{" "}
          <span className="font-semibold text-ink">Here&apos;s my work.</span>
        </p>
        <p className="pt-6 text-[16px] italic leading-[26px] text-muted/80">
          &ldquo;The pursuit of beauty and function has always been part of
          the process.&rdquo;
        </p>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto pt-8">
          <Link
            href="/my-work"
            className="flex items-center justify-center rounded-full bg-accent px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-bg w-full md:w-auto"
          >
            See the work
          </Link>
          <Link
            href="/about"
            className="flex items-center justify-center rounded-full border border-ink/15 px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-ink w-full md:w-auto"
          >
            Read the story
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center rounded-full border border-ink/15 px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-ink w-full md:w-auto"
          >
            Let&apos;s talk
          </Link>
        </div>
      </section>

      {/* Bento */}
      <div className="w-full min-[1100px]:flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[188px_188px_130px] gap-4">
          {/* MyLocalGuide */}
          <ViewTransitionLink
            href="/my-work#mylocalguide"
            className="group relative block overflow-hidden rounded-[28px] border border-ink/10 bg-card-dark h-[200px] md:h-auto md:row-span-2"
          >
            <Image
              src="/images/home/mylocalguide-card.png"
              alt="MyLocalGuide app preview"
              fill
              sizes="(min-width: 1100px) 352px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
            <div className="absolute left-0 top-0 flex flex-col gap-1 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-accent">
                Travel app · Design system
              </p>
              <p
                className="font-display text-[20px] tracking-[0.5px] text-bg"
                style={{ viewTransitionName: "title-mylocalguide" }}
              >
                MyLocalGuide
              </p>
            </div>
          </ViewTransitionLink>

          {/* Fenwick */}
          <ViewTransitionLink
            href="/my-work#fenwick"
            className="group relative block overflow-hidden rounded-[28px] border border-ink/10 bg-card-dark h-[200px] md:h-auto"
          >
            <Image
              src="/images/home/fenwick-card-image2.png"
              alt="Fenwick expense dashboard preview"
              fill
              sizes="(min-width: 1100px) 352px, 100vw"
              className="object-cover"
              style={{ objectPosition: "center 22%" }}
            />
            <div className="absolute inset-x-0 top-0 h-[86px] bg-gradient-to-b from-[rgba(23,20,28,0.97)] via-[rgba(23,20,28,0.75)] to-transparent" />
            <p className="absolute left-[19px] top-[19px] font-mono text-[10px] uppercase tracking-[0.8px] text-[#c4b5fc]">
              B2B · SaaS dashboard
            </p>
            <p
              className="absolute left-[19px] top-[38px] font-display text-[18px] text-bg"
              style={{ viewTransitionName: "title-fenwick" }}
            >
              Fenwick
            </p>
          </ViewTransitionLink>

          {/* NoLimits */}
          <ViewTransitionLink
            href="/my-work#nolimits"
            className="group relative block overflow-hidden rounded-[28px] border border-ink/10 bg-card-dark h-[200px] md:h-auto"
          >
            <div className="absolute -right-4 top-1 h-[180px] w-[145px] rotate-[30deg] overflow-hidden opacity-90">
              <Image
                src="/images/home/nolimits-esercizio.png"
                alt=""
                fill
                sizes="145px"
                className="object-cover"
                aria-hidden="true"
              />
            </div>
            <div className="absolute right-8 -top-6 h-[230px] w-[140px] rotate-[30deg] overflow-hidden">
              <Image
                src="/images/home/nolimits-home.png"
                alt="NoLimits app preview"
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-card-dark via-card-dark/70 to-transparent" />
            <div className="absolute left-0 top-0 flex h-full max-w-[65%] flex-col justify-center gap-0.5 p-4">
              <p
                className="font-display text-[18px] tracking-[0.45px] text-bg"
                style={{ viewTransitionName: "title-nolimits" }}
              >
                NoLimits
              </p>
              <p className="text-[11px] leading-normal text-bg/80">
                We train the body, we care for the spirit. You have NoLimits.
              </p>
            </div>
          </ViewTransitionLink>

          {/* On the shelf */}
          <div className="flex flex-col justify-center rounded-[28px] border border-ink/10 bg-white p-5">
            <p className="pb-3 font-mono text-[10px] uppercase tracking-[0.8px] text-muted/60">
              On the shelf
            </p>
            <div className="flex flex-wrap gap-2">
              {SHELF_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.8px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* About */}
          <Link
            href="/about"
            className="flex flex-col justify-center rounded-[28px] border border-ink/10 bg-white p-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.8px] text-accent">
              About
            </p>
            <p className="pt-2 text-[16px] leading-[22px] text-muted">
              Mechanic → barista → designer.{" "}
              <span className="font-semibold text-ink">
                The route here, and why it matters.
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
