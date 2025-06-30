import type { Step } from "@/components/consultation/form";

// Define treatment types
export type TreatmentType = "weightLoss" | "hairLoss" | "skinCare" | "mentalHealth" | "sexualHealth";

// Define consultation metadata
interface ConsultationMetadata {
  title: string;
  subtitle: string;
  estimatedTime: number;
  position: number; // Added position field
}

// Define consultation data structure
export interface ConsultationData {
  steps: Step[];
  metadata: ConsultationMetadata;
}

// Common steps that apply to all treatment types
const commonSteps: Step[] = [
  // {
  //   id: 1, // Changed to numeric ID
  //   stepCode: "step1", // Added stepCode to preserve the string identifier
  //   title: "Basic Information",
  //   position: 1, // Added position field
  //   questions: [
  //     {
  //       id: 1, // Changed to numeric ID
  //       questionCode: "isAdult", // Added questionCode to preserve the string identifier
  //       type: "yesNo",
  //       question: "I am 18 years old or above.",
  //       required: true,
  //       position: 1, // Added position field
  //     },
  //     {
  //       id: 2,
  //       questionCode: "ownUse",
  //       type: "yesNo",
  //       question:
  //         "I am using this service on my own behalf and of my own free will, and any treatment or advice is for my sole use only.",
  //       required: true,
  //       position: 2,
  //     },
  //     {
  //       id: 3,
  //       questionCode: "informGP",
  //       type: "yesNo",
  //       question: "I will inform my GP of any treatment I have received.",
  //       required: true,
  //       position: 3,
  //     },
  //     {
  //       id: 4,
  //       questionCode: "understandConsultation",
  //       type: "yesNo",
  //       question:
  //         "I understand my consultation will not be passed to the Click2Pharmacy online clinical team until I have purchased my preferred treatment.",
  //       required: true,
  //       position: 4,
  //     },
  //     {
  //       id: 5,
  //       questionCode: "agreeTerms",
  //       type: "checkbox",
  //       label: "I agree to Click2Pharmacy's terms & conditions and privacy policy.",
  //       required: true,
  //       position: 5,
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   stepCode: "step2",
  //   title: "Personal Details",
  //   position: 2,
  //   questions: [
  //     {
  //       id: 6,
  //       questionCode: "dateOfBirth",
  //       type: "date",
  //       question: "Date of Birth",
  //       required: true,
  //       position: 1,
  //     },
  //     {
  //       id: 7,
  //       questionCode: "sex",
  //       type: "select",
  //       question: "What is your sex?",
  //       required: true,
  //       position: 2,
  //       options: [
  //         { id: 1, value: "female", label: "Female", position: 1 },
  //         { id: 2, value: "male", label: "Male", position: 2 },
  //         { id: 3, value: "other", label: "Other", position: 3 },
  //       ],
  //     },
  //   ],
  // },
];

