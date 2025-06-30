import { Check } from "lucide-react";
import Image from "next/image";
import shape from "../assets/images/Shape.png";

export function TopHeader() {
  return (
    <div className="flex w-full items-center justify-between border-b bg-white px-4 py-2 text-sm sm:px-16">
      <div className="container mx-auto flex max-w-6xl items-center justify-between">
        {/* Left section */}
        <div className="flex items-center">
          <Check className="mr-2 h-5 w-5 text-emerald-500" />
          <span>100% Discretion & Confidentiality</span>
        </div>

        <div className="flex items-center">
          <Check className="mr-2 h-5 w-5 text-emerald-500" />
          <span>Regulated UK Pharmacy: 9012073</span>
        </div>

        {/* Trustpilot section */}
        <div className="inline-flex items-center gap-3 px-3 py-1.5">
          {/* Trustpilot Logo Section (NO background) */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center">
              <Image src={shape} alt="Trustpilot Star" width={18} height={18} />
            </div>
            <span className="text-sm font-medium text-black">Trustpilot</span>
          </div>

          {/* 5-Star Rating Section (WITH green background) */}
          <div className="flex items-center gap-[2px] rounded bg-[#00B67A] px-2 py-1">
            {[...Array(5)].map((_, index) => (
              <Image
                key={index}
                src={shape}
                alt={`Star ${index + 1}`}
                width={18}
                height={18}
                className="block brightness-0 invert filter"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
