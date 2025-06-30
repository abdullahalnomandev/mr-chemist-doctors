import Image from "next/image";
import React from "react";
import { SectionTitle } from "../home/shared";

export const OurServiceSection: React.FC = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-lg lg:h-96">
            <Image
              src="/images/service-image.png" // Replace with the actual path to your image
              alt="Our Service"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Content */}
          <div>
            <SectionTitle title="Our Service" />
            <div className="space-y-4 text-gray-700">
              <p>
                Cloud Pharmacy trades on its reputation for providing a high level of customer service at a reasonable
                price. It is not our aim to be the cheapest supplier of medications online, however it is our aim to be
                the safest - there are plenty of unscrupulous purveyors of counterfeit products of dubious quality. It
                is our aim to be the best clinic in our area of the marketplace.
              </p>
              <p>
                At the same time, we want patients to feel that they are getting a good deal, so if you see your
                medication cheaper through another website that is appropriately licensed (Health Improvement Scotland,
                General Pharmaceutical Council and the Care and Quality Commission) then we will beat their price so
                long as the service that they are providing is comparable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
