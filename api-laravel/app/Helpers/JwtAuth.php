<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\support\Facades\DB;
use App\user;

/**
 *
 */
class JwtAuth
{

  public $key;

  public function __construct(){
    $this->key = 'esta-es-mi-clave-secreta-*7531231236515';
  }

  public function signup($email,$password,$getToken=null){

    //Identificar si el usuario existe en bd:
    $user = User::where(
            array(
              'users_email' => $email,
              'users_password' => $password
            ))->first();

    $signup = false;
    if(is_object($user)){
      $signup = true;
    }

    if($signup){
      //generar el token y devolverlo
      $token = array(
        'sub' => $user->users_id, //id de registro
        'email' => $user->users_email,
        'name' => $user->users_name,
        'surname' => $user->users_surname,
        'iat' => time(),
        'exp' => time() + (7 * 24 * 60 * 60) //se le suma una semana al tiempo que tiene ahora: 7 * 24 * 60min * 60sg (caducidad del token con iat y exp)
      );
      //token sería un cifrado completo: se pasa token, clave secreta,algoritmo de codificación
      $jwt = JWT::encode($token,$this->key,'HS256');
      //objeto de usuario identificado: decodificacion de ese mismo token: paso el token, la llave, el algoritmo de codificacion
      $decoded = JWT::decode($jwt,$this->key,array('HS256'));

      if(is_null($getToken)){
        return $jwt;
      }else{
        return $decoded;
      }

    }else{
      //devolver error:
      return array('status' => 'error', 'message' => 'Login ha fallado!!');
    }

  }

  //metodo para decodificar token: token, identity:true:devuelve el objeto:false:si es correcta o incorrecta la atenticación en base al token
  public function checkToken($jwt,$getIdentity = false){
    $auth = false;

    //hacer el decode de mi token:
    try{
      $decoded = JWT::decode($jwt, $this->key, array('HS256'));
    }catch(\UnexpectedValueException $e){
      $auth = false;
    }catch(\DomainException $e){
      $auth = false;
    }

    if(isset($decoded) && is_object($decoded) && isset($decoded->sub)){
      $auth = true;
    }else{
      $auth = false;
    }

    if($getIdentity){
      return $decoded;
    }

    return $auth;
  }

}


?>
