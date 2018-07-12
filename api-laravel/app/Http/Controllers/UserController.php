<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use Illuminate\Support\Facades\DB;
use App\User;

class UserController extends Controller
{
  //Registro de usuarios:
  public function registrer(Request $request){
    //var_dump($request);
    //recoger post: 'json' es el nombre (key que debemos llamar en los parametros del postman, y el value sería el arreglo json ({"name":"david","surname":"Lopez","email":"david@gmail.com","password":"david"}))
    $json = $request->input('json',null);
    $params = json_decode($json);

    $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
    $name = (!is_null($json) && isset($params->name)) ? $params->name : null;
    $surname = (!is_null($json) && isset($params->surname)) ? $params->surname : null;
    $role = "ROLE_USER";
    $password = (!is_null($json) && isset($params->password)) ? $params->password : null;

    if(!is_null($email) && !is_null($password) && !is_null($name)){
        //Crear el usuario:
        $user = new User();
        $user->users_email = $email;
        $user->users_name = $name;
        $user->users_surname = $surname;
        $user->users_role = $role;
        //Contraseña cifrada:
        $pwd = hash('sha256',$password);
        $user->users_password = $pwd;

        //Comprobar usuario duplicado:
        //Sacar un usuario con el email igual al que llega por post:
        $isset_user = User::where('users_email','=',$email)->first();

        if(count($isset_user) == 0){
          $user->save();

          $data = array(
            'status' => 'success',
            'code' => 200,
            'message' => 'Usuario registrado correctamente'
          );
        }else{
          //no guardar:
          $data = array(
            'status' => 'error',
            'code' => 400,
            'message' => 'Usuario duplicado, no puede registrarse'
          );
        }

    }else{
        $data = array(
          'status' => 'error',
          'code' => 400,
          'message' => 'Usuario no creado'
        );
    }
    //Respuesta en json
    return response()->json($data,200);

  }

  public function login(Request $request){
    $jwtAuth = new JwtAuth();

    //Recibir los datos por POST:
    $json = $request->input('json',null);
    $params = json_decode($json);

    $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
    $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
    $getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;

    //Cifrar la password
    $pwd = hash('sha256', $password);

    if(!is_null($email) && !is_null($password) && ($getToken == null || $getToken == 'false')){
      $signup = $jwtAuth->signup($email, $pwd);
    }elseif($getToken != null){
      $signup = $jwtAuth->signup($email, $pwd, $getToken);
    }else{
      $signup = array(
          'status' => 'error',
          'message' => 'Envia tus datos por post'
        );
    }

    return response()->json($signup,200);

  }



}
