import ProductPage from "./page-product";

type PageProps = { params: Promise<{ slug: string }> };

export default async function Product({ params }: PageProps) {
  const awaitedParams = await params;
  return <ProductPage slug={awaitedParams.slug} />;
}
