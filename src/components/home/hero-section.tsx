import { Button } from "@/components/ui/button";
import { Clock, FileText, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../assets/images/hero-image.png";

export function HeroSection() {
  return (
    <section className="bg-secondary px-4 sm:px-16">
      <div className="container mx-auto max-w-6xl items-center justify-between space-y-4 py-4 md:flex">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-medium text-black">Mr Chemist</h1>
            <p className="text-lg text-black">UK Online Pharmacy</p>
          </div>

          <p className="max-w-md text-black">
            Our online pharmacy provides the right medical treatment when you need them, with confidential prescription
            treatments from our licensed pharmacists based in the UK.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="text-primary mt-1 mr-3 flex h-6 w-6 items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <p className="text-black">UK registered pharmacy</p>
            </div>

            <div className="flex items-start">
              <div className="text-primary mt-1 mr-3 flex h-6 w-6 items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <p className="text-black">Progress tracking using an in-depth journal</p>
            </div>

            <div className="flex items-start">
              <div className="text-primary mt-1 mr-3 flex h-6 w-6 items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              <p className="text-black">Medication support and dosage management</p>
            </div>

            <Link href="/treatments">
              <Button variant="pill" size="lg" className="rounded-full">
                View Treatment
              </Button>
            </Link>
          </div>
        </div>

        <div className="h-[400px] max-w-[500px]">
          <Image
            src={heroImage}
            alt="Happy couple with medication"
            className="h-full w-full rounded-4xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
