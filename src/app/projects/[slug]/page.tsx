import { Container } from "@/components/Container";
import { SingleProduct } from "@/components/single-project/Product";
import { getSingleProject } from "@/lib/query";
import { redirect } from "next/navigation";


// Page component
export default async function SingleProjectPage({ params }: {params:any}) {
  // Fetch the product using the slug
  const product = await getSingleProject(params.slug);

  // Redirect if the product doesn't exist
  if (!product) {
    redirect("/projects");
  }

  return (
    <Container>
      <SingleProduct project={product} />
    </Container>
  );
}
