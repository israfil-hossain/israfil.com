/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.unsplash.com","unsplash.com", "res.cloudinary.com", "cdn.sanity.io","canva.com"],
  },
  experimental: {
    mdxRs: true,
  },
  publicRuntimeConfig: {
    CORS_ORIGIN: 'https://docs.google.com',

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
