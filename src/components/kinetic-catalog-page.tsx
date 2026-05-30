import Link from "next/link";
import { ArrowRight, Bike, Clock3, Gauge, MapPin } from "lucide-react";
import { submitKineticInquiry } from "@/app/actions";
import { ProductCard } from "@/components/product-card";
import {
  bikes,
  brandList,
  getBikeBySlug,
  getBikeLabel,
  launchOffer,
  purchaseTimeframes,
} from "@/lib/kinetic-catalog";
import { kineticDesign } from "@/lib/kinetic-design";

const buyerSteps = [
  {
    title: "Catalog",
    copy: "Choose a high-demand electric bike brand",
    Icon: Gauge,
  },
  {
    title: "Availability",
    copy: "Send model, timeline, financing, and reservation intent",
    Icon: Clock3,
  },
  {
    title: "Sales offer",
    copy: "Get current price, allocation status, and pickup/shipping path",
    Icon: MapPin,
  },
];

type KineticCatalogPageProps = {
  selectedBikeSlug?: string;
  inquiryState?: string;
  intent?: string;
};

export function KineticCatalogPage({
  selectedBikeSlug,
  inquiryState,
  intent = "availability",
}: KineticCatalogPageProps) {
  const selectedBike = selectedBikeSlug ? getBikeBySlug(selectedBikeSlug) : undefined;
  const defaultBike = selectedBike ? getBikeLabel(selectedBike) : "";
  const normalizedIntent = intent === "financing" ? "financing" : "availability";

  return (
    <main className={kineticDesign.page}>
      <section id="top" className={`relative overflow-hidden pb-16 pt-6 ${kineticDesign.section}`}>
        <div className={kineticDesign.heroGlow} />
        <div className={kineticDesign.topRule} />

        <div className={`relative ${kineticDesign.content}`}>
          <header className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3" aria-label="Kinetic Moto Sports home">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/30 bg-cyan-200/10">
                <Bike className="h-5 w-5 text-cyan-100" />
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.22em]">
                  Kinetic Moto
                </span>
                <span className="hidden text-xs text-slate-400 sm:block">
                  Launch bike catalog
                </span>
              </span>
            </Link>
            <a
              href="#inquiry"
              className={kineticDesign.navButton}
            >
              Request Availability
            </a>
          </header>

          <div className="grid min-h-[72vh] items-center gap-10 py-12 lg:grid-cols-[1.04fr_0.96fr]">
            <div>
              <p className={kineticDesign.pill}>
                Kinetic launch catalog
              </p>
              <h1 className="mt-6 max-w-[22rem] text-3xl font-semibold leading-tight text-white sm:max-w-4xl sm:text-6xl">
                {launchOffer.headline}
              </h1>
              <p className="mt-6 max-w-[22rem] text-base leading-8 text-kinetic-muted sm:max-w-2xl sm:text-lg">
                {launchOffer.subheadline}
              </p>
              <p className="mt-5 max-w-[22rem] border-l border-kinetic-urgency/50 pl-4 text-sm font-medium leading-6 text-amber-100 sm:max-w-2xl">
                {launchOffer.urgency}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#inquiry"
                  className={`h-12 w-full max-w-[22rem] sm:w-auto ${kineticDesign.primaryButton}`}
                >
                  {launchOffer.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#catalog"
                  className={`h-12 w-full max-w-[22rem] sm:w-auto ${kineticDesign.secondaryButton}`}
                >
                  View Launch Bikes
                </a>
              </div>
            </div>

            <div className={`min-w-0 max-w-[22rem] sm:max-w-none ${kineticDesign.elevatedCard}`}>
              <div className={`min-w-0 ${kineticDesign.panel}`}>
                <p className={kineticDesign.eyebrow}>
                  Buyer path today
                </p>
                <div className="mt-6 grid gap-4">
                  {buyerSteps.map(({ title, copy, Icon }) => (
                    <div key={title} className={`flex min-w-0 gap-4 ${kineticDesign.stepPanel}`}>
                      <span className={kineticDesign.iconBox}>
                        <Icon className="h-5 w-5 text-cyan-100" />
                      </span>
                      <div className="min-w-0">
                        <h2 className="font-semibold text-white">{title}</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className={`py-14 ${kineticDesign.section}`}>
        <div className={kineticDesign.content}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className={kineticDesign.eyebrow}>
                Launch catalog
              </p>
              <h2 className="mt-3 text-xl font-semibold leading-tight text-white sm:text-4xl">
                Seven electric moto brands ready for availability checks
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-kinetic-muted">
              {brandList.join(", ")}. Pricing is confirmed with current vendor/dealer availability.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {bikes.map((bike) => (
              <ProductCard key={bike.slug} bike={bike} />
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className={`py-14 ${kineticDesign.section}`}>
        <div className={`grid gap-8 lg:grid-cols-[0.82fr_1.18fr] ${kineticDesign.content}`}>
          <div>
            <p className={kineticDesign.eyebrow}>
              Inquiry architecture
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Tell us what you want to ride.
            </h2>
            <p className="mt-4 text-base leading-7 text-kinetic-muted">
              Send the model, purchase timeframe, financing preference, location, and
              reserve interest. No payment is collected here.
            </p>
            {selectedBike && (
              <div className="mt-6 rounded-md border border-cyan-200/25 bg-cyan-200/10 p-4 text-sm text-cyan-50">
                Current selection: {selectedBike.brand} {selectedBike.model}
              </div>
            )}
            {inquiryState === "sent" && (
              <div
                aria-live="polite"
                className={kineticDesign.alertSuccess}
              >
                Thanks — we’ll confirm availability and next steps shortly.
              </div>
            )}
            {inquiryState === "missing" && (
              <div
                aria-live="polite"
                className={kineticDesign.alertUrgency}
              >
                Please check the required fields and use a valid email and phone number.
              </div>
            )}
            {inquiryState === "error" && (
              <div
                aria-live="polite"
                className={kineticDesign.alertError}
              >
                We could not send that request. Please try again in a moment.
              </div>
            )}
          </div>

          <form
            action={submitKineticInquiry}
            className={`grid gap-4 sm:grid-cols-2 ${kineticDesign.card}`}
          >
            <input type="hidden" name="intent" value={normalizedIntent} />
            <label className={kineticDesign.fieldLabel}>
              Name
              <input
                required
                name="name"
                autoComplete="name"
                className={kineticDesign.field}
                placeholder="Your name"
              />
            </label>
            <label className={kineticDesign.fieldLabel}>
              Phone
              <input
                required
                name="phone"
                autoComplete="tel"
                className={kineticDesign.field}
                placeholder="Best number"
              />
            </label>
            <label className={`sm:col-span-2 ${kineticDesign.fieldLabel}`}>
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className={kineticDesign.field}
                placeholder="you@example.com"
              />
            </label>
            <label className={`sm:col-span-2 ${kineticDesign.fieldLabel}`}>
              Selected model
              <select
                required
                name="selectedModel"
                defaultValue={defaultBike}
                className={kineticDesign.field}
              >
                <option value="">Select a launch bike</option>
                {bikes.map((bike) => (
                  <option key={bike.slug} value={getBikeLabel(bike)}>
                    {bike.brand} {bike.model}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>
            <label className={kineticDesign.fieldLabel}>
              Purchase timeframe
              <select
                required
                name="purchaseTimeframe"
                className={kineticDesign.field}
                defaultValue=""
              >
                <option value="" disabled>
                  Select timeframe
                </option>
                {purchaseTimeframes.map((purchaseTimeframe) => (
                  <option key={purchaseTimeframe} value={purchaseTimeframe}>
                    {purchaseTimeframe}
                  </option>
                ))}
              </select>
            </label>
            <label className={kineticDesign.fieldLabel}>
              Financing interest
              <select
                required
                name="financingInterest"
                className={kineticDesign.field}
                defaultValue={normalizedIntent === "financing" ? "Yes" : ""}
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className={`sm:col-span-2 ${kineticDesign.fieldLabel}`}>
              Reserve / Deposit Interest
              <select
                required
                name="reserveDepositInterest"
                className={kineticDesign.field}
                defaultValue=""
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className={`sm:col-span-2 ${kineticDesign.fieldLabel}`}>
              Location
              <input
                required
                name="location"
                autoComplete="address-level2"
                className={kineticDesign.field}
                placeholder="City, state"
              />
            </label>
            <label className={`sm:col-span-2 ${kineticDesign.fieldLabel}`}>
              Message
              <textarea
                name="message"
                rows={4}
                className={kineticDesign.textarea}
                placeholder="Tell us what you want to ride, pickup/shipping needs, or financing questions."
              />
            </label>
            <button
              type="submit"
              className={`h-12 sm:col-span-2 ${kineticDesign.primaryButton}`}
            >
              Request Availability
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
