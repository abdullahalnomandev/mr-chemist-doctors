export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string | null;
  dateOfBirth: string | null;
  relationStatus: string | null;
  numberOfFamilyMembers: number | null;
  numberOfKids: number | null;
  preferredBrand: string | null;
  preferredStore: string | null;
  anniversary: string | null;
}

// Mock data
const mockUserProfile: UserProfile = {
  id: "user1",
  firstName: "Sujon",
  lastName: "Hossain",
  email: "sujonhossain@gmail.com",
  phone: "01748080273",
  gender: "N/A",
  dateOfBirth: "2000-02-27",
  relationStatus: "N/A",
  numberOfFamilyMembers: null,
  numberOfKids: 4,
  preferredBrand: "N/A",
  preferredStore: "N/A",
  anniversary: "N/A",
};

// Mock API functions
export async function getUserProfile(): Promise<UserProfile> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate API response
  return mockUserProfile;
}

export async function updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate API response
  return {
    ...mockUserProfile,
    ...profile,
  };
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Validate current password (in a real app, this would be done server-side)
  if (currentPassword !== "password123") {
    throw new Error("Current password is incorrect");
  }

  // Simulate API response
  return;
}
