import Link from "next/link";

const policyLinks = [
  { label: "Terms", href: "/policies/terms" },
  { label: "Privacy", href: "/policies/privacy" },
  { label: "Shipping & pickup", href: "/policies/shipping-pickup" },
  { label: "Returns", href: "/policies/returns-cancellations" },
  { label: "Warranty", href: "/policies/warranty" },
  { label: "Financing", href: "/policies/financing" },
  { label: "Legal", href: "/policies/legal" },
];

const mainLinks = [
  { label: "Bikes", href: "/bikes" },
  { label: "About", href: "/about" },
  { label: "Dealer partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
  { label: "Policies", href: "/policies" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-stone-950 px-6 py-12 text-stone-300 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr]">
        <div>
          <Link href="/" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Kinetic Moto
          </Link>
          <p className="mt-5 max-w-md leading-7 text-stone-400">
            Ecommerce-first electric motorcycle reseller preparing brand-name catalog, financing conversations, and local setup, pickup, and rider support.
          </p>
          <p className="mt-5 text-sm text-stone-500">
            Product availability, financing, warranties, and legal-road-use status are confirmed before purchase.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-300">Site</p>
          <div className="mt-4 grid gap-3">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href} className="w-fit font-semibold text-stone-300 transition hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Policies">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-300">Policies</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="w-fit font-semibold text-stone-300 transition hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kinetic Moto. All rights reserved.</p>
        <a href="mailto:info@kinetic-moto.com" className="font-semibold text-stone-300 transition hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
          info@kinetic-moto.com
        </a>
      </div>
    </footer>
  );
}
