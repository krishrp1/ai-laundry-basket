export const siteConfig = {
  name: "AI Laundry Basket",
  shortName: "Laundry Basket",
  description:
    "AI Laundry Basket helps you plan, sort, and schedule laundry with smart, automated recommendations.",
  url: "https://ailaundrybasket.com",
  keywords: [
    "AI laundry",
    "laundry scheduler",
    "laundry app",
    "smart laundry basket",
    "laundry care assistant",
  ],
  links: {
    twitter: "https://twitter.com/ailaundrybasket",
    github: "https://github.com/ailaundrybasket",
    instagram: "https://instagram.com/ailaundrybasket",
  },
  contact: {
    phone: "+1 (555) 010-0123",
    phoneHref: "tel:+15550100123",
    priorityPhone: "+1 (555) 010-0199",
    priorityPhoneHref: "tel:+15550100199",
    email: "support@ailaundrybasket.com",
    address: "123 Main Street, Suite 200, Austin, TX 78701",
    hours: [
      { day: "Monday - Friday", time: "7:00 AM - 8:00 PM" },
      { day: "Saturday", time: "8:00 AM - 6:00 PM" },
      { day: "Sunday", time: "9:00 AM - 4:00 PM" },
    ],
    serviceAreas: [
      "Austin, TX",
      "Chicago, IL",
      "Seattle, WA",
      "Denver, CO",
      "Miami, FL",
      "Nashville, TN",
    ],
  },
} as const;

export type NavItem = {
  title: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Features", href: "/features" },
  { title: "Services", href: "/services" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Testimonials", href: "/testimonials" },
  { title: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { title: "Features", href: "/features" },
      { title: "Services", href: "/services" },
      { title: "Pricing", href: "/pricing" },
      { title: "How it works", href: "/how-it-works" },
      { title: "Request a Quote", href: "/quote" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Testimonials", href: "/testimonials" },
      { title: "FAQ", href: "/faq" },
      { title: "Contact", href: "/contact" },
      { title: "Careers", href: "/careers" },
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
