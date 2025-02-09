import HomeComponent from "@/components/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Engineer | Israfil Hossain",
  description:
    "Israfil Hossain is a Software Engineer and Content Writer. He is a digital nomad and travels around the world while working remotely.",
};

export default function Home() {
  return(
    <HomeComponent />
  )
}
