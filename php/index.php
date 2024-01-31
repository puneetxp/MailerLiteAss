<?php

use App\Route;

header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/env.php';
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/Routes/web.php';
new Route($route);
