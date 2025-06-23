'use client';

import React from 'react';

const DebugPage: React.FC = () => {
  const envVars = {
    'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL,
    'NODE_ENV': process.env.NODE_ENV,
    'NEXTAUTH_URL': process.env.NEXTAUTH_URL,
  };

  const windowInfo = typeof window !== 'undefined' ? {
    'window.location.origin': window.location.origin,
    'window.location.href': window.location.href,
    'document.cookie': document.cookie || 'No cookies',
  } : {};

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          🔍 Debug - Configuración RoomyApp
        </h1>
        
        <div className="grid gap-6">
          {/* Variables de Entorno */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              📊 Variables de Entorno
            </h2>
            <div className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-mono text-sm font-medium">{key}:</span>
                  <span className={`font-mono text-sm ${value ? 'text-green-600' : 'text-red-500'}`}>
                    {value || '❌ NO CONFIGURADA'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Información del Navegador */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              🌐 Información del Navegador
            </h2>
            <div className="space-y-2">
              {Object.entries(windowInfo).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-mono text-sm font-medium">{key}:</span>
                  <span className="font-mono text-sm text-gray-700 break-all">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pruebas de Conectividad */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              🔌 Pruebas de Conectividad
            </h2>
            <div className="space-y-4">
              <TestConnection />
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">
              ⚠️ Si NEXT_PUBLIC_API_URL está vacía o incorrecta:
            </h2>
            <div className="space-y-2 text-yellow-700">
              <p>1. Crea o edita el archivo <code className="bg-yellow-200 px-2 py-1 rounded">.env.local</code> en la raíz del frontend</p>
              <p>2. Agrega la línea: <code className="bg-yellow-200 px-2 py-1 rounded">NEXT_PUBLIC_API_URL=https://tu-backend.duckdns.org</code></p>
              <p>3. Reinicia el servidor de desarrollo: <code className="bg-yellow-200 px-2 py-1 rounded">npm run dev</code></p>
              <p>4. O si está en producción: <code className="bg-yellow-200 px-2 py-1 rounded">pm2 restart roomy-frontend</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestConnection: React.FC = () => {
  const [results, setResults] = React.useState<Record<string, string>>({});
  const [testing, setTesting] = React.useState(false);

  const testEndpoints = async () => {
    setTesting(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const endpoints = [
      { name: 'Backend Health', url: `${apiUrl}/health` },
      { name: 'Auth Me', url: `${apiUrl}/auth/me` },
      { name: 'Google Auth', url: `${apiUrl}/auth/google` },
    ];

    const newResults: Record<string, string> = {};

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint.url, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          newResults[endpoint.name] = `✅ ${response.status} OK`;
        } else {
          newResults[endpoint.name] = `⚠️ ${response.status} ${response.statusText}`;
        }
      } catch (error) {
        newResults[endpoint.name] = `❌ ${error instanceof Error ? error.message : 'Error desconocido'}`;
      }
    }

    setResults(newResults);
    setTesting(false);
  };

  return (
    <div>
      <button
        onClick={testEndpoints}
        disabled={testing}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded font-medium"
      >
        {testing ? '🔄 Probando...' : '🧪 Probar Conexiones'}
      </button>
      
      {Object.keys(results).length > 0 && (
        <div className="mt-4 space-y-2">
          {Object.entries(results).map(([name, result]) => (
            <div key={name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{name}:</span>
              <span className="font-mono text-sm">{result}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebugPage; 