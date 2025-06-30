import { AboutSection } from "@/components/home/about-section";
import { BlogSection } from "@/components/home/blog-section";
import { ExploreTreatmentsSection } from "@/components/home/explore-treatments";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works";
import { NewsletterSection } from "@/components/home/newsletter";
import { PartnersSection } from "@/components/home/partners-section";
import { SectionDescription, SectionTitle } from "@/components/home/shared";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ProductCard } from "@/components/shared/product-card";
import DataResultMessage from "@/components/ui/data.result.message";
import { getBlogs, getFeaturedProducts, getFeaturedTreatments } from "@/lib/api/api-server";
import { getHomePageData } from "@/lib/api/home";

export default function HomePage() {
  return (
    <main className="mb-12 space-y-24">
      <HeroSection />
      <ExploreTreatment />
      <FeaturedProducts />
      <HomePageData />
    </main>
  );
}

const ExploreTreatment = async () => {
  const featuredTreatments = await getFeaturedTreatments();

  return (
    <ExploreTreatmentsSection
      title="Explore our health treatments"
      description="As a registered Mr Chemist pharmacy, we offer consultations and prescription treatments for various conditions, approved by qualified healthcare professionals. Explore popular options below"
      treatments={featuredTreatments}
    />
  );
};

const FeaturedProducts = async () => {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="container mx-auto max-w-6xl">
      <div className="mb-10 text-center">
        <SectionTitle title="Best Products" />
        <SectionDescription description="Choose products which is well suited for your needs." />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!featuredProducts?.length ? (
          <DataResultMessage
            message="No products available for this treatment"
            size="sm"
            image="/images/folder-empty.jpg"
          />
        ) : (
          featuredProducts.map((product) => <ProductCard key={product.slug} {...product} />)
        )}
      </div>
    </section>
  );
};

const HomePageData = async () => {
  const homePageData = await getHomePageData();
  const blogs = await getBlogs();

  return (
    <section className="space-y-14">
      <div>
        <HowItWorksSection
          title={homePageData?.howItWorks.title ?? ""}
          description={homePageData?.howItWorks.subtitle ?? ""}
          steps={homePageData?.howItWorks.steps ?? []}
        />
      </div>

      <div>
        <TestimonialsSection
          title={homePageData?.testimonials?.title ?? ""}
          totalReviews={homePageData?.testimonials?.totalReviews ?? 0}
          platform={homePageData?.testimonials?.platform ?? ""}
          testimonials={homePageData?.testimonials?.testimonials ?? []}
        />
      </div>

      <div>
        <PartnersSection
          title={homePageData?.partners?.title ?? ""}
          description={homePageData?.partners?.subtitle ?? ""}
          partners={homePageData?.partners?.partners ?? []}
        />
      </div>

      <div>
        <AboutSection
          title={homePageData?.about?.title ?? ""}
          content={homePageData?.about?.content ?? ""}
          buttonText={homePageData?.about?.buttonText ?? ""}
          buttonLink={homePageData?.about?.buttonLink ?? ""}
          imageSrc={homePageData?.about?.imageSrc ?? ""}
        />
      </div>

      <div>
        <BlogSection
          blogs={blogs ?? []}
          title={homePageData?.blog.title ?? ""}
          description={homePageData?.blog.subtitle ?? ""}
        />
      </div>

      <div>
        <FaqSection
          title={homePageData?.faqs?.title ?? ""}
          description={homePageData?.faqs?.subtitle ?? ""}
          faqs={homePageData?.faqs?.faqs ?? []}
        />
      </div>

      <div>
        <NewsletterSection
          title={homePageData?.newsletter?.title ?? ""}
          description={homePageData?.newsletter?.subtitle ?? ""}
          buttonText={homePageData?.newsletter?.buttonText ?? ""}
        />
      </div>
    </section>
  );
};
