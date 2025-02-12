"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Prose } from "@/components/Prose";

import Link from "next/link";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import { formatDate } from "../../lib/formatDate";
import { Highlight } from "../Highlight";


function ArrowLeftIcon(props: any) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}: any) {
  let router = useRouter();

  return (
    <Container>
      <article>
        <header className="flex flex-col">
          <Link
            type="button"
            href="/blogs"
            aria-label="Go back to articles"
            className="group mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition  "
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 d" />
          </Link>

          <Heading className=" py-4">{meta.title}</Heading>
          
            <Paragraph className=" text-zinc-700">
              {formatDate(meta?.publishedAt)}
            </Paragraph>
      
          <div className="w-full mt-4 aspect-w-16 aspect-h-10 bg-gray-100 rounded-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
            <Image
               src={meta?.mainImage?.asset?.url || "/israfil-hossain-logo.png"}
              alt="thumbnail"
              height="800"
              width="800"
              className={`object-cover object-left-top w-full max-h-96`}
            />
          </div>
          <Paragraph className=" text-zinc-700 mt-2 py-2 ">
            <Highlight className="py-2 px-5 rounded-lg border">Author : {meta?.author}</Highlight>
          </Paragraph>
            
        </header>
        <Prose className="mt-8">{children}</Prose>
      </article>
    </Container>
  );
}
