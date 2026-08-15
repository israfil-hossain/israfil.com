"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { SkillTabs } from "@/components/SkillTabs";

import Link from "next/link";

import { Products } from "../projects/Products";
import { Contact } from "../Contact";
import { useState } from "react";
import Image from "next/image";
import { WorkingProducts } from "../projects/ProductsWorking";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../portable-text";
import { FeaturedProducts } from "../projects/FeaturedProducts";

interface HomeComponentProps {
  profileData?: any;
  projectData?: any[];
  skillCategories?: any[];
  skills?: any[];
}

export default function HomeComponent({ profileData: serverProfileData, projectData: serverProjectData, skillCategories = [], skills = [] }: HomeComponentProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const profile = serverProfileData;
  const projects = serverProjectData || [];

  const featuredProjects = projects.filter((project: any) => project.isFeatured === true);
  const runningProjects = projects.filter((project: any) => project.isRunning === true && project._type === "project");
  const portfolioProjects = projects.filter((project: any) => project.isRunning !== true && project._type === "project");

  return (
    <Container>
      <div className="flex lg:flex-row flex-col space-x-5 justify-center items-center">
        <div className="relative  flex items-start justify-center lg:w-[280px] w-[180px]  lg:h-[270px] h-[180px] overflow-hidden rounded-full bg-gray-800  border-8 border-blue-50 mb-10">
          {profile?.profileImage?.image ? (
            <Image
              src={profile?.profileImage.image}
              alt={profile?.profileImage?.alt || "Profile Image"}
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
              <span className="absolute -top-2 -right-3 w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-800 opacity-75"></span>
                <span className="relative inline-flex rounded-full w-3 h-3 bg-green-500"></span>
              </span>
              Open to Work
            </Link>
          </div>

          <Heading className="font-black">
            Hello there! I&apos;m {profile?.fullName || "Israfil Hossain"}
          </Heading>
          <Paragraph className="max-w-xl mt-4">
            I&apos;m a software engineer with{" "}
            <Highlight className="bg-yellow-100">
              {" "}
              4+ years of experience
            </Highlight>{" "}
            building scalable web apps that are performance optimized and good
            looking.
          </Paragraph>
          <Paragraph className="max-w-xl mt-4">
            {profile?.fullBio ? (
              <PortableText value={profile.fullBio} components={portableTextComponents} />
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
              ✉️ {profile?.email || "Israfil166091@gmail.com"}
            </Paragraph>

            <Paragraph className="text-[10px] text-gray-900 mt-1">
              📍 {profile?.location || "Dhaka, Bangladesh"}
            </Paragraph>
          </div>
          <div
            onClick={() => setIsButtonClicked(!isButtonClicked)}
            className="bg-slate-900 w-28  text-center no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-xl p-px text-xs font-semibold leading-6 text-white inline-block mt-5 mb-5"
          >
            Contact Me
          </div>
          {isButtonClicked && (
            <div>
              <Contact type={true} />
            </div>
          )}
        </div>
      </div>

      <SkillTabs categories={skillCategories} skills={skills} />

      {featuredProjects.length > 0 && (
        <>
          <Heading as="h2" className="font-black text-lg mt-10 mb-2">
            Featured Projects
          </Heading>
          <FeaturedProducts products={featuredProjects} />
        </>
      )}

      <Heading as="h2" className="font-black text-lg mt-10 mb-4">
        What I&apos;ve been Working On
      </Heading>
      {runningProjects.length > 0 ? (
        <Products products={runningProjects} />
      ) : (
        <Paragraph className="text-secondary text-sm">
          No projects currently in progress.
        </Paragraph>
      )}

      <Heading as="h2" className="font-black text-lg mt-10 mb-4">
        What I&apos;ve been Done
      </Heading>
      <Products products={portfolioProjects} />
    </Container>
  );
}