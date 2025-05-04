"use client";
import React from "react";

import { Product } from "@/types/products";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import Truncate from "../ui/truncate";

export const Products = ({ products }: { products: any }) => {
  return (
    <div>
      <div className="grid grid-cols-1  gap-10">
        {products?.map((product: Product, idx: number) => (
          <motion.div
            key={product?.href}
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 0.2, delay: idx * 0.1 }}
          >
            <Link
              href={
                product?.slug?.current
                  ? `/projects/${product?.slug?.current}`
                  : product?.href
              }
              key={product?.href}
              className="group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 hover:bg-gray-50 rounded-2xl transition duration-200 pt-4"
            >
              <Image
                src={product?.thumbnail?.asset?.url}
                alt="product?.title"
                height={200}
                width={200}
                className="rounded-md"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <Heading
                    as="h4"
                    className="font-black text-lg md:text-lg lg:text-lg "
                  >
                    {product?.title}
                  </Heading>
                  {/* <Paragraph className="text-sm md:text-sm lg:text-sm mt-2 max-w-xl"> */}
                    <Truncate
                      text={product?.description || ""}
                      limit={150}
                      className="text-sm md:text-sm lg:text-sm mt-2 max-w-xl"
                    />
                  {/* </Paragraph>  */}
                </div>
                <div className="grid grid-cols-3 gap-[1px] lg:grid-cols-5 md:grid-cols-4 mt-3  w-full ">
                  {product?.stack?.map((stack: string) => (
                    <span
                      key={stack}
                      className="text-xs  md:text-xs lg:text-xs bg-gray-50 px-2 py-1 rounded-sm text-secondary w-full border border-gray-200"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
