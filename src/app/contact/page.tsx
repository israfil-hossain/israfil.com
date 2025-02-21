import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Israfil Hossain",
  description:
    "Israfil Hossain is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function Projects() {
  return (
    <Container>
      <span className="text-4xl">✉️</span>
      <Heading className="font-black mb-2">Contact Me</Heading>
      <Paragraph className="mb-10 max-w-xl">
        <Highlight className="bg-yellow-50">I am Open to Work.</Highlight>I am
        available to
        <Highlight className="bg-green-200">Remote job</Highlight>
        or
        <Highlight className="bg-blue-200">Contract Based Job</Highlight> .
      </Paragraph>
      
      <Paragraph className="text-sm text-gray-200 mt-1 text-10">
        ✉️ {" Israfil166091@gmail.com"}
      </Paragraph>
      <Paragraph className="text-sm text-gray-500 mt-1">
        📍 Dhaka,Bangladesh
      </Paragraph>
      <Paragraph className="text-sm text-gray-500 mt-1">
        📞 +880-1843566251
      </Paragraph>
      <Paragraph className="mb-5 max-w-xl mt-5">
        Reach out to me over email or fill up this contact form. I will get back
        to you ASAP - I promise.{" "}
      </Paragraph>
      <Contact />
    </Container>
  );
}
