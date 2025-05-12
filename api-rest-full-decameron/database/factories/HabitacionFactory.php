<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class HabitacionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            'hotel_id' => \App\Models\Hotel::factory(), // Genera un hotel asociado
            'tipo' => $this->faker->randomElement(['estandar', 'suite', 'deluxe']),
            'acomodacion' => $this->faker->randomElement(['sencilla', 'doble', 'triple']),
            'cantidad' => $this->faker->numberBetween(1, 10),
        ];
    }
}
