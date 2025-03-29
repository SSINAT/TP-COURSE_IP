<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Payment extends Model
{
    protected $fillable = ['payment_date', 'payment_method', 'amount', 'customer_id', 'order_id'];


    public function customer() {
        return $this->belongsTo(Customer::class);
    }
    public function orders() {
        return $this->hasMany(Order::class);
    }
    protected function paymentDate(): Attribute {
        return Attribute::make(
            get: fn ($value) => Carbon::createFromFormat('Y-m-d H:i:s', $value)->format("d/m/Y H:i:s"),
            set: fn ($value) => Carbon::createFromFormat('d/m/Y H:i:s', $value)->format("Y-m-d H:i:s")
        );
    }
   
}