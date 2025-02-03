"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/projects/Products";
import { TechStack } from "@/components/TechStack";
import { getProjects } from "@/sanity/lib/query";
import useProfileStore from "@/store/profileStore";
import useProjectsStore from "@/store/projectsStore";
import { useEffect, useState } from "react";

export default function HomeComponent() {
  const { profileData } = useProfileStore();
  const { projectData, setProjectsData } = useProjectsStore(); 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data from your API
    const fetchProjectData = async () => {
      try {
        setIsLoading(true);
        const response = await getProjects();
        
        setProjectsData(response)
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [setProjectsData]);

  if (isLoading) {
    return "Loading .... ";
  }

  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black">
        Hello there! I&apos;m {profileData?.fullName || "Israfil Hossain"}
      </Heading>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m a software engineer with{" "}
        <Highlight className="bg-yellow-100">3+ years of experience</Highlight>{" "}
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
