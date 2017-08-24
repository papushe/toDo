/**
 * Created by papushe on 16/06/2017.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { AllToDoComponent } from './all-to-do/all-to-do.component';
import { CreateToDoComponent } from './create-to-do/create-to-do.component';


const appRouts: Routes = [
  {path: '', redirectTo: '/all-to-to', pathMatch: 'full'},
  {path: 'all-to-do', component: AllToDoComponent},
  {path: 'create-to-do', component: CreateToDoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})

export  class AppRoutingModule {
}
