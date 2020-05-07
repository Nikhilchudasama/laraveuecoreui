<?php

namespace App\Services\Backend;


use App\User;

class UserService
{
    /**
     * Returns the paginated user records and total users count for the table.
     *
     * @return array
     **/
    public static function records()
    {
        $users = User::query()
            ->when($filter = request('filter'), function ($query) use ($filter) {
                $query->where(function ($query) use ($filter) {
                    $query->where('name', 'like', '%' . $filter . '%');
                });
            })
            ->when(!request('sort_by'), function ($query) {
                $query->orderBy('created_at', 'desc');
            })
            ->when(request('sort_by'), function ($query) {
                $query->orderBy(request('sort_by'), request('sort_direction'));
            })
            ->paginate(request('per_page'));

        return [
            $users->getCollection(),
            $users->total()
        ];
    }
}
