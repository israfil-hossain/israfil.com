export const SITE_URL = process.env.SITE_URL || "https://israfil.com";
export const SITE_NAME = "Israfil Hossain";
export const SITE_DESCRIPTION = "Full-Stack Software Engineer, content writer, and digital nomad building impactful web applications and writing about technology.";

import type { Metadata } from "next";

export type PageMeta = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function generatePageMeta(meta: PageMeta): Metadata {
  const url = meta.path ? `${SITE_URL}${meta.path}` : SITE_URL;
  const title = `${meta.title} | ${SITE_NAME}`;
  const image = meta.image || `${SITE_URL}/og-image.png`;

  return {
    title,
    description: meta.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: meta.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images: [image],
      creator: "@mannupaaji",
      site: "@mannupaaji",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateArticleMeta(
  title: string,
  description: string,
  path: string,
  image?: string,
  publishedAt?: string,
  author?: string
): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const ogImage = image || `${SITE_URL}/og-image.png`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      authors: [author || SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@mannupaaji",
      site: "@mannupaaji",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Full-Stack Software Engineer",
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://twitter.com/mannupaaji",
    "https://linkedin.com/in/manuarora28",
    "https://youtube.com/maninthere",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
