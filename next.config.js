/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Aquí puedes agregar extensiones de archivo personalizadas
    config.config.resolve.extensions.push(".js", ".jsx");

    return config;
  },
};
