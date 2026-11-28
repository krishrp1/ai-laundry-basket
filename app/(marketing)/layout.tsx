import { Navbar } from "@/components/layout/navbar";
import { Effects } from "@/components/effects";
import { Footer } from "@/components/layout/footer";
import { FloatingBooking } from "@/components/layout/floating-booking";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <OrganizationJsonLd />
      <Effects />
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
      <FloatingBooking />
    </div>
  );
}
