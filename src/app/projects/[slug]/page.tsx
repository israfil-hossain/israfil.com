import { SingleProduct } from "@/components/single-project/SingleProject";
import { Container } from "@/components/Container";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <Container>
      <SingleProduct slug={params.slug || ""}  />
    </Container>
  );
}
