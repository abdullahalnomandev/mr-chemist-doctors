"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionDescription, SectionTitle } from "./shared";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

interface FaqSectionProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export function FaqSection({ title, description, faqs }: FaqSectionProps) {
  return (
    <section className="container mx-auto max-w-6xl px-4">
      <div className="mb-12 text-center">
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>

      <div className="mx-auto">
        <Accordion type="single" collapsible className="space-y-4" defaultValue={faqs[0]?.id}>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-secondary data-[state=open]:bg-primary overflow-hidden rounded-lg border-none data-[state=open]:text-white [&_[data-state=open]>svg]:text-white"
            >
              <AccordionTrigger className="cursor-pointer px-6 py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <span className="mr-4 font-medium">{faq.id}</span>
                  <span className="font-medium">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-0 pb-4">
                <p className="ml-10" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
