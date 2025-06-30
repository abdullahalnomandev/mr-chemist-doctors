"use client";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QK } from "@/lib/query-keys";
import { serverApiRequest } from "@/lib/utils-server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function HelpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const breadcrumbItems = [{ label: "Help & Questions", href: "/account/help" }];

  const { mutate: submitHelpForm } = useMutation({
    mutationKey: [QK.CONTACT + "_CREATE"],
    mutationFn: (data: any) =>
      serverApiRequest("POST", `/contacts`, {
        data,
      }),
    onSuccess: () => {
      toast.success("Message sent", {
        description: "We've received your message and will get back to you soon.",
      });
      queryClient.invalidateQueries({ queryKey: [QK.CONTACT + "_LIST"] });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error("Failed to send message", {
        description: String(error),
      });
      setIsSubmitting(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, subject, message } = formData;

    const payload = {
      firstName: name.split(" ")[0] ?? "",
      lastName: name.split(" ").slice(1).join(" ") || "-",
      email,
      subject,
      message,
    };

    submitHelpForm(payload);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="rounded-lg bg-white p-4 shadow-xs">
        <h1 className="mb-6 text-xl font-medium">Need Help?</h1>
        <p className="mb-6 text-gray-600">
          If you have any questions or need assistance, please fill out the form below and our team will get back to you
          as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is your question about?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe your question or issue in detail"
              rows={6}
              required
            />
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </>
  );
}
