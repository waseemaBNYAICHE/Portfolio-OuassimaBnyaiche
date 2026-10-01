<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'company', 'location', 'start_date', 'end_date', 'description', 'technologies', 'current', 'display_order', 'active'];
    protected $casts = ['start_date' => 'date', 'end_date' => 'date', 'technologies' => 'array', 'current' => 'boolean', 'active' => 'boolean'];
}
