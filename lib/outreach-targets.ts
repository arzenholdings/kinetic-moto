export type OutreachStatus = "ready_to_draft" | "application_first" | "verify_first" | "blocked";

export type OutreachTarget = {
  brand: string;
  priority: 1 | 2 | 3;
  status: OutreachStatus;
  models: string[];
  contactPath: string;
  officialUrls: string[];
  sourceNotes: string[];
  blockers: string[];
  askFor: string[];
  nextAction: string;
  openClawAction: string;
};

export const outreachTargets: OutreachTarget[] = [
  {
    brand: "E Ride Pro",
    priority: 1,
    status: "application_first",
    models: ["Pro SR", "Pro SS 3.0", "Pro Mini"],
    contactPath: "Dealer application, then portal/account email follow-up if needed.",
    officialUrls: [
      "https://dealer.eridepro.com/pages/contact",
      "https://www.eridepro.com/dealer-signup",
      "https://dealer.eridepro.com/pages/dealer-account-activation-guide",
    ],
    sourceNotes: [
      "Dealer portal contact page points US dealer prospects to a dealer application form.",
      "Dealer signup page references dealerinquiry@eridepro.com for USA/Canada dealer interest.",
      "Dealer activation guide says activated dealers can access dealer-only pricing after login and references shop@eridepro.com for account help.",
    ],
    blockers: [
      "Application asks for facility/business details.",
      "Opening order, territory, and online-sales rules still need confirmation.",
    ],
    askFor: [
      "Dealer approval process and expected review timeline",
      "Opening-order requirements and whether customer-demand-backed orders are allowed",
      "Wholesale/MAP pricing",
      "Approved media kit and product-description rules",
      "Warranty, freight, parts, and damage-claim process",
    ],
    nextAction: "Complete official dealer application or create a draft using the application answers from the private outreach profile.",
    openClawAction: "Verify the current dealer application URL, draft the application/email packet, and hold for Ben review.",
  },
  {
    brand: "Rawrr",
    priority: 1,
    status: "blocked",
    models: ["Mantis X Pro", "Mantis Mini"],
    contactPath: "Become a Dealer form; support/contact path if a pre-application question is needed.",
    officialUrls: ["https://www.riderawrr.com/become-a-dealer", "https://www.riderawrr.com/find-a-dealer"],
    sourceNotes: [
      "Rawrr dealer page says authorized dealers are expected to service Rawrr units.",
      "Rawrr dealer page says dealers need a physical commercial space with showroom capacity.",
      "Rawrr dealer page says dealers are not required to carry the full lineup, but references a combination of three products after initial order.",
    ],
    blockers: [
      "Commercial showroom requirement is not fully satisfied yet.",
      "Need decide whether to apply now with the Bellevue office/service-area plan or wait until showroom property is secured.",
    ],
    askFor: [
      "Whether an ecommerce-first applicant actively searching for showroom space can start the dealer review process",
      "Minimum initial order and ongoing order quantities",
      "Service expectations and warranty labor reimbursement process",
      "Approved product media and brand presentation requirements",
      "Territory and showroom representation requirements",
    ],
    nextAction: "Draft a careful pre-application email asking whether the showroom-in-development model can be reviewed.",
    openClawAction: "Do not submit the full dealer form blindly; create a draft pre-application note for Ben review.",
  },
  {
    brand: "79Bike",
    priority: 1,
    status: "ready_to_draft",
    models: ["Falcon Pro", "Falcon GT", "Viper S"],
    contactPath: "Official Dealer Request page.",
    officialUrls: ["https://79bike.com/pages/dealer-request"],
    sourceNotes: [
      "79Bike has an official Dealer Request page.",
      "Main site currently presents Falcon-Pro, Falcon GT, Viper S, accessories, finance, payment methods, and certificate of origin resources.",
    ],
    blockers: [
      "Dealer terms, media permission, and opening order requirements still need confirmation.",
    ],
    askFor: [
      "Dealer request/application process",
      "Wholesale/MAP pricing and minimum order",
      "Approved media kit and copy rules",
      "Warranty, parts, freight, and certificate of origin process",
      "Whether online reseller orders against confirmed demand are allowed",
    ],
    nextAction: "Create dealer-request draft and prepare form answers from the private outreach profile.",
    openClawAction: "Verify the dealer request page, draft the form/email answers, and hold for Ben review.",
  },
  {
    brand: "Surron",
    priority: 1,
    status: "verify_first",
    models: ["Light Bee X", "Ultra Bee"],
    contactPath: "Official US distributor/dealer path must be verified before outreach.",
    officialUrls: ["https://surronmotors.com/become-a-dealer/", "https://sur-ron.us.com/contact/"],
    sourceNotes: ["Public Surron dealer/distributor landscape is confusing and has lookalike risk."],
    blockers: ["Must verify official US channel before listing products or sending business details."],
    askFor: [
      "Official US distributor confirmation",
      "Dealer application process",
      "Allowed product list and territory rules",
      "Warranty and parts support path",
      "Approved media usage",
    ],
    nextAction: "Research official US dealer channel before drafting.",
    openClawAction: "Research only; do not send application details until the official path is verified.",
  },
  {
    brand: "Talaria",
    priority: 2,
    status: "verify_first",
    models: ["Sting MX5", "XXX Pro", "Komodo"],
    contactPath: "Dealer/contact form after official US distribution is verified.",
    officialUrls: ["https://talaria.us.com/contact-us/", "https://us-talaria.com/contact/"],
    sourceNotes: ["Public Talaria contact/dealer sources need verification before outreach."],
    blockers: ["Must confirm the correct authorized US channel."],
    askFor: [
      "Official US dealer onboarding path",
      "Authorized reseller requirements",
      "Approved media and product data source",
      "Warranty and parts channel",
    ],
    nextAction: "Verify authorized US source before sending.",
    openClawAction: "Research only; prepare findings for Ben review.",
  },
  {
    brand: "Altis",
    priority: 2,
    status: "verify_first",
    models: ["Sigma", "Sigma MX"],
    contactPath: "Official US distributor or manufacturer rep needed.",
    officialUrls: ["https://altispowersports.eu/pages/contact"],
    sourceNotes: ["Known public contact path is EU-oriented; US channel needs confirmation."],
    blockers: ["Need official US sales/dealer contact."],
    askFor: [
      "US distributor or dealer application path",
      "Product availability",
      "Media kit and wholesale/MAP terms",
      "Warranty/support requirements",
    ],
    nextAction: "Research official US channel.",
    openClawAction: "Research only; do not send sensitive business details yet.",
  },
  {
    brand: "Ventus",
    priority: 3,
    status: "verify_first",
    models: ["V1+", "One"],
    contactPath: "Official US distributor/dealer path needed.",
    officialUrls: [],
    sourceNotes: ["Requires extra verification before listing or outreach."],
    blockers: ["Need official brand/distributor confirmation."],
    askFor: [
      "Official US distributor confirmation",
      "Dealer/reseller path",
      "Model availability and naming",
      "Media permission",
      "Warranty/parts process",
    ],
    nextAction: "Research official contact path.",
    openClawAction: "Research only; do not send sensitive business details yet.",
  },
];

export function getFirstWaveTargets() {
  return outreachTargets.filter((target) => target.priority === 1);
}

export function getOutreachStatusLabel(status: OutreachStatus) {
  switch (status) {
    case "application_first":
      return "Application first";
    case "ready_to_draft":
      return "Ready to draft";
    case "verify_first":
      return "Verify first";
    case "blocked":
      return "Blocked";
  }
}
