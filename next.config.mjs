/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com", "cdn.sanity.io"],
  },
  experimental: {
    mdxRs: true,
  },
};


export default nextConfig;
