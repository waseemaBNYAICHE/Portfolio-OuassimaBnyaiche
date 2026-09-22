<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'technologies',
        'image',
        'github_url',
        'demo_url',
        'status',
        'featured',
        'display_order',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'technologies' => 'array',
            'featured' => 'boolean',
            'display_order' => 'integer',
            'published_at' => 'datetime',
        ];
    }
    public function getRouteKeyName(): string
{
    return 'slug';
}
}
