// Common
export type TObject<T = string> = Record<string, T>;

// Treatment
export type TTreatment = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  questionsId?: string;
  isActive?: boolean;
  logoUrl: string;
};

// First, let's add the required sub-types
export type TOption = {
  id: number;
  value: string;
  label: string;
  position: number;
};

export type TQuestion = {
  id: number;
  questionCode: string;
  type: "yesNo" | "text" | "textarea" | "checkbox" | "radio" | "select" | "date" | "number" | "checkboxGroup";
  question?: string;
  required?: boolean;
  description?: string;
  position: number;
  treatmentTypes?: string[];
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  label?: string;
  options?: TOption[];
  allowMultiple?: boolean;
  noneOption?: string;
  conditionalQuestions?: {
    yes?: any[];
    no?: any[];
  };
};

export type TStep = {
  id: number;
  stepCode: string;
  title: string;
  position: number;
  questions: TQuestion[];
  treatmentTypes?: string[];
};

export type TConsultation = {
  _id: string;
  title: string;
  subtitle: string;
  estimatedTime?: number;
  steps: TStep[];
  treatment: string; // This will hold the Treatment document ID
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// Products
export type TProductVariant = {
  type: "weight" | "volume" | "unit" | "pack"; // Add more if needed
  value: string; // e.g., "100mg", "50ml"
  unit: string; // e.g., "mg", "ml", "tablets"
  price: number;
  stock: number;
};

export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  variants: TProductVariant[];
  imageUrls: string[];
  treatment?: TTreatment; // or you can populate with `Partial<ITreatment>`
  needConsultation: boolean;
  keyPoints?: string[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IGpsPractice = {
  _id: string;
  nhsId: string;
  name: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  postcode: string;
  phone: string;
};


export type TFeaturedTreatment = Pick<TTreatment, "name" | "slug" | "logoUrl"> & {
  products: Pick<TProduct, "name" | "slug">[];
};

// BLOGS
export type TBlog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrls: string[];
  author: string; // This will hold the User document ID
  treatment?: string; // This will hold the Treatment document ID
  tags?: string[];
  isPublished: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  createdAt: string;
  updatedAt?: string;
};
