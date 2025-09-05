<?php

// app/Models/Blog.php
namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'excerpt',
        "image_blog",
        'content',
        'author',
        
        'category',
        'status',
        
    ];
}
