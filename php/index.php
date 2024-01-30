<?php

use App\Route;

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, post, get');
require_once __DIR__ . '/env.php';
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/Routes/web.php';
new Route($route);
