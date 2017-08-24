import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AllToDoComponent } from './all-to-do/all-to-do.component';
import { CreateToDoComponent } from './create-to-do/create-to-do.component';

@NgModule({
  declarations: [
    AppComponent,
    AllToDoComponent,
    CreateToDoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
