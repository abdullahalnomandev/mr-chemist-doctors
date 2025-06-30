"use client";

import { OurServiceSection } from "@/components/about/our-service-section";
import { StatsSection } from "@/components/about/stats-section";
import { TeamSection } from "@/components/about/team-section";
import { AboutSection } from "@/components/home/about-section";
import { FaqSection } from "@/components/home/faq-section";
import { PartnersSection } from "@/components/home/partners-section";
import { HomePageData } from "@/lib/api/home";
import Link from "next/link";

interface ContactPageProps {
  homePageData: HomePageData;
}

export default function AboutPage({ homePageData }: ContactPageProps) {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-secondary px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">About Us</span>
          </nav>
        </div>
      </div>

      <div className="space-y-20 py-8">
        <AboutSection
          title={homePageData?.about?.title ?? ""}
          content={homePageData?.about?.content ?? ""}
          buttonText={homePageData?.about?.buttonText ?? ""}
          buttonLink={homePageData?.about?.buttonLink ?? ""}
          imageSrc={homePageData?.about?.imageSrc ?? ""}
        />

        <StatsSection />

        <OurServiceSection />

        <TeamSection />

        <PartnersSection
          title={homePageData?.partners?.title ?? ""}
          description={homePageData?.partners?.subtitle ?? ""}
          partners={homePageData?.partners?.partners ?? []}
        />

        <FaqSection
          title={homePageData?.faqs?.title ?? ""}
          description={homePageData?.faqs?.subtitle ?? ""}
          faqs={homePageData?.faqs?.faqs ?? []}
        />
      </div>
    </div>
  );
}
