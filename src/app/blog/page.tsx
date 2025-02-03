import { Blogs } from "@/components/articles/Blogs";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { getPosts } from "@/sanity/lib/query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Israfil",
  description:
    "Israfil Hossain is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default async function Blog() {
  const blogs = await getPosts();

  return (
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
  );
}
