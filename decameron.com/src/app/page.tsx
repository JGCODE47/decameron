'use client'

import { useRouter } from 'next/navigation'








const Home = () => {


const router = useRouter();
const routeCreateHotel = '/hoteles/nuevo'
const routeCreateHotelRoom = '/hoteles/habitaciones/nuevo'

const handelChangenRoute = (routeCreateHotel : string) => {
  // Handle the route change here
  router.push(routeCreateHotel);

}

  return (
       
    <div className="flex flex-col items-center justify-center h-screen bg-gray">
      <h1 className="text-4xl font-bold mb-4">Bienvenidos a Decameron</h1>
      <p className="text-lg text-gray-700">Selecciona un tipo de accion.</p>
      <button 
      className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => handelChangenRoute(routeCreateHotel)}  
     
      
      >
      
        Create hotel
      </button>
      <button 
      className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
         onClick={() => handelChangenRoute(routeCreateHotelRoom)}  
      >
        Crear habitaciones de hotel
      </button>
    </div>
  )
}

export default Home
