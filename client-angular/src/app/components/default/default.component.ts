import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  providers: [UserService, PaisService]
})

export class DefaultComponent implements OnInit{
  public title: string;
  public paises: Array<Pais>;
  public token;

  constructor(
    private _route: ActivatedRoute,
    public _router: Router,
    private _userService: UserService,
    private _paisService: PaisService
  ){
    this.title = 'Inicio';
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    console.log('default.component cargado correctamente!!');
    this.getPaises();
  }

  getPaises(){
    this._paisService.getPaises().subscribe(
      response => {
        if(response.status == 'success'){
          this.paises = response.pais;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePais(id){
    this._paisService.delete(this.token, id).subscribe(
      response => {
        //this._router.navigate(['/home']);
        this.getPaises();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
