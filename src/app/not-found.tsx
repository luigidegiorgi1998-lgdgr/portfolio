import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-24 text-center font-pixel">
      <p className="text-[12px] text-accent">404</p>
      <h1 className="text-[20px] leading-[1.6]">Un Pokémon selvatico ti ha fatto sbagliare strada!</h1>
      <Link href="/" className="rounded-full bg-accent px-5 py-3 text-[12px] text-[#0e1226]">
        Torna al laboratorio
      </Link>
    </div>
  );
}
