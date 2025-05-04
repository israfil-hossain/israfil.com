// components/PortableTextComponents.tsx
import React from "react";
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const { asset, alt } = value;
      return (
        <Image
          src={asset?.url}
          alt={alt || "Rich text image"}
          className="my-4 rounded-lg shadow-md"
          width={500}
          height={500}
        />
      );
    },
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline text-blue-600 hover:text-blue-800 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium my-2">{children}</h3>,
    normal: ({ children }) => <p className="my-2 leading-relaxed text-gray-800">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic text-gray-600 border-gray-300 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
    number: ({ children }) => <li className="text-gray-700">{children}</li>,
  },
};
