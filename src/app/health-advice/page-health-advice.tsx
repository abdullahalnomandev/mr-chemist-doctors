import { BlogSection } from "@/components/home/blog-section";
import { getHomePageData } from "@/lib/api/home";

const PageHealthAdvice = async () => {
  const homePageData = await getHomePageData();

  return (
    <div className="py-8">
      <BlogSection
        title={homePageData?.blog?.title ?? ""}
        description={homePageData?.blog?.subtitle ?? ""}
        posts={homePageData?.blog?.posts ?? []}
      />
    </div>
  );
};

export default PageHealthAdvice;
