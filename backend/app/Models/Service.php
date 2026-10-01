<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'description', 'icon', 'display_order', 'active'];
    protected $casts = ['active' => 'boolean'];
    public function getRouteKeyName(): string { return 'slug'; }
}
