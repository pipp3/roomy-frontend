import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuraciones para producción
  output: 'standalone',
  
  // Configuraciones para evitar problemas de hydratación
  experimental: {
    forceSwcTransforms: true,
  },
  
  // Configuraciones de source maps
  productionBrowserSourceMaps: false, // Desactivar source maps en producción para mejor rendimiento
  
  // Configuraciones de webpack para evitar errores 404 de source maps
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.devtool = false; // Desactivar source maps completamente en producción
    }
    return config;
  },
  
  // Configuraciones de headers para CORS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
