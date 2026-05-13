import Link from "next/link";

const navLinks = [
  { label: "Bikes", href: "/bikes" },
  { label: "Financing", href: "/policies/financing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stone-950/92 px-6 py-4 text-stone-50 shadow-lg shadow-black/20 backdrop-blur sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="inline-flex w-fit rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
          Kinetic Moto
        </Link>

        <nav className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 text-sm font-bold text-stone-300 transition hover:bg-white/5 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-stone-950 shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Request Info
          </Link>
        </nav>
      </div>
    </header>
  );
}
