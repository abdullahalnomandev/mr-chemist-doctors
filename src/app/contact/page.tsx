import { getHomePageData } from "@/lib/api/home";
import ContactPage from "./page-contact";

export default async function Page() { // Mark the component as async
  const homePageData = await getHomePageData(); // Await directly

  return <ContactPage homePageData={homePageData} />;
}