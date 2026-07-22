/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/article.html',
        destination: '/news/:id',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
