import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV / Contact",
  description:
    "Get in touch with Luigi De Giorgi — download the CV, email, or connect on LinkedIn.",
};

export default function Contact() {
  return (
    <div className="flex flex-col items-center px-5 md:px-8">
      <div className="w-full max-w-[896px] pt-16 pb-10 md:pt-20">
        <p className="page-eyebrow font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
          CV / Contact
        </p>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 pt-2">
          <div className="flex-1 min-w-0">
            <h1 className="page-title font-display text-[32px] md:text-[48px] leading-[1.2] md:leading-[60px] tracking-[1.2px]">
              <span className="text-accent">Let&apos;s talk</span> about
              what you&apos;re <span className="text-accent">building</span>
              .
            </h1>
            <p className="max-w-[576px] pt-5 text-[15px] md:text-[16px] leading-[26px] text-muted">
              I&apos;m looking for my first in-house or agency product
              design role. If something you&apos;re working on needs a
              designer who isn&apos;t afraid of a messy problem, get in
              touch.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-[220px] shrink-0">
            <a
              href="/cv/luigi-de-giorgi-cv.pdf"
              download
              className="w-full rounded px-5 py-3 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-bg bg-accent"
            >
              Download CV (PDF)
            </a>
            <a
              href="mailto:luigidegiorgi1998@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded border border-ink/20 px-5 py-3 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-ink"
            >
              Email me
            </a>
            <a
              href="https://www.linkedin.com/in/luigi-de-giorgi-6216941b1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded border border-ink/20 px-5 py-3 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
