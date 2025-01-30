import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { getProfile } from "@/sanity/lib/query";
import Image from "next/image";
import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
export default async function Profile() {
  const profile = await getProfile();
  console.log("Profile : ", profile); 

  const {
    fullName,
    profileImage,
    shortBio,
    email,
    socialLinks,
    skills,
    headline,
    location,
  } = profile[0] || {};

  return (
    <Container>
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="relative w-32 h-32 overflow-hidden rounded-full bg-gray-200">
          {profileImage?.image ? (
            <Image
              src={profileImage.image }
              alt={profileImage?.alt || "Profile Image"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-4xl text-gray-500">👤</span>
          )}
        </div>

        {/* Headline */}
        <Heading className="mt-4 font-black">{headline}</Heading>
        <Paragraph className="text-gray-600">{shortBio}</Paragraph>

        {/* Location */}
        {location && (
          <Paragraph className="text-sm text-gray-500 mt-1">
            📍 {location}
          </Paragraph>
        )}

        {/* Social Links */}
        <div className="flex space-x-4 mt-4">
          {socialLinks?.github && (
            <Link href={socialLinks.github} target="_blank">
              <IconBrandGithub size={24} className="text-gray-700 hover:text-black" />
            </Link>
          )}
          {socialLinks?.twitter && (
            <Link href={socialLinks.twitter} target="_blank">
              <IconBrandTwitter size={24} className="text-blue-500 hover:text-blue-700" />
            </Link>
          )}
          {socialLinks?.linkedin && (
            <Link href={socialLinks.linkedin} target="_blank">
              <IconBrandLinkedin size={24} className="text-blue-600 hover:text-blue-800" />
            </Link>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <Heading as="h2" className="mt-10 font-black text-lg">
        Skills
      </Heading>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills?.map((skill:any, index:number) => (
          <span key={index} className="px-3 py-1 bg-gray-200 rounded-lg text-sm">
            {skill}
          </span>
        ))}
      </div>

      {/* What I've been working on */}
      <Heading as="h2" className="font-black text-lg mt-20 mb-4">
        What I&apos;ve been working on
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
