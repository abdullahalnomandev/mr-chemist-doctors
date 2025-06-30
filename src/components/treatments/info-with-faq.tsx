"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

interface InfoWithFaqProps {
  title: string;
  paragraphs: string[];
  faqItems: FaqItem[];
  treatmentType: string;
}

export function InfoWithFaq({ title, paragraphs, faqItems, treatmentType }: InfoWithFaqProps) {
  return (
    <section className="px-4 sm:px-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left side - Information */}
          <div className="space-y-6">
            <h2 className="text-3xl font-medium text-gray-900 md:text-4xl">{title}</h2>

            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700">
                {paragraph}
              </p>
            ))}

            <div className="pt-4">
              <Link href={`/treatments/${treatmentType}/consultation`}>
                <Button variant="pill">Start Free consultation</Button>
              </Link>
            </div>
          </div>

          {/* Right side - FAQ Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4" defaultValue={faqItems[0]?.id}>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-secondary overflow-hidden rounded-lg border-none"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-100 hover:no-underline">
                    <div className="flex items-center text-left">
                      <span className="mr-4 font-medium">{item.number}</span>
                      <span className="font-medium text-gray-900">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-4 text-gray-700">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
