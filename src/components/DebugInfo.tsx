'use client';

import React, { useState } from 'react';

const DebugInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [testing, setTesting] = useState(false);

  const envVars = {
    'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL,
    'NODE_ENV': process.env.NODE_ENV,
  };

  const windowInfo = typeof window !== 'undefined' ? {
    'URL actual': window.location.href,
    'Origen': window.location.origin,
    'Cookies': document.cookie || 'No hay cookies',
  } : {};

  const testConnections = async () => {
    setTesting(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    const endpoints = [
      { name: 'Backend /auth/me', url: `${apiUrl}/auth/me` },
      { name: 'Backend /auth/google', url: `${apiUrl}/auth/google` },
    ];

    const results: Record<string, string> = {};

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint.url, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          results[endpoint.name] = `✅ ${response.status}`;
        } else if (response.status === 401 && endpoint.name.includes('/auth/me')) {
          results[endpoint.name] = `✅ 401 (normal sin token)`;
        } else {
          results[endpoint.name] = `⚠️ ${response.status}`;
        }
      } catch (error) {
        results[endpoint.name] = `❌ ${error instanceof Error ? error.message : 'Error'}`;
      }
    }

    setTestResults(results);
    setTesting(false);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium"
        >
          🔍 Debug
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">🔍 Debug Info</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Variables de Entorno */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-blue-600">📊 Variables de Entorno</h3>
            <div className="space-y-1">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                  <span className="font-mono font-medium">{key}:</span>
                  <span className={`font-mono ${value ? 'text-green-600' : 'text-red-500'}`}>
                    {value || '❌ NO CONFIGURADA'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Información del Navegador */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-blue-600">🌐 Información del Navegador</h3>
            <div className="space-y-1">
              {Object.entries(windowInfo).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                  <span className="font-medium">{key}:</span>
                  <span className="font-mono text-gray-700 break-all text-right max-w-xs">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pruebas de Conectividad */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-blue-600">🔌 Pruebas de Conectividad</h3>
            <button
              onClick={testConnections}
              disabled={testing}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm font-medium mb-3"
            >
              {testing ? '🔄 Probando...' : '🧪 Probar Conexiones'}
            </button>

            {Object.keys(testResults).length > 0 && (
              <div className="space-y-1">
                {Object.entries(testResults).map(([name, result]) => (
                  <div key={name} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                    <span className="font-medium">{name}:</span>
                    <span className="font-mono">{result}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instrucciones Rápidas */}
          {!process.env.NEXT_PUBLIC_API_URL && (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h3 className="font-semibold text-red-800 mb-2">🚨 PROBLEMA DETECTADO</h3>
              <p className="text-red-700 text-sm mb-2">
                NEXT_PUBLIC_API_URL no está configurada. El frontend está haciendo peticiones a sí mismo.
              </p>
              <div className="text-red-700 text-sm">
                <p><strong>Solución:</strong></p>
                <ol className="list-decimal list-inside space-y-1 mt-1">
                  <li>Conectarse al servidor</li>
                  <li>Ir a la carpeta roomy-frontend</li>
                  <li>Crear archivo .env.local</li>
                  <li>Agregar: NEXT_PUBLIC_API_URL=https://tu-backend.duckdns.org</li>
                  <li>Reiniciar: pm2 restart roomy-frontend</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugInfo; 