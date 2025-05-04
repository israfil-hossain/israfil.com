"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Heading } from "../Heading";
import { motion } from "framer-motion";
import { getSingleProject } from "@/lib/query";
import { useQuery } from "@tanstack/react-query";
import { portableTextComponents } from "../portable-text";
import { PortableText } from "next-sanity";
import Loader from "../ui/loader";
import { Container } from "../Container";
import Link from "next/link";
import { ArrowLeftIcon } from "../ui/arrow-left";

export function SingleProduct({ slug }: { slug: string }) {
  const [isLoader,setIsLoading] = useState(false);

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["single-project", slug],
    queryFn: () => getSingleProject(slug),
  });
  

  const [activeImage, setActiveImage] = useState(
    project?.thumbnail?.asset?.url || ""
  );
  useEffect(()=>{
    setIsLoading(true); 
    if(project){
      setActiveImage(project?.thumbnail?.asset?.url)
    }
    setIsLoading(false); 
  },[project])



  if (isLoading || isLoader) return <Loader />;
  if (isError || !project) return <div>Something went wrong.</div>;

  return (
    <Container>
      <div className="">
        <Link
          type="button"
          href="/projects"
          aria-label="Go back to articles"
          className="group mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition  "
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 d" />
        </Link>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={project?.slug}
            className="relative"
          >
            <Image
              src={activeImage}
              alt="thumbnail"
              height={1000}
              width={1000}
              className="rounded-md object-contain"
            />
            <div className="absolute bottom-0 bg-white h-40 w-full [mask-image:linear-gradient(to_bottom,transparent,white)]" />
          </motion.div>
        )}

        <div className="flex flex-row justify-center my-8 flex-wrap">
          {project?.images?.map((image:any, idx:string) => (
            <button
              onClick={() => setActiveImage(image?.asset?.url)}
              key={`image-thumbnail-${idx}`}
            >
              <Image
                src={image?.asset?.url}
                alt="product thumbnail"
                height={200}
                width={200}
                className="lg:h-[100px] h-16 lg:w-[150px] w-20 object-cover object-top mr-4 mb-4 border rounded-lg border-neutral-100"
              />
            </button>
          ))}
        </div>

        <div className="flex lg:flex-row justify-between items-center flex-col mt-20">
          <Heading className="font-black mb-2 pb-1">{project?.title}</Heading>
          {/* <div className="flex space-x-2 md:mb-1 mt-2 md:mt-0">
                {project?.stack?.map((stack: string) => (
                  <span
                    key={stack}
                    className="text-xs md:text-xs lg:text-xs bg-gray-50 px-2 py-1 rounded-sm text-secondary"
                  >
                    {stack}
                  </span>
                ))}
              </div> */}
        </div>

        <div className="prose prose-sm md:prose-base max-w-none text-neutral-600">
          <PortableText
            value={project?.content}
            components={portableTextComponents}
          />
        </div>

        {project?.href && (
          <a
            href={project?.href}
            target="__blank"
            className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-lg shadow-black/20 sm:backdrop-blur-sm group-hover/button:bg-gray-50/15 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-sm font-medium px-4 py-2 origin-left mt-5"
          >
            Live Preview
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M5 12l14 0"></path>
              <path d="M13 18l6 -6"></path>
              <path d="M13 6l6 6"></path>
            </svg>
          </a>
        )}
      </div>
    </Container>
  );
}
