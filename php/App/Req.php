<?php

namespace App;

class Req
{

    public static function only(array $array)
    {
        return array_filter(
            $_POST,
            fn ($key) => in_array($key, $array),
            ARRAY_FILTER_USE_KEY
        );
    }

    public static function get(array $keys, array $data)
    {
        return array_filter(
            $data,
            fn ($key) => in_array($key, $keys),
            ARRAY_FILTER_USE_KEY
        );
    }

    public static function array(array $keys, array $data)
    {
        return array_map(fn ($item) => Req::get($keys, (array) $item), $data);
    }

    public static function one(string $one)
    {
        return self::only([$one]);
    }

}
