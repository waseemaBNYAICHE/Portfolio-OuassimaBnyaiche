<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TechnologyRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        $id = $this->route('technology')?->id;
        return ['name' => ['required', 'string', 'max:100'], 'slug' => ['required', 'string', 'max:120', Rule::unique('technologies')->ignore($id)], 'icon' => ['nullable', 'string', 'max:255'], 'color' => ['nullable', 'string', 'max:20'], 'active' => ['boolean']];
    }
}
