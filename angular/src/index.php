<?php

use App\Route;

header('Access-Control-Allow-Origin: *');
require_once __DIR__ . '/../../php/env.php';
require_once __DIR__ . '/../../php/vendor/autoload.php';
require_once __DIR__ . '/../../php/Routes/web.php';
new Route($route);

