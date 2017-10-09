/**
 * Created by papushe on 16/06/2017.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { AllToDoComponent } from './all-to-do/all-to-do.component';
import { CreateToDoComponent } from './create-to-do/create-to-do.component';
import { OpeningLoginAndRegisterComponent } from './opening-login-and-register/opening-login-and-register.component';


const appRouts: Routes = [
  {path: '', redirectTo: '/opening-login-and-register', pathMatch: 'full'},
  {path: 'all-to-do', component: AllToDoComponent},
  {path: 'create-to-do', component: CreateToDoComponent},
  {path: 'opening-login-and-register', component:OpeningLoginAndRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
