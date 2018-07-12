import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'registrer',
  templateUrl: './registrer.component.html',
  providers: [UserService]
})

export class RegistrerComponent implements OnInit{
  public title: string;
  public user: User;
  public status: string;
  public message: string;

  constructor(
    private _route: ActivatedRoute,
    public _router: Router,
    private _userService: UserService
  ){
    this.title = 'Registrate';
    this.user = new User(1,'ROLE_USER','','','','');
  }

  ngOnInit(){
    console.log('registrer.component cargado correctamente!!');
  }

  onSubmit(form){
    //console.log(this.user);
    //console.log(this._userService.pruebas());
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = response.status;
          this.message = response.message;
          //vaciar formulario
          this.user = new User(1,'ROLE_USER','','','','');
          form.reset();
        }else{
          this.status = 'error';
          this.message = response.message;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
