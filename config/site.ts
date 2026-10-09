import { resolveSiteUrl } from "@/lib/site-url";

export const siteConfig = {
  name: "A&I Laundry Basket",
  shortName: "Laundry Basket",
  tagline: "Laundry & Dry Cleaning, Delivered to Your Doorstep.",
  description:
    "A&I Laundry Basket is a laundry and dry cleaning service in Bengaluru. We collect your laundry from your doorstep, clean it, and deliver it back, with prices shown before you book.",
  // The homepage-level browser tab title and search-result title.
  seoTitle: "A&I Laundry Basket | Laundry & Dry Cleaning Services in Bengaluru",
  // Shorter, search/social-optimized description (distinct from the longer
  // `description` above, which is used for general on-page/footer copy).
  metaDescription:
    "A&I Laundry Basket provides laundry, dry cleaning, ironing, and doorstep pickup & delivery across South Bengaluru, with prices shown before you book.",
  // Canonical/OG/sitemap base URL — see lib/site-url.ts.
  url: resolveSiteUrl({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  }),
  keywords: [
    "laundry service Bengaluru",
    "laundry service South Bengaluru",
    "dry cleaning Jayanagar",
    "doorstep laundry pickup Bengaluru",
    "wash and fold Banashankari",
    "A&I Laundry Basket",
  ],
  // Real people behind the business. Centralized here so the About page,
  // Contact page, footer, and structured data (JSON-LD) all pull from one
  // place instead of repeating names. Mention sparingly in the UI.
  business: {
    ownerName: "Ramesh Pareet",
    ownerRole: "Founder",
    opsName: "Krish Pareet",
    opsRole: "Operations & Customer Relations",
  },
  // Legal identity and compliance details, shown in the footer, Terms, Privacy
  // Policy and Refund Policy. Fill the `null` values in before launch — the
  // site omits any line whose value is null rather than inventing one.
  legal: {
    // Bump `policyVersion` and `lastUpdated` together whenever the Privacy
    // Policy, Terms, Cookie Policy or Refund Policy text changes. The version
    // is stored with each form submission as the version the visitor agreed to.
    policyVersion: "2026-10-10",
    lastUpdated: "10 October 2026",
    // TODO: exact registered name of the proprietor/firm/company that runs the
    // business (e.g. "A&I Laundry Basket (Proprietor: Ramesh Pareet)").
    entityName: null as string | null,
    // TODO: registered business address (needed for consumer-law disclosures
    // and the Privacy Policy). Doorstep-only is fine as long as a postal
    // address for legal notices is published.
    registeredAddress: null as string | null,
    // TODO: GSTIN, once registered. Leave null if not GST-registered — do not
    // claim "GST included" anywhere on the site unless registered.
    gstin: null as string | null,
    // TODO: name of the person who answers privacy / grievance queries.
    grievanceOfficerName: null as string | null,
  },
  contact: {
    phone: "+91 90199 61091",
    phoneHref: "tel:+919019961091",
    whatsapp: "+91 90199 61091",
    whatsappHref: "https://wa.me/919019961091",
    email: "laundrybasketai@gmail.com",
    supportEmail: "supportlaundrybasketai@gmail.com",
    // No permanent storefront/office yet — do not invent a street address.
    addressLine: "Serving customers across South Bengaluru.",
    // TODO: Replace with a real street address once finalized, and update
    // components/sections/contact-map.tsx + components/seo/organization-json-ld.tsx
    // to add a proper PostalAddress / embedded map at that time.
    hours: [
      { day: "Monday - Sunday", time: "9:00 AM - 9:00 PM" },
    ],
    serviceAreas: [
      "Banashankari",
      "Jayanagar",
      "JP Nagar",
      "Basavanagudi",
      "BTM Layout",
      "Kumaraswamy Layout",
      "Padmanabhanagar",
      "Uttarahalli",
      "Kanakapura Road",
      "Girinagar",
      "Rajarajeshwari Nagar",
      "ISRO Layout",
      "Konanakunte",
      "Yelachenahalli",
      "Talaghattapura",
      "Anjanapura",
      "Bannerghatta Road",
      "Vasanthapura",
    ],
  },
} as const;

export type NavItem = {
  title: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { title: "Services", href: "/services" },
      { title: "Pricing", href: "/pricing" },
      { title: "How it works", href: "/#how-it-works" },
      { title: "Request a Quote", href: "/quote" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "FAQ", href: "/faq" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Refund & Cancellation", href: "/refunds" },
      { title: "Cookie Policy", href: "/cookies" },
    ],
  },
];
