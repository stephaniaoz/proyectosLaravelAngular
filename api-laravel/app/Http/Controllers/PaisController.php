<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Helpers\JwtAuth;
use App\Pais;

class PaisController extends Controller
{
    //
    public function index(){
      //Al hacer ->load('user') carga el usuario que es foranea, carga las propiedades de ese usuario
      $pais = Pais::all()->load('user');
      return response()->json(array(
                    'pais' => $pais,
                    'status' => 'success'
        ),200);
    }

    public function show($id){
      $pais = Pais::find($id)->load('user');
      return response()->json(array(
                    'pais' => $pais,
                    'status' => 'success'
        ),200);
    }

    public function store(Request $request){

      $hash = $request->header('Authorization', null);

      $jwtAuth = new JwtAuth();
      $checkToken = $jwtAuth->checkToken($hash);

      if($checkToken){
        //Recger datos por POST:
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        //Conseguir el usuario identificado
        $user = $jwtAuth->checkToken($hash, true);

        //Validaciones laravel.
        //Usamos el objeto validator si no queremos hacer el import o el use ponemos directamente la \ para que detecte el namespace
        $validate = \Validator::make($params_array, [
          'nombre' => 'required',
          'status' => 'required'
        ]);

        if($validate->fails()){
          return response()->json($validate->errors(),400);
        }

        //Guardar el pais
        $pais = new Pais();
        //parametros tratar de enviarlos sin el nombre de la tabla (tabla: pais_nombre, parametros: nombre)
        $pais->user_id = $user->sub; //En sub está guardado el id dentro de mi token cuando lo decodifico.
        $pais->pais_nombre = $params->nombre;
        $pais->pais_status = $params->status;
        $pais->save();

        $data = array(
          'pais' => $pais,
          'status' => 'success',
          'code' => 200,
        );

      }else{
        //Devolver error
        $data = array(
          'message' => 'Login incorrecto',
          'status' => 'error',
          'code' => 300,
        );
      }

      return response()->json($data, 200);

    }

    public function update($id, Request $request){

      //cabecera de autenticación
      $hash = $request->header('Authorization', null);

      $jwtAuth = new JwtAuth();
      //Comprobar que el token sea válido o no
      $checkToken = $jwtAuth->checkToken($hash);

      if($checkToken){
        //Recoger parametros POST
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        //Validar datos
        //Usamos el objeto validator si no queremos hacer el import o el use ponemos directamente la \ para que detecte el namespace
        $validate = \Validator::make($params_array, [
          'pais_nombre' => 'required',
          'pais_status' => 'required'
        ]);

        if($validate->fails()){
          return response()->json($validate->errors(),400);
        }

        //Actualizar el pais
        //buscar el registro a modificar:
        $pais = Pais::where('pais_id',$id)->update($params_array);

        $data = array(
          'pais' => $params,
          'status' => 'success',
          'code' => 200
        );

      }else{
        //Devolver error
        $data = array(
          'message' => 'Login incorrecto',
          'status' => 'error',
          'code' => 300,
        );
      }

      return response()->json($data, 200);

    }

    public function destroy($id, Request $request){

      $hash = $request->header('Authorization', null);
      $jwtAuth = new JwtAuth();
      //Comprobar que el token sea válido o no
      $checkToken = $jwtAuth->checkToken($hash);

      if($checkToken){
        //Comprobar que existe el registro
        $pais = Pais::find($id);
        //Borrarlo
        $pais->delete();
        //Devolverlo
        $data = array(
          'pais' => $pais,
          'status' => 'success',
          'code' => 200
        );

      }else{
        $data = array(
          'message' => 'Login incorrecto !!',
          'status' => 'error',
          'code' => 400,
        );
      }

      return response()->json($data, 200);

    }

}// end class
