<?php

return [
    'defaults' => [
        'routes' => [
            'docs' => 'docs',
            'oauth2_callback' => 'api/oauth2-callback',
            'middleware' => [
                'api' => [],
                'asset' => [],
                'docs' => [],
            ],
        ],
        'paths' => [
            'use_absolute_path' => env('L5_SWAGGER_USE_ABSOLUTE_PATH', false),
            'docs' => storage_path('api-docs'),
            'docs_json' => 'api-docs.json',
            'docs_yaml' => 'api-docs.yaml',
            'format_to_use' => env('L5_SWAGGER_FORMAT', 'json'),
            'annotations' => [
                base_path('app'),
            ],
            'excludes' => [],
            'base' => env('L5_SWAGGER_BASE_PATH', null),
            'swagger_version' => env('SWAGGER_VERSION', '3.0.0'),
            'views' => base_path('resources/views/vendor/l5-swagger'),
        ],

        'proxy' => false,
        'securityDefinitions' => [
            'securitySchemes' => [
                'sanctum' => [
                    'type' => 'http',
                    'description' => 'Enter token in the format: Bearer {token}',
                    'scheme' => 'bearer',
                    'bearerFormat' => 'JWT',
                ],
            ],
            'security' => [
                [
                    'sanctum' => [],
                ],
            ],
        ],
    ],
    'default' => 'default',
    'documentations' => [
        'default' => [
            'api' => [
                'title' => 'Tinder Clone API',
            ],
            'proxy' => false,
            'generate_always' => env('L5_SWAGGER_GENERATE_ALWAYS', false),
            'operations_sort' => env('L5_SWAGGER_OPERATIONS_SORT', null),
            'additional_config_url' => null,
            'validator_url' => null,
            'routes' => [
                'api' => 'api/documentation',
            ],
            'paths' => [
                'use_absolute_path' => env('L5_SWAGGER_USE_ABSOLUTE_PATH', false),
                'docs' => storage_path('api-docs'),
                'docs_json' => 'api-docs.json',
                'docs_yaml' => 'api-docs.yaml',
                'format_to_use_for_docs' => env('L5_SWAGGER_FORMAT', 'json'),
                'annotations' => [
                    base_path('app/Http/Controllers'),
                ],
                'excludes' => [],
                'base' => env('L5_SWAGGER_BASE_PATH', null),
                'swagger_version' => env('SWAGGER_VERSION', '3.0.0'),
                'views' => base_path('resources/views/vendor/l5-swagger'),
            ],
        ],
    ],
];