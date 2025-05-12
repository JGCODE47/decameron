// src/app/hoteles/page.tsx
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
    <div className="p-4">
      <h1 className="text-2xl mb-4">Hoteles</h1>
      <ul>
        {hoteles.map(h => (
          <li key={h.id}>
            {h.nombre} — {h.ciudad} - {h.direccion} — {h.nit}
          </li>
        ))}
      </ul>
    </div>
  );
}
