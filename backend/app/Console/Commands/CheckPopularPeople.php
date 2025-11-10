<?php

namespace App\Console\Commands;

use App\Models\NotificationSent;
use App\Models\Person;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class CheckPopularPeople extends Command
{
    protected $signature = 'people:check-popular';
    protected $description = 'Check for people with 50+ likes and send email to admin';

    public function handle(): void
    {
        $people = Person::withCount('likes')
            ->having('likes_count', '>=', 50)
            ->get();

        foreach ($people as $person) {
            // Check if notification already sent
            $alreadyNotified = NotificationSent::where('person_id', $person->id)
                ->where('like_count', $person->likes_count)
                ->exists();

            if (!$alreadyNotified) {
                // Send email to admin
                $adminEmail = config('mail.admin_email', 'admin@example.com');
                
                Mail::raw(
                    "Person '{$person->name}' (ID: {$person->id}) has received {$person->likes_count} likes!",
                    function ($message) use ($adminEmail, $person) {
                        $message->to($adminEmail)
                            ->subject("Popular Person Alert: {$person->name}");
                    }
                );

                // Record that notification was sent
                NotificationSent::create([
                    'person_id' => $person->id,
                    'like_count' => $person->likes_count,
                    'sent_at' => now(),
                ]);

                $this->info("Notification sent for person: {$person->name} ({$person->likes_count} likes)");
            }
        }

        $this->info('Popular people check completed');
    }
}

