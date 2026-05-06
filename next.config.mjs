/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "unsplash.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "cdn.sanity.io" },
      { hostname: "canva.com" },
      { hostname: "**.sanity.io" },
    ],
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
