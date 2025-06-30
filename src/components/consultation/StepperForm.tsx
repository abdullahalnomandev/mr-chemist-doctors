/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";
import SectionRenderer from "./SectionRenderer";
import { generateSchemaFromSections } from "./formSchema";

export type Section = {
  _id: string;
  title: string;
  description?: string;
  descriptionPlainText?: string;
  questions: any[];
  dependentOn: string | null;
  answer: unknown | null;
  negate: boolean;
};

type StepperFormProps = {
  sections: Section[];
  submitHandler?: (data: any) => void;
  title: string;
  consultationId: string;
};

const STORAGE_KEY = "stepper-form-data";

export default function StepperForm({ title, sections, submitHandler, consultationId }: StepperFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [ready, setReady] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { addConsultation } = useCartStore();

  const currentSchema = generateSchemaFromSections(sections[activeStep]);

  const methods = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: formValues,
    mode: "onTouched",
  });

  const { handleSubmit, trigger, reset, control } = methods;

  // Hydrate form on load
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setFormValues(parsed);
      reset(parsed);
    }
    setReady(true);
  }, [reset]);

  useEffect(() => {
    reset(formValues);
  }, [activeStep]);

  const saveToLocalStorage = (values: Record<string, any>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  };

  const next = () => {
    if (activeStep < sections.length - 1) {
      setActiveStep((prev) => prev + 1);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const prev = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const onSubmit = (stepData: any) => {
    const merged = { ...formValues, ...stepData };
    saveToLocalStorage(merged);
    setFormValues(merged);

    if (activeStep === sections.length - 1) {
      try {
        const data = submitHandler?.(merged);
        if (data) {
          localStorage.removeItem(STORAGE_KEY);
          reset();
          toast.success("Consultation submitted successfully");
          setActiveStep(0);
          setFormValues({});
          addConsultation(consultationId);
        }
      } catch (error) {
        toast.error((error as any)?.message || "Error submitting consultation");
      }
    } else {
      trigger().then((isValid) => {
        if (isValid) {
          next();
        }
      });
    }
  };

  const progress = Math.round(((activeStep + 1) / sections.length) * 100);

  if (!ready) return null;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center" ref={formRef}>
          <h1 className="text-3xl font-semibold text-[#00000D]">{title} Consultation</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#4B4B4B]">
            Please answer the following questions as honestly as possible so we can ensure your preferred treatment is
            the best treatment for your needs.
          </p>
        </div>

        <div className="text-muted-foreground mb-2 text-sm">
          Step {activeStep + 1} of {sections.length}
        </div>
        <div className="relative h-8 w-full overflow-hidden rounded-md bg-gray-200">
          <div className="h-full bg-[#0F4BCC] transition-all" style={{ width: `${progress}%` }} />
          <span
            className={`absolute top-1/2 -translate-y-1/2 text-xs font-medium ${
              progress === 100 ? "left-1/2 -translate-x-1/2 text-white" : "right-2 text-[#0F4BCC]"
            }`}
          >
            {progress}%
          </span>
        </div>

        <SectionRenderer section={sections[activeStep]} control={control} />

        <div className="flex gap-3 pt-4">
          {activeStep > 0 && (
            <Button onClick={prev} type="button" variant="outline" className="rounded-full px-8">
              Back
            </Button>
          )}
          <Button type="submit" className="rounded-full px-8">
            {activeStep === sections.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
