import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-[#0b0a10] px-5 py-24 text-center font-pixel text-[#f5f1e8]">
      <p className="text-[12px] text-[#ffa21f]">404 · Game over</p>
      <h1 className="text-[20px] leading-[1.6]">This page doesn&apos;t exist.</h1>
      <Link href="/" className="bg-[#ffa21f] px-5 py-3 text-[12px] text-[#0b0a10]">
        Continue? Back to home
      </Link>
    </div>
  );
}
