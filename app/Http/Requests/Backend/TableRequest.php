<?php

namespace App\Http\Requests\Backend;

use Illuminate\Foundation\Http\FormRequest;

class TableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'per_page' => 'required|integer',
            'page' => 'required|integer',
            'sort_by' => 'sometimes|filled',
            'sort_direction' => 'required|in:asc,desc',
            'filter' => 'sometimes|filled|string',
        ];
    }
}
