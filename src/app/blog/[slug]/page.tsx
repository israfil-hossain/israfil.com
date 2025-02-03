import { BlogLayout } from "@/components/articles/BlogLayout";
import CustomPortableText from "@/components/articles/PortableText";
import { Container } from "@/components/Container";
import { getSinglePost } from "@/sanity/lib/query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CodeWindow } from "@/components/CodeWindow"; // Import your CodeWindow component

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug;
  const post = await getSinglePost(slug);

  if (post) {
    return {
      title: post.title || "Israfil",
      description: slug || "",
    };
  }

  return {
    title: "Blog | Israfil Hossain",
    description: "Read blogs by Israfil Hossain on various topics.",
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const slug = params.slug;
  const post = await getSinglePost(slug);

  if (!post) {
    redirect("/blog");
    return null;
  }

  const renderContent = post.body.map((block: any, index: number) => {
    // Check if block type is code
    if (block._type === "code") {
      return (
        <CodeWindow key={index} title={block.language}>
          <pre>{block.code}</pre>
        </CodeWindow>
      );
    }

    // Otherwise, render the normal content
    return <CustomPortableText key={index} value={block} />;
  });

  return (
    <Container>
      <BlogLayout meta={post}>
        {renderContent}
      </BlogLayout>
    </Container>
  );
}
