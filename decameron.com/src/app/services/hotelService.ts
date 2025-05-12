import axios from 'axios';

interface Hotel {
    id?: number; // Opcional, ya que no se necesita al crear un hotel
    nombre: string;
    ciudad: string;
    direccion: string;
    nit: string;
    numero_habitaciones: number;
  }
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const getHoteles = async () => {
  try {
    const response = await axios.get(`${API_URL}/hoteles`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener hoteles', error);
    throw error;
  }
};

export const crearHotel = async (hotelData: Hotel) => {
  try {
    const response = await axios.post(`${API_URL}/hoteles`, hotelData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el hotel', error);
    throw error;
  }
};
