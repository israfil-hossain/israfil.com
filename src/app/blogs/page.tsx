import { Blogs } from "@/components/articles/Blogs";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { getPosts } from "@/lib/query";
import { Metadata } from "next";
import Script from "next/script";
import { generatePageMeta, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Blog - Technology, Web Development & Remote Work",
  description: "Read articles about web development, JavaScript, React, Next.js, remote work, and technology trends by Israfil Hossain.",
  path: "/blogs",
});

export default async function Blog() {
  const blogs = await getPosts();

  return (
    <>
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5494112348510404"
      strategy="afterInteractive"
    />
  
    <Container>
      <span className="text-4xl">📝</span>
      <Heading className="font-black pb-4">I write about technology</Heading>
      <Paragraph className="pb-10">
        Ever since <Highlight> I was a kid</Highlight>, I&apos;ve been
        fascinated by technology.
      </Paragraph>
      {
        blogs?.length < 1 ? <h2> No Data Available ! </h2> : <Blogs blogs={blogs} />
      }
      
    </Container>
    </>
  );
}
