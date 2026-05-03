"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import CustomPortableText from "./PortableText";

export const Blogs = ({ blogs }: { blogs: any }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);

  const handleExpandClick = (slug: string) => {
    setExpandedBlog(expandedBlog === slug ? null : slug);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto my-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {blogs.map((blog: any) => (
        <motion.div key={blog.slug?.current} variants={item}>
          <Link
            href={`/blogs/${blog.slug?.current}`}
            className="relative my-10 block"
            onMouseEnter={() => setHovered(blog.slug?.current)}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence mode="wait">
              {hovered === blog.slug?.current && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.95, scaleY: 0.95 }}
                  animate={{ opacity: 1, scaleX: 1.05, scaleY: 1.2 }}
                  exit={{ opacity: 0, scaleX: 0.95, scaleY: 0.95 }}
                  className="absolute z-0 pointer-events-none bg-gray-50 inset-0 h-full w-full rounded-md"
                />
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-20">
              <Image
                src={blog?.mainImage?.asset?.url || ""}
                alt={blog?.mainImage?.alt || blog.title}
                height="200"
                width="200"
                objectFit="cover"
                className="rounded-md object-cover h-40 w-60"
              />
              <div className="flex flex-col col-span-3">
                <Heading className="text-lg md:text-lg lg:text-lg">
                  {blog.title}
                </Heading>
                <Paragraph className="text-sm md:text-sm lg:text-sm mt-2">
                  <CustomPortableText value={blog.body.slice(0, 3)} />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleExpandClick(blog.slug?.current);
                    }}
                    className="mt-2 text-blue-600"
                  >
                    {expandedBlog === blog.slug?.current ? "Show Less" : "Read More"}
                  </button>
                </Paragraph>

                <div className="flex space-x-2 flex-wrap mt-4">
                  {blog.categories?.map((tag: any) => (
                    <span
                      key={tag?.title}
                      className="text-xs px-1 py-0.5 text-secondary border border-neutral-200 bg-white rounded-md"
                    >
                      {tag?.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};