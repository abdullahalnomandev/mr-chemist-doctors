import mrChemistLogo from "@/components/assets/images/mr-chemist-logo.png";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import Image from "next/image";

import { getTreatments } from "@/lib/api/api-server";
import Link from "next/link";
import americanExpressLogo from "../assets/images/american-express.png";
import icoLogo from "../assets/images/ico.png";
import mastercardLogo from "../assets/images/master-card.png";
import npaLogo from "../assets/images/npa.png";
import paypalLogo from "../assets/images/paypal.png";
import registeredPharmacyLogo from "../assets/images/registered-pharmacy.png";
import visaLogo from "../assets/images/visa.png";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const treatments = await getTreatments();

  // Filter active treatments
  const activeTreatments = treatments?.filter((t) => t.isActive) ?? [];

  return (
    <footer className="bg-secondary px-4 py-8 sm:px-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Image
                src={mrChemistLogo}
                alt="Mr Chemist Logo"
                width={200}
                height={70}
                priority
                className="h-14 w-auto object-contain"
              />
            </div>

            <p className="text-md text-black">
              Our patient experience team is available Monday to Friday 9am-5pm. If you require urgent assistance, do
              not use this service. Call 111, or in an emergency call 999.
            </p>

            <div className="flex space-x-3">
              <Button variant="pill" leftIcon={<Phone size={16} />} className="bg-primary">
                Call Us
              </Button>
              <Button variant="pill" leftIcon={<Mail size={16} />} className="bg-primary">
                Email Us
              </Button>
            </div>
            <div className="space-y-2">
              <p>More ways to contact us</p>
              <div className="flex space-x-3">
                <Link href="#" className="bg-primary rounded-full p-2 text-white">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="bg-primary rounded-full p-2 text-white">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="bg-primary rounded-full p-2 text-white">
                  <Twitter size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Treatments */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Popular Treatments</h3>
            <ul className="space-y-2">
              {activeTreatments.slice(0, 10).map((treatment) => (
                <li key={treatment._id}>
                  <Link href={`/treatments/${treatment.slug}`} className="hover:text-primary text-black">
                    {treatment.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/health-advice" className="hover:text-primary text-black">
                  Health Advice
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary text-black">
                  Faq
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & More */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Policies & More</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary text-black">
                  Returns & Refunds Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary text-black">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary text-black">
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Copyright and Payment Methods */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="mb-4 text-sm text-black md:mb-0">
            Copyright © {currentYear} - Mr Chemist. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Image src={npaLogo} alt="NPA" width={60} height={40} className="object-contain" />
            <Image src={icoLogo} alt="ICO" width={60} height={40} className="object-contain" />
            <Image
              src={registeredPharmacyLogo}
              alt="Registered Pharmacy"
              width={60}
              height={40}
              className="object-contain"
            />
            <Image src={visaLogo} alt="Visa" width={60} height={40} className="object-contain" />
            <Image src={mastercardLogo} alt="MasterCard" width={60} height={40} className="object-contain" />
            <Image src={americanExpressLogo} alt="American Express" width={60} height={40} className="object-contain" />
            <Image src={paypalLogo} alt="PayPal" width={60} height={40} className="object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
