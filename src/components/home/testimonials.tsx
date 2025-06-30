"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import shape from "../assets/images/Shape.png";
import { SectionTitle } from "./shared";

type Testimonial = {
  id: string;
  name: string;
  quote: string;
  content: string;
  rating: number;
};

interface TestimonialsSectionProps {
  title: string;
  totalReviews: number;
  platform: string;
  testimonials: Testimonial[];
  isTustpilot?: boolean;
}

export function TestimonialsSection({
  isTustpilot = true,
  title,
  totalReviews,
  platform,
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="container mx-auto max-w-6xl px-4">
      <div className="mb-8 text-center">
        <SectionTitle title={title} className="py-2 text-4xl font-bold" />
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-[#00B67A] p-1">
                <Image
                  src={shape}
                  alt={`Star ${index + 1}`}
                  width={18}
                  height={18}
                  className="block brightness-0 invert filter"
                />
              </div>
            ))}
          </div>
          <span className="text-gray-600">{totalReviews} reviews on</span>
          <span className="flex items-center font-medium">
            <Image
              src={shape} // Replace with actual Trustpilot logo if needed
              alt="Trustpilot"
              width={18}
              height={18}
            />{" "}
            {platform}
          </span>
        </div>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/3">
                <TestimonialCard testimonial={testimonial} isTustpilot={isTustpilot} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-0 h-8 w-8 -translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white" />
          <CarouselNext className="absolute top-1/2 right-0 h-8 w-8 translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md hover:bg-blue-600 hover:text-white" />
        </Carousel>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, isTustpilot }: { testimonial: Testimonial; isTustpilot: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-[#f2f5f9] p-6">
      <h3 className="mb-2 text-left text-lg font-semibold">{testimonial.quote}</h3>
      <p className="mb-2 flex-grow text-left text-gray-700">{testimonial.content}</p>
      <div className="mt-auto">
        <div className="border-t pt-4">
          <p className="text-left font-medium">{testimonial.name}</p>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(testimonial?.rating ?? 5)].map((_, index) => (
                <div key={index} className="bg-[#00B67A] p-1">
                  <Image
                    src={shape}
                    alt={`Star ${index + 1}`}
                    width={18}
                    height={18}
                    className="block brightness-0 invert filter"
                  />
                </div>
              ))}
            </div>

            {/* Trustpilot logo and text */}
            {isTustpilot && (
              <span className="flex items-center gap-1 font-medium">
                <Image
                  src={shape} // Replace with actual Trustpilot logo if needed
                  alt="Trustpilot"
                  width={18}
                  height={18}
                />
                Trustpilot
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
