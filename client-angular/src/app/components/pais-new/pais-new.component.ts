import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-new',
  templateUrl: './pais-new.component.html',
  styleUrls: ['./pais-new.component.css'],
  providers: [UserService, PaisService]
})
export class PaisNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public pais: Pais;
  public status_pais: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _paisService: PaisService
  ) {
    this.page_title = 'Crear nuevo pais';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }else{
      //crear objeto pais
      this.pais = new Pais(1,'','', null, null);

    }
  }

  onSubmit(form){
    console.log(this.pais);
    this._paisService.create(this.token, this.pais).subscribe(
      response => {
        if(response.status == 'success'){
          console.log(response);
          this.pais = response.pais;
          this.status_pais = 'success';
          this._router.navigate(['/home']);
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
