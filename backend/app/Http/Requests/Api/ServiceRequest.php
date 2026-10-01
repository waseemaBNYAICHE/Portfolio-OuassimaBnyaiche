<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        $id = $this->route('service')?->id;
        return ['title' => ['required', 'string', 'max:150'], 'slug' => ['required', 'string', 'max:170', Rule::unique('services')->ignore($id)], 'description' => ['required', 'string'], 'icon' => ['nullable', 'string', 'max:255'], 'display_order' => ['integer', 'min:0'], 'active' => ['boolean']];
    }
}
