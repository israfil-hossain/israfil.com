export const revalidate = 60

import HomeComponent from "@/components/home";
import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import { getProfile, getProjects, getSkillCategories, getSkills } from "@/lib/query";

export const metadata: Metadata = generatePageMeta({
  title: "Home - Full-Stack Software Engineer & Writer",
  description: "Explore the portfolio of Israfil Hossain, a full-stack software engineer and content writer specializing in web applications, remote work, and technology.",
  path: "/",
});

async function getData() {
  try {
    const profiles = await getProfile();
    const projects = await getProjects();
    const skillCategories = await getSkillCategories();
    const skills = await getSkills();
    return {
      profile: profiles?.[0] || null,
      projects: projects || [],
      skillCategories: skillCategories || [],
      skills: skills || [],
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      profile: null,
      projects: [],
      skillCategories: [],
      skills: [],
    };
  }
}

export default async function Home() {
  const { profile, projects, skillCategories, skills } = await getData();

  return (
    <HomeComponent 
      profileData={profile} 
      projectData={projects}
      skillCategories={skillCategories}
      skills={skills}
    />
  );
}
