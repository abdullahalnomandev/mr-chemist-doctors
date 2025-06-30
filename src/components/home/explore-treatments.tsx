import Image from "next/image";
import Link from "next/link";

import { TFeaturedTreatment } from "@/lib/types";
import { CircleArrowRight } from "lucide-react";
import { SectionDescription, SectionTitle } from "./shared";

type ExploreTreatmentsSectionProps = { title: string; description: string; treatments: TFeaturedTreatment[] };

export function ExploreTreatmentsSection({ title, description, treatments }: ExploreTreatmentsSectionProps) {
  return (
    <section className="container mx-auto max-w-6xl px-4">
      <div className="mb-10 text-center">
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {treatments.map(({ name, slug, logoUrl, products }) => (
          <div key={slug} className="relative flex min-h-44 overflow-hidden rounded-xl bg-blue-50">
            <div className="flex-1 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{name}</h3>
                <Link
                  href={`/treatments/${slug}`}
                  className="text-primary flex items-center gap-2 text-sm hover:underline"
                >
                  <span>View All</span>
                  <CircleArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="space-y-1">
                {products.map(({ slug, name }) => (
                  <li key={slug}>
                    <Link
                      href={`/products/${slug}`}
                      className="flex items-center gap-2 hover:text-blue-600 hover:underline"
                    >
                      <span>{name}</span>
                      <CircleArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                className="bg-primary absolute right-0 bottom-0 h-32 w-64"
                style={{ clipPath: "circle(50% at 100% 100%)" }}
              />
              <div className="absolute right-5 bottom-5 text-white">
                <div className="relative size-10">
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt={`logo of ${name}`}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 40px, 40px"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
