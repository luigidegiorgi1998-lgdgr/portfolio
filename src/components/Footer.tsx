export default function Footer() {
  return (
    <footer className="w-full border-t border-ink/10 bg-bg">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col items-start gap-2 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-muted">
          © 2026 Luigi De Giorgi — Product Designer
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.88px] text-muted">
          Built with a bit of grease under the fingernails.
        </p>
      </div>
    </footer>
  );
}
