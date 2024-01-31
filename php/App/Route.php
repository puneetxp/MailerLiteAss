<?php

namespace App;

class Route
{

    private $_trim = '/\^$';
    private $_uri = '';
    private $_method = "";
    private $_match_route = [];
    private $_realUri;
    private $_n = 0;

    public function __construct(
        private $routes,
        private $_url = "REQUEST_URI"
    ) {
        $this->active_route_set();
        echo $this->run_route();
    }

    public function active_route_set()
    {
        $this->_uri = trim(parse_url($_SERVER[$this->_url], PHP_URL_PATH), $this->_trim);
        $this->_method = $_SERVER['REQUEST_METHOD'];
        $this->_realUri = explode('/', $this->_uri);
        $this->_n = count($this->_realUri);
        if (isset($_POST['_method'])) {
            $this->_method = strtoupper($_POST['_method']);
            unset($_POST['_method']);
        }
    }

    public function run_route()
    {
        foreach ($this->routes[$this->_method] as $value) {
            if ($this->_n === $value["n"] && preg_match("#^" . trim($value["path"], $this->_trim) . "$#", $this->_uri)) {
                $this->_match_route = $value;
                return $this->run();
            }
        }
        return Response::not_found("Not Found");
    }

    public function run()
    {
        $fakeUri = explode('/', $this->_match_route['path']);
        $attributes = [];
        foreach ($fakeUri as $key => $value) {
            if ($value == '.+') {
                $attributes[] = $this->_realUri[$key];
            }
        }
        return call_user_func_array($this->_match_route['handler'], $attributes);
    }

    public function not_found()
    {
        return Response::not_found("Not Found");
    }
}
