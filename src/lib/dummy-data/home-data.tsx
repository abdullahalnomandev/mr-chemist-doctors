import { Heart, MessageCircle, Scale, Stethoscope, Truck, User, UserRound } from "lucide-react";

// Icons for treatment categories
export const treatmentIcons = {
  weightLoss: <Scale className="h-12 w-12 text-white" strokeWidth={1} />,
  mensHealth: <User className="h-12 w-12 text-white" strokeWidth={1} />,
  womensHealth: <UserRound className="h-12 w-12 text-white" strokeWidth={1} />,
  sexualHealth: <Heart className="h-12 w-12 text-white" strokeWidth={1} />,
};

// Icons for how it works steps
export const stepIcons = {
  chat: <MessageCircle className="h-12 w-12 text-[#0033A0]" strokeWidth={1} />,
  treatment: <Stethoscope className="h-12 w-12 text-[#0033A0]" strokeWidth={1} />,
  delivery: <Truck className="h-12 w-12 text-[#0033A0]" strokeWidth={1} />,
};
// Data for explore treatments section
export const exploreTreatmentsData = {
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
      icon: treatmentIcons.weightLoss,
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
      icon: treatmentIcons.mensHealth,
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
      icon: treatmentIcons.womensHealth,
    },
    {
      id: "sexual-health",
      title: "Sexual Health",
      items: [
        {
          name: "Emergency Contraception",
          link: "/treatments/emergency-contraception",
        },
        { name: "Genital Warts", link: "/treatments/genital-warts" },
        { name: "Fungal Infection", link: "/treatments/fungal-infection" },
      ],
      icon: treatmentIcons.sexualHealth,
    },
  ],
};

// Data for how it works section
// Data for how it works section
export const howItWorksData = {
  title: "How it works",
  subtitle: "Expanding Online Treatments to Offer the Right Care for Your Needs.",
  steps: [
    {
      id: 1,
      title: "1. Answer quick questions",
      description: "No GP or pharmacy visits, just a quick online consultation.",
      icon: stepIcons.chat,
    },
    {
      id: 2,
      title: "1. Choose your treatment",
      description: "No GP or pharmacy visits, just a quick online consultation.",
      icon: stepIcons.treatment,
    },
    {
      id: 3,
      title: "1. Get it delivered fast",
      description: "No GP or pharmacy visits, just a quick online consultation.",
      icon: stepIcons.delivery,
    },
  ],
};

// Data for FAQ section
export const faqData = {
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
};

// Data for newsletter section
export const newsletterData = {
  title: "Join Our Health Community",
  subtitle: "Expanding Online Treatments to Offer the Right Care for Your Needs.",
  buttonText: "Subscribe",
};
// Data for suggest treatment
export const suggestTreatment = {
  title: "Suggest More Treatments",
  subtitle:
    "Choose from weight loss pills or self-injections, all UK-licensed and designed to fit your lifestyle together with healthy eating.",
};

// Data for testimonials section
export const testimonialsData = {
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
};

// Data for partners section
export const partnersData = {
  title: "Our trusted Partners",
  subtitle: "Expanding Online Treatments to Offer the Right Care for Your Needs.",
  partners: [
    {
      id: "1",
      name: "P&G",
      logo: "https://picsum.photos/1000/1000",
    },
    {
      id: "2",
      name: "Roche",
      logo: "https://picsum.photos/1000/1000",
    },
    {
      id: "3",
      name: "Lilly",
      logo: "https://picsum.photos/1000/1000",
    },
    {
      id: "4",
      name: "GSK",
      logo: "https://picsum.photos/1000/1000",
    },
    {
      id: "5",
      name: "Teva",
      logo: "https://picsum.photos/1000/1000",
    },
    {
      id: "6",
      name: "Novartis",
      logo: "https://picsum.photos/1000/1000",
    },
  ],
};

// Data for about section
export const aboutData = {
  title: "About Mr Chemist",
  content: `
      <p>Mr Chemist Pharmacy is a registered online pharmacy in the UK. We have been online since 2024 and always aim to make your online pharmacy experience as simple and affordable as possible. We also offer an online doctor service, providing treatments for a range of conditions such as hair loss, erectile dysfunction, weight loss, and more.</p>
      <p>You do not need a prescription, as our online consultation allows us to assess suitability before our doctor generates a prescription free of charge. This is then passed to the pharmacy team, who prepare and post your medication. We are registered with the MHRA and GPhC. These bodies hold us to strict standards to ensure we provide a safe and effective service. You can contact us by phone at 0141 778 5023 or via email at contact@mrchemist.co.uk.</p>
    `,
  buttonText: "Read About Us",
  buttonLink: "/about",
  imageSrc: "https://picsum.photos/1000/1000",
};

// Data for blog section
export const blogData = {
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
      imageSrc: "https://picsum.photos/1000/1000",
      slug: "skin-conditions-and-treatments",
    },
    {
      id: "2",
      title: "Which is Best for Acne?",
      excerpt:
        "Erectile dysfunction (ED) is a common medical condition that affects men's sexual health and overall quality of life.",
      category: "Face masks tips",
      date: "March 3, 2024",
      imageSrc: "https://picsum.photos/1000/1000",
      slug: "which-is-best-for-acne",
    },
    {
      id: "3",
      title: "Skin Conditions and Treatments",
      excerpt:
        "Erectile dysfunction (ED) is a common medical condition that affects men's sexual health and overall quality of life.",
      category: "Hair care tips",
      date: "March 4, 2024",
      imageSrc: "https://picsum.photos/1000/1000",
      slug: "skin-conditions-and-treatments-2",
    },
  ],
};
