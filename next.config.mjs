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
        destination: '/news',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/teams.html',
        destination: '/teams',
        permanent: true,
      },
      {
        source: '/players.html',
        destination: '/players',
        permanent: true,
      },
      {
        source: '/tournaments.html',
        destination: '/tournaments',
        permanent: true,
      },
      {
        source: '/news.html',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/groups.html',
        destination: '/groups',
        permanent: true,
      },
      {
        source: '/login.html',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/register.html',
        destination: '/auth/register',
        permanent: true,
      },
      {
        source: '/profile.html',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/admin.html',
        destination: '/admin',
        permanent: true,
      },
      {
        source: '/rules.html',
        destination: '/rules',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
