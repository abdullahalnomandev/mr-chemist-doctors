export interface ReviewItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  weight: string;
  category: string;
  price: number;
  hasReviewed: boolean;
}

// Mock data
const mockReviews: ReviewItem[] = [
  {
    id: "review1",
    productId: "prod1",
    productName: "Mounjaro® Injectable Pen",
    productImage: "/no-image-placeholder.svg?height=100&width=100",
    weight: "25g",
    category: "Wight Lost",
    price: 544.43,
    hasReviewed: false,
  },
  {
    id: "review2",
    productId: "prod2",
    productName: "Capsules supporting healthy weight loss",
    productImage: "/no-image-placeholder.svg?height=100&width=100",
    weight: "25g",
    category: "Wight Lost",
    price: 544.43,
    hasReviewed: false,
  },
  {
    id: "review3",
    productId: "prod3",
    productName: "Utrogestan 100mg capsules",
    productImage: "/no-image-placeholder.svg?height=100&width=100",
    weight: "25g",
    category: "Wight Lost",
    price: 544.43,
    hasReviewed: false,
  },
  {
    id: "review4",
    productId: "prod4",
    productName: "Weight Loss Pills",
    productImage: "/no-image-placeholder.svg?height=100&width=100",
    weight: "25g",
    category: "Wight Lost",
    price: 544.43,
    hasReviewed: false,
  },
];

// Mock API functions
export async function getReviewableProducts(): Promise<ReviewItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate API response
  return mockReviews;
}

export interface ReviewSubmission {
  productId: string;
  rating: number;
  comment: string;
}

export async function submitReview(review: ReviewSubmission): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate API response
  return;
}
