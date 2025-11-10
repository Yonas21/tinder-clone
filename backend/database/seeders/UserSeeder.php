<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Person;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        Person::create([
            'user_id' => $user->id,
            'name' => 'Test User',
            'age' => 30,
            'gender' => 'male',
            'interested_in' => 'female',
            'location' => 'San Francisco, CA',
            'latitude' => 37.7749,
            'longitude' => -122.4194,
        ]);
    }
}
