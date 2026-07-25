export const siteConfig = {
  name: "A&I Laundry Basket",
  shortName: "Laundry Basket",
  tagline: "Professional Laundry & Dry Cleaning, Delivered to Your Doorstep.",
  description:
    "A&I Laundry Basket is a modern laundry and dry cleaning service that offers convenient doorstep pickup, expert garment care, transparent pricing, and reliable delivery—making laundry effortless for homes and professionals across Bengaluru.",
  // The homepage-level browser tab title and search-result title.
  seoTitle: "A&I Laundry Basket | Laundry & Dry Cleaning Services in Bengaluru",
  // Shorter, search/social-optimized description (distinct from the longer
  // `description` above, which is used for general on-page/footer copy).
  metaDescription:
    "A&I Laundry Basket provides premium laundry, dry cleaning, ironing, and doorstep pickup & delivery across South Bengaluru with transparent pricing and reliable service.",
  // Canonical/OG/sitemap base URL. Defaults to production so preview
  // deployments still emit prod-facing metadata (the usual SEO-correct
  // choice); set NEXT_PUBLIC_SITE_URL to override per-environment.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ailaundrybasket.com",
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
      { day: "Monday - Friday", time: "9:00 AM - 9:00 PM" },
      { day: "Saturday - Sunday", time: "9:00 AM - 1:00 PM" },
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
    ],
  },
];
