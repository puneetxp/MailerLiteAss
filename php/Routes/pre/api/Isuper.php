<?php

use App\Controller\Isuper\IsuperStatusController;
use App\Controller\Isuper\IsuperSubscriberController; 

$isuper = array (
  'path' => '/isuper',
  'child' => 
  array (
    0 => 
    array (
      'path' => '/status',
      'crud' => 
      array (
        "class" => IsuperStatusController::class,
        'crud' => 
        array (
          0 => 'c',
          1 => 'r',
          2 => 'u',
          3 => 'a',
          4 => 'p',
        ),
      ),
    ),
    1 => 
    array (
      'path' => '/subscriber',
      'crud' => 
      array (
        "class" => IsuperSubscriberController::class,
        'crud' => 
        array (
          0 => 'c',
          1 => 'r',
          2 => 'u',
          3 => 'a',
          4 => 'p',
        ),
      ),
    ),
  ),
  'roles' => 
  array (
    0 => 'isuper',
  ),
);

