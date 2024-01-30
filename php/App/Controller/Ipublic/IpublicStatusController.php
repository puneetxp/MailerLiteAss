<?php

namespace App\Controller\Ipublic;

use App\Model\{
    Status
};

class IpublicStatusController {

    public static function all() {
        if (isset($_GET["latest"])) {
            return Status::wherec([["updated_at", ">", $_GET["latest"]]])->get();
        }
        return Status::all();
    }

    public static function where() {
        return Status::where(json_decode($_POST["statuses"]))->getsInserted();
    }

    public static function show($id) {
        return Status::find($id);
    }

    public static function store() {
        return Status::create($_POST)->getInserted();
    }

    public static function update($id) {
        Status::where(["id" => [$id]])->update($_POST);
        return Status::find($id);
    }

    public static function upsert() {
        return Status::upsert(json_decode($_POST["statuses"]))->getsInserted();
    }

    public static function delete($id) {
        Status::delete(["id" => $id]);
        return $id;
    }
}
