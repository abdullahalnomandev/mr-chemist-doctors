import ProductsByTreatmentPage from "./page-treatment";

type PageProps = { params: Promise<{ treatmentType: string }> };

export default async function TreatmentsPage({ params }: PageProps) {
  const awaitedParams = await params;

  return <ProductsByTreatmentPage treatmentType={awaitedParams.treatmentType} />;
}
