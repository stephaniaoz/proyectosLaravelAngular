import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegistrerComponent } from './components/registrer/registrer.component';

const appRoutes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistrerComponent},
  {path:'**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
