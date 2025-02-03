
import ProjectComponent from "@/components/projects";
import { getProjects } from "@/sanity/lib/query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Israfil Hossain",
  description:
    "Israfil Hossain is a developer and writer. He is a digital nomad and travels around the world while working remotely.",
};

export default async function Projects() {
  const product = await getProjects();
  
  if (!product) {
    return "No data available";
  }
  return <ProjectComponent product={product}/>
}
