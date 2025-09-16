<?php
// app/Models/Setting.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'contact_phone',
        'contact_whatsapp',
        'contact_email',
        "url_image_hero",
        "public_id",
        'promo_code',
    ];
}
