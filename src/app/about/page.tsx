import { getHomePageData } from "@/lib/api/home";
import AboutPage from "./page-about";

export default async function Page() { // Mark the component as async
  const homePageData = await getHomePageData(); // Await directly

  return <AboutPage homePageData={homePageData} />;
}