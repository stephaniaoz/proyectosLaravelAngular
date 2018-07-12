import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-detail',
  templateUrl: './pais-detail.component.html',
  styleUrls: ['./pais-detail.component.css'],
  providers: [UserService, PaisService]
})
export class PaisDetailComponent implements OnInit {

  public pais: Pais;

  constructor(
    private _route: ActivatedRoute,
    public _router: Router,
    private _userService: UserService,
    private _paisService: PaisService
  ){

  }

  ngOnInit() {
    this.getCar();
  }

  getCar(){
    //recoger lo que nos llega por la url
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._paisService.getPais(id).subscribe(
        response => {
          //estado nos llega de laravel
          if(response.status == 'success'){
            this.pais = response.pais;
          }else{
            this._router.navigate(['home']);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }

}
