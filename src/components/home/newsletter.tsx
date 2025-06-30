"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SectionDescription, SectionTitle } from "./shared";

interface NewsletterSectionProps {
  title: string;
  description: string;
  buttonText: string;
}

export function NewsletterSection({ title, description, buttonText }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    setEmail("");
    // Show success message or handle errors
    alert("Subscribed!");
  };

  return (
    <section className="container mx-auto max-w-6xl px-4">
      {/* Background circles */}
      <div className="bg-primary relative overflow-hidden rounded-4xl px-4 py-12">
        <div className="bg-opacity-10 absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-10"></div>
        <div className="bg-opacity-10 absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-white opacity-10"></div>

        <div className="relative z-10 container mx-auto text-center">
          <div className="mb-12 text-center">
            <SectionTitle className="tracking-wider text-white" title={title} />
            <SectionDescription className="max-w-xs text-sm text-white/60" description={description} />
          </div>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              placeholder="Email Address"
              className="rounded-full border-none bg-black/50 py-6 text-white placeholder:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="pill" className="text-primary rounded-full bg-white py-6 hover:bg-white/90">
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
