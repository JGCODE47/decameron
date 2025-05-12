// src/app/habitaciones/nuevo/page.tsx
'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Hotel {
  id: number;
  nombre: string;
  numero_habitaciones: number;
}

type Tipo = 'estandar' | 'junior' | 'suite';
type Acom = 'sencilla' | 'doble' | 'triple' | 'cuádruple';

interface Asignacion {
  tipo: Tipo;
  acomodacion: Acom;
  cantidad: number;
}

const tipoAcomodaciones: Record<Tipo, Acom[]> = {
  estandar: ['sencilla', 'doble'],
  junior: ['triple', 'cuádruple'],
  suite: ['sencilla', 'doble', 'triple'],
};

export default function NuevoFormulario() {
  const router = useRouter();

  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [hotelId, setHotelId] = useState<number | ''>('');
  const [maxRooms, setMaxRooms] = useState<number>(0);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Carga hoteles
  useEffect(() => {
    api.get<Hotel[]>('/hoteles')
      .then(response => {
        setHoteles(response.data);
      })
      .catch((e: AxiosError) => {
        console.error(e.message);
        setError('No se pudieron cargar los hoteles.');
      });
  }, []);

  // Al cambiar hotel, actualizar máximo y resetear asignaciones
  useEffect(() => {
    if (hotelId === '') {
      setMaxRooms(0);
      setAsignaciones([]);
    } else {
      const seleccionado = hoteles.find(h => h.id === hotelId);
      setMaxRooms(seleccionado ? seleccionado.numero_habitaciones : 0);
      setAsignaciones([]);
    }
  }, [hotelId, hoteles]);

  const addRow = () => {
    setAsignaciones(prev => [
      ...prev,
      { tipo: 'estandar', acomodacion: 'sencilla', cantidad: 1 },
    ]);
    setError('');
  };

  const updateRow = (
    index: number,
    field: keyof Asignacion,
    value: string | number
  ) => {
    setAsignaciones(prev => {
      const clone = [...prev];
      if (field === 'cantidad') {
        const parsed = Number(value);
        clone[index].cantidad = isNaN(parsed) ? 0 : parsed;
      } else {
        // tipo o acomodacion
        clone[index] = {
          ...clone[index],
          [field]: value as Asignacion[typeof field],
        };
      }
      return clone;
    });
  };

  const removeRow = (index: number) => {
    setAsignaciones(prev => prev.filter((_, i) => i !== index));
    setError('');
  };

  const totalAssigned = asignaciones.reduce((sum, a) => sum + a.cantidad, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (hotelId === '') {
      setError('Selecciona un hotel.');
      return;
    }
    if (asignaciones.length === 0) {
      setError('Agrega al menos una asignación.');
      return;
    }

    // Validar duplicados
    const seen = new Set<string>();
    for (const a of asignaciones) {
      const key = `${a.tipo}|${a.acomodacion}`;
      if (seen.has(key)) {
        setError(`Ya existe la combinación ${a.tipo} + ${a.acomodacion}.`);
        return;
      }
      seen.add(key);
    }

    if (totalAssigned > maxRooms) {
      setError(`Total ${totalAssigned} supera el máximo ${maxRooms}.`);
      return;
    }

    try {
      setLoading(true);
      await api.post('/habitaciones/bulk', {
        hotel_id: hotelId,
        asignaciones,
      });
      router.push(`/hoteles/${hotelId}`);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      setError(
        err.response?.data.message ?? 'Ocurrió un error guardando las asignaciones.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-2xl font-bold mb-6">Asignar Habitaciones</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seleccionar hotel */}
        <div>
          <label className="block font-medium mb-1">Hotel</label>
          <select
            value={hotelId}
            onChange={e =>
              setHotelId(e.target.value ? Number(e.target.value) : '')
            }
            className="w-full border rounded p-2"
          >
            <option value="">-- Selecciona un hotel --</option>
            {hoteles.map(h => (
              <option key={h.id} value={h.id} className='text-black'>
                {h.nombre} ({h.numero_habitaciones} hab.)
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar totales */}
        {hotelId !== '' && (
          <p className="text-sm text-gray-300">
            Total asignado: <strong>{totalAssigned}</strong> / {maxRooms}
          </p>
        )}

        {/* Tabla de asignaciones */}
        {hotelId !== '' && (
          <div className="border rounded p-4 bg-gray-500">
            <button
              type="button"
              onClick={addRow}
              className="mb-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              + Agregar línea
            </button>

            {asignaciones.map((a, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 items-end mb-3"
              >
                {/* Tipo */}
                <div>
                  <label className="block text-sm">Tipo</label>
                  <select
                    className="w-full border rounded p-1"
                    value={a.tipo}
                    onChange={e =>
                      updateRow(i, 'tipo', e.target.value as Tipo)
                    }
                  >
                    {Object.keys(tipoAcomodaciones).map(key => (
                      <option key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Acomodación */}
                <div>
                  <label className="block text-sm">Acomodación</label>
                  <select
                    className="w-full border rounded p-1"
                    value={a.acomodacion}
                    onChange={e =>
                      updateRow(i, 'acomodacion', e.target.value as Acom)
                    }
                  >
                    {(tipoAcomodaciones[a.tipo] || []).map(opt => (
                      <option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cantidad */}
                <div>
                  <label className="block text-sm">Cantidad</label>
                  <input
                    type="number"
                    min={1}
                    className="w-full border rounded p-1"
                    value={a.cantidad}
                    onChange={e => updateRow(i, 'cantidad', e.target.value)}
                  />
                </div>

                {/* Eliminar */}
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {loading ? 'Guardando...' : 'Guardar asignaciones'}
        </button>
      </form>
    </div>
  );
}
