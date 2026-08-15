import About from "@/components/about";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import { getProfile, getExperiences } from "@/lib/query";

export const revalidate = 60

export const metadata: Metadata = generatePageMeta({
  title: "About Me - Developer, Writer & Digital Nomad",
  description: "Learn more about Israfil Hossain, a passionate software engineer, content writer, and digital nomad with expertise in full-stack development and remote work.",
  path: "/about",
});

async function getAboutData() {
  try {
    const profiles = await getProfile();
    const experiences = await getExperiences();
    return {
      profile: profiles?.[0] || null,
      experiences: experiences || [],
    };
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return {
      profile: null,
      experiences: [],
    };
  }
}

export default async function AboutPage() {
  const { profile, experiences } = await getAboutData();

  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black">About Me</Heading>
      <About profileData={profile} experiences={experiences} />
    </Container>
  );
}
