import { BlogLayout } from "@/components/articles/BlogLayout";
import CustomPortableText from "@/components/articles/PortableText";
import { Container } from "@/components/Container";
import { getSinglePost } from "@/sanity/lib/query";
import { redirect } from "next/navigation";
import { CodeWindow } from "@/components/CodeWindow";


// Page component
export default async function SingleBlogPage({ params }: {params: any}) {
  // Fetch the post using the slug
  const post = await getSinglePost(params.slug);

  // Redirect if the post doesn't exist
  if (!post) {
    redirect("/blog");
  }

  // Render content based on the post's body
  const renderContent = post.body.map((block: any, index: number) => {
    if (block._type === "code") {
      return (
        <CodeWindow key={index} title={block.language}>
          <pre>{block.code}</pre>
        </CodeWindow>
      );
    }
    return <CustomPortableText key={index} value={block} />;
  });

  return (
    <Container>
      <BlogLayout meta={post}>{renderContent}</BlogLayout>
    </Container>
  );
}