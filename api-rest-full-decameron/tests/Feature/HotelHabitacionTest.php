<?php 
namespace Tests\Feature;

use App\Models\Hotel;
use App\Models\Habitaciones;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HotelHabitacionTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function no_debe_permitir_hoteles_duplicados()
    {
        // Crear el primer hotel
        $hotel = Hotel::factory()->create([
            'nombre' => 'DECAMERON CARTAGENA',
            'nit' => '12345678-9',
        ]);

        // Intentar crear un segundo hotel con el mismo nombre y NIT
        $response = $this->postJson('/api/hoteles', [
            'nombre' => 'DECAMERON CARTAGENA',
            'nit' => '12345678-9',
            'direccion' => 'Calle Falsa 123',
            'ciudad' => 'Cartagena',
            'numero_habitaciones' => 10
        ]);

        // Esperar que se reciba un error 422 con el mensaje "Ya existe un hotel con el mismo nombre y NIT."
        $response->assertStatus(422);
        $response->assertJson([
            'errors' => [
                'error' => ['Ya existe un hotel con el mismo nombre y NIT.']
            ]
        ]);
        
    }

    /** @test */
    public function no_debe_superar_el_maximo_de_habitaciones()
    {
        $hotel = Hotel::factory()->create(['numero_habitaciones' => 10]);

        $habitaciones = [
            ['tipo' => 'estandar', 'acomodacion' => 'sencilla', 'cantidad' => 6],
            ['tipo' => 'estandar', 'acomodacion' => 'doble', 'cantidad' => 5],
        ];

        $total = 0;
        foreach ($habitaciones as $h) {
            $total += $h['cantidad'];
            $response = $this->postJson("/api/hoteles/{$hotel->id}/habitaciones", $h);
        }

        // Verificar que no se haya insertado ninguna habitación
        $this->assertGreaterThan($hotel->numero_habitaciones, $total);
        $this->assertDatabaseMissing('habitaciones', [
            'hotel_id' => $hotel->id,
            'tipo' => 'estandar',
            'acomodacion' => 'doble',
        ]);
    }

    /** @test */
    public function no_debe_permitir_combinaciones_duplicadas()
{
    $hotel = Hotel::factory()->create();

    Habitaciones::create([
        'hotel_id' => $hotel->id,
        'tipo' => 'junior',
        'acomodacion' => 'triple',
        'cantidad' => 5,
    ]);

    $response = $this->postJson("/api/habitaciones", [
        'hotel_id' => $hotel->id,
        'tipo' => 'junior',
        'acomodacion' => 'triple',
        'cantidad' => 3,
    ]);

    $response->assertStatus(422);
    $response->assertJson([
        'errors' => [
            'error' => ['Ya existe una habitación con la misma combinación de hotel, tipo y acomodación.']
        ]
    ]);
}



    public function valida_acomodaciones_correctas_por_tipo()
{
    $hotel = Hotel::factory()->create();

    // Combinaciones inválidas para testear
    $data = [
        ['tipo' => 'estandar', 'acomodacion' => 'triple'],  // 'triple' no es válido para 'estandar'
        ['tipo' => 'junior', 'acomodacion' => 'sencilla'],  // 'sencilla' es válido para 'junior'
        ['tipo' => 'suite', 'acomodacion' => 'cuadruple'],  // 'cuadruple' es válido para 'suite'
    ];

    foreach ($data as $test) {
        $response = $this->postJson("/api/habitaciones", [
            'hotel_id' => $hotel->id,
            'tipo' => $test['tipo'],
            'acomodacion' => $test['acomodacion'],
            'cantidad' => 2,
        ]);

        // Esperamos que falle para las combinaciones inválidas
        $response->assertStatus(422);
        $response->assertJson([
            'errors' => [
                'error' => ['La combinación de tipo y acomodación no es válida.']
            ]
        ]);
    }
}

}
