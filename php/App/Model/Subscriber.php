<?php

namespace App\Model;

use App\Model;

class Subscriber extends Model
{
    public $model = ["id", "created_at", "updated_at", "name", "lastname", "email", "phone", "status_id"];
    public $view = ["id", "name", "lastname", "email", "phone", "status_id"];
    public $name = "subscriber";
    public $nullable = ["phone"];
    protected $enable = false;
    protected $table = "subscribers";
    protected $relations = ['status' => ['table' => 'statuses', 'name' => 'status_id', 'key' => 'id', 'callback' => Status::class]];
    protected $fillable = ["name", "lastname", "email", "phone", "status_id"];
}
