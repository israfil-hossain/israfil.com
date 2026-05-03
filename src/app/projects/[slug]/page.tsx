import { SingleProduct } from "@/components/single-project/SingleProject";
import { Container } from "@/components/Container";
import { getSingleProject } from "@/lib/query";
import { Metadata, ResolvingMetadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getSingleProject(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.title} - Project`;
  const description = project.description || `Explore the ${project.title} project by ${SITE_NAME}.`;
  const imageUrl = project.thumbnail?.asset?.url || `${SITE_URL}/og-image.png`;
  const url = `${SITE_URL}/projects/${resolvedParams.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@mannupaaji",
      site: "@mannupaaji",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;

  return (
    <Container>
      <SingleProduct slug={resolvedParams?.slug || ""} />
    </Container>
  );
}