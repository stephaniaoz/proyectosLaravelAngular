<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    protected $table = 'pais';
    protected $primaryKey = 'pais_id';
    //relación con usuario:
    public function user(){
      return $this->belongsTo('App\User','user_id');
    }
}
