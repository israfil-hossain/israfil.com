"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heading } from "../Heading";
import Truncate from "../ui/truncate";

export const TemplatesGrid = ({ templates }: { templates: any[] }) => {
  if (!templates || templates.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No templates available.</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {templates.map((template) => (
        <motion.div key={template._id} variants={item}>
          <TemplateCard template={template} />
        </motion.div>
      ))}
    </motion.div>
  );
};

const TemplateCard = ({ template }: { template: any }) => {
  const liveUrl = template.previewUrl || template.demoUrl;
  const categoryColors: Record<string, string> = {
    SaaS: "bg-blue-100 text-blue-700",
    "E-commerce": "bg-green-100 text-green-700",
    Portfolio: "bg-purple-100 text-purple-700",
    Blog: "bg-orange-100 text-orange-700",
    "Landing Page": "bg-pink-100 text-pink-700",
    Dashboard: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={
            template.thumbnail?.asset?.url || "/israfil-hossain-logo.png"
          }
          alt={template.thumbnail?.alt || template.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {template.isFeatured && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              Featured
            </span>
          )}
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-sm ${categoryColors[template.category] || "bg-gray-100 text-gray-700"}`}
          >
            {template.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-gray-900/80 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
            ${template.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Heading
          as="h4"
          className="group-hover:text-blue-600 transition-colors line-clamp-1 "
        >
          {template.name}
        </Heading>

        <Truncate
          text={template.description || ""}
          limit={100}
          className="text-sm text-secondary mt-2 flex-1"
        />

        {/* Tech Stack */}
        {template.technologies && template.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {template.technologies.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="text-xs bg-gray-50 px-2 py-0.5 rounded text-secondary border border-gray-200"
              >
                {tech}
              </span>
            ))}
            {template.technologies.length > 3 && (
              <span className="text-xs text-gray-400 px-1 py-0.5">
                +{template.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-2 py-2 rounded-lg transition-colors"
            >
              Live Preview
            </a>
          )}
          <Link
            href={`/templates/${template.slug?.current}`}
            className="flex-1 text-center border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
