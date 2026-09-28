<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class SocialLinkRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return ['platform' => ['required', 'string', 'max:80'], 'url' => ['required', 'url', 'max:255'], 'icon' => ['nullable', 'string', 'max:255'], 'display_order' => ['integer', 'min:0'], 'active' => ['boolean']]; }
}
