<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->unique()->company . ' HOTEL',
            'direccion' => $this->faker->streetAddress,
            'ciudad' => $this->faker->city,
            'nit' => $this->faker->unique()->numerify('########-#'),
            'numero_habitaciones' => $this->faker->numberBetween(10, 100),
        ];
    }
}
