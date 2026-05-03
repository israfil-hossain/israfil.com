import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/projects/Products";
import { WorkHistory } from "@/components/WorkHistory";
import Image from "next/image";
import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Work History - Professional Experience & Career",
  description: "Explore Israfil Hossain's professional work history, including roles as a full-stack developer building impactful web applications and products.",
  path: "/workhistory",
});

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">💼</span>
      <Heading className="font-black">Work History</Heading>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m a full-stack developer that loves{" "}
        <Highlight>building products</Highlight> and web apps that can impact
        millions of lives
      </Paragraph>
      <WorkHistory />
    </Container>
  );
}
