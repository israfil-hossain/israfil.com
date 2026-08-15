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
  experiences?: any[];
}

export default function About({ profileData, experiences }: AboutProps) {
  const fullName = profileData?.fullName || "Israfil Hossain";
  const headline =
    profileData?.headline || "Full-Stack Software Engineer & Writer";
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
              🔰{" "}
              <Highlight className="bg-yellow-100">
                Software Engineer with 4+ years
              </Highlight>{" "}
              of experience in developing scalable web applications in dynamic
              and collaborative Agile environments.
              <Highlight className="bg-blue-100">Expertise</Highlight>:
              JavaScript, React, Next.js, React Native, and state management
              tools including Zustand, Redux Toolkit, and Context API.
            </Paragraph>
            <Paragraph className="mt-4">
              {shortBio ||
                "I'm a full-stack developer who loves building products and web apps that can impact millions of lives."}
            </Paragraph>
          </>
        )}

        <TimelineDemo experiences={experiences} />

        <div className="max-w-4xl">
          <Paragraph className="mt-4">
            {`🔰 I'm a Frontend Engineer with 4+ years of experience building high-performance, scalable, and user-focused web applications. My primary expertise lies in React, Next.js, TypeScript, and modern frontend architecture, where I focus on transforming complex requirements into clean, intuitive, and maintainable digital experiences.`}
          </Paragraph>

          <Paragraph className="mt-4">
            {`🔰 Throughout my career, I've worked on products across SaaS, fintech, logistics, real estate, geospatial platforms, and other business-critical applications. I've had the opportunity to work with complex dashboards, data-heavy interfaces, real-time features, REST and GraphQL APIs, authentication systems, and multi-tenant SaaS architectures.`}
          </Paragraph>

          <Paragraph className="mt-4">
            {`🔰 I believe great frontend development is more than writing components. It is about understanding the product, designing scalable architecture, optimizing performance, and creating experiences that users genuinely enjoy. I pay close attention to accessibility, responsiveness, performance, component reusability, and clean code.`}
          </Paragraph>

          <Paragraph className="mt-4">
            {`🔰 Alongside frontend engineering, I have hands-on experience with Node.js, Express, NestJS, MongoDB, PostgreSQL, Prisma, Docker, and cloud deployment. This full-stack perspective allows me to understand the complete product lifecycle — from designing frontend architecture and APIs to database modeling, authentication, deployment, and scaling.`}
          </Paragraph>

          <Paragraph className="mt-4">
            {`🔰 I'm also passionate about building SaaS products and turning ideas into real-world products. I've worked on and built products involving project management, CRM, HRM, finance, AI-powered workflows, real estate, e-commerce, and other business solutions. I enjoy solving complex engineering problems and finding simple, scalable solutions.`}
          </Paragraph>

          <Paragraph className="mt-4">
            {`🔰 I'm continuously exploring new technologies, AI-powered development workflows, system design, performance optimization, and modern software architecture. I enjoy experimenting with new ideas, learning from real-world problems, and building products that can scale beyond the initial implementation.`}
          </Paragraph>

          <Paragraph className="mt-4">
            {`🔰 This website is a collection of my work, experiments, experiences, and ideas. Here, I share the things I've learned while building products, solving engineering challenges, and exploring the ever-evolving world of software development.`}
          </Paragraph>

          <Paragraph className="mt-4">
            {`🔰 I'm always excited to collaborate with ambitious teams, founders, and developers to build meaningful products — from an initial idea to a polished, scalable application.`}
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
                <SocialLinks
                  socialLinks={socialLinks}
                  className="flex flex-wrap gap-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
