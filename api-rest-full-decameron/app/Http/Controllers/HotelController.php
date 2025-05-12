<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotel; // Asegúrate de importar el modelo Hotel
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException; // Para manejar excepciones de base de datos

class HotelController extends Controller
{
    public function index()
    {
        // Lógica para obtener la lista de hoteles
        $hoteles = Hotel::all();
        return response()->json($hoteles);
    }

    public function show($id)
    {
        // Lógica para obtener un hotel específico por su ID
        $hotel = Hotel::findOrFail($id);
        return response()->json($hotel);
    }

    public function store(Request $request)
    {
        // Validación de los datos de entrada
        $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'nit' => 'required|string|max:255',
            'numero_habitaciones' => 'required|integer|min:1',
        ]);

        // Validar que no exista un hotel con el mismo nombre y NIT
        $existe = Hotel::where('nombre', $request->nombre)
                       ->where('nit', $request->nit)
                       ->exists();

        if ($existe) {
            // Lanzar una validación personalizada si ya existe el hotel
            throw ValidationException::withMessages([
                'error' => 'Ya existe un hotel con el mismo nombre y NIT.',
            ]);
        }

        try {
            // Si pasa la validación, crear el hotel
            $hotel = Hotel::create($request->all());
            return response()->json($hotel, 201); // Respuesta con el nuevo hotel creado
        } catch (QueryException $e) {
            // Si ocurre un error en la base de datos (por ejemplo, una violación de restricción de base de datos)
            return response()->json(['error' => 'Error al crear el hotel.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Lógica para actualizar un hotel existente
        $hotel = Hotel::findOrFail($id);

        // Validación de los datos de entrada
        $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'nit' => 'required|string|max:255',
            'numero_habitaciones' => 'required|integer|min:1',
        ]);

        // Validar que no exista otro hotel con el mismo nombre y NIT, excluyendo el hotel actual
        $existe = Hotel::where('nombre', $request->nombre)
                       ->where('nit', $request->nit)
                       ->where('id', '!=', $id) // Excluir el hotel actual
                       ->exists();

        if ($existe) {
            // Si ya existe otro hotel con el mismo nombre y NIT, lanzar una excepción
            return response()->json(['error' => 'Ya existe un hotel con el mismo nombre y NIT.'], 400);
        }

        // Si pasa la validación, actualizar el hotel
        $hotel->update($request->all());
        return response()->json($hotel); // Respuesta con el hotel actualizado
    }

    public function destroy($id)
    {
        // Lógica para eliminar un hotel
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();
        return response()->json(null, 204); // Respuesta sin contenido, indicando que fue eliminado
    }
}
