import About from "@/components/about";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import { getProfile } from "@/lib/query";

export const revalidate = 60

export const metadata: Metadata = generatePageMeta({
  title: "About Me - Developer, Writer & Digital Nomad",
  description: "Learn more about Israfil Hossain, a passionate software engineer, content writer, and digital nomad with expertise in full-stack development and remote work.",
  path: "/about",
});

async function getProfileData() {
  try {
    const profiles = await getProfile();
    return profiles?.[0] || null;
  } catch (error) {
    console.error("Error fetching profile for about page:", error);
    return null;
  }
}

export default async function AboutPage() {
  const profile = await getProfileData();

  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black">About Me</Heading>
      <About profileData={profile} />
    </Container>
  );
}
