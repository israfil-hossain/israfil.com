import About from "@/components/about";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { TimelineDemo } from "@/components/time-line";
import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "About Me - Developer, Writer & Digital Nomad",
  description: "Learn more about Israfil Hossain, a passionate software engineer, content writer, and digital nomad with expertise in full-stack development and remote work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black">About Me</Heading>
      <About />
    </Container>
  );
}
