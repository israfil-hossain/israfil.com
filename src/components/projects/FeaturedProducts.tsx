"use client";
import React from "react";
import { Product } from "@/types/products";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heading } from "../Heading";
import Truncate from "../ui/truncate";

export const FeaturedProducts = ({ products }: { products: any }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-10 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product, idx: number) => (
          <motion.div
            key={product?.slug?.current || (product as any)?._id || idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Link
              href={
                product?.slug?.current
                  ? `/projects/${product?.slug?.current}`
                  : product?.href || "#"
              }
              className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product?.thumbnail?.asset?.url || "/israfil-hossain-logo.png"}
                  alt={product?.title || "Project"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-5">
              
                <Heading
                  as="h4"
                  className="font-black text-lg md:text-lg lg:text-lg "
                >
                  {product?.title}
                </Heading>
                <Truncate
                  text={product?.description || ""}
                  limit={40}
                  className="text-sm text-secondary mt-2"
                />
                <div className="flex flex-wrap gap-1 mt-3">
                  {product?.stack?.slice(0, 4).map((stack: string) => (
                    <span
                      key={stack}
                      className="text-xs bg-gray-100 px-2 py-0.5 rounded text-secondary border border-gray-200"
                    >
                      {stack}
                    </span>
                  ))}
                  {(product?.stack?.length || 0) > 4 && (
                    <span className="text-xs text-gray-400 px-1 py-0.5">
                      +{(product?.stack?.length || 0) - 4}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
