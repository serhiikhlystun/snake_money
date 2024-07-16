/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "snam.web3flow.online",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
