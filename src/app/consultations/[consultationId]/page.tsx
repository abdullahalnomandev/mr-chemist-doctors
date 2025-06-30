import ConsultationPage from "./page-consultations";

interface IPageProps {
  params: Promise<{ consultationId: string }>;
}
const Consultation = async ({ params }: IPageProps) => {
  const { consultationId } = await params;

  return <ConsultationPage consultationId={consultationId} />;
};

export default Consultation;
