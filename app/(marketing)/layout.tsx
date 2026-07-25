import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { LazyMotionProvider } from "@/components/motion/lazy-motion-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotionProvider>
      <div className="flex min-h-full flex-1 flex-col">
        <OrganizationJsonLd />
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </div>
    </LazyMotionProvider>
  );
}
