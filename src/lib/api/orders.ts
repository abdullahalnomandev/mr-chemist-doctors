export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  weight: string;
  category: string;
  price: number;
  quantity: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Completed" | "Cancelled";
}

// Mock data
const mockOrders: OrderItem[] = [
  {
    id: "order1",
    productId: "prod1",
    productName: "Mounjaro® Injectable Pen",
    productImage: "/no-image-placeholder.svg?height=100&width=100",
    weight: "25g",
    category: "Wight Lost",
    price: 544.43,
    quantity: 1,
    status: "Completed",
  },
  {
    id: "order2",
    productId: "prod2",
    productName: "Capsules supporting healthy weight loss",
    productImage: "/no-image-placeholder.svg?height=100&width=100",
    weight: "25g",
    category: "Wight Lost",
    price: 544.43,
    quantity: 1,
    status: "Completed",
  },
  {
    id: "order3",
    productId: "prod3",
    productName: "Utrogestan 100mg capsules",
    productImage: "/no-image-placeholder.svg?height=100&width=100",
    weight: "25g",
    category: "Wight Lost",
    price: 544.43,
    quantity: 1,
    status: "Completed",
  },
  {
    id: "order4",
    productId: "prod4",
    productName: "Weight Loss Pills",
    productImage: "/no-image-placeholder.svg?height=100&width=100",
    weight: "25g",
    category: "Wight Lost",
    price: 544.43,
    quantity: 1,
    status: "Completed",
  },
];

// Mock API functions
export async function getOrders(): Promise<OrderItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate API response
  return mockOrders;
}

export async function getOrderById(id: string): Promise<OrderItem | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate API response
  return mockOrders.find((order) => order.id === id);
}
