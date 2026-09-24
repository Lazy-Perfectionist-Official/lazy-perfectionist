export default function Footer() {
  return (
    <footer data-testid="site-footer">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <span className="font-display text-lg italic text-muted">Lazy Perfectionist</span>
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted/70">
          © 2026 · Hong Kong
        </p>
      </div>
    </footer>
  );
}
