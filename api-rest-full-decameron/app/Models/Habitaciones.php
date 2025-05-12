<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Hotel;
use Exception;

class Habitaciones extends Model
{
    use HasFactory;

    protected $table = 'habitaciones'; // Nombre de la tabla en la base de datos
    protected $fillable = [
        'hotel_id', 
        'tipo', 
        'acomodacion', 
        'cantidad',
    ]; // Campos que se pueden llenar masivamente

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($habitacion) {
            // Verificar si ya existe una combinación duplicada de tipo y acomodación en el mismo hotel
            $existeCombinacion = Habitaciones::where('hotel_id', $habitacion->hotel_id)
                ->where('tipo', $habitacion->tipo)
                ->where('acomodacion', $habitacion->acomodacion)
                ->exists();

            if ($existeCombinacion) {
                throw new Exception('Ya existe una habitación con la misma combinación de tipo y acomodación en este hotel.');
            }

            // Verificar si la cantidad de habitaciones no excede el límite del hotel
            $hotel = Hotel::find($habitacion->hotel_id);
            if ($hotel) {
                $habitacionesTotales = Habitaciones::where('hotel_id', $habitacion->hotel_id)->sum('cantidad');
                if ($habitacionesTotales + $habitacion->cantidad > $hotel->numero_habitaciones) {
                    throw new Exception('La cantidad de habitaciones supera el límite permitido en este hotel.');
                }
            }
        });
    }
}
