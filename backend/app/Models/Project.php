<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'title', 'slug', 'short_description', 'description', 'technologies', 'image', 'github_url', 'demo_url', 'status', 'featured', 'display_order', 'published_at'];

    protected $casts = ['technologies' => 'array', 'featured' => 'boolean', 'published_at' => 'datetime'];

    public function category() { return $this->belongsTo(Category::class); }
    public function technologyItems() { return $this->belongsToMany(Technology::class)->withTimestamps(); }
    public function getRouteKeyName(): string { return 'slug'; }
}
