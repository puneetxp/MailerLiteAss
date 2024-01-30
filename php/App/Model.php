<?php

namespace App;

abstract class Model
{

    //items
    protected $items = [];
    protected $singular = false;
    protected DB $db;
    protected $relations = [];
    protected array $with = [];
    protected $table;
    protected $name;
    protected $model;
    protected $one;
    protected $fillable;
    protected $view;
    public $page = [];

    //__construct
    public function __construct()
    {
        $this->db = new DB($this->table);
    }

    public function paginate(int $pageNumber = 1, int $pageItems = 25)
    {
        $pageNumber = $_GET['page'] ?? $pageNumber;
        $pageItems = $_GET['pageItems'] ?? $pageItems;
        $this->page['result'] = $this->count();
        if ($this->page['result']) {
            $this->page['pageNumber'] = $pageNumber;
            $this->page['pageItems'] = $pageItems;
            $this->page['totalpages'] = $this->page['result'] / $this->page['pageItems'];
            $this->page['get'] = http_build_query($_GET);
            $offset = ($pageNumber - 1) * $pageItems;
            while ($offset > $this->page['result']) {
                $offset -= $pageItems;
            }
            $this->db->OffsetQ($offset)->LimitQ($pageItems);
            $this->get();
            $this->page['item'] = $this->items;
            return $this;
        } else {
            return null;
        }
    }
    public function getPage()
    {
        return Response::json($this->page);
    }


    //GET_data
    //mulitple
    public static function all()
    {
        $x = (new static());
        $x->db->SelSet();
        $x->get();
        return $x;
    }

    //where *
    public static function where($where)
    {
        return (new static())->_where($where);
    }

    public function andwhere($data)
    {
        $this->db->WhereQ($data);
        return $this;
    }

    public function orwhere($data)
    {
        $this->db->WhereQ($data, "OR");
        return $this;
    }

    public function andWhereC($data)
    {
        $this->db->WhereCustomQ($data);
        return $this;
    }

    public function orWhereC($data)
    {
        $this->db->WhereCustomQ($data, "OR");
        return $this;
    }

    public static function wherec($where)
    {
        return (new static())->_wherec($where);
    }

    public function get()
    {
        $this->db->SelSet()->exe();
        $this->items = (array) $this->db->many();
        return $this;
    }

    public function count()
    {
        $this->db->CountSet()->exe();
        return $this->db->many()[0]["count(*)"];
    }

    public function first($select = null)
    {
        $this->items = (array) $this->db->SelSet($select ?? $this->view)->exe()->first();
        if (count($this->items) > 0) {
            $this->singular = true;
            return $this;
        }
        return null;
    }

    public function _wherec($where = [])
    {
        $this->db->SelSet()->WhereCustomQ($where);
        return $this;
    }

    public function _where($where = [])
    {
        $this->db->where(Req::get($this->model, $where));
        return $this;
    }

    //single
    public static function find($value, $key = 'id')
    {
        $x = (new static());
        $x->db->find($value, $key);
        return $x->first();
    }

    public function getInserted()
    {
        $this->db->lastInserted();
        $this->items = (array) $this->db->first();
        $this->singular = true;
        return $this;
    }

    public function getsInserted()
    {
        $this->db->getInserted();
        $this->get();
        return $this;
    }

    public static function create($data = [])
    {
        $x = (new static());
        $x->db->create(Req::get($x->model, $data));
        return $x;
    }

    //insert
    public static function insert($data)
    {
        $x = (new static());
        $x->db->insert($data);
        return $x;
    }



    public function update($data)
    {
        $this->db->update(Req::get($this->model, $data));
        return $this;
    }

    //delete
    public static function delete($where)
    {
        return (new static())->db->delete($where)->exe();
    }

    public function clean($data)
    {
        return array_map(fn ($item) => array_filter($item, fn ($key) => in_array($key, $this->fillable)), $data);
    }

    //default output
    public function __toString()
    {
        return Response::json($this->items);
    }

    //array output
    public function array()
    {
        return $this->items;
    }
}
