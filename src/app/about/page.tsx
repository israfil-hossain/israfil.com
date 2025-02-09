import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About | Israfil Hossain",
  description:
    "Israfil Hossain is a developer, writer. He is a digital nomad and travels around the world while working remotely.",
};

export default function AboutPage() {
  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black">About Me</Heading>
      <About />
    </Container>
  );
}
