'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Hotel {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  nit: string;
  numero_habitaciones: number;
}

export default function HotelesPage() {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);

  useEffect(() => {
    api.get<Hotel[]>('/hoteles')
      .then(res => setHoteles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Hoteles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hoteles.map((h) => (
          <div
            key={h.id}
            onClick={() => window.location.href = `/habitaciones/${h.id}`}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-black mb-2">{h.nombre}</h2>
            <p className="text-gray-700">📍 {h.ciudad}, {h.direccion}</p>
            <p className="text-gray-600">NIT: {h.nit}</p>
            <p className="text-gray-600">🛏️ Habitaciones: {h.numero_habitaciones}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
