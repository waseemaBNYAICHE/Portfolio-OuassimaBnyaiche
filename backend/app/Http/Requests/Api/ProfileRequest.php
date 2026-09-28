<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'full_name' => ['required', 'string', 'max:120'], 'headline' => ['required', 'string', 'max:180'],
            'bio' => ['nullable', 'string'], 'photo' => ['nullable', 'string', 'max:255'], 'cv_url' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:120'], 'availability' => ['nullable', 'string', 'max:50'],
            'phone' => ['nullable', 'string', 'max:30'], 'email_public' => ['nullable', 'email', 'max:255'],
        ];
    }
}
