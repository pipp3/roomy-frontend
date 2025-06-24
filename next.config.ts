import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuraciones para producción
  output: 'standalone',
  
  // Configuraciones para evitar problemas de hydratación
  experimental: {
    forceSwcTransforms: true,
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
