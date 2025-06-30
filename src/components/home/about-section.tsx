import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "./shared";

interface AboutSectionProps {
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
}

export function AboutSection({ title, content, buttonText, buttonLink, imageSrc }: AboutSectionProps) {
  return (
    <section className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <SectionTitle title={title} />
          <div className="text-md space-y-4" dangerouslySetInnerHTML={{ __html: content }} />
          <Button variant="pill" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
