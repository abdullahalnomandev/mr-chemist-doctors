"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define types for different question formats
export type QuestionType =
  | "yesNo"
  | "text"
  | "textarea"
  | "checkbox"
  | "radio"
  | "select"
  | "date"
  | "number"
  | "checkboxGroup";

// Define option type
export interface Option {
  id: number;
  value: string;
  label: string;
  position: number;
}

export interface BaseQuestion {
  id: number;
  questionCode: string;
  type: QuestionType;
  question?: string;
  required?: boolean;
  description?: string;
  position: number;
  treatmentTypes?: string[];
}

export interface YesNoQuestion extends BaseQuestion {
  type: "yesNo";
  conditionalQuestions?: {
    yes?: Question[];
    no?: Question[];
  };
}

export interface TextQuestion extends BaseQuestion {
  type: "text" | "textarea" | "number";
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}

export interface DateQuestion extends BaseQuestion {
  type: "date";
}

export interface SelectQuestion extends BaseQuestion {
  type: "select";
  options: Option[];
}

export interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox";
  label: string;
}

export interface CheckboxGroupQuestion extends BaseQuestion {
  type: "checkboxGroup";
  options: Option[];
  allowMultiple?: boolean;
  noneOption?: string;
}

export interface RadioQuestion extends BaseQuestion {
  type: "radio";
  options: Option[];
}

export type Question =
  | YesNoQuestion
  | TextQuestion
  | DateQuestion
  | SelectQuestion
  | CheckboxQuestion
  | CheckboxGroupQuestion
  | RadioQuestion;

export interface Step {
  id: number;
  stepCode: string;
  title: string;
  position: number;
  questions: Question[];
  treatmentTypes?: string[];
}

export interface Answer {
  questionCode: string;
  value: unknown;
}

export interface ConsultationFormProps {
  title: string;
  subtitle: string;
  steps: Step[];
  estimatedTime?: number;
  onSubmit: (data: { answers: Answer[]; rawFormData: Record<string, unknown> }) => void;
  initialValues?: Record<string, unknown>;
  isSubmitting?: boolean;
}

