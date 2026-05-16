import { BlogLayout } from "@/components/articles/BlogLayout";
import CustomPortableText from "@/components/articles/PortableText";
import { Container } from "@/components/Container";
import { redirect } from "next/navigation";
import { CodeWindow } from "@/components/CodeWindow";
import { getSinglePost } from "@/lib/query";
import Script from "next/script";
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
  const post = await getSinglePost(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = post.title;
  const categories = post.categories?.map((c: any) => c.title).join(", ");
  const description = post.mainImage?.alt || `Read about ${title} on ${SITE_NAME}'s blog.${categories ? ` Categories: ${categories}.` : ""}`;
  const imageUrl = post.mainImage?.asset?.url || `${SITE_URL}/og-image.png`;
  const url = `${SITE_URL}/blogs/${resolvedParams.slug}`;
  const publishedAt = post.publishedAt;
  const author = post.author;

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
      type: "article",
      publishedTime: publishedAt,
      authors: [author || SITE_NAME],
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

// Page component
export default async function SingleBlogPage({ params }: Props) {
  const resolvedParams = await params;

  // Fetch the post using the slug
  const post = await getSinglePost(resolvedParams?.slug || "");

  // Redirect if the post doesn't exist
  if (!post) {
    redirect("/blog");
  }

  const renderContent = (
    <CustomPortableText value={post.body} />
  );

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5494112348510404"
        strategy="afterInteractive"
      />

      <Container>
        <BlogLayout meta={post}>{renderContent}</BlogLayout>
      </Container>
    </>
  );
}
