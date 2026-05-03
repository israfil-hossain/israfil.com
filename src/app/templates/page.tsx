import { getTemplates } from "@/lib/query";
import { Metadata } from "next";
import { generatePageMeta } from "@/lib/seo";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Highlight } from "@/components/Highlight";
import { TemplatesGrid } from "@/components/templates/TemplatesGrid";

export const metadata: Metadata = generatePageMeta({
  title: "Templates - Ready-to-Use Web Templates",
  description: "Browse professionally designed, production-ready templates for SaaS, e-commerce, portfolios, and more. Built with modern tech stacks.",
  path: "/templates",
});

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <Container>
      <span className="text-4xl">🎨</span>
      <Heading className="font-black">Templates</Heading>
      <Paragraph className="max-w-xl mt-4">
        Professionally crafted, <Highlight>production-ready templates</Highlight>{" "}
        for SaaS, e-commerce, portfolios, dashboards, and more. Built with modern
        tech stacks to accelerate your development.
      </Paragraph>

      {templates?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No templates available yet. Check back soon!
          </p>
        </div>
      ) : (
        <TemplatesGrid templates={templates || []} />
      )}
    </Container>
  );
}
