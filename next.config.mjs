/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com", "cdn.sanity.io"],
  },
  experimental: {
    mdxRs: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ab0ypbx5.apicdn.sanity.io/:path*',
      },
    ];
  },
};


export default nextConfig;
