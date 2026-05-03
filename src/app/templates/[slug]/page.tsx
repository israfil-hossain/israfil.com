import { getSingleTemplate } from "@/lib/query";
import { Metadata, ResolvingMetadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/ui/arrow-left";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const template = await getSingleTemplate(resolvedParams.slug);

  if (!template) {
    return {
      title: "Template Not Found",
      description: "The requested template could not be found.",
    };
  }

  const title = `${template.name} - Template`;
  const description = template.description;
  const imageUrl = template.thumbnail?.asset?.url || `${SITE_URL}/og-image.png`;
  const url = `${SITE_URL}/templates/${resolvedParams.slug}`;

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
    },
  };
}

export default async function SingleTemplatePage({ params }: Props) {
  const resolvedParams = await params;
  const template = await getSingleTemplate(resolvedParams.slug);

  if (!template) {
    return (
      <Container>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-gray-400">Template Not Found</h1>
          <Link href="/templates" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Templates
          </Link>
        </div>
      </Container>
    );
  }

  const liveUrl = template.previewUrl || template.demoUrl;

  return (
    <Container>
      <Link
        href="/templates"
        className="group mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition"
      >
        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="relative h-72 rounded-xl overflow-hidden bg-gray-100 mb-8">
            <Image
              src={template.thumbnail?.asset?.url || "/israfil-hossain-logo.png"}
              alt={template.thumbnail?.alt || template.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Preview Images */}
          {template.previewImages && template.previewImages.length > 0 && (
            <div className="mb-8">
              <Heading as="h2" className="font-bold text-lg mb-4">
                Preview
              </Heading>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {template.previewImages.map((img: any, idx: number) => (
                  <Image
                    key={idx}
                    src={img.asset?.url || ""}
                    alt={img.alt || `Preview ${idx + 1}`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-40"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <Heading as="h2" className="font-bold text-lg mb-3">
              About
            </Heading>
            <Paragraph className="text-gray-600 whitespace-pre-line">
              {template.description}
            </Paragraph>
          </div>

          {/* Features */}
          {template.features && template.features.length > 0 && (
            <div className="mb-8">
              <Heading as="h2" className="font-bold text-lg mb-3">
                Features
              </Heading>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {template.features.map((feature: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What's Included */}
          {template.includes && template.includes.length > 0 && (
            <div className="mb-8">
              <Heading as="h2" className="font-bold text-lg mb-3">
                What&apos;s Included
              </Heading>
              <ul className="space-y-2">
                {template.includes.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-blue-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Demo Credentials */}
          {template.demoCredentials && (
            template.demoCredentials.username || template.demoCredentials.password) && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Heading as="h3" className="font-bold text-sm mb-2 text-yellow-800">
                Demo Credentials
              </Heading>
              <div className="space-y-1 text-sm">
                {template.demoCredentials.username && (
                  <p className="text-yellow-700">
                    <strong>Username:</strong> {template.demoCredentials.username}
                  </p>
                )}
                {template.demoCredentials.password && (
                  <p className="text-yellow-700">
                    <strong>Password:</strong> {template.demoCredentials.password}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <div>
              <Heading as="h1" className="font-bold text-xl">
                {template.name}
              </Heading>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {template.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {template.licenseType === "single" ? "Single Site" : template.licenseType === "unlimited" ? "Unlimited" : "Extended"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  ${template.price}
                </span>
                <span className="text-sm text-gray-500">{template.currency}</span>
              </div>
            </div>

            <div className="space-y-3">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Live Preview
                </a>
              )}
              {template.downloadUrl && (
                <a
                  href={template.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Download
                </a>
              )}
            </div>

            {/* Tech Stack */}
            {template.technologies && template.technologies.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {template.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-50 px-2 py-1 rounded text-secondary border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
