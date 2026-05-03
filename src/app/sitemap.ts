import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getPosts, getProjects, getTemplates } from "@/lib/query";

function safeDate(dateStr: string | undefined | null): Date {
  if (!dateStr) return new Date();
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/workhistory`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/templates`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  let projectRoutes: MetadataRoute.Sitemap = [];
  let templateRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await getPosts();
    if (posts?.length) {
      blogRoutes = posts.map((post: any) => ({
        url: `${SITE_URL}/blogs/${post.slug.current}`,
        lastModified: safeDate(post.publishedAt || post._createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Fallback gracefully if Sanity is unreachable during build
  }

  try {
    const projects = await getProjects();
    if (projects?.length) {
      projectRoutes = projects.map((project: any) => ({
        url: `${SITE_URL}/projects/${project.slug.current}`,
        lastModified: safeDate(project._updatedAt || project._createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Fallback gracefully if Sanity is unreachable during build
  }

  try {
    const templates = await getTemplates();
    if (templates?.length) {
      templateRoutes = templates.map((template: any) => ({
        url: `${SITE_URL}/templates/${template.slug.current}`,
        lastModified: safeDate(template.publishedAt || template._createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Fallback gracefully if Sanity is unreachable during build
  }

  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...templateRoutes];
}
