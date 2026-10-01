<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['title' => ['required', 'string', 'max:150'], 'company' => ['required', 'string', 'max:150'], 'location' => ['nullable', 'string', 'max:120'], 'start_date' => ['required', 'date'], 'end_date' => ['nullable', 'date', 'after_or_equal:start_date'], 'description' => ['nullable', 'string'], 'technologies' => ['nullable', 'array'], 'technologies.*' => ['string', 'max:80'], 'current' => ['boolean'], 'display_order' => ['integer', 'min:0'], 'active' => ['boolean']];
    }
}
