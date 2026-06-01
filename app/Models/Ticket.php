<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'status', 'priority', 'user_submitter_id', 'user_asignee_id', 'category_id'];

    public function submitter()
    {
        return $this->belongsTo(User::class);
    }

    public function asignee()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
