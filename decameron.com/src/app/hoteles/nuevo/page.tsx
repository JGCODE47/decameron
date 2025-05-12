'use client';

import React, { useState } from 'react';
import { crearHotel } from '@/app/services/hotelService';
import { AxiosError } from 'axios';

// Definir la interfaz del hotel (la misma que en el servicio)
interface Hotel {
  id?: number; // Opcional, ya que no se necesita al crear un hotel
  nombre: string;
  direccion: string;
  ciudad: string;
  nit: string;
  numero_habitaciones: number;
}

const FormCrearHotel = () => {
  // Estado para almacenar los datos del formulario
  const [hotelData, setHotelData] = useState<Hotel>({
    nombre: '',
    direccion: '',
    ciudad: '',
    nit: '',
    numero_habitaciones: 0,
  });

  // Estado para gestionar el mensaje de error o éxito
  const [mensaje, setMensaje] = useState<string>('');

  // Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHotelData({
      ...hotelData,
      [name]: value,
    });
  };



// Función para manejar el envío del formulario
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Llamamos al servicio para crear el hotel
    await crearHotel(hotelData);
    setMensaje('Hotel creado exitosamente');
    // Limpiar los campos del formulario
    setHotelData({
      nombre: '',
      direccion: '',
      ciudad: '',
      nit: '',
      numero_habitaciones: 0,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      // Si el error tiene una respuesta (por ejemplo, 422 Unprocessable Content)
      if (error.response) {
        console.error('Error detalle:', error.response.data);
        // Aquí puedes personalizar el mensaje en función de los detalles del error
        if (error.response.status === 422) {
          // Ejemplo: Si el error es 422, se muestra el mensaje específico
          setMensaje(error.response.data.errors.error[0]);
        } else {
          setMensaje('Hubo un error al crear el hotel: ' + error.response.data.message);
        }
      } else {
        setMensaje('Error desconocido');
      }
    } else {
      console.error('Error:', error);
      setMensaje('Hubo un error inesperado');
    }
  }
};


return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Crear un Nuevo Hotel</h2>
  
        {mensaje && (
          <p className="mb-4 text-center text-sm font-medium text-red-500">{mensaje}</p>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Nombre del Hotel
            </label>
            <input
              type="text"
              name="nombre"
              value={hotelData.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-black mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={hotelData.direccion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-black mb-1">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={hotelData.ciudad}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-black mb-1">NIT</label>
            <input
              type="text"
              name="nit"
              value={hotelData.nit}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Número de Habitaciones
            </label>
            <input
              type="number"
              name="numero_habitaciones"
              value={hotelData.numero_habitaciones}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Crear Hotel
          </button>
        </form>
      </div>
    </div>
  );
}  
export default FormCrearHotel;
