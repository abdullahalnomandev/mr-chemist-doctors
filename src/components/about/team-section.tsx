import { Facebook, Twitter } from "lucide-react"; // Assuming you have lucide-react installed
import Image from "next/image";
import React from "react";
import { SectionDescription, SectionTitle } from "../home/shared";

interface TeamMember {
  name: string;
  title: string;
  avatarSrc: string;
  facebookLink?: string;
  twitterLink?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "George Dean",
    title: "Doctor",
    avatarSrc: "https://picsum.photos/id/1027/200/200", // Dummy image
    facebookLink: "#",
    twitterLink: "#",
  },
  {
    name: "Breanna Butler",
    title: "Doctor",
    avatarSrc: "https://picsum.photos/id/1011/200/200", // Dummy image
    facebookLink: "#",
    twitterLink: "#",
  },
  {
    name: "Deanna Turner",
    title: "Doctor",
    avatarSrc: "https://picsum.photos/id/1012/200/200", // Dummy image
    facebookLink: "#",
    twitterLink: "#",
  },
  {
    name: "Michele Carter",
    title: "Doctor",
    avatarSrc: "https://picsum.photos/id/1025/200/200", // Dummy image
    facebookLink: "#",
    twitterLink: "#",
  },
  {
    name: "Scott Mcdaniel",
    title: "Doctor",
    avatarSrc: "https://picsum.photos/id/1005/200/200", // Dummy image
    facebookLink: "#",
    twitterLink: "#",
  },
  {
    name: "Lisa Tran",
    title: "Doctor",
    avatarSrc: "https://picsum.photos/id/1006/200/200", // Dummy image
    facebookLink: "#",
    twitterLink: "#",
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mb-12 text-center">
          <SectionTitle title="Meet our team" />
          <SectionDescription description="Meet our diverse team of talented professionals, and relentless pursuit of success." />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-secondary flex flex-col items-center rounded-lg p-6">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                <Image src={member.avatarSrc} alt={member.name} layout="fill" objectFit="cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.title}</p>
              <div className="mt-4 flex space-x-4">
                {member.facebookLink && (
                  <a href={member.facebookLink} className="text-gray-600 hover:text-blue-600">
                    <Facebook size={20} />
                  </a>
                )}
                {member.twitterLink && (
                  <a href={member.twitterLink} className="text-gray-600 hover:text-blue-400">
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
