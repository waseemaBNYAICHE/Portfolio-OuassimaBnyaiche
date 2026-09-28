<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'active', 'display_order'];
    protected $casts = ['active' => 'boolean'];

    public function projects() { return $this->hasMany(Project::class); }
    public function getRouteKeyName(): string { return 'slug'; }
}
