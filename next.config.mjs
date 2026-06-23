/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "res.cloudinary.com", // for Cloudinary
    ],
  },
};

export default nextConfig;
