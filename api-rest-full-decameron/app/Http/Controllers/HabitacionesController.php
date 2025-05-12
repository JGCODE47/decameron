<?php 

namespace App\Http\Controllers;

use App\Models\Habitaciones;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class HabitacionesController extends Controller
{
    public function index()
    {
        $habitaciones = Habitaciones::all();
        return response()->json($habitaciones);
    }

    public function show($id)
    {
        $habitacion = Habitaciones::findOrFail($id);
        return response()->json($habitacion);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id'    => 'required|exists:hoteles,id',
            'tipo'        => 'required|string',
            'acomodacion' => 'required|string',
            'cantidad'    => 'required|integer|min:1',
        ]);

        // Definición de combinaciones válidas
        $combinacionesValidas = [
            'estandar' => ['simple', 'doble', 'triple'],
            'junior'   => ['sencilla', 'doble', 'triple'],
            'suite'    => ['sencilla', 'doble', 'triple', 'cuadruple'],
        ];

        // Validar combinación de tipo y acomodación
        if (!isset($combinacionesValidas[$validated['tipo']])
            || !in_array($validated['acomodacion'], $combinacionesValidas[$validated['tipo']])) {
            return response()->json([
                'errors' => [
                    'error' => ['La combinación de tipo y acomodación no es válida.']
                ]
            ], 422);
        }

        // Validar duplicados
        $existe = Habitaciones::where('hotel_id', $validated['hotel_id'])
            ->where('tipo', $validated['tipo'])
            ->where('acomodacion', $validated['acomodacion'])
            ->exists();

        if ($existe) {
            return response()->json([
                'errors' => [
                    'error' => ['Ya existe una habitación con la misma combinación de hotel, tipo y acomodación.']
                ]
            ], 422);
        }

        try {
            $habitacion = Habitaciones::create($validated);
            return response()->json($habitacion, 201);
        } catch (QueryException $e) {
            return response()->json([
                'errors' => [
                    'error' => ['Error al procesar la solicitud.']
                ]
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'hotel_id'    => 'required|exists:hoteles,id',
            'tipo'        => 'required|string|max:255',
            'acomodacion' => 'required|string|max:255',
            'cantidad'    => 'required|integer|min:1',
        ]);

        $habitacion = Habitaciones::findOrFail($id);

        // Validar duplicados en actualización
        $existe = Habitaciones::where('hotel_id', $validated['hotel_id'])
            ->where('tipo', $validated['tipo'])
            ->where('acomodacion', $validated['acomodacion'])
            ->where('id', '!=', $id)
            ->exists();

        if ($existe) {
            return response()->json([
                'errors' => [
                    'error' => ['Ya existe una habitación con la misma combinación de hotel, tipo y acomodación.']
                ]
            ], 422);
        }

        $habitacion->update($validated);
        return response()->json($habitacion);
    }

    public function destroy($id)
    {
        $habitacion = Habitaciones::findOrFail($id);
        $habitacion->delete();
        return response()->json(null, 204);
    }

    public function getHabitacionesByHotel($hotelId)
    {
        $habitaciones = Habitaciones::where('hotel_id', $hotelId)->get();
        return response()->json($habitaciones);
    }

    public function getHabitacionesByTipo($tipo)
    {
        $habitaciones = Habitaciones::where('tipo', $tipo)->get();
        return response()->json($habitaciones);
    }

    public function getHabitacionesByAcomodacion($acomodacion)
    {
        $habitaciones = Habitaciones::where('acomodacion', $acomodacion)->get();
        return response()->json($habitaciones);
    }
}
