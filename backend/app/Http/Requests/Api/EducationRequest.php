<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class EducationRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['diploma' => ['required', 'string', 'max:180'], 'institution' => ['required', 'string', 'max:180'], 'location' => ['nullable', 'string', 'max:120'], 'start_date' => ['required', 'date'], 'end_date' => ['nullable', 'date', 'after_or_equal:start_date'], 'description' => ['nullable', 'string'], 'display_order' => ['integer', 'min:0'], 'active' => ['boolean']];
    }
}
