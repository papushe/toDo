import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AllToDoComponent } from './all-to-do/all-to-do.component';
import { CreateToDoComponent } from './create-to-do/create-to-do.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {ToDoService} from '../services/to-do.service';
import { OpeningLoginAndRegisterComponent } from './opening-login-and-register/opening-login-and-register.component';
import { PageHeaderComponent } from './header/page-header/page-header.component';
import { MoreComponent } from './more/more.component';
import { ChangePasswordComponent } from './more/change-password/change-password.component';
import { DateReversePipe } from '../pipes/date-reverse.pipe';
import { ChatComponent } from './chat/chat.component';
import {ChatService} from '../services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    AllToDoComponent,
    CreateToDoComponent,
    HeaderComponent,
    OpeningLoginAndRegisterComponent,
    PageHeaderComponent,
    MoreComponent,
    ChangePasswordComponent,
    DateReversePipe,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ToDoService, {provide: LocationStrategy, useClass: HashLocationStrategy}, ChatService, DateReversePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