// Weight Loss specific steps
const weightLossSteps: Step[] = [
  {
    id: 3,
    stepCode: "weightLoss_details",
    title: "Weight & Height",
    position: 3,
    questions: [
      {
        id: 8,
        questionCode: "weight",
        type: "number",
        question: "Please enter your current weight (kg)",
        required: true,
        suffix: "kg",
        position: 1,
      },
      {
        id: 9,
        questionCode: "height",
        type: "number",
        question: "Please enter your current height (cm)",
        required: true,
        suffix: "cm",
        position: 2,
      },
      {
        id: 10,
        questionCode: "pregnancyStatus",
        type: "checkboxGroup",
        question: "Are you currently pregnant, trying to conceive or breastfeeding?",
        required: true,
        position: 3,
        options: [
          { id: 4, value: "pregnant", label: "I am pregnant", position: 1 },
          { id: 5, value: "breastfeeding", label: "I am breastfeeding", position: 2 },
          { id: 6, value: "trying", label: "I am trying to conceive", position: 3 },
        ],
        noneOption: "None of the above",
      },
    ],
  },
  {
    id: 4,
    stepCode: "weightLoss_medical",
    title: "Medical History",
    position: 4,
    questions: [
      {
        id: 11,
        questionCode: "eatingDisorder",
        type: "yesNo",
        question: "Do you have or have you ever had an eating disorder such as anorexia or bulimia?",
        required: true,
        position: 1,
        conditionalQuestions: {
          yes: [
            {
              id: 12,
              questionCode: "eatingDisorderDetails",
              type: "textarea",
              question: "Please provide more details",
              required: true,
              placeholder: "Please describe your condition, when you were diagnosed, and any current treatment",
              position: 1,
            },
          ],
        },
      },
      {
        id: 13,
        questionCode: "weightLossMedication",
        type: "yesNo",
        question: "Are you currently taking weight loss medication or have used it in the past?",
        required: true,
        position: 2,
      },
      {
        id: 14,
        questionCode: "prescriptionMedications",
        type: "yesNo",
        question: "Are you currently taking any prescription medications?",
        required: true,
        position: 3,
      },
      {
        id: 15,
        questionCode: "medicalConditions",
        type: "yesNo",
        question: "Do you have any medical conditions?",
        required: true,
        position: 4,
      },
      {
        id: 16,
        questionCode: "allergies",
        type: "yesNo",
        question: "Do you have any allergies that you are aware of?",
        required: true,
        position: 5,
      },
    ],
  },
  {
    id: 5,
    stepCode: "weightLoss_conditions",
    title: "Health Conditions",
    position: 5,
    questions: [
      {
        id: 17,
        questionCode: "healthConditions",
        type: "checkboxGroup",
        question: "Do you have, or have you ever had, any of the following conditions? Select any that apply.",
        required: true,
        position: 1,
        options: [
          { id: 7, value: "liver", label: "Liver disease", position: 1 },
          { id: 8, value: "heart", label: "Heart failure", position: 2 },
          { id: 9, value: "diabetes", label: "Diabetes", position: 3 },
          { id: 10, value: "kidney", label: "Kidney condition", position: 4 },
          { id: 11, value: "bloodPressure", label: "High Blood Pressure", position: 5 },
          { id: 12, value: "cholesterol", label: "High Cholesterol Levels", position: 6 },
          { id: 13, value: "sleepApnea", label: "Sleep Apnoea", position: 7 },
          { id: 14, value: "pancreatitis", label: "Current or Past Pancreatitis", position: 8 },
          {
            id: 15,
            value: "endocrine",
            label: "Current or Past Endocrinological disorders",
            position: 9,
          },
          {
            id: 16,
            value: "retinopathy",
            label: "Diabetic Retinopathy (Damage to back of eye caused by high sugar levels)",
            position: 10,
          },
          {
            id: 17,
            value: "thyroidCancer",
            label: "Personal or Family history of MEDULLARY THYROID CARCINOMA (Thyroid Cancer)",
            position: 11,
          },
          {
            id: 18,
            value: "men2",
            label:
              "Personal history of multiple endocrine neoplasia syndrome type 2 (MEN 2) - a disease where there are tumours in more than one gland in the body",
            position: 12,
          },
          {
            id: 19,
            value: "thyroid",
            label: "Thyroid diseases other than Hyperthyroidism or Hypothyroidism",
            position: 13,
          },
        ],
        allowMultiple: true,
        noneOption: "None of the above",
      },
    ],
  },
];

// Hair Loss specific steps
const hairLossSteps: Step[] = [
  // {
  //   id: 6,
  //   stepCode: "hairLoss_details",
  //   title: "Hair Loss Details",
  //   position: 3,
  //   questions: [
  //     {
  //       id: 18,
  //       questionCode: "hairLossDuration",
  //       type: "select",
  //       question: "How long have you been experiencing hair loss?",
  //       required: true,
  //       position: 1,
  //       options: [
  //         { id: 20, value: "lessThan6Months", label: "Less than 6 months", position: 1 },
  //         { id: 21, value: "6To12Months", label: "6-12 months", position: 2 },
  //         { id: 22, value: "1To3Years", label: "1-3 years", position: 3 },
  //         { id: 23, value: "moreThan3Years", label: "More than 3 years", position: 4 },
  //       ],
  //     },
  //     {
  //       id: 19,
  //       questionCode: "hairLossPattern",
  //       type: "select",
  //       question: "What pattern of hair loss are you experiencing?",
  //       required: true,
  //       position: 2,
  //       options: [
  //         { id: 24, value: "receding", label: "Receding hairline", position: 1 },
  //         { id: 25, value: "crown", label: "Thinning at the crown", position: 2 },
  //         { id: 26, value: "diffuse", label: "Diffuse thinning all over", position: 3 },
  //         { id: 27, value: "patchy", label: "Patchy hair loss", position: 4 },
  //         { id: 28, value: "other", label: "Other", position: 5 },
  //       ],
  //     },
  //     {
  //       id: 20,
  //       questionCode: "previousTreatments",
  //       type: "checkboxGroup",
  //       question: "Have you tried any hair loss treatments before?",
  //       required: true,
  //       position: 3,
  //       options: [
  //         { id: 29, value: "minoxidil", label: "Minoxidil (Rogaine)", position: 1 },
  //         { id: 30, value: "finasteride", label: "Finasteride (Propecia)", position: 2 },
  //         { id: 31, value: "dutasteride", label: "Dutasteride", position: 3 },
  //         { id: 32, value: "supplements", label: "Hair supplements", position: 4 },
  //         { id: 33, value: "transplant", label: "Hair transplant", position: 5 },
  //       ],
  //       allowMultiple: true,
  //       noneOption: "I have not tried any treatments",
  //     },
  //   ],
  // },
  {
    id: 7,
    stepCode: "hairLoss_medical",
    title: "Medical History",
    position: 4,
    questions: [
      {
        id: 21,
        questionCode: "familyHistory",
        type: "yesNo",
        question: "Is there a history of hair loss in your family?",
        required: true,
        position: 1,
      },
      {
        id: 22,
        questionCode: "scalp",
        type: "yesNo",
        question: "Do you have any scalp conditions (e.g., psoriasis, dermatitis)?",
        required: true,
        position: 2,
        conditionalQuestions: {
          yes: [
            {
              id: 23,
              questionCode: "scalpDetails",
              type: "textarea",
              question: "Please provide details about your scalp condition",
              required: true,
              position: 1,
            },
          ],
        },
      },
    ],
  },
];

