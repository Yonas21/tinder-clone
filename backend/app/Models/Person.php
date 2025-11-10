<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Person extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'age',
        'gender',
        'interested_in',
        'location',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'age' => 'integer',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public function pictures(): HasMany
    {
        return $this->hasMany(Picture::class)->orderBy('is_primary', 'desc')->orderBy('order');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class)->where('action', 'like');
    }

    public function primaryPicture()
    {
        return $this->hasOne(Picture::class)->where('is_primary', true);
    }

    public function getLikeCountAttribute(): int
    {
        return $this->likes()->count();
    }
}

