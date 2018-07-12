import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { DefaultComponent } from './components/default/default.component';
import { PaisNewComponent } from './components/pais-new/pais-new.component';
import { PaisEditComponent } from './components/pais-edit/pais-edit.component';
import { PaisDetailComponent } from './components/pais-detail/pais-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrerComponent,
    DefaultComponent,
    PaisNewComponent,
    PaisEditComponent,
    PaisDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
