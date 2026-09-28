<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technology extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'icon', 'color', 'active'];
    protected $casts = ['active' => 'boolean'];

    public function projects() { return $this->belongsToMany(Project::class)->withTimestamps(); }
    public function getRouteKeyName(): string { return 'slug'; }
}
