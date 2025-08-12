"use client";
import useProjectsStore from "@/store/projectsStore";
import React, { useMemo } from "react";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { Products } from "./Products";
import { WorkingProducts } from "./ProductsWorking";

export default function ProjectComponent({ product }: { product: any }) {
  const { projectData } = useProjectsStore();

  const runningProjects = useMemo(() => {
      return (
        projectData?.filter((project: any) => project.isRunning === true) || []
      );
    }, [projectData]);
  
    const portfolioProjects = useMemo(() => {
      return (
        projectData?.filter((project: any) => project.showPortfolio === true) ||
        []
      );
    }, [projectData]);
  
  return (
    <Container>
      <span className="text-4xl">⚡</span>
      <Heading as="h2" className="font-black text-lg mt-10 mb-4">
        What I&apos;ve been Working !
      </Heading>
      <WorkingProducts products={runningProjects} />
      <Heading className="font-black mb-10"> What I&apos;ve been Done</Heading>

      <Products products={product || portfolioProjects} />
    </Container>
  );
}
