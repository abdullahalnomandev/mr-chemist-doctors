import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

interface TreatmentHeroSectionProps {
  category: string;
  title: string;
  description: string;
  reviewCount?: number;
  treatmentType: string;
  consultationQuestionId?: string;
}

export function TreatmentHeroSection({
  category,
  title,
  description,
  reviewCount = 436,
  consultationQuestionId,
}: TreatmentHeroSectionProps) {
  return (
    <section className="bg-secondary px-4 sm:px-16">
      <div className="container mx-auto max-w-6xl py-4">
        <div className="justify-between md:flex">
          {/* Left Side - Dynamic Content */}
          <div className="max-w-sm space-y-6">
            {/* Breadcrumb */}
            <nav className="text-sm">
              <Link href="/treatments" className="hover:text-primary text-black">
                Treatments
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-primary font-medium">{category}</span>
            </nav>

            {/* Heading */}
            <h1 className="text-4xl leading-tight font-medium">{title}</h1>

            {/* Description */}
            <p className="max-w-xl">{description}</p>

            <div className="flex items-center">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-emerald-500 text-emerald-500" />
                  ))}
              </div>
              <span className="ml-2 text-gray-700">
                {reviewCount} reviews on
                <span className="font-medium">Trustpilot</span>
              </span>
            </div>
          </div>

          {/* Right Side - Process Steps */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="bg-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-medium text-white">
                  1
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Tell Us About Your Health To Suggest Treatments</h3>
                  <Link href={`/consultations/${consultationQuestionId}`}>
                    <Button variant="pill" className="mt-2 flex h-fit flex-col items-center">
                      Start Free consultation, 100% Online
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    After that you can choose your preferred treatment
                  </h3>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    We&apos;ll then deliver your order in discreet packaging
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
