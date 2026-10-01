<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        $id = $this->route('category')?->id;
        return ['name' => ['required', 'string', 'max:100'], 'slug' => ['required', 'string', 'max:120', Rule::unique('categories')->ignore($id)], 'description' => ['nullable', 'string'], 'active' => ['boolean'], 'display_order' => ['integer', 'min:0']];
    }
}
