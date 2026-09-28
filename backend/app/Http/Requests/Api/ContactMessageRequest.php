<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ContactMessageRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return ['name' => ['required', 'string', 'max:120'], 'email' => ['required', 'email', 'max:255'], 'subject' => ['nullable', 'string', 'max:180'], 'message' => ['required', 'string', 'min:10', 'max:5000']]; }
}
