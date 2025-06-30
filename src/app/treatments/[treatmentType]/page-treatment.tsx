import { HowItWorksSection } from "@/components/home/how-it-works";
import { NewsletterSection } from "@/components/home/newsletter";
import { SectionDescription, SectionTitle } from "@/components/home/shared";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ProductCard } from "@/components/shared/product-card";
import { TreatmentHeroSection } from "@/components/treatments/hero-section";
import { InfoWithFaq } from "@/components/treatments/info-with-faq";
import DataResultMessage from "@/components/ui/data.result.message";
import { getProducts, getTreatmentBySlug } from "@/lib/api/api-server";
import { getHomePageData } from "@/lib/api/home";
import { notFound } from "next/navigation";

type ProductsByTreatmentPageProps = { treatmentType: string };

export default async function ProductsByTreatmentPage({ treatmentType }: ProductsByTreatmentPageProps) {
  const treatment = await getTreatmentBySlug(treatmentType);
  if (!treatment) return notFound();

  return (
    <main className="mb-12 space-y-12">
      <TreatmentHeroSection
        category={treatment.name}
        consultationQuestionId={treatment?.questionsId}
        title={`Buy ${treatment.name} Medication Online`}
        description="Our online clinic can prescribe treatments, including necessary medications, to support your journey."
        reviewCount={436}
        treatmentType={treatmentType}
      />

      <ProductsByTreatment treatmentId={treatment._id} />
      <OtherSections treatmentType={treatment.name} />
    </main>
  );
}

const ProductsByTreatment = async ({ treatmentId }: { treatmentId: string }) => {
  const products = await getProducts({
    treatment: treatmentId,
    fields: "name, slug, keyPoints, basePrice, imageUrls",
  });
  return (
    <section className="container mx-auto max-w-6xl px-4">
      <div className="mb-10 text-center">
        <SectionTitle title="All Product Options" />
        <SectionDescription description="Choose product from here" />
      </div>

      {!products.length ? (
        <DataResultMessage
          message="No products available for this treatment"
          size="sm"
          image="/images/folder-empty.jpg"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
      )}
    </section>
  );
};

const OtherSections = async ({ treatmentType }: { treatmentType: string }) => {
  const data = await getHomePageData();

  return (
    <>
      <HowItWorksSection
        title={data?.howItWorks.title ?? ""}
        description={data?.howItWorks.subtitle ?? ""}
        steps={data?.howItWorks.steps ?? []}
      />

      <InfoWithFaq
        title="About Weight Loss Medications"
        paragraphs={weightLossInfo}
        faqItems={weightLossFaq}
        treatmentType={treatmentType}
      />

      <TestimonialsSection
        title={data?.testimonials?.title ?? ""}
        totalReviews={data?.testimonials?.totalReviews ?? 0}
        platform={data?.testimonials?.platform ?? ""}
        testimonials={data?.testimonials?.testimonials ?? []}
      />

      <NewsletterSection
        title={data?.newsletter?.title ?? ""}
        description={data?.newsletter?.subtitle ?? ""}
        buttonText={data?.newsletter?.buttonText ?? ""}
      />
    </>
  );
};

const weightLossFaq = [
  {
    id: "faq-1",
    number: "01",
    question: "What is the The Independent Pharmacy?",
    answer:
      "The Independent Pharmacy is an Online Pharmacy (or Online Chemist/Online Doctor depending on your preferred terminology!) that is run by a team of experienced healthcare professionals based in Bristol, UK. It is owned and operated by two UK pharmacists, Andy Boysan & Scott McDougall, who founded and run The Independent Pharmacy based on years of industry experience.",
  },
  {
    id: "faq-2",
    number: "02",
    question: "What services do you provide as an Online Pharmacy?",
    answer:
      "We provide a range of prescription and non-prescription medications, including weight loss treatments, erectile dysfunction medications, hair loss treatments, and more. Our online consultation service allows you to get the medications you need without visiting a physical pharmacy.",
  },
  {
    id: "faq-3",
    number: "02",
    question: "What services do you provide as an Online Pharmacy?",
    answer:
      "We provide a range of prescription and non-prescription medications, including weight loss treatments, erectile dysfunction medications, hair loss treatments, and more. Our online consultation service allows you to get the medications you need without visiting a physical pharmacy.",
  },
  {
    id: "faq-4",
    number: "02",
    question: "What services do you provide as an Online Pharmacy?",
    answer:
      "We provide a range of prescription and non-prescription medications, including weight loss treatments, erectile dysfunction medications, hair loss treatments, and more. Our online consultation service allows you to get the medications you need without visiting a physical pharmacy.",
  },
];

const weightLossInfo = [
  "Weight loss tablets work by blocking the absorption of some of the fat in your diet. As a result, your body absorbs fewer calories from the fat you eat, which can help you lose weight over time.",
  "Injectable GLP-1 treatments, like Wegovy® and Mounjaro®, are more effective as they help control your appetite. They mimic a natural hormone in your body called GLP-1, which signals to your brain that you're full and should stop eating. By increasing this signal, GLP-1s can regulate your blood sugar and keep you feeling fuller for longer.",
];
