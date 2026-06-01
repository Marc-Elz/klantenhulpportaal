<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'user_submitter_id' => 'nullable|integer', // Should not be decided in frontend, otherwise users can submit tickets in the name of other users?
            'description' => 'sometimes|string',
            'status' => 'sometimes|string', // status will always be unresolved on creation?
            'priority' => 'sometimes|string',
            // 'user_asignee_id' => '',
            // 'category_id' => '',


        ];
    }
}
