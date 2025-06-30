import { DynamicIcon } from "../ui/dynamic-icon";
import { IconName } from "../ui/icons";
import { SectionDescription, SectionTitle } from "./shared";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: IconName;
};

interface HowItWorksSectionProps {
  title: string;
  description: string;
  steps: Step[];
}

export function HowItWorksSection({ title, description, steps }: HowItWorksSectionProps) {
  return (
    <section className="container mx-auto max-w-6xl px-4">
      <div className="mb-12 text-center">
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.id} className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
              <DynamicIcon name={step.icon} className="text-primary h-12 w-12" strokeWidth={1} />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
            <p className="mx-auto max-w-lg text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
