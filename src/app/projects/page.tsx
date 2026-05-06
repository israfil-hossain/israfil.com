
import ProjectComponent from "@/components/projects";
import { getProjects } from "@/lib/query";

export const revalidate = 60

import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Projects - Web Apps, SaaS Products & Open Source",
  description: "Browse Israfil Hossain's portfolio of web applications, SaaS products, and software projects built with modern technologies like Next.js, React, and TypeScript.",
  path: "/projects",
});

export default async function Projects() {
  const product = await getProjects();
  
  if (!product) {
    return "No data available";
  }
  return <ProjectComponent product={product}/>
}
