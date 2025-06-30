import Link from "next/link";
import { notFound } from "next/navigation";

import { FaqSection } from "@/components/home/faq-section";
import { NewsletterSection } from "@/components/home/newsletter";
import { ClientReviewSection } from "@/components/products/client-review-section";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductPurchase } from "@/components/products/product-purchase";
import { SuggestProduct } from "@/components/products/SuggestProducts";
import { getProductBySlug } from "@/lib/api/api-server";
import { getHomePageData } from "@/lib/api/home";
import { faqData, newsletterData, suggestTreatment } from "@/lib/dummy-data/home-data";
import styles from "./product-description.module.css";

export default async function ProductPage({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);
  const homePageData = await getHomePageData();

  if (!product) return notFound();

  return (
    <main className="mb-12 space-y-4">
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="text-sm">
            <Link href="/treatments" className="hover:text-primary text-gray-600">
              Treatments
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/treatments/${product.treatment.slug}`} className="hover:text-primary text-gray-600">
              {product.treatment?.name}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProductImageGallery images={product.imageUrls || []} />
          <ProductPurchase
            id={product._id}
            name={product.name}
            subtitle={product.name}
            treatmentSlug={product.treatment.slug}
            basePrice={product?.basePrice}
            rating={{ score: 5, count: 1736 }}
            variants={product?.variants as []}
            needConsultation={product.needConsultation}
            imageUrl={product.imageUrls?.[0] ?? ""}
            questionsId={product.treatment?.questionsId}
          />
        </div>

        <div className="mt-12">
          <h1 className="mb-2 text-center text-2xl font-semibold">About {product.name}</h1>
          <div className={styles.productDescription} dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>

      <SuggestProduct
        title={suggestTreatment.title}
        description={suggestTreatment.subtitle}
        treatmentId={product.treatment?._id}
      />

      <ClientReviewSection productId={product?._id} homePageData={homePageData?.testimonials} />

      <FaqSection title={faqData.title} description={faqData.subtitle} faqs={faqData.faqs} />

      <NewsletterSection
        title={newsletterData.title}
        description={newsletterData.subtitle}
        buttonText={newsletterData.buttonText}
      />
    </main>
  );
}
