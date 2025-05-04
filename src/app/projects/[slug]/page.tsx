import { SingleProduct } from "@/components/single-project/SingleProject";
import { Container } from "@/components/Container";


export default async function Page({ params }:{params:any}) {

  return (
    <Container>
      <SingleProduct slug={params?.slug || ""} />
    </Container>
  );
}