// Skin Care specific steps
const skinCareSteps: Step[] = [
  {
    id: 8,
    stepCode: "skinCare_details",
    title: "Skin Concerns",
    position: 3,
    questions: [
      {
        id: 24,
        questionCode: "skinType",
        type: "select",
        question: "What is your skin type?",
        required: true,
        position: 1,
        options: [
          { id: 34, value: "dry", label: "Dry", position: 1 },
          { id: 35, value: "oily", label: "Oily", position: 2 },
          { id: 36, value: "combination", label: "Combination", position: 3 },
          { id: 37, value: "normal", label: "Normal", position: 4 },
          { id: 38, value: "sensitive", label: "Sensitive", position: 5 },
        ],
      },
      {
        id: 25,
        questionCode: "skinConcerns",
        type: "checkboxGroup",
        question: "What skin concerns are you looking to address?",
        required: true,
        position: 2,
        options: [
          { id: 39, value: "acne", label: "Acne", position: 1 },
          { id: 40, value: "aging", label: "Signs of aging", position: 2 },
          { id: 41, value: "pigmentation", label: "Hyperpigmentation", position: 3 },
          { id: 42, value: "rosacea", label: "Rosacea", position: 4 },
          { id: 43, value: "dryness", label: "Dryness", position: 5 },
          { id: 44, value: "oiliness", label: "Oiliness", position: 6 },
        ],
        allowMultiple: true,
      },
      {
        id: 26,
        questionCode: "currentProducts",
        type: "textarea",
        question: "What skincare products are you currently using?",
        required: true,
        placeholder: "Please list your current skincare routine",
        position: 3,
      },
    ],
  },
  {
    id: 9,
    stepCode: "skinCare_medical",
    title: "Skin History",
    position: 4,
    questions: [
      {
        id: 27,
        questionCode: "allergies",
        type: "yesNo",
        question: "Do you have any known allergies to skincare ingredients?",
        required: true,
        position: 1,
        conditionalQuestions: {
          yes: [
            {
              id: 28,
              questionCode: "allergiesDetails",
              type: "textarea",
              question: "Please list any ingredients you're allergic to",
              required: true,
              position: 1,
            },
          ],
        },
      },
      {
        id: 29,
        questionCode: "previousTreatments",
        type: "yesNo",
        question: "Have you used prescription skincare products before?",
        required: true,
        position: 2,
        conditionalQuestions: {
          yes: [
            {
              id: 30,
              questionCode: "previousTreatmentsDetails",
              type: "textarea",
              question: "Please provide details about previous prescription products",
              required: true,
              position: 1,
            },
          ],
        },
      },
    ],
  },
];

