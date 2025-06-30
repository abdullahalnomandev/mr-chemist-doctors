"use client";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QK } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import { serverApiRequest } from "@/lib/utils-server";
import PersonalProfileSkeleton from "@/skeletons/account/personal-information";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Loader2, PenLine, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define types based on the provided data structure
type TGender = "male" | "female" | "other";
type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type TCustomer = {
  id: string;
  designation?: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender?: TGender;
  dateOfBirth?: Date;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup?: TBloodGroup;
  presentAddress?: string;
  permanentAddress?: string;
  profileImg?: string;
};

// Define the profile schema with Zod
const profileSchema = z.object({
  designation: z.string().optional(),
  name: z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last name is required" }),
  }),
  gender: z.enum(["male", "female", "other"]).optional(),
  dateOfBirth: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export default function PersonalInformationPage() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  // Fetch user profile data
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QK.USER],
    queryFn: () => serverApiRequest("GET", "/users/me"),
    select: (data) => data.data,
  });

  // Update user profile mutation
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: [QK.USER + "_EDIT"],
    mutationFn: (updatedData: ProfileFormData) =>
      serverApiRequest("PATCH", `/customers/${profile._id}`, {
        data: { customer: updatedData },
      }),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: [QK.USER] });
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(String(error) || "Profile update failed!");
    },
  });

  // Initialize form with react-hook-form
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      designation: profile?.designation || "",
      name: {
        firstName: profile?.name?.firstName || "",
        middleName: profile?.name?.middleName || "",
        lastName: profile?.name?.lastName || "",
      },
      gender: profile?.gender,
      dateOfBirth: profile?.dateOfBirth ? format(new Date(profile.dateOfBirth), "yyyy-MM-dd") : undefined,
      contactNo: profile?.contactNo || "",
      emergencyContactNo: profile?.emergencyContactNo || "",
      bloodGroup: profile?.bloodGroup,
      presentAddress: profile?.presentAddress || "",
      permanentAddress: profile?.permanentAddress || "",
    },
  });

  // Set form values when profile data is loaded
  useEffect(() => {
    if (profile) {
      form.reset({
        designation: profile.designation || "",
        name: {
          firstName: profile.name.firstName,
          middleName: profile.name.middleName || "",
          lastName: profile.name.lastName,
        },
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth ? format(new Date(profile.dateOfBirth), "yyyy-MM-dd") : undefined,
        contactNo: profile.contactNo || "",
        emergencyContactNo: profile.emergencyContactNo || "",
        bloodGroup: profile.bloodGroup,
        presentAddress: profile.presentAddress || "",
        permanentAddress: profile.permanentAddress || "",
      });
    }
  }, [profile, form]);

  const breadcrumbItems = [{ label: "Personal Information", href: "/account/personal-information" }];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
  };

  if (isLoading) {
    return <PersonalProfileSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-red-500">Error loading profile data. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="rounded-lg bg-white p-4 shadow-xs">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-medium">Personal Information</h1>
          {!isEditing ? (
            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600" onClick={handleEdit}>
              <PenLine className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">ID</h3>
              <p className="text-gray-900">{profile.id}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Designation</h3>
              <p className="text-gray-900">{profile.designation || "N/A"}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">First Name</h3>
              <p className="text-gray-900">{profile.name.firstName}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Middle Name</h3>
              <p className="text-gray-900">{profile.name.middleName || "N/A"}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Last Name</h3>
              <p className="text-gray-900">{profile.name.lastName}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Gender</h3>
              <p className="text-gray-900">{profile.gender || "N/A"}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Date of Birth</h3>
              <p className="text-gray-900">
                {profile.dateOfBirth ? format(new Date(profile.dateOfBirth), "PPP") : "N/A"}
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Contact Number</h3>
              <p className="text-gray-900">{profile.contactNo || "N/A"}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Emergency Contact</h3>
              <p className="text-gray-900">{profile.emergencyContactNo || "N/A"}</p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Blood Group</h3>
              <p className="text-gray-900">{profile.bloodGroup || "N/A"}</p>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h3 className="mb-1 text-sm font-medium text-gray-500">Present Address</h3>
              <p className="text-gray-900">{profile.presentAddress || "N/A"}</p>
            </div>

            <div className="col-span-1 md:col-span-2">
              <h3 className="mb-1 text-sm font-medium text-gray-500">Permanent Address</h3>
              <p className="text-gray-900">{profile.permanentAddress || "N/A"}</p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">ID</h3>
                  <p className="text-gray-900">{profile.id}</p>
                </div>

                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input placeholder="Designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name.middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Middle Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name.lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyContactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Emergency Contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Group</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="presentAddress"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Present Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Present Address" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="permanentAddress"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Permanent Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Permanent Address" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
