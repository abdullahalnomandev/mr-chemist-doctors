"use client";

import type React from "react";

import { FaqSection } from "@/components/home/faq-section";
import { TestimonialsSection } from "@/components/home/testimonials";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HomePageData } from "@/lib/api/home";
import { QK } from "@/lib/query-keys";
import { serverApiRequest } from "@/lib/utils-server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }),
});

interface ContactPageProps {
  homePageData: HomePageData;
}

export default function ContactPage({ homePageData }: ContactPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutateAsync: uploadFile } = useMutation({
    mutationFn: async (file: File) => {
      const buffer = Array.from(new Uint8Array(await file.arrayBuffer()));
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buffer, filename: file.name }),
      });
      if (!res.ok) throw new Error("Upload failed");
      return (await res.json()).url;
    },
  });

  const { mutate: updateContact, isPending: isUpdating } = useMutation({
    mutationKey: [QK.CONTACT + "_CREATE"],
    mutationFn: (data: any) =>
      serverApiRequest("POST", `/contacts`, {
        data,
      }),
    onSuccess: () => {
      toast.success("Message successfully sent");
      queryClient.invalidateQueries({ queryKey: [QK.CONTACT + "_LIST"] });
      form.reset();
      setSelectedFile(null);
    },
    onError: (error) => {
      toast.error(String(error) || "Message failed to send!");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let attachmentUrl: string | undefined = undefined;

      if (selectedFile) {
        const url = await uploadFile(selectedFile);
        attachmentUrl = url;
      }

      const payload = {
        ...values,
        attachment: attachmentUrl,
      };

      updateContact(payload);
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-secondary px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 py-8">
        <div className="mx-auto grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded-lg p-8">
              <h1 className="mb-8 text-3xl font-bold text-gray-900">Get in Touch</h1>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="First name"
                              className="placeholder:text-secondary0 h-12 border-none bg-white text-gray-700 shadow-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Last name"
                              className="placeholder:text-secondary0 h-12 border-none bg-white text-gray-700 shadow-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email address"
                            className="placeholder:text-secondary0 h-12 border-none bg-white text-gray-700 shadow-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Subject"
                            className="placeholder:text-secondary0 h-12 border-none bg-white text-gray-700 shadow-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here"
                            rows={6}
                            className="placeholder:text-secondary0 resize-none border-none bg-white text-gray-700 shadow-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input type="file" id="file-upload" className="sr-only" onChange={handleFileChange} />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex cursor-pointer items-center rounded-full bg-blue-100 px-6 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200"
                      >
                        Upload Attachment
                      </label>
                    </div>
                    <span className="text-sm text-black">{selectedFile ? selectedFile.name : "No file selected"}</span>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-primary h-12 w-full rounded-full py-3 text-base font-medium text-white hover:bg-blue-700"
                    >
                      {isUpdating ? "Sending..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary rounded-lg p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <Phone className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900">Phone Number</h3>
              <Link href="tel:01506901275" className="text-primary text-sm hover:underline">
                01506 901275
              </Link>
            </div>

            <div className="bg-secondary rounded-lg p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <Mail className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900">Email Address</h3>
              <Link href="mailto:Help@Cloudpharmacy.Co.Uk" className="text-primary text-sm hover:underline">
                Help@Cloudpharmacy.Co.Uk
              </Link>
            </div>

            <div className="bg-secondary rounded-lg p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <MapPin className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900">Our Location</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                3 Houston Business Park,
                <br />
                Livingston, West Lothian, UK
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="overflow-hidden rounded-lg bg-gray-200" style={{ height: "400px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2234.5678901234567!2d-3.5234567890123456!3d55.88123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDUyJzUyLjQiTiAzwrAzMScyNC40Ilc!5e0!3m2!1sen!2suk!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location Map"
            />
          </div>
        </div>

        <TestimonialsSection
          title={homePageData?.testimonials?.title ?? ""}
          totalReviews={homePageData?.testimonials?.totalReviews ?? 0}
          platform={homePageData?.testimonials?.platform ?? ""}
          testimonials={homePageData?.testimonials?.testimonials ?? []}
        />

        <FaqSection
          title={homePageData?.faqs?.title ?? ""}
          description={homePageData?.faqs?.subtitle ?? ""}
          faqs={homePageData?.faqs?.faqs ?? []}
        />
      </div>
    </div>
  );
}
