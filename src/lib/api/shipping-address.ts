export interface ShippingAddress {
  id: string;
  name: string;
  address: string;
  address2: string;
  city: string;
  division: string;
  district: string;
  thana: string;
  postalCode: string;
  phone: string;
  email: string;
  residencyType: string;
  isDefault: boolean;
}

// Mock data
const mockAddress: ShippingAddress = {
  id: "1",
  name: "Sujon Hossain",
  address: "House-18,Road-28, Block-D, Mirpur-10",
  address2: "Mirpur Model",
  city: "Dhaka",
  division: "Dhaka",
  district: "Dhaka",
  thana: "Mirpur",
  postalCode: "1216",
  phone: "01923738672",
  email: "sujon@example.com",
  residencyType: "Home",
  isDefault: true,
};

// Mock API functions
export async function getShippingAddresses(): Promise<ShippingAddress[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate API response
  return [mockAddress];
}

export async function getDefaultShippingAddress(): Promise<ShippingAddress> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate API response
  return mockAddress;
}

export async function addShippingAddress(address: Omit<ShippingAddress, "id">): Promise<ShippingAddress> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate API response
  return {
    ...address,
    id: Math.random().toString(36).substring(2, 9),
  };
}

export async function updateShippingAddress(address: ShippingAddress): Promise<ShippingAddress> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate API response
  return address;
}

export async function deleteShippingAddress(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate API response
  return;
}

export async function setDefaultShippingAddress(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate API response
  return;
}
