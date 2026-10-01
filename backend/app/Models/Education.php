<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;
    protected $table = 'educations';

    protected $fillable = ['diploma', 'institution', 'location', 'start_date', 'end_date', 'description', 'display_order', 'active'];
    protected $casts = ['start_date' => 'date', 'end_date' => 'date', 'active' => 'boolean'];
}
