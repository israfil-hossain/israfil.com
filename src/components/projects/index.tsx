"use client";
import React, { useMemo } from "react";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { Products } from "./Products";
import { WorkingProducts } from "./ProductsWorking";
import { FeaturedProducts } from "./FeaturedProducts";

export default function ProjectComponent({ product }: { product: any }) {
  const featuredProjects = useMemo(() => {
    return product?.filter((project: any) => project.isFeatured === true) || [];
  }, [product]);

  const runningProjects = useMemo(() => {
    return (
      product?.filter((project: any) => project.isRunning === true) || []
    );
  }, [product]);

  const doneProjects = useMemo(() => {
    return (
      product?.filter((project: any) => project.isRunning !== true) || []
    );
  }, [product]);

  return (
    <Container>
      {featuredProjects.length > 0 && (
        <>
          <span className="text-4xl">🚀</span>
          <Heading as="h2" className="font-black text-lg mt-10 mb-4">
            Featured Projects
          </Heading>
          <FeaturedProducts products={featuredProjects} />
        </>
      )}

      <span className="text-4xl">⚡</span>
      <Heading as="h2" className="font-black text-lg mt-10 mb-4">
        What I&apos;ve been Working On
      </Heading>
      {runningProjects.length > 0 ? (
        <WorkingProducts products={runningProjects} />
      ) : (
        <p className="text-secondary text-sm mt-2">
          No projects currently in progress.
        </p>
      )}

      <Heading className="font-black mb-10 pt-16"> What I&apos;ve been Done</Heading>
      <Products products={doneProjects} />
    </Container>
  );
}
