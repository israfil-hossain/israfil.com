import ProfileComponent from "@/components/profile";
import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";

export const metadata: Metadata = generatePageMeta({
  title: "Profile - Software Engineer Portfolio",
  description: "View the complete profile of Israfil Hossain, a full-stack software engineer, content writer, and digital nomad.",
  path: "/profile",
});

export default function Profile() {
  return (
    <>
      <ProfileComponent /> 
    </>
  );
}
