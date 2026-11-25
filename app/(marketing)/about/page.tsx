import type { Metadata } from "next";

import { AboutStory } from "@/components/sections/about-story";
import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "A&I Laundry Basket is a Bengaluru-based laundry and dry cleaning service with doorstep pickup and delivery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="A laundry service for South Bengaluru"
        description="A local team that collects your laundry, cleans it, and brings it back to your door."
      />
      <AboutStory />
      <Cta />
    </>
  );
}
