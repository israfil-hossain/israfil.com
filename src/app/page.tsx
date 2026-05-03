import HomeComponent from "@/components/home";
import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import { getProfile, getProjects } from "@/lib/query";

export const metadata: Metadata = generatePageMeta({
  title: "Home - Full-Stack Software Engineer & Writer",
  description: "Explore the portfolio of Israfil Hossain, a full-stack software engineer and content writer specializing in web applications, remote work, and technology.",
  path: "/",
});

async function getData() {
  try {
    const profiles = await getProfile();
    const projects = await getProjects();
    return {
      profile: profiles?.[0] || null,
      projects: projects || [],
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      profile: null,
      projects: [],
    };
  }
}

export default async function Home() {
  const { profile, projects } = await getData();

  return (
    <HomeComponent 
      profileData={profile} 
      projectData={projects} 
    />
  );
}
