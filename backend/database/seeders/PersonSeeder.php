<?php

namespace Database\Seeders;

use App\Models\Person;
use App\Models\Picture;
use Illuminate\Database\Seeder;

class PersonSeeder extends Seeder
{
    public function run(): void
    {
        $people = [
            [
                'name' => 'Emma Johnson',
                'age' => 28,
                'location' => 'New York, NY',
                'latitude' => 40.7128,
                'longitude' => -74.0060,
                'pictures' => [
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
                ],
            ],
            [
                'name' => 'Michael Chen',
                'age' => 32,
                'location' => 'Los Angeles, CA',
                'latitude' => 34.0522,
                'longitude' => -118.2437,
                'pictures' => [
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
                ],
            ],
            [
                'name' => 'Sarah Williams',
                'age' => 26,
                'location' => 'Chicago, IL',
                'latitude' => 41.8781,
                'longitude' => -87.6298,
                'pictures' => [
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
                ],
            ],
            [
                'name' => 'David Brown',
                'age' => 35,
                'location' => 'Houston, TX',
                'latitude' => 29.7604,
                'longitude' => -95.3698,
                'pictures' => [
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
                ],
            ],
            [
                'name' => 'Jessica Martinez',
                'age' => 29,
                'location' => 'Phoenix, AZ',
                'latitude' => 33.4484,
                'longitude' => -112.0740,
                'pictures' => [
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
                ],
            ],
        ];

        foreach ($people as $personData) {
            $pictures = $personData['pictures'];
            unset($personData['pictures']);

            $person = Person::create($personData);

            foreach ($pictures as $index => $url) {
                Picture::create([
                    'person_id' => $person->id,
                    'url' => $url,
                    'is_primary' => $index === 0,
                    'order' => $index,
                ]);
            }
        }
    }
}

