<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        $id = $this->route('project')?->id;
        return [
            'category_id' => ['nullable', 'exists:categories,id'], 'title' => ['required', 'string', 'max:180'],
            'slug' => ['nullable', 'string', 'max:200', Rule::unique('projects')->ignore($id)],
            'short_description' => ['nullable', 'string', 'max:255'], 'description' => ['required', 'string'],
            'technologies' => ['nullable', 'array'], 'technologies.*' => ['string', 'max:80'],
            'technology_ids' => ['nullable', 'array'], 'technology_ids.*' => ['integer', 'exists:technologies,id'],
            'image' => ['nullable', 'string', 'max:255'], 'github_url' => ['nullable', 'url', 'max:255'], 'demo_url' => ['nullable', 'url', 'max:255'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])], 'featured' => ['boolean'],
            'display_order' => ['integer', 'min:0'], 'published_at' => ['nullable', 'date'],
        ];
    }
}
