import { Container } from "@/components/Container";
import { SingleProduct } from "@/components/single-project/Product";
import { getSingleProject } from "@/sanity/lib/query";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const product = await getSingleProject(slug);

  if (product) {
    return {
      title: product.title,
      description: product.description,
    };
  }

  return {
    title: "Projects | Israfil Hossain",
    description:
      "Israfil Hossain is a developer, writer, and speaker. He is a digital nomad and travels around the world while working remotely.",
  };
}

export default async function SingleProjectPage({ params }: Props) {
  const slug = params.slug;
  const product = await getSingleProject(slug);

  if (!product) {
    redirect("/projects");
    return null;
  }

  return (
    <Container>
      <SingleProduct project={product} />
    </Container>
  );
}
