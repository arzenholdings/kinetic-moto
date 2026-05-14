export type LaunchCandidateStatus = "dealer_pending" | "verify_channel" | "pre_application";

export type LaunchCandidate = {
  brand: string;
  models: string[];
  category: string;
  status: LaunchCandidateStatus;
  statusLabel: string;
  summary: string;
  needs: string[];
  accent: string;
};

export const launchCandidates: LaunchCandidate[] = [
  {
    brand: "E Ride Pro",
    models: ["Pro SR", "Pro SS 3.0", "Pro Mini"],
    category: "Performance off-road",
    status: "dealer_pending",
    statusLabel: "Dealer approval pending",
    summary: "Priority launch target for high-performance electric dirt bikes once dealer approval, pricing, warranty, fulfillment, and media permissions are confirmed.",
    needs: ["Dealer approval", "Wholesale/MAP terms", "Approved media", "Warranty path"],
    accent: "from-orange-500/25 via-stone-800 to-stone-950",
  },
  {
    brand: "79Bike",
    models: ["Falcon Pro", "Falcon GT", "Viper S"],
    category: "Performance off-road",
    status: "dealer_pending",
    statusLabel: "Dealer request ready",
    summary: "Candidate brand for the first catalog wave, pending dealer terms, approved product content, certificate of origin process, and support requirements.",
    needs: ["Dealer terms", "Media permission", "COO process", "Parts support"],
    accent: "from-emerald-500/20 via-stone-800 to-stone-950",
  },
  {
    brand: "Rawrr",
    models: ["Mantis X Pro", "Mantis Mini"],
    category: "Off-road / trail",
    status: "pre_application",
    statusLabel: "Pre-application note",
    summary: "Strong catalog candidate, but the dealer path appears to expect a physical commercial showroom, so the first step is a careful pre-application conversation.",
    needs: ["Showroom requirement", "Service expectations", "Opening order", "Territory rules"],
    accent: "from-red-500/20 via-stone-800 to-stone-950",
  },
  {
    brand: "Surron",
    models: ["Light Bee X", "Ultra Bee"],
    category: "Off-road / enduro",
    status: "verify_channel",
    statusLabel: "Verify source first",
    summary: "High-demand candidate, but the authorized US distribution path must be verified before Kinetic Moto lists or represents any products.",
    needs: ["Official source", "Dealer channel", "Warranty path", "Media permission"],
    accent: "from-sky-500/20 via-stone-800 to-stone-950",
  },
  {
    brand: "Talaria",
    models: ["Sting MX5", "XXX Pro", "Komodo"],
    category: "Off-road / trail",
    status: "verify_channel",
    statusLabel: "Verify source first",
    summary: "Target brand for the reseller catalog after the correct US dealer or distributor path is confirmed.",
    needs: ["Authorized channel", "Approved data", "MAP terms", "Parts support"],
    accent: "from-lime-500/20 via-stone-800 to-stone-950",
  },
  {
    brand: "Altis",
    models: ["Sigma", "Sigma MX"],
    category: "Premium off-road",
    status: "verify_channel",
    statusLabel: "US channel needed",
    summary: "Premium candidate for the launch matrix once Kinetic Moto identifies the right US contact, dealer requirements, and approved product assets.",
    needs: ["US contact", "Dealer rules", "Media kit", "Availability"],
    accent: "from-violet-500/20 via-stone-800 to-stone-950",
  },
];

export function getPriorityLaunchCandidates() {
  return launchCandidates.slice(0, 3);
}
