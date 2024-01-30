<?php

namespace App\Model;

use App\Model;

class Status extends Model {
    public $model = ["id","created_at","updated_at","name"];
    public $name = "status";
    public $nullable = [];
    protected $enable = false;
    protected $table = "statuses";
    protected $relations = ['subscriber'=>['table'=>'subscribers','name'=>'id','key'=>'status_id','callback'=>Subscriber::class]];
    protected $fillable = ["name"];
}
