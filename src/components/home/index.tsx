"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { TechStack } from "@/components/TechStack";

import Link from "next/link";

import { useProfileData } from "@/services/profile";
import Loader from "../ui/loader";
import { useProjectData } from "@/services/project-data";
import { Products } from "../projects/Products";
import ErrorComponent from "../ui/error";
import { Contact } from "../Contact";
import { useState } from "react";
import Image from "next/image";

export default function HomeComponent() {
  const { data: profileData, isLoading, error } = useProfileData();
  const {
    data: projectData,
    isLoading: projectLoading,
    error: projectError,
  } = useProjectData();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  if (isLoading || projectLoading) {
    return <Loader />;
  }

  if (error || projectError) {
    return <ErrorComponent />;
  }

  return (
    <Container>
      <div className="flex lg:flex-row flex-col space-x-5 justify-center items-center">
        <div className="relative  flex items-start justify-center lg:w-[280px] w-[180px]  lg:h-[270px] h-[180px] overflow-hidden rounded-full bg-gray-800  border-8 border-blue-50 mb-10">
          {profileData?.profileImage?.image ? (
            <Image
              src={profileData?.profileImage.image}
              alt={profileData?.profileImage?.alt || "Profile Image"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-4xl text-gray-200">👤</span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-2 items-center ">
            <span className="text-4xl">👋</span>
            <Link
              href="/contact"
              className="bg-green-800 px-6 text-center no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-xl p-px text-xs font-semibold leading-6 text-white inline-block"
            >
              {/* Ping animation element */}
              <span className="absolute -top-2 -right-3 w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-800 opacity-75"></span>
                <span className="relative inline-flex rounded-full w-3 h-3 bg-green-500"></span>
              </span>
              Open to Work
            </Link>
          </div>

          <Heading className="font-black">
            Hello there! I&apos;m {profileData?.fullName || "Israfil Hossain"}
          </Heading>
          <Paragraph className="max-w-xl mt-4">
            I&apos;m a software engineer with{" "}
            <Highlight className="bg-yellow-100">
              {" "}
              3.5+ years of experience
            </Highlight>{" "}
            building scalable web apps that are performance optimized and good
            looking.
          </Paragraph>
          <Paragraph className="max-w-xl mt-4">
            {profileData?.fullBio ? (
              profileData?.fullBio
            ) : (
              <>
                {" "}
                I&apos;m a full-stack developer that loves{" "}
                <Highlight className="bg-orange-100">
                  building products
                </Highlight>{" "}
                and web apps that can impact millions of lives{" "}
              </>
            )}
          </Paragraph>
          <div className="flex lg:flex-row flex-col lg:space-x-4 space-x-0 space-y-2 pt-4">
            <Paragraph className="text-[10px] text-gray-900 mt-1  flex">
              ✉️ Israfil166091@gmail.com
            </Paragraph>

            <Paragraph className="text-[10px] text-gray-900 mt-1">
              📞 +880-1843566251
            </Paragraph>
          </div>
          <div
            onClick={() => setIsButtonClicked(!isButtonClicked)}
            className="bg-slate-900 w-28  text-center no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-xl p-px text-xs font-semibold leading-6 text-white inline-block mt-5 mb-5"
          >
            Hire me
          </div>
          {isButtonClicked && (
            <div>
              <Contact type={true} />
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <Heading as="h2" className="font-black text-lg mt-5">
        Skills
      </Heading>
      <div className="flex flex-wrap gap-2 mt-3">
        {profileData?.skills?.map((skill: any, index: number) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-lg text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* What I've been working on */}
      <Heading as="h2" className="font-black text-lg mt-10 mb-4">
        What I&apos;ve been working on
      </Heading>
      <Products products={projectData} />

      <TechStack />
    </Container>
  );
}
