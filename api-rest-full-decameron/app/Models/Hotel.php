<?php 

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;

class Hotel extends Model
{
    use HasFactory;

    protected $table = 'hoteles';
    protected $fillable = [
        'nombre',
        'direccion',
        'ciudad',
        'nit',
        'numero_habitaciones',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($hotel) {
            // Verificar si ya existe un hotel con el mismo nombre y NIT
            $existe = Hotel::where('nombre', $hotel->nombre)
                ->where('nit', $hotel->nit)
                ->exists();

            if ($existe) {
                // Lanzar una QueryException para que el test pueda manejarlo correctamente
                // Lanzar una excepción genérica en lugar de QueryException
                throw new Exception('Ya existe un hotel con el mismo nombre y NIT.');
            }
        });
    }
}
