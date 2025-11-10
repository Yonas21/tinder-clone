<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PersonController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/people",
     *     tags={"People"},
     *     summary="Get recommended people list",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Items per page",
     *         required=false,
     *         @OA\Schema(type="integer", default=10)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $userId = Auth::id();
        $perPage = $request->get('per_page', 10);

        // Get people that user hasn't liked or disliked yet
        $people = Person::whereDoesntHave('likes', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->with(['pictures' => function ($query) {
            $query->orderBy('is_primary', 'desc')->orderBy('order');
        }])
        ->paginate($perPage);

        return response()->json($people);
    }

    /**
     * @OA\Post(
     *     path="/api/people/{id}/like",
     *     tags={"People"},
     *     summary="Like a person",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Person liked successfully"
     *     )
     * )
     */
    public function like($id): JsonResponse
    {
        $userId = Auth::id();
        $person = Person::findOrFail($id);

        // Check if already liked or disliked
        $existingLike = Like::where('user_id', $userId)
            ->where('person_id', $id)
            ->first();

        if ($existingLike) {
            return response()->json([
                'message' => 'You have already ' . $existingLike->action . 'd this person'
            ], 400);
        }

        // Create like
        Like::create([
            'user_id' => $userId,
            'person_id' => $id,
            'action' => 'like',
        ]);

        $likeCount = $person->fresh()->like_count;

        return response()->json([
            'message' => 'Person liked successfully',
            'like_count' => $likeCount,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/people/{id}/dislike",
     *     tags={"People"},
     *     summary="Dislike a person",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Person disliked successfully"
     *     )
     * )
     */
    public function dislike($id): JsonResponse
    {
        $userId = Auth::id();
        $person = Person::findOrFail($id);

        // Check if already liked or disliked
        $existingLike = Like::where('user_id', $userId)
            ->where('person_id', $id)
            ->first();

        if ($existingLike) {
            return response()->json([
                'message' => 'You have already ' . $existingLike->action . 'd this person'
            ], 400);
        }

        // Create dislike
        Like::create([
            'user_id' => $userId,
            'person_id' => $id,
            'action' => 'dislike',
        ]);

        return response()->json([
            'message' => 'Person disliked successfully',
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/people/liked",
     *     tags={"People"},
     *     summary="Get liked people list",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Items per page",
     *         required=false,
     *         @OA\Schema(type="integer", default=10)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
    public function liked(Request $request): JsonResponse
    {
        $userId = Auth::id();
        $perPage = $request->get('per_page', 10);

        $likedPeople = Person::whereHas('likes', function ($query) use ($userId) {
            $query->where('user_id', $userId)->where('action', 'like');
        })
        ->with(['pictures' => function ($query) {
            $query->orderBy('is_primary', 'desc')->orderBy('order');
        }])
        ->paginate($perPage);

        return response()->json($likedPeople);
    }
}
