<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return ['name' => ['required', 'string', 'max:100'], 'category' => ['nullable', 'string', 'max:80'], 'icon' => ['nullable', 'string', 'max:255'], 'proficiency' => ['integer', 'between:0,100'], 'display_order' => ['integer', 'min:0'], 'active' => ['boolean']]; }
}
