"use client";
import React from "react";
import { Product } from "@/types/products";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Truncate from "../ui/truncate";

export const FeaturedProducts = ({ products }: { products: any }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-10 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 auto-rows-[140px]">
        {products.map((product: Product, idx: number) => {
          const isLarge = idx % 5 === 0;
          return (
            <motion.div
              key={product?.slug?.current || (product as any)?._id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={isLarge ? "col-span-2 row-span-2" : ""}
            >
              <Link
                href={
                  product?.slug?.current
                    ? `/projects/${product?.slug?.current}`
                    : product?.href || "#"
                }
                className="group block h-full bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                <div className={`relative overflow-hidden ${isLarge ? "h-44" : "h-20"}`}>
                  <Image
                    src={product?.thumbnail?.asset?.url || "/israfil-hossain-logo.png"}
                    alt={product?.title || "Project"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isLarge && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className={`p-2 ${isLarge ? "p-3" : "p-2"}`}>
                  <h4 className={`font-bold line-clamp-1 group-hover:text-blue-600 transition-colors ${isLarge ? "text-sm" : "text-xs"}`}>
                    {product?.title}
                  </h4>
                  <Truncate
                    text={product?.description || ""}
                    limit={isLarge ? 40 : 20}
                    className={`text-secondary mt-1 ${isLarge ? "text-xs" : "text-[10px]"} hidden md:block`}
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
