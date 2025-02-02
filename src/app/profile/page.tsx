import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/projects/Products";
import { TechStack } from "@/components/TechStack";
import { getProfile } from "@/sanity/lib/query";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
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
    <>
      <div className="w-full flex flex-col justify-center items-center py-5">
        {/* Profile Image */}
        <div className="relative  flex items-center justify-center lg:w-80 w-32  lg:h-80 h-32 overflow-hidden rounded-full bg-gray-800  border-8 border-blue-50 ">
          {profileImage?.image ? (
            <Image
              src={profileImage.image}
              alt={profileImage?.alt || "Profile Image"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-4xl text-gray-200">👤</span>
          )}
        </div>
        <div className=" py-4 items-center justify-center space-y-1">
          <span className="text-3xl pr-3 text-yellow-500">👋 </span>
          <Heading className="font-black">
            Hi ! &nbsp; I&apos;m Israfil Hossain.
          </Heading>
          <Heading className="font-black" as= "h3">
            Software Engineer Based on Bangladesh.{" "}
          </Heading>
          <div className="py-2">
          <Paragraph className="text-sm text-gray-200 mt-1 text-10">
             ✉️  {" Israfil166091@gmail.com"}
            </Paragraph>
            {location && (
              <Paragraph className="text-sm text-gray-500 mt-1">
                📍 {location}
              </Paragraph>
            )}
            <Paragraph className="text-sm text-gray-500 mt-1">
              📞 +880-1843566251
            </Paragraph>
            
           
          </div>
            {/* Social Links */}
        <div className="flex space-x-4 mt-4">
          {socialLinks?.github && (
            <Link href={socialLinks.github} target="_blank">
              <IconBrandGithub
                size={24}
                className="text-gray-700 hover:text-black"
              />
            </Link>
          )}
          {socialLinks?.twitter && (
            <Link href={socialLinks.twitter} target="_blank">
              <IconBrandTwitter
                size={24}
                className="text-blue-500 hover:text-blue-700"
              />
            </Link>
          )}
          {socialLinks?.linkedin && (
            <Link href={socialLinks.linkedin} target="_blank">
              <IconBrandLinkedin
                size={24}
                className="text-blue-600 hover:text-blue-800"
              />
            </Link>
          )}
        </div>
        </div>
      </div>
      <Container>
      
        {/* Skills Section */}
        <Heading as="h2" className="font-black text-lg ">
          Skills
        </Heading>
        <div className="flex flex-wrap gap-2 mt-3">
          {skills?.map((skill: any, index: number) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-lg text-sm"
            >
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
    </>
  );
}
