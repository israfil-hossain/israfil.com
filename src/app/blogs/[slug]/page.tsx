import { BlogLayout } from "@/components/articles/BlogLayout";
import CustomPortableText from "@/components/articles/PortableText";
import { Container } from "@/components/Container";
import { redirect } from "next/navigation";
import { CodeWindow } from "@/components/CodeWindow";
import { getSinglePost } from "@/lib/query";
import Head from "next/head";

// Page component
export default async function SingleBlogPage({ params }: { params: any }) {
  // Fetch the post using the slug
  const post = await getSinglePost(params?.slug || "");

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
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5494112348510404"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <Container>
        <BlogLayout meta={post}>{renderContent}</BlogLayout>
      </Container>
    </>
  );
}
