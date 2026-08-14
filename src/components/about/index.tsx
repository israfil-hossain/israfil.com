"use client";
import { Paragraph } from "@/components/Paragraph";
import { TimelineDemo } from "../time-line";
import { Highlight } from "../Highlight";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portable-text";
import Image from "next/image";
import SocialLinks from "@/components/social-links/SocialLinks";

interface AboutProps {
  profileData?: any;
}

export default function About({ profileData }: AboutProps) {
  const fullName = profileData?.fullName || "Israfil Hossain";
  const headline = profileData?.headline || "Full-Stack Software Engineer & Writer";
  const fullBio = profileData?.fullBio;
  const shortBio = profileData?.shortBio;
  const profileImage = profileData?.profileImage?.image;
  const email = profileData?.email;
  const location = profileData?.location;
  const phone = profileData?.phone;
  const socialLinks = profileData?.socialLinks;

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mt-5">
      {/* Left: Bio + Timeline */}
      <div className="flex-1 order-2 lg:order-1">
        <h2 className="text-lg md:text-3xl lg:text-4xl mb-4 text-black max-w-4xl">
          {`🔰 Hi, I'm ${fullName} — a passionate developer, creative writer, and design enthusiast.`}
        </h2>

        {fullBio && Array.isArray(fullBio) && fullBio.length > 0 ? (
          <div className="max-w-4xl">
            <PortableText value={fullBio} components={portableTextComponents} />
          </div>
        ) : (
          <>
            <Paragraph>
              🔰 <Highlight className="bg-yellow-100">Software Engineer with 4+ years</Highlight> of experience in developing scalable
              web applications in dynamic and collaborative Agile environments.
              <Highlight className="bg-blue-100">Expertise</Highlight>: JavaScript, React, Next.js, React Native, and state
              management tools including Zustand, Redux Toolkit, and Context API.
            </Paragraph>
            <Paragraph className="mt-4">
              {shortBio || "I'm a full-stack developer who loves building products and web apps that can impact millions of lives."}
            </Paragraph>
          </>
        )}

        <TimelineDemo />

        <div className="max-w-4xl">
          <Paragraph className="mt-4">
            {`🔰 Since the early days of my journey, I've been captivated by the art of crafting exceptional digital experiences. As a developer, I thrive on turning lines of code into functional and elegant solutions. My goal is to not just create software, but to build digital marvels that seamlessly merge form and function.`}
          </Paragraph>
          <Paragraph className="mt-4">
            {`🔰 But my journey doesn't stop at coding. With a heart full of words and a mind brimming with ideas, I've ventured into the realm of writing. From tech articles that unravel complex concepts to creative tales that ignite the imagination, I weave words to inform, entertain, and inspire.`}
          </Paragraph>
          <Paragraph className="mt-4">
            {`🔰 What sets me apart is my unwavering appreciation for design. I believe that aesthetics and usability go hand in hand. My eye for awesome design ensures that every project I undertake not only works flawlessly under the hood but also looks stunning on the surface.`}
          </Paragraph>
          <Paragraph className="mt-4">
            {`🔰 Beyond the screen, I love traveling and exploring new cultures — it fuels my creativity and brings fresh perspectives to my work. I also enjoy learning about new technologies and experimenting with ideas to build SaaS applications.`}
          </Paragraph>
          <Paragraph className="mt-4">
            {`🔰 Through this website, I aim to share my insights, experiences, and creations with you. Whether you're a fellow developer seeking solutions, a fellow writer in search of inspiration, or simply someone who appreciates the finer aspects of design, there's something here for you.`}
          </Paragraph>
          <Paragraph className="mt-4">
            {`🔰 Join me on this journey of bytes and narratives, logic and creativity, code and prose. Together, we can explore the boundless possibilities of technology and storytelling, all while reveling in the sheer beauty of thoughtful design.`}
          </Paragraph>
          <Paragraph className="mt-4">
            {`🔰 Thank you for being here, and I can't wait to embark on this adventure with you.`}
          </Paragraph>
        </div>
      </div>

      {/* Right: Profile Card (reversed) */}
      <div className="w-full lg:w-[320px] flex-shrink-0 order-1 lg:order-2">
        <div className="lg:sticky lg:top-24">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {/* Profile Image */}
            <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-100 mb-5">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={profileData?.profileImage?.alt || fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl text-gray-300">👤</span>
                </div>
              )}
            </div>

            {/* Name & Headline */}
            <h3 className="text-xl font-bold text-gray-900">{fullName}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">{headline}</p>

            {/* Info Items */}
            <div className="space-y-3 mb-5">
              {email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>✉️</span>
                  <span>{email}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{location}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📞</span>
                  <span>{phone}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <SocialLinks socialLinks={socialLinks} className="flex flex-wrap gap-2" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
