import { FaqSection } from "@/components/home/faq-section";
import { getHomePageData } from "@/lib/api/home";

const PageFaq = async () => {
  const homePageData = await getHomePageData();

  return (
    <div className="py-4">
      <FaqSection
        title={homePageData?.faqs?.title ?? ""}
        description={homePageData?.faqs?.subtitle ?? ""}
        faqs={homePageData?.faqs?.faqs ?? []}
      />
    </div>
  );
};

export default PageFaq;
