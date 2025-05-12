// src/app/hoteles/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

// Interfaz de las habitaciones
interface Habitacion {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number; // Puedes añadir otros campos que necesites
}

// Interfaz del hotel (no es necesario cambiar esto)
interface Hotel {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  nit: string;
  numero_habitaciones: number;
}

export default function HotelDetailPage() {
  const params = useParams();
  const id = params?.id as string; // Obtener el ID del parámetro de la URL

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]); // Usamos Habitacion[] para mayor precisión
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Usamos la variable de entorno para la URL de la API

  useEffect(() => {
    if (!id || !apiUrl) return;

    // Primero obtenemos los datos del hotel
    axios.get(`${apiUrl}/hoteles/${id}`)
      .then((response) => {
        const hotelData = response.data;
        if (!hotelData.id) {
          setError("Hotel no encontrado");
          return;
        }
        setHotel(hotelData);

        // Ahora obtenemos las habitaciones asociadas con este hotel
        axios.get(`${apiUrl}/habitaciones?hotel_id=${id}`)
          .then((habitacionesResponse) => {
            const habitacionesData: Habitacion[] = habitacionesResponse.data; // Usamos Habitacion[] para tipar correctamente
            if (habitacionesData.length === 0) {
              setError("No hay habitaciones disponibles para este hotel");
            } else {
              setHabitaciones(habitacionesData);
            }
          })
          .catch(() => {
            setError("Error al obtener las habitaciones");
          });
      })
      .catch(() => {
        setError("Error al obtener el hotel");
      });
  }, [id, apiUrl]); // Dependencia de id y apiUrl para asegurar que se ejecuta correctamente

  if (error) {
    return <div className="text-white p-6">{error}</div>;
  }

  if (!hotel) {
    return <div className="text-white p-6">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">{hotel.nombre}</h1>
      <p>📍 {hotel.ciudad}, {hotel.direccion}</p>
      <p>NIT: {hotel.nit}</p>
      <p>🛏️ Habitaciones: {hotel.numero_habitaciones}</p>

      {/* Mostrar habitaciones si las hay */}
      {habitaciones.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Habitaciones</h2>
          <ul>
            {habitaciones.map((habitacion) => (
              <li key={habitacion.id} className="mb-4 p-4 border border-gray-600 rounded-lg">
                <p className="text-lg font-semibold">{habitacion.nombre}</p>
                <p className="text-sm">{habitacion.descripcion}</p>
                <p className="text-sm text-gray-400">Precio: ${habitacion.precio}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
