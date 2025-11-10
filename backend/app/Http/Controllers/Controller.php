<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Tinder Clone API",
 *     description="API documentation for Tinder Clone application",
 *     @OA\Contact(
 *         email="admin@tinderclone.com"
 *     )
 * )
 * @OA\Server(
 *     url="http://localhost:8000",
 *     description="Local development server"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="token",
 *     description="Enter token in the format: Bearer {token}"
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