export function ConsultationForm({
  title,
  subtitle,
  steps,
  estimatedTime = 3,
  onSubmit,
  initialValues = {},
  isSubmitting = false,
}: ConsultationFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>(initialValues || {});
  const currentStep = steps?.[currentStepIndex] || { questions: [], title: "" };
  const progress = Math.round((currentStepIndex / (steps?.length || 1)) * 100);

  // Create a dynamic schema based on the current step's questions
  const createStepSchema = (step: Step) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    step.questions.forEach((question) => {
      let fieldSchema: z.ZodTypeAny;

      switch (question.type) {
        case "yesNo":
          fieldSchema = z.boolean().optional();
          if (question.required) {
            fieldSchema = z.boolean({
              required_error: "This field is required",
            });
          }
          break;

        case "text":
        case "textarea":
          fieldSchema = z.string().optional();
          if (question.required) {
            fieldSchema = z
              .string({
                required_error: "This field is required",
              })
              .min(1, "This field is required");
          }
          break;

        case "number":
          fieldSchema = z
            .string()
            .optional()
            .transform((val) => (val ? Number(val) : undefined));
          if (question.required) {
            fieldSchema = z
              .string({
                required_error: "This field is required",
              })
              .min(1, "This field is required")
              .transform((val) => Number(val));
          }
          break;

        case "date":
          fieldSchema = z.date().optional();
          if (question.required) {
            fieldSchema = z.date({
              required_error: "This field is required",
            });
          }
          break;

        case "select":
        case "radio":
          fieldSchema = z.string().optional();
          if (question.required) {
            fieldSchema = z
              .string({
                required_error: "This field is required",
              })
              .min(1, "This field is required");
          }
          break;

        case "checkbox":
          fieldSchema = z.boolean().optional();
          if (question.required) {
            fieldSchema = z
              .boolean({
                required_error: "This field is required",
              })
              .refine((val) => val === true, "This field is required");
          }
          break;

        case "checkboxGroup":
          fieldSchema = z.array(z.string()).optional();
          if (question.required) {
            fieldSchema = z
              .array(z.string(), {
                required_error: "This field is required",
              })
              .min(1, "Please select at least one option");
          }
          break;

        default:
          fieldSchema = z.any().optional();
      }

      schemaFields[question.questionCode] = fieldSchema;
    });

    return z.object(schemaFields);
  };

  const stepSchema = createStepSchema(currentStep);
  type FormValues = z.infer<typeof stepSchema>;

  // Extract current step's initial values from the overall form data
  const getStepInitialValues = () => {
    const stepValues: Record<string, unknown> = {};
    currentStep.questions.forEach((question) => {
      if (formData[question.questionCode] !== undefined) {
        // For checkboxGroup, ensure we have an array
        if (question.type === "checkboxGroup" && !Array.isArray(formData[question.questionCode])) {
          stepValues[question.questionCode] = [];
        } else {
          stepValues[question.questionCode] = formData[question.questionCode];
        }
      }
    });
    return stepValues as FormValues;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(stepSchema),
    defaultValues: getStepInitialValues(),
    mode: "onChange",
  });

  // Update form data when initialValues prop changes
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormData(initialValues);

      // Reset the form with the current step's values from initialValues
      const stepValues: Record<string, unknown> = {};
      currentStep.questions.forEach((question) => {
        if (initialValues[question.questionCode] !== undefined) {
          stepValues[question.questionCode] = initialValues[question.questionCode];
        }
      });

      form.reset(stepValues);
    }
  }, [initialValues]);

  // Reset form when step changes
  useEffect(() => {
    form.reset(getStepInitialValues());
  }, [currentStepIndex, currentStep]);

  const handleNext = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const currentValues = form.getValues();

      // Update the overall form data with current step values
      setFormData((prev) => ({
        ...prev,
        ...currentValues,
      }));

      if (currentStepIndex < steps.length - 1) {
        // Move to next step
        setCurrentStepIndex(currentStepIndex + 1);
        window.scrollTo(0, 0);
      } else {
        // Submit the form
        const allValues = {
          ...formData,
          ...currentValues,
        };

        // Format answers for API
        const formattedAnswers = Object.entries(allValues).map(([questionCode, value]) => ({
          questionCode,
          value,
        }));

        onSubmit({
          answers: formattedAnswers,
          rawFormData: allValues,
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      // Save current step values before moving back
      const currentValues = form.getValues();
      setFormData((prev) => ({
        ...prev,
        ...currentValues,
      }));

      // Move to previous step
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "yesNo":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="items-center justify-between sm:flex">
                  <FormLabel>
                    <span className="mr-2">•</span>
                    <div>
                      <span className="font-medium">{question.question}</span>
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="ml-4">
                      <div className="mt-2 flex space-x-4">
                        <Button
                          type="button"
                          variant={field.value === true ? "default" : "outline"}
                          onClick={() =>
                            form.setValue(question.questionCode, true, {
                              shouldValidate: true,
                            })
                          }
                          className="h-8 flex-1"
                        >
                          Yes
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === false ? "default" : "outline"}
                          onClick={() =>
                            form.setValue(question.questionCode, false, {
                              shouldValidate: true,
                            })
                          }
                          className="h-8 flex-1"
                        >
                          No
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>

                {/* Render conditional questions */}
                {question.conditionalQuestions &&
                  field.value === true &&
                  question.conditionalQuestions.yes?.map((q) => renderQuestion(q))}

                {question.conditionalQuestions &&
                  field.value === false &&
                  question.conditionalQuestions.no?.map((q) => renderQuestion(q))}
              </FormItem>
            )}
          />
        );

      case "text":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="mb-2 flex items-start">
                  {question.description ? <span className="mr-2">•</span> : null}
                  <div>
                    <FormLabel htmlFor={question.questionCode} className="block">
                      {question.question}
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </FormLabel>
                    {question.description && <p className="mt-1 text-sm text-gray-500">{question.description}</p>}
                  </div>
                </div>
                <FormControl>
                  <Input id={question.questionCode} placeholder={question.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "textarea":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6 ml-3">
                <div className="mb-2 flex items-start">
                  {question.description ? <span className="mr-2">•</span> : null}
                  <div>
                    <FormLabel htmlFor={question.questionCode} className="block">
                      {question.question}
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </FormLabel>
                    {question.description && <p className="mt-1 text-sm text-gray-500">{question.description}</p>}
                  </div>
                </div>
                <FormControl>
                  <Textarea id={question.questionCode} placeholder={question.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "number":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="mb-2 flex items-start">
                  {question.description ? <span className="mr-2">•</span> : null}
                  <div>
                    <FormLabel htmlFor={question.questionCode} className="block">
                      {question.question}
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </FormLabel>
                    {question.description && <p className="mt-1 text-sm text-gray-500">{question.description}</p>}
                  </div>
                </div>
                <FormControl>
                  <div className="flex items-center">
                    {question.prefix && <span className="mr-2">{question.prefix}</span>}
                    <Input id={question.questionCode} type="number" placeholder={question.placeholder} {...field} />
                    {question.suffix && <span className="ml-2">{question.suffix}</span>}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "date":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="mb-2 flex items-start">
                  <div>
                    <FormLabel htmlFor={question.questionCode} className="block">
                      {question.question}
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </FormLabel>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => field.onChange(date)}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="mb-2 flex items-start">
                  <div>
                    <FormLabel htmlFor={question.questionCode} className="block">
                      {question.question}
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </FormLabel>
                  </div>
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {question.options
                      .sort((a, b) => a.position - b.position)
                      .map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "radio":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="mb-2 flex items-start">
                  <div>
                    <FormLabel htmlFor={question.questionCode} className="block">
                      {question.question}
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </FormLabel>
                  </div>
                </div>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                    {question.options
                      .sort((a, b) => a.position - b.position)
                      .map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.questionCode}-${option.id}`} />
                          <Label htmlFor={`${question.questionCode}-${option.id}`}>{option.label}</Label>
                        </div>
                      ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "checkbox":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6 flex flex-row items-start space-y-0 space-x-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {question.label || question.question}
                    {question.required && <span className="ml-1 text-red-500">*</span>}
                  </FormLabel>
                  {question.description && <p className="text-sm text-gray-500">{question.description}</p>}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "checkboxGroup":
        return (
          <FormField
            key={question.id}
            control={form.control}
            name={question.questionCode}
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="mb-2 flex items-start">
                  <div>
                    <FormLabel htmlFor={question.questionCode} className="block">
                      {question.question}
                      {question.required && <span className="ml-1 text-red-500">*</span>}
                    </FormLabel>
                  </div>
                </div>
                <FormControl>
                  <div className="space-y-2">
                    {question.options
                      .sort((a, b) => a.position - b.position)
                      .map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${question.questionCode}-${option.id}`}
                            checked={(field.value || []).includes(option.value)}
                            onCheckedChange={(checked) => {
                              const currentValues = Array.isArray(field.value) ? [...field.value] : [];
                              if (checked) {
                                form.setValue(question.questionCode, [...currentValues, option.value], {
                                  shouldValidate: true,
                                });
                              } else {
                                form.setValue(
                                  question.questionCode,
                                  currentValues.filter((value) => value !== option.value),
                                  { shouldValidate: true },
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`${question.questionCode}-${option.id}`}>{option.label}</Label>
                        </div>
                      ))}
                    {question.noneOption && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${question.questionCode}-none`}
                          checked={(field.value || []).includes("none")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              form.setValue(question.questionCode, ["none"], {
                                shouldValidate: true,
                              });
                            } else {
                              form.setValue(question.questionCode, [], {
                                shouldValidate: true,
                              });
                            }
                          }}
                        />
                        <Label htmlFor={`${question.questionCode}-none`}>{question.noneOption}</Label>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-4 shadow-xs">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-600">{subtitle}</p>
        {estimatedTime && <p className="mt-1 text-sm text-gray-500">Estimated time: {estimatedTime} minutes</p>}
      </div>

      <div className="mb-6">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <div className="h-6 w-full rounded bg-gray-200">
          <div className="bg-primary h-6 rounded" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h2 className="mb-6 text-xl font-semibold">{currentStep.title}</h2>

      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          {currentStep.questions.map((question) => renderQuestion(question))}

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0 || isSubmitting}
            >
              Previous
            </Button>
            <Button type="button" onClick={handleNext} disabled={isSubmitting}>
              {currentStepIndex === steps.length - 1 ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
