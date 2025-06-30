import { IconName, ICONS } from "@/components/ui/icons";

export interface Treatment {
  id: string;
  title: string;
  link: string;
  items: { name: string; link: string }[];
  iconName: IconName;
}

// Update in HomePageData interface
export interface HomePageData {
  exploreTreatments: {
    title: string;
    description: string;
    treatments: Treatment[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      id: number;
      title: string;
      description: string;
      icon: IconName;
    }[];
  };
  faqs: {
    title: string;
    subtitle: string;
    faqs: {
      id: string;
      question: string;
      answer: string;
    }[];
  };
  testimonials: {
    title: string;
    totalReviews: number;
    platform: string;
    testimonials: {
      id: string;
      name: string;
      quote: string;
      content: string;
      rating: number;
    }[];
  };
  partners: {
    title: string;
    subtitle: string;
    partners: {
      id: string;
      name: string;
      logo: string;
    }[];
  };
  blog: {
    title: string;
    subtitle: string;
    posts: {
      id: string;
      title: string;
      excerpt: string;
      category: string;
      date: string;
      imageSrc: string;
      slug: string;
    }[];
  };
  about: {
    title: string;
    content: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
  };
  newsletter: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

// Update in mockHomeData
const mockHomeData: HomePageData = {
  newsletter: {
    title: "Join Our Health Community",
    subtitle: "Expanding Online Treatments to Offer the Right Care for Your Needs.",
    buttonText: "Subscribe",
  },
  about: {
    title: "About Mr Chemist",
    content: `
      <p>Mr Chemist Pharmacy is a registered online pharmacy in the UK. We have been online since 2024 and always aim to make your online pharmacy experience as simple and affordable as possible. We also offer an online doctor service, providing treatments for a range of conditions such as hair loss, erectile dysfunction, weight loss, and more.</p>
      <p>You do not need a prescription, as our online consultation allows us to assess suitability before our doctor generates a prescription free of charge. This is then passed to the pharmacy team, who prepare and post your medication. We are registered with the MHRA and GPhC. These bodies hold us to strict standards to ensure we provide a safe and effective service. You can contact us by phone at 0141 778 5023 or via email at contact@mrchemist.co.uk.</p>
    `,
    buttonText: "Contact",
    buttonLink: "/contact",
    imageSrc: "/images/home-about-image.png",
  },
  blog: {
    title: "Health news & tips",
    subtitle: "The team at Click2Pharmacy regularly publish and update information and advice relating",
    posts: [
      {
        id: "1",
        title: "Skin Conditions and Treatments",
        excerpt:
          "Erectile dysfunction (ED) is a common medical condition that affects men's sexual health and overall quality of life.",
        category: "Skin care tips",
        date: "March 2, 2024",
        imageSrc: "/images/blog-image-1.png",
        slug: "skin-conditions-and-treatments",
      },
      {
        id: "2",
        title: "Which is Best for Acne?",
        excerpt:
          "Erectile dysfunction (ED) is a common medical condition that affects men's sexual health and overall quality of life.",
        category: "Face masks tips",
        date: "March 3, 2024",
        imageSrc: "/images/blog-image-2.png",
        slug: "which-is-best-for-acne",
      },
      {
        id: "3",
        title: "Skin Conditions and Treatments",
        excerpt:
          "Erectile dysfunction (ED) is a common medical condition that affects men's sexual health and overall quality of life.",
        category: "Hair care tips",
        date: "March 4, 2024",
        imageSrc: "/images/blog-image-3.png",
        slug: "skin-conditions-and-treatments-2",
      },
    ],
  },
  faqs: {
    title: "How can we help you?",
    subtitle: "Expanding Online Treatments to Offer the Right Care for Your Needs.",
    faqs: [
      {
        id: "01",
        question: "What is the The Independent Pharmacy?",
        answer:
          "The Independent Pharmacy is an Online Pharmacy (or Online Chemist/Online Doctor depending on your preferred terminology) that is run by a team of experienced healthcare professionals based in Bristol, UK. It is owned and operated by two UK pharmacists, Andy Boysan & Scott McDougall, who founded and run The Independent Pharmacy based on years of industry experience.",
      },
      {
        id: "02",
        question: "What services do you provide as an Online Pharmacy?",
        answer:
          "We provide a range of prescription and non-prescription medications, as well as online consultations with qualified healthcare professionals. Our services include treatments for common conditions like erectile dysfunction, hair loss, weight management, and more.",
      },
      {
        id: "03",
        question: "Is The Independent Pharmacy based in the UK?",
        answer:
          "Yes, we are fully based in the UK and regulated by the General Pharmaceutical Council (GPhC). Our team of pharmacists and doctors are all UK-registered professionals.",
      },
      {
        id: "04",
        question: "How can I be sure The Independent Pharmacy is legitimate?",
        answer:
          "We are registered with the Medicines and Healthcare products Regulatory Agency (MHRA) and the General Pharmaceutical Council (GPhC). You can verify our credentials on their respective websites. We also display our registration numbers on our website.",
      },
      {
        id: "05",
        question: "How do I contact The Independent Pharmacy?",
        answer:
          "You can contact us via email at contact@mrchemist.co.uk, by phone at 0141 778 5023, or through our website's contact form. Our customer service team is available Monday to Friday, 9am to 5pm.",
      },
    ],
  },
  exploreTreatments: {
    title: "Explore our health treatments",
    description:
      "As a registered Mr Chemist pharmacy, we offer consultations and prescription treatments for various conditions, approved by qualified healthcare professionals. Explore popular options below",
    treatments: [
      {
        id: "weight-loss",
        title: "Weight Loss",
        link: "/treatments/weight-loss",
        items: [
          { name: "Mounjaro", link: "/treatments/mounjaro" },
          { name: "Saxenda", link: "/treatments/saxenda" },
          { name: "Wegovy", link: "/treatments/wegovy" },
        ],
        iconName: ICONS.SCALE,
      },
      {
        id: "mens-health",
        title: "Men's Health",
        link: "/treatments/mens-health",
        items: [
          {
            name: "Erectile Dysfunction",
            link: "/treatments/erectile-dysfunction",
          },
          { name: "Hair Loss", link: "/treatments/hair-loss" },
          {
            name: "Premature Ejaculation",
            link: "/treatments/premature-ejaculation",
          },
        ],
        iconName: ICONS.USER,
      },
      {
        id: "womens-health",
        title: "Women's Health",
        link: "/treatments/womens-health",
        items: [
          {
            name: "Bacterial Vaginosis",
            link: "/treatments/bacterial-vaginosis",
          },
          { name: "Cystitis", link: "/treatments/cystitis" },
          { name: "Period Delay", link: "/treatments/period-delay" },
        ],
        iconName: ICONS.USER_ROUND,
      },
      {
        id: "sexual-health",
        title: "Sexual Health",
        link: "/treatments/sexual-health",
        items: [
          {
            name: "Emergency Contraception",
            link: "/treatments/emergency-contraception",
          },
          { name: "Genital Warts", link: "/treatments/genital-warts" },
          { name: "Fungal Infection", link: "/treatments/fungal-infection" },
        ],
        iconName: ICONS.HEART,
      },
    ],
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Expanding Online Treatments to Offer the Right Care for Your Needs.",
    steps: [
      {
        id: 1,
        title: "1. Answer quick questions",
        description: "No GP or pharmacy visits, just a quick online consultation.",
        icon: ICONS.MESSAGE_CIRCLE,
      },
      {
        id: 2,
        title: "2. Choose your treatment",
        description: "No GP or pharmacy visits, just a quick online consultation.",
        icon: ICONS.STETHOSCOPE,
      },
      {
        id: 3,
        title: "3. Get it delivered fast",
        description: "No GP or pharmacy visits, just a quick online consultation.",
        icon: ICONS.TRUCK,
      },
    ],
  },
  testimonials: {
    title: "What our Customers say",
    totalReviews: 436,
    platform: "Trustpilot",
    testimonials: [
      {
        id: "1",
        name: "Brookly Simmons",
        quote: "I highly recommend them",
        content:
          "Impressively quick service. Easy site to navigate and meds delivered by reliable Royal Mail, so well priced. Thank you!",
        rating: 5,
      },
      {
        id: "2",
        name: "Devil Ron",
        quote: "It helped me loose 11.4lbs in the first",
        content:
          "It helped me loose 11.4lbs in the first week. Applying online for this product was simple and the quick response for the approval",
        rating: 5,
      },
      {
        id: "3",
        name: "Anna Patel",
        quote: "My full 5 star approval",
        content:
          "Very fast delivery. I am happy with the speed that I got to order what I needed and fast delivery, really needed to start taking. Thank you!",
        rating: 5,
      },
      {
        id: "4",
        name: "John Smith",
        quote: "Excellent service",
        content: "The consultation was straightforward and the delivery was prompt. Will definitely use again.",
        rating: 5,
      },
      {
        id: "5",
        name: "Sarah Johnson",
        quote: "Great customer service",
        content: "Had a question about my medication and received a helpful response within hours. Very impressed!",
        rating: 5,
      },
    ],
  },
  partners: {
    title: "Our trusted Partners",
    subtitle: "Expanding Online Treatments to Offer the Right Care for Your Needs.",
    partners: [
      { id: "1", name: "P&G", logo: "/images/brand/brand-6.png" },
      { id: "2", name: "Roche", logo: "/images/brand/brand-5.png" },
      { id: "3", name: "Lilly", logo: "/images/brand/brand-4.png" },
      { id: "4", name: "GSK", logo: "/images/brand/brand-3.png" },
      { id: "5", name: "Teva", logo: "/images/brand/brand-2.png" },
      { id: "6", name: "Novartis", logo: "/images/brand/brand-1.png" },
    ],
  },
};

export async function getHomePageData(): Promise<HomePageData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockHomeData;
}

export async function getExploreTreatments(): Promise<HomePageData["exploreTreatments"]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockHomeData.exploreTreatments;
}

export async function getTestimonials(): Promise<HomePageData["testimonials"]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockHomeData.testimonials;
}

export async function getPartners(): Promise<HomePageData["partners"]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockHomeData.partners;
}

// Add new API function
export async function getBlogData(): Promise<HomePageData["blog"]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockHomeData.blog;
}

// Add new API function
export async function getAboutData(): Promise<HomePageData["about"]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockHomeData.about;
}

// Add new API function
export async function getNewsletterData(): Promise<HomePageData["newsletter"]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockHomeData.newsletter;
}
