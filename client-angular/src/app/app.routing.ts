import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { DefaultComponent } from './components/default/default.component';
import { PaisNewComponent } from './components/pais-new/pais-new.component';
import { PaisEditComponent } from './components/pais-edit/pais-edit.component';
import { PaisDetailComponent } from './components/pais-detail/pais-detail.component';

const appRoutes: Routes = [
  {path:'', component: DefaultComponent},
  {path:'inicio', component: DefaultComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistrerComponent},
  {path:'logout/:sure', component: LoginComponent},
  {path:'crear-pais', component: PaisNewComponent},
  {path:'editar-pais/:id', component: PaisEditComponent},
  {path:'pais/:id', component: PaisDetailComponent},
  {path:'**', component: DefaultComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
