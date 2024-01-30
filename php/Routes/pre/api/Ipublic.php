<?php

use App\Controller\Ipublic\IpublicStatusController;
use App\Controller\Ipublic\IpublicSubscriberController; 

$ipublic = array (
  'path' => '/ipublic',
  'child' => 
  array (
    0 => 
    array (
      'path' => '/status',
      'crud' => 
      array (
        "class" => IpublicStatusController::class,
        'crud' => 
        array (
          0 => 'c',
          1 => 'r',
          2 => 'd',
          3 => 'w',
          4 => 'u',
          5 => 'a',
          6 => 'p',
        ),
      ),
    ),
    1 => 
    array (
      'path' => '/subscriber',
      'crud' => 
      array (
        "class" => IpublicSubscriberController::class,
        'crud' => 
        array (
          0 => 'c',
          1 => 'r',
          2 => 'd',
          3 => 'w',
          4 => 'u',
          5 => 'a',
          6 => 'p',
        ),
      ),
    ),
  ),
);

