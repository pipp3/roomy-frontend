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
  
  // Configuración de rewrites para la API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