// Common confirmation steps
const confirmationSteps: Step[] = [
  {
    id: 10,
    stepCode: "confirmation",
    title: "Confirmation",
    position: 98, // High position number to ensure it comes near the end
    questions: [
      {
        id: 31,
        questionCode: "confirmAccurate",
        type: "checkbox",
        label:
          "All information I have provided is accurate and honest to enable Click2Pharmacy prescribers to make the best decision in regards to my health.",
        required: true,
        position: 1,
      },
      {
        id: 32,
        questionCode: "confirmReadInstructions",
        type: "checkbox",
        label:
          "I will read, understand and follow the instructions in the patient information leaflet, including the risks and side effects, before taking my treatment.",
        required: true,
        position: 2,
      },
      {
        id: 33,
        questionCode: "confirmContact",
        type: "checkbox",
        label:
          "I am happy for the Click2Pharmacy clinicians to contact me if necessary to ensure suitability and safety.",
        required: true,
        position: 3,
      },
      {
        id: 34,
        questionCode: "confirmRefusal",
        type: "checkbox",
        label:
          "I am aware Click2Pharmacy can refuse or withdraw service without providing a reason (a refund will be issued).",
        required: true,
        position: 4,
      },
      {
        id: 35,
        questionCode: "confirmMedicalAdvice",
        type: "checkbox",
        label:
          "I will seek medical advice via a GP, NHS 111, walk in centre, pharmacy and if necessary, A&E if I experience any adverse effects from my treatment.",
        required: true,
        position: 5,
      },
      {
        id: 36,
        questionCode: "confirmConsultation",
        type: "checkbox",
        label:
          "If you haven't ordered this medication before, you will need to have a full consultation with our pharmacist before we can issue your prescription. After you place your order, we will contact you to arrange this.",
        required: true,
        position: 6,
      },
    ],
  },
];

// Treatment-specific photo upload requirements
const weightLossPhotoStep: Step = {
  id: 11,
  stepCode: "weightLossPhoto",
  title: "Photo Requirement",
  position: 99, // High position number to ensure it comes at the end
  questions: [
    {
      id: 37,
      questionCode: "confirmPhoto",
      type: "checkbox",
      label:
        "I will upload a full length, clothed picture of myself after I have placed my order for the pharmacist to visually confirm my BMI.",
      required: true,
      position: 1,
    },
  ],
};

// Consultation metadata for each treatment type
const consultationMetadata: Record<TreatmentType, ConsultationMetadata> = {
  weightLoss: {
    title: "Weight Loss Consultation",
    subtitle:
      "Please answer the following questions as honestly as possible so we can ensure your preferred treatment is the best treatment for your needs.",
    estimatedTime: 3,
    position: 1,
  },
  hairLoss: {
    title: "Hair Loss Consultation",
    subtitle:
      "Please provide accurate information about your hair loss to help us recommend the most suitable treatment.",
    estimatedTime: 3,
    position: 2,
  },
  skinCare: {
    title: "Skin Care Consultation",
    subtitle: "Help us understand your skin concerns so we can recommend the most effective treatment for your needs.",
    estimatedTime: 3,
    position: 3,
  },
  mentalHealth: {
    title: "Mental Health Consultation",
    subtitle:
      "Please answer the following questions honestly to help us provide the most appropriate support for your needs.",
    estimatedTime: 5,
    position: 4,
  },
  sexualHealth: {
    title: "Sexual Health Consultation",
    subtitle:
      "Your answers will be kept confidential and will help us provide the most appropriate treatment for your needs.",
    estimatedTime: 3,
    position: 5,
  },
};

// Map of treatment types to their specific steps
const treatmentSteps: Record<TreatmentType, Step[]> = {
  weightLoss: [...weightLossSteps, weightLossPhotoStep],
  hairLoss: hairLossSteps,
  skinCare: skinCareSteps,
  mentalHealth: [], // Add mental health specific steps when needed
  sexualHealth: [], // Add sexual health specific steps when needed
};

// Function to get consultation steps for a specific treatment type
export async function getConsultationSteps(
  treatmentType: string,
): Promise<{ steps: Step[]; title: string; subtitle: string }> {
  // Validate treatment type
  if (!Object.keys(consultationMetadata).includes(treatmentType)) {
    throw new Error(`Invalid treatment type: ${treatmentType}`);
  }

  const typedTreatmentType = treatmentType as TreatmentType;

  // Combine common steps with treatment-specific steps and sort by position
  const steps = [...commonSteps, ...treatmentSteps[typedTreatmentType], ...confirmationSteps].sort(
    (a, b) => a.position - b.position,
  );

  const { title, subtitle } = consultationMetadata[typedTreatmentType];

  return { steps, title, subtitle };
}

// Function to get all available treatment types
export function getAvailableTreatmentTypes(): TreatmentType[] {
  return Object.keys(consultationMetadata) as TreatmentType[];
}
