<?php

namespace App\Controller\Ipublic;

use App\Model\{
    Subscriber
};
use App\Response;

class IpublicSubscriberController
{

    public static function all()
    {
        return (new  Subscriber())->paginate()->getPage();
    }

    public static function where()
    {
        return Subscriber::where(json_decode($_POST["subscribers"]))->getsInserted();
    }

    public static function show($id)
    {
        return Subscriber::find($id);
    }

    public static function store()
    {
        return Subscriber::create($_POST)->getInserted();
    }

    public static function update($id)
    {
        Subscriber::where(["id" => [$id]])->update($_POST);
        return Subscriber::find($id);
    }



    public static function delete($id)
    {
        Subscriber::delete(["id" => $id]);
        return $id;
    }
}
