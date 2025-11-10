<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PersonController extends Controller
{
    public function getPeople(Request $request): JsonResponse
    {
        $user = Auth::user();
        $people = Person::query()
            ->where('gender', $user->person->interested_in)
            ->where('id', '!=', $user->person->id)
            ->with('pictures')
            ->get();

        return response()->json($people);
    }
}
