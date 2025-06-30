import Image from "next/image";
import { SectionDescription, SectionTitle } from "./shared";

type Partner = {
  id: string;
  name: string;
  logo: string;
};

interface PartnersSectionProps {
  title: string;
  description: string;
  partners: Partner[];
}

export function PartnersSection({ title, description, partners }: PartnersSectionProps) {
  return (
    <section className="container mx-auto max-w-6xl px-4">
      <div className="mb-12 text-center">
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {partners.map((partner) => (
          <div key={partner.id} className="w-24 md:w-32">
            <Image
              src={partner.logo || "/placeholder.svg"}
              alt={partner.name}
              width={50}
              height={25}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
