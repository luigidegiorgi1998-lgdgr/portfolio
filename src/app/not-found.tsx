import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center md:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-accent">
        404
      </p>
      <h1 className="pt-2 font-display text-[32px] md:text-[48px] leading-[1.15] tracking-[1.2px]">
        This page took a wrong turn.
      </h1>
      <p className="max-w-[420px] pt-4 text-[15px] md:text-[16px] leading-[26px] text-muted">
        Whatever you were looking for isn&apos;t here. Let&apos;s get you
        back on the road.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.96px] text-bg"
      >
        Back to Home
      </Link>
    </div>
  );
}
