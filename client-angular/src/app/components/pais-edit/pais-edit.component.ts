import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-edit',
  templateUrl: '../pais-new/pais-new.component.html', //reutilizar la vista de la creación de un pais
  styleUrls: ['./pais-edit.component.css'],
  providers: [UserService, PaisService]
})
export class PaisEditComponent implements OnInit {

  public page_title: string;
  public pais: Pais;
  public token;
  public status_pais;

  constructor(
    private _route: ActivatedRoute,
    public _router: Router,
    private _userService: UserService,
    private _paisService: PaisService
  ){
      this.token = this._userService.getToken();
  }

  ngOnInit() {
    //recoger lo que nos llega por la url
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getPais(id);
    });
  }

  getPais(id){

    this._paisService.getPais(id).subscribe(
      response => {
        //estado nos llega de laravel
        if(response.status == 'success'){
          this.pais = response.pais;
          //así puedo reemplazar el titulo del formulario
          this.page_title = 'Editar ' + this.pais.pais_nombre;
        }else{
          this._router.navigate(['home']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  onSubmit(form){
    console.log(this.pais.pais_id);
    this._paisService.update(this.token, this.pais, this.pais.pais_id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status_pais = 'success';
          this.pais = response.pais;
          this._router.navigate(['/pais', this.pais.pais_id]);
        }else{
          this.status_pais = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status_pais = 'error';
      }
    );
  }

}
