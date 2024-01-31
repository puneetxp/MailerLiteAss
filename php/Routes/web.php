<?php
$route =array (
  'GET' =>
  array (
    0 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicStatusController::class ,
        1 => 'all',
      ),
      'path' => 'api/ipublic/status',
      'n' => 3,
    ),
    1 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicStatusController::class ,
        1 => 'show',
      ),
      'path' => 'api/ipublic/status/.+',
      'n' => 4,
    ),
    2 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicSubscriberController::class ,
        1 => 'all',
      ),
      'path' => 'api/ipublic/subscriber',
      'n' => 3,
    ),
    3 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicSubscriberController::class ,
        1 => 'show',
      ),
      'path' => 'api/ipublic/subscriber/.+',
      'n' => 4,
    ),
  ),
  'POST' =>
  array (
    0 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicStatusController::class ,
        1 => 'where',
      ),
      'path' => 'api/ipublic/status/where',
      'n' => 4,
    ),
    1 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicStatusController::class ,
        1 => 'store',
      ),
      'path' => 'api/ipublic/status',
      'n' => 3,
    ),
    2 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicSubscriberController::class ,
        1 => 'where',
      ),
      'path' => 'api/ipublic/subscriber/where',
      'n' => 4,
    ),
    3 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicSubscriberController::class ,
        1 => 'store',
      ),
      'path' => 'api/ipublic/subscriber',
      'n' => 3,
    ),
  ),
  'PATCH' =>
  array (
    0 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicStatusController::class ,
        1 => 'update',
      ),
      'path' => 'api/ipublic/status/.+',
      'n' => 4,
    ),
    1 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicSubscriberController::class ,
        1 => 'update',
      ),
      'path' => 'api/ipublic/subscriber/.+',
      'n' => 4,
    ),
  ),
  'PUT' =>
  array (
    0 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicStatusController::class ,
        1 => 'upsert',
      ),
      'path' => 'api/ipublic/status',
      'n' => 3,
    ),
    1 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicSubscriberController::class ,
        1 => 'upsert',
      ),
      'path' => 'api/ipublic/subscriber',
      'n' => 3,
    ),
  ),
  'DELETE' =>
  array (
    0 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicStatusController::class ,
        1 => 'delete',
      ),
      'path' => 'api/ipublic/status/.+',
      'n' => 4,
    ),
    1 =>
    array (
      'handler' =>
      array (
        0 =>  App\Controller\Ipublic\IpublicSubscriberController::class ,
        1 => 'delete',
      ),
      'path' => 'api/ipublic/subscriber/.+',
      'n' => 4,
    ),
  ),
);
