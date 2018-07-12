import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})

export class LoginComponent implements OnInit{
  public title: string;
  public user: User;
  public token;
  public identity;
  public status: string;
  public message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Identificate';
    this.user = new User(1,'ROLE_USER','','','','');
  }

  ngOnInit(){
    console.log('login.component cargado correctamente!!');
    this.logout();
  }

  onSubmit(form){
    console.log(this.user);
    //subscribe para recoger lo que me devuelve el servicio
    this._userService.signup(this.user).subscribe(
      response => {
        this.message = response.message;
        if(response.status != 'error'){
          this.status = 'success';
          //Token, usar local  storage para guardar en navegador. Y poder accederlo desde cualquier parte.
          this.token = response;
          localStorage.setItem('token', this.token);

          //objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
                this.identity = response;
                //solo se puede almacenar string
                localStorage.setItem('identity', JSON.stringify(this.identity));

                //Redirección:
                this._router.navigate(['home'])
            },
            error => {
              console.log(<any>error);
            }
          );
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  logout(){
    //tomo el parametro que me llegue (se configura ruta y parametro en app.routing.ts)
    this._route.params.subscribe(params => {
      //con el (+) delante de params se convierte en un entero
      let logout = +params['sure'];

      if(logout == 1){
        //me elimina el elemento del local storage
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //redirección:
        this._router.navigate(['home']);

      }
    });
  }

}